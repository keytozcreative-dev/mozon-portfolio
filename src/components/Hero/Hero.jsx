import { useEffect, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext.jsx';
import { useReveal } from '../../hooks/useReveal.js';
import { prefersReducedMotion } from '../../utils/helpers.js';
import RichText, { stripMarkers } from '../RichText.jsx';
import Icon from '../Icon.jsx';
import { Aurora, Rain } from './Atmosphere.jsx';
import './Hero.css';

export default function Hero() {
  const { t, lang } = useLanguage();
  const h = t.hero;
  const revealRef = useReveal({ threshold: 0.01 });
  const sectionRef = useRef(null);

  // Gentle pointer parallax for the aurora + a slow scroll fade of the title.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || prefersReducedMotion()) return undefined;
    let raf = 0;
    const target = { x: 0, y: 0 };
    const cur = { x: 0, y: 0 };

    const tick = () => {
      cur.x += (target.x - cur.x) * 0.06;
      cur.y += (target.y - cur.y) * 0.06;
      el.style.setProperty('--px', cur.x.toFixed(4));
      el.style.setProperty('--py', cur.y.toFixed(4));
      const p = Math.min(1, Math.max(0, window.scrollY / (el.offsetHeight || 1)));
      el.style.setProperty('--scroll', p.toFixed(4));
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e) => {
      target.x = e.clientX / window.innerWidth - 0.5;
      target.y = e.clientY / window.innerHeight - 0.5;
    };

    const io = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(raf);
      if (entry.isIntersecting) raf = requestAnimationFrame(tick);
    });
    io.observe(el);
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
    };
  }, []);

  const setRefs = (node) => {
    sectionRef.current = node;
    revealRef.current = node;
  };

  return (
    <section id="home" ref={setRefs} className="hero" aria-labelledby="hero-title">
      <Aurora />
      <Rain />

      <div className="hero__body container">
        <div className="hero__top">
          <p className="label hero__kicker" data-reveal style={{ '--d': 200 }}>
            <span className="hero__pulse" aria-hidden="true" />
            {t.brand.fullName}
          </p>
          <p className="label hero__kicker hero__kicker--end" data-reveal style={{ '--d': 300 }}>
            {h.kicker}
          </p>
        </div>

        <h1 id="hero-title" className="hero__title display" key={lang}>
          <span className="sr-only">
            {t.brand.fullName} — {h.lines.map(stripMarkers).join(' ')}
          </span>
          {h.lines.map((line, i) => (
            <span
              key={i}
              aria-hidden="true"
              className={`hero__line hero__line--${i + 1}`}
              data-reveal="mask"
              style={{ '--d': 350 + i * 140 }}
            >
              <span className="mask-inner">
                <RichText text={line} />
              </span>
            </span>
          ))}
        </h1>

        <div className="hero__side">
          <p className="hero__lead" data-reveal style={{ '--d': 800 }}>
            {h.lead}
          </p>
          <ul className="hero__roles" data-reveal style={{ '--d': 900 }}>
            {t.brand.roles.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
          <div className="hero__ctas" data-reveal style={{ '--d': 1000 }}>
            <a href="#works" className="btn btn--solid">
              {h.ctaPrimary}
              <Icon name="arrowDown" className="btn__icon" />
            </a>
            <a href="#contact" className="btn">
              {h.ctaSecondary}
              <Icon name="arrow" className="btn__icon btn__icon--dir" />
            </a>
          </div>
        </div>

        <div className="hero__badge" aria-hidden="true" data-reveal style={{ '--d': 1100 }}>
          <svg viewBox="0 0 120 120" dir="ltr">
            <defs>
              <path id="badge-circle" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
            </defs>
            <text>
              <textPath href="#badge-circle" textLength="288">
                BUILD · DESIGN · CREATE · BUILD · DESIGN · CREATE ·
              </textPath>
            </text>
          </svg>
          <Icon name="spark" className="hero__badge-spark" />
        </div>
      </div>

      <dl className="hero__meta container" data-reveal style={{ '--d': 1150 }}>
        {h.meta.map((m) => (
          <div key={m.label} className="hero__meta-item">
            <dt>{m.label}</dt>
            <dd>{m.value}</dd>
          </div>
        ))}
      </dl>

      <a href="#about" className="hero__scroll" aria-label={h.scroll}>
        <span>{h.scroll}</span>
        <span className="hero__scroll-line" aria-hidden="true" />
      </a>
    </section>
  );
}
