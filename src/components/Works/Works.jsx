import { useLanguage } from '../../context/LanguageContext.jsx';
import { useReveal } from '../../hooks/useReveal.js';
import { projects } from '../../data/projects.js';
import { categories } from '../../data/categories.js';
import { pad } from '../../utils/helpers.js';
import RichText, { stripMarkers } from '../RichText.jsx';
import SectionHead from '../SectionHead.jsx';
import WorkGallery from './WorkGallery.jsx';
import './Works.css';

// Friendly checks while developing — never runs in the production build.
if (import.meta.env?.DEV) {
  categories.forEach(({ key }) => {
    const list = projects[key];
    if (!Array.isArray(list)) {
      console.warn(`[projects] "${key}" should be an array in src/data/projects.js`);
      return;
    }
    const seen = new Set();
    list.forEach((p, i) => {
      if (p.id == null) console.warn(`[projects] ${key}[${i}] is missing an "id"`);
      if (seen.has(String(p.id))) console.warn(`[projects] ${key}: duplicate id "${p.id}"`);
      seen.add(String(p.id));
      if (!p.title) console.warn(`[projects] ${key}[${i}] is missing a "title"`);
    });
  });
}

export default function Works({ onOpenProject }) {
  const { t, lang } = useLanguage();
  const w = t.works;
  const ref = useReveal({ threshold: 0.02 });

  return (
    <section id="works" ref={ref} className="section works" aria-labelledby="works-title">
      <div className="container">
        <SectionHead index={4} label={w.label} title={w.title} intro={w.intro} id="works-title" />
      </div>

      <div className="works__categories">
        {categories.map((cat, i) => {
          const items = Array.isArray(projects[cat.key]) ? projects[cat.key] : [];
          const copy = w.categories[cat.key];
          const count = items.length;
          const labels = {
            ...w,
            title: stripMarkers(copy.title),
            label: copy.label,
          };
          const headingId = `works-${cat.key}`;

          return (
            <article key={cat.key} className="work-cat" aria-labelledby={headingId}>
              <header className="work-cat__head container" data-reveal>
                <span className="work-cat__index">
                  {pad(i + 1, lang)} <span aria-hidden="true">/</span> {pad(categories.length, lang)}
                </span>
                <h3 id={headingId} className="work-cat__title">
                  <RichText text={copy.title} />
                </h3>
                <p className="work-cat__desc">{copy.description}</p>
                <p className="work-cat__count">
                  {count > 0 ? (
                    <>
                      <span className="work-cat__count-num">{pad(count, lang)}</span>{' '}
                      {count === 1 ? w.countOne : w.countMany}
                    </>
                  ) : (
                    <>
                      <span className="work-cat__count-dot" aria-hidden="true" />
                      {w.reserved}
                    </>
                  )}
                </p>
              </header>
              <div data-reveal style={{ '--d': 120 }}>
                <WorkGallery category={cat} items={items} labels={labels} onOpen={onOpenProject} />
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
