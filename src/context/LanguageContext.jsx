import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { translations, languages } from '../i18n/index.js';
import { site } from '../config/site.js';
import { prefersReducedMotion } from '../utils/helpers.js';

const LanguageContext = createContext(null);

function readStoredLanguage() {
  try {
    const stored = localStorage.getItem(site.languageStorageKey);
    if (stored && translations[stored]) return stored;
  } catch {
    /* storage unavailable (private mode) — fall through */
  }
  return site.defaultLanguage;
}

function setMeta(selector, attr, value) {
  const el = document.head.querySelector(selector);
  if (el) el.setAttribute(attr, value);
}

/**
 * Provides `lang`, `dir`, `t` (the active translation object) and
 * `setLanguage`. Switching runs a short veil transition so the RTL ⇄ LTR
 * re-layout never flashes, persists the choice, and updates <html>
 * lang/dir plus the document title and description.
 */
export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(readStoredLanguage);
  const [switching, setSwitching] = useState(false);
  const timers = useRef([]);

  const dir = languages[lang].dir;
  const t = translations[lang];

  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = dir;
    document.title = t.meta.title;
    setMeta('meta[name="description"]', 'content', t.meta.description);
    setMeta('meta[property="og:locale"]', 'content', languages[lang].ogLocale);
    try {
      localStorage.setItem(site.languageStorageKey, lang);
    } catch {
      /* ignore */
    }
  }, [lang, dir, t]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const setLanguage = useCallback(
    (next) => {
      if (next === lang || !translations[next]) return;
      if (prefersReducedMotion()) {
        setLang(next);
        return;
      }
      setSwitching(true);
      timers.current.push(
        setTimeout(() => setLang(next), 320),
        setTimeout(() => setSwitching(false), 380),
      );
    },
    [lang],
  );

  const value = useMemo(() => ({ lang, dir, t, setLanguage, switching }), [lang, dir, t, setLanguage, switching]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside <LanguageProvider>');
  return ctx;
}
