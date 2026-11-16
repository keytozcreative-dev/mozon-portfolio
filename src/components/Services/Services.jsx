import { useLanguage } from '../../context/LanguageContext.jsx';
import { useReveal } from '../../hooks/useReveal.js';
import { pad } from '../../utils/helpers.js';
import SectionHead from '../SectionHead.jsx';
import Icon from '../Icon.jsx';
import './Services.css';

/** One abstract mark per service (same order as the translations). */
const MARKS = [
  // Website development — stacked frames
  <g key="0">
    <rect x="10" y="14" width="44" height="32" rx="2" />
    <path d="M10 22h44" />
    <circle className="m-acc" cx="15" cy="18" r="1.4" />
  </g>,
  // Landing page — single column with a focal point
  <g key="1">
    <rect x="20" y="8" width="24" height="48" rx="2" />
    <path d="M25 18h14M25 23h9" />
    <circle className="m-acc" cx="32" cy="40" r="5" />
  </g>,
  // Brand identity — monogram construction
  <g key="2">
    <circle cx="32" cy="32" r="20" />
    <path d="M12 32h40M32 12v40" strokeDasharray="2 4" />
    <path className="m-acc" d="M22 42V22l10 12 10-12v20" />
  </g>,
  // Social media — grid of posts
  <g key="3">
    <rect x="12" y="12" width="18" height="18" />
    <rect x="34" y="12" width="18" height="18" />
    <rect x="12" y="34" width="18" height="18" />
    <rect className="m-acc" x="34" y="34" width="18" height="18" />
  </g>,
  // Motion graphics — easing curve
  <g key="4">
    <path d="M10 52C30 52 34 12 54 12" />
    <path d="M10 52h44M10 52V12" strokeDasharray="2 4" />
    <circle className="m-acc m-fill" cx="54" cy="12" r="3" />
  </g>,
  // UI/UX — cursor over layout
  <g key="5">
    <rect x="10" y="12" width="44" height="34" rx="3" />
    <path d="M10 20h44M24 20v26" />
    <path className="m-acc" d="M38 30l10 4-4 2-2 4z" />
  </g>,
  // Portfolio — fanned frames
  <g key="6">
    <rect x="14" y="18" width="30" height="34" rx="2" transform="rotate(-8 29 35)" />
    <rect x="20" y="14" width="30" height="34" rx="2" />
    <path className="m-acc" d="M26 38l6-8 5 6 4-4 4 6" />
  </g>,
];

export default function Services() {
  const { t, lang } = useLanguage();
  const s = t.services;
  const ref = useReveal();

  const prefill = (index) => {
    window.dispatchEvent(new CustomEvent('contact:prefill', { detail: { service: index } }));
  };

  return (
    <section id="services" ref={ref} className="section services" aria-labelledby="services-title">
      <div className="container">
        <SectionHead index={3} label={s.label} title={s.title} intro={s.intro} id="services-title" />

        <ol className="services__list">
          {s.items.map((item, i) => (
            <li key={i} className="svc" data-reveal style={{ '--d': i * 70 }}>
              <a href="#contact" className="svc__link" onClick={() => prefill(i)}>
                <span className="svc__num">{pad(i + 1, lang)}</span>
                <h3 className="svc__title">{item.title}</h3>
                <p className="svc__desc">{item.description}</p>
                <span className="svc__mark" aria-hidden="true">
                  <svg viewBox="0 0 64 64">{MARKS[i % MARKS.length]}</svg>
                </span>
                <span className="svc__arrow" aria-hidden="true">
                  <Icon name="arrowUpRight" />
                </span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
