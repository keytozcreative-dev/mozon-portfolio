import { useEffect, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext.jsx';
import { projects } from '../../data/projects.js';
import { categories } from '../../data/categories.js';
import { assetSrcSet, assetUrl, pad, pick } from '../../utils/helpers.js';
import RichText, { stripMarkers } from '../RichText.jsx';
import Icon from '../Icon.jsx';
import './ProjectDetail.css';

const SECTIONS = ['overview', 'challenge', 'direction', 'process', 'outcome'];

/**
 * Reusable case-study page, opened at  #/work/<category>/<id>.
 * Every field is optional — it renders only what the project's data
 * provides (see src/data/projects.js), in the active language.
 */
export default function ProjectDetail({ route, onClose, onNavigate }) {
  const { t, lang } = useLanguage();
  const p = t.project;
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const returnFocus = useRef(typeof document !== 'undefined' ? document.activeElement : null);

  const category = categories.find((c) => c.key === route.category);
  const list = category && Array.isArray(projects[category.key]) ? projects[category.key] : [];
  const index = list.findIndex((x) => String(x.id) === String(route.id));
  const project = index >= 0 ? list[index] : null;
  const next = list.length > 1 ? list[(index + 1) % list.length] : null;
  const catCopy = category ? t.works.categories[category.key] : null;

  useEffect(() => {
    document.body.classList.add('is-locked');
    closeRef.current?.focus();
    const prevFocus = returnFocus.current;

    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab' && dialogRef.current) {
        const f = [...dialogRef.current.querySelectorAll('a[href], button:not([disabled])')];
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.classList.remove('is-locked');
      document.removeEventListener('keydown', onKey);
      if (prevFocus && typeof prevFocus.focus === 'function') prevFocus.focus({ preventScroll: true });
    };
  }, [onClose]);

  // Scroll the panel back to the top when moving between projects.
  useEffect(() => {
    dialogRef.current?.scrollTo?.({ top: 0 });
  }, [route.category, route.id]);

  const title = project ? pick(project.title, lang) : p.notFound;
  const details = project?.details || {};
  const hasStory = SECTIONS.some((k) => pick(details[k], lang)) || details.tools?.length || details.gallery?.length;

  const meta = project
    ? [
        [p.category, pick(project.category, lang) || catCopy?.label],
        [p.year, pick(project.year, lang)],
        [p.client, pick(project.client, lang)],
        [p.role, pick(project.role, lang)],
      ].filter(([, v]) => v)
    : [];

  return (
    <div className="pd" role="dialog" aria-modal="true" aria-labelledby="pd-title" ref={dialogRef}>
      <div className="pd__bar">
        <button type="button" className="pd__back" onClick={onClose}>
          <Icon name="arrow" className="pd__back-icon" />
          {p.back}
        </button>
        <button ref={closeRef} type="button" className="icon-btn" onClick={onClose} aria-label={p.close} title={p.close}>
          <Icon name="close" />
        </button>
      </div>

      <article className="pd__inner container">
        <header className="pd__head">
          {catCopy && (
            <p className="label">
              <span className="label__index">{project ? pad(index + 1, lang) : '—'}</span>
              <span aria-hidden="true">/</span>
              {stripMarkers(catCopy.title)}
            </p>
          )}
          <h2 id="pd-title" className="pd__title">
            {title}
          </h2>
          {project && pick(project.subtitle, lang) && <p className="pd__subtitle">{pick(project.subtitle, lang)}</p>}

          {(meta.length > 0 || project?.link) && (
            <div className="pd__metarow">
              {meta.length > 0 && (
                <dl className="pd__meta">
                  {meta.map(([k, v]) => (
                    <div key={k}>
                      <dt>{k}</dt>
                      <dd>{v}</dd>
                    </div>
                  ))}
                </dl>
              )}
              {project?.link && (
                <a className="btn btn--solid" href={project.link} target="_blank" rel="noopener noreferrer">
                  {p.visit}
                  <Icon name="arrowUpRight" className="btn__icon" />
                </a>
              )}
            </div>
          )}
        </header>

        {project?.image && (
          <figure className="pd__hero">
            <img
              src={assetUrl(project.image)}
              srcSet={assetSrcSet(project.srcSet)}
              sizes="(max-width: 1440px) 92vw, 1320px"
              alt={pick(project.alt, lang) || title}
              decoding="async"
            />
          </figure>
        )}

        {project && !hasStory && <p className="pd__empty">{p.empty}</p>}

        {project && hasStory && (
          <div className="pd__story">
            {SECTIONS.map((key, i) => {
              const text = pick(details[key], lang);
              if (!text) return null;
              return (
                <section key={key} className="pd__block">
                  <h3 className="label">
                    <span className="label__index">{pad(i + 1, lang)}</span>
                    {p[key]}
                  </h3>
                  <p className="pd__text">
                    <RichText text={text} />
                  </p>
                </section>
              );
            })}

            {details.tools?.length > 0 && (
              <section className="pd__block">
                <h3 className="label">{p.tools}</h3>
                <ul className="pd__tools">
                  {details.tools.map((tool, i) => (
                    <li key={i} dir="auto">
                      {pick(tool, lang)}
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        )}

        {details.gallery?.length > 0 && (
          <section className="pd__gallery" aria-label={p.gallery}>
            <h3 className="label">{p.gallery}</h3>
            <div className="pd__grid">
              {details.gallery.map((src, i) => {
                const item = typeof src === 'string' ? { src } : src;
                return (
                  <figure key={i} className="pd__shot">
                    <img
                      src={assetUrl(item.src)}
                      alt={pick(item.alt, lang) || `${title} — ${i + 1}`}
                      loading="lazy"
                      decoding="async"
                    />
                  </figure>
                );
              })}
            </div>
          </section>
        )}

        {next && (
          <button type="button" className="pd__next" onClick={() => onNavigate(category.key, next.id)}>
            <span className="label">{p.next}</span>
            <span className="pd__next-title">
              {pick(next.title, lang)}
              <Icon name="arrow" className="pd__next-icon" />
            </span>
          </button>
        )}
      </article>
    </div>
  );
}
