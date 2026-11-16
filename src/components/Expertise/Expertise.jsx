import { useLanguage } from '../../context/LanguageContext.jsx';
import { useReveal } from '../../hooks/useReveal.js';
import { pad } from '../../utils/helpers.js';
import SectionHead from '../SectionHead.jsx';
import SkillsTicker from './SkillsTicker.jsx';
import './Expertise.css';

/** Abstract glyphs — one per discipline, drawn with the same hairline. */
const GLYPHS = {
  dev: (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <path d="M22 18 8 32l14 14M42 18l14 14-14 14" />
      <path className="glyph-accent" d="M36 12 28 52" />
    </svg>
  ),
  design: (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="26" cy="28" r="16" />
      <rect x="28" y="30" width="24" height="24" />
      <circle className="glyph-accent glyph-fill" cx="46" cy="14" r="3" />
    </svg>
  ),
  creative: (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <path d="M6 32c6-14 12-14 18 0s12 14 18 0 12-14 18 0" />
      <path className="glyph-accent" d="M6 46h52" strokeDasharray="2 5" />
    </svg>
  ),
};

export default function Expertise() {
  const { t, lang } = useLanguage();
  const e = t.expertise;
  const ref = useReveal();

  return (
    <section id="expertise" ref={ref} className="section expertise" aria-labelledby="expertise-title">
      <div className="container">
        <SectionHead index={2} label={e.label} title={e.title} intro={e.intro} id="expertise-title" />

        <div className="expertise__grid">
          {e.groups.map((g, gi) => (
            <article key={g.key} className="xp" data-reveal style={{ '--d': gi * 140 }}>
              <div className="xp__top">
                <span className="xp__index">{pad(gi + 1, lang)}</span>
                <span className="xp__glyph">{GLYPHS[g.key]}</span>
              </div>
              <h3 className="xp__title">{g.title}</h3>
              <p className="xp__note">{g.note}</p>
              <ul className="xp__list">
                {g.skills.map((s, si) => (
                  <li key={si} className="xp__skill">
                    <span className="xp__skill-num" aria-hidden="true">
                      {pad(si + 1, lang)}
                    </span>
                    <span className="xp__skill-name" dir="auto">
                      {s}
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>

      <SkillsTicker groups={e.groups} />
    </section>
  );
}
