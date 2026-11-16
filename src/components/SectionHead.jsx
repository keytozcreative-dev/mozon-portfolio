import RichText from './RichText.jsx';
import { pad } from '../utils/helpers.js';
import { useLanguage } from '../context/LanguageContext.jsx';

/** Shared editorial header: "(01) — Label" on the left, big title on the right. */
export default function SectionHead({ index, label, title, intro, id }) {
  const { lang } = useLanguage();
  return (
    <header className="section-head">
      <p className="label" data-reveal>
        <span className="label__index">({pad(index, lang)})</span>
        <span aria-hidden="true">—</span>
        {label}
      </p>
      <div>
        <h2 id={id} className="heading" data-reveal="mask">
          <span className="mask-inner">
            <RichText text={title} />
          </span>
        </h2>
        {intro && (
          <p className="section-head__intro" data-reveal style={{ '--d': 150 }}>
            {intro}
          </p>
        )}
      </div>
    </header>
  );
}
