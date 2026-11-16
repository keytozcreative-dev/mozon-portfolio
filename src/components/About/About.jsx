import { useLanguage } from '../../context/LanguageContext.jsx';
import { useReveal } from '../../hooks/useReveal.js';
import RichText from '../RichText.jsx';
import SectionHead from '../SectionHead.jsx';
import { pad } from '../../utils/helpers.js';
import './About.css';

export default function About() {
  const { t, lang } = useLanguage();
  const a = t.about;
  const ref = useReveal();

  return (
    <section id="about" ref={ref} className="section about" aria-labelledby="about-title">
      <div className="container">
        <SectionHead index={1} label={a.label} title={a.title} id="about-title" />

        <div className="about__grid">
          <aside className="about__aside" data-reveal>
            <div className="about__note">
              <svg className="about__cloud" viewBox="0 0 120 64" aria-hidden="true">
                <path d="M24 48h70a18 18 0 0 0 0-36 26 26 0 0 0-48-4 16 16 0 0 0-22 16A12 12 0 0 0 24 48z" />
                <path className="about__drop" d="M38 54v8M58 54v6M78 54v8" />
              </svg>
              <p className="about__term">{a.nameNote.term}</p>
              <p className="about__note-text">{a.nameNote.text}</p>
            </div>
          </aside>

          <div className="about__main">
            <p className="about__lead" data-reveal="words">
              <RichText text={a.lead} words />
            </p>

            <hr className="rule about__rule" data-reveal="line" />

            <div className="about__cols">
              {a.paragraphs.map((p, i) => (
                <p key={i} className="about__p" data-reveal style={{ '--d': i * 120 }}>
                  <span className="about__p-num" aria-hidden="true">
                    {pad(i + 1, lang)}
                  </span>
                  <RichText text={p} />
                </p>
              ))}
            </div>

            <figure className="about__quote" data-reveal>
              <span className="about__qmark" aria-hidden="true">
                “
              </span>
              <blockquote>
                <p>
                  <RichText text={a.quote} />
                </p>
              </blockquote>
              <figcaption>— {a.signature}</figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
