import { useEffect, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext.jsx';
import { prefersReducedMotion } from '../../utils/helpers.js';
import './Loader.css';

const KEY = 'mozon.introSeen';

/**
 * A short (~1.6s) opening curtain, shown once per browser session.
 * Purely decorative: the page underneath is already rendered and
 * reachable, and reduced-motion users never see it.
 */
export default function Loader() {
  const { t } = useLanguage();
  const [state, setState] = useState(() => {
    try {
      if (prefersReducedMotion() || sessionStorage.getItem(KEY)) return 'done';
    } catch {
      /* ignore */
    }
    return 'enter';
  });

  useEffect(() => {
    if (state === 'done') return undefined;
    document.body.classList.add('is-locked');
    const a = setTimeout(() => setState('leave'), 1500);
    const b = setTimeout(() => {
      setState('done');
      document.body.classList.remove('is-locked');
      try {
        sessionStorage.setItem(KEY, '1');
      } catch {
        /* ignore */
      }
    }, 2400);
    return () => {
      clearTimeout(a);
      clearTimeout(b);
      document.body.classList.remove('is-locked');
    };
    // run once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (state === 'done') return null;

  return (
    <div className={`loader loader--${state}`} aria-hidden="true">
      <div className="loader__inner">
        <span className="loader__mark">
          <span className="loader__word">{t.brand.wordmark}</span>
          <span className="loader__dot" />
        </span>
        <span className="loader__bar">
          <span />
        </span>
        <span className="loader__line">{t.loader.line}</span>
      </div>
    </div>
  );
}
