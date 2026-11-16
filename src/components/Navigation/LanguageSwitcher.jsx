import { useLanguage } from '../../context/LanguageContext.jsx';
import { languages } from '../../i18n/index.js';

/**
 * Segmented EN / ع switch with a sliding pill. Each option is labelled
 * in its own language so a visitor can always find theirs.
 */
export default function LanguageSwitcher({ className = '' }) {
  const { lang, setLanguage, t } = useLanguage();
  const codes = Object.keys(languages);

  return (
    <div className={`lang-switch ${className}`} role="group" aria-label={t.a11y.languageSwitch} data-active={lang}>
      <span className="lang-switch__pill" aria-hidden="true" />
      {codes.map((code) => (
        <button
          key={code}
          type="button"
          className={`lang-switch__btn${lang === code ? ' is-active' : ''}`}
          aria-pressed={lang === code}
          lang={code}
          title={languages[code].name}
          onClick={() => setLanguage(code)}
        >
          <span aria-hidden="true">{languages[code].label}</span>
          <span className="sr-only">{languages[code].name}</span>
        </button>
      ))}
    </div>
  );
}
