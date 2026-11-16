import { useRef, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext.jsx';
import { assetSrcSet, assetUrl, pad, pick } from '../../utils/helpers.js';
import { projectHref } from '../../hooks/useHashRoute.js';
import Icon from '../Icon.jsx';

/** Line drawings that hint at each category's format inside empty frames. */
const FRAME_GLYPHS = {
  websites: (
    <g>
      <rect x="6" y="10" width="68" height="44" rx="2" />
      <path d="M6 18h68" />
      <circle cx="11" cy="14" r="1" />
      <circle cx="15" cy="14" r="1" />
      <path className="g-acc" d="M14 30h26M14 36h16" />
      <rect x="48" y="26" width="18" height="20" />
    </g>
  ),
  socialMedia: (
    <g>
      <rect x="24" y="4" width="32" height="56" rx="5" />
      <rect x="28" y="12" width="24" height="24" />
      <path className="g-acc" d="M28 42h16M28 47h10" />
    </g>
  ),
  logos: (
    <g>
      <circle cx="40" cy="32" r="22" />
      <path d="M18 32h44M40 10v44" strokeDasharray="1.5 3" />
      <circle className="g-acc" cx="40" cy="32" r="9" />
    </g>
  ),
  branding: (
    <g>
      <rect x="8" y="12" width="20" height="40" />
      <rect x="30" y="12" width="20" height="40" />
      <rect className="g-acc" x="52" y="12" width="20" height="40" />
      <path d="M8 44h64" strokeDasharray="1.5 3" />
    </g>
  ),
  motionGraphics: (
    <g>
      <rect x="6" y="10" width="68" height="44" rx="2" />
      <path className="g-acc" d="M35 24v16l13-8z" />
      <path d="M6 48h68" />
      <path d="M6 48h26" strokeWidth="2" />
    </g>
  ),
};

function Frame({ categoryKey }) {
  return (
    <div className="card__frame" aria-hidden="true">
      <span className="card__crop card__crop--tl" />
      <span className="card__crop card__crop--tr" />
      <span className="card__crop card__crop--bl" />
      <span className="card__crop card__crop--br" />
      <svg className="card__glyph" viewBox="0 0 80 64">
        {FRAME_GLYPHS[categoryKey]}
      </svg>
    </div>
  );
}

/**
 * A single gallery item. Renders either:
 *   • an intentional, empty "reserved" frame (placeholder), or
 *   • a project: lazy image (or hover-played video) linking to its page.
 * If an image path is wrong/missing, it falls back to the frame art
 * instead of a broken-image icon.
 */
export default function ProjectCard({ entry, index, category, labels, onOpen, tabbable = true }) {
  const { lang } = useLanguage();
  const [failed, setFailed] = useState(false);
  const videoRef = useRef(null);
  const num = pad(index + 1, lang);

  if (entry.placeholder) {
    return (
      <li className="card card--empty">
        <div className="card__media">
          <Frame categoryKey={category.key} />
        </div>
        <span className="card__num">{num}</span>
        <span className="card__tag">{labels.placeholderTag}</span>
        <div className="card__caption">
          <p className="card__title">{labels.placeholderTitle}</p>
          <p className="card__subtitle">{labels.placeholderSubtitle}</p>
        </div>
      </li>
    );
  }

  const title = pick(entry.title, lang);
  const subtitle = pick(entry.subtitle, lang);
  const tag = pick(entry.category, lang) || labels.label;
  const alt = pick(entry.alt, lang) || title;
  const hasImage = entry.image && !failed;

  const play = () => videoRef.current?.play?.().catch(() => {});
  const stop = () => {
    const v = videoRef.current;
    if (v) {
      v.pause();
      v.currentTime = 0;
    }
  };

  return (
    <li className="card" data-cursor={labels.view}>
      <a
        className="card__link"
        href={projectHref(category.key, entry.id)}
        tabIndex={tabbable ? undefined : -1}
        aria-label={`${title}${subtitle ? ` — ${subtitle}` : ''}. ${labels.viewProject}`}
        onClick={(e) => {
          if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
          e.preventDefault();
          onOpen(category.key, entry.id);
        }}
        onPointerEnter={(e) => e.pointerType === 'mouse' && play()}
        onPointerLeave={stop}
        onFocus={play}
        onBlur={stop}
        draggable={false}
      >
        <div className="card__media">
          {hasImage ? (
            <img
              src={assetUrl(entry.image)}
              srcSet={assetSrcSet(entry.srcSet)}
              sizes={`(max-width: 600px) 80vw, ${category.width.match(/(\d+)vw/)?.[1] || 40}vw`}
              alt={alt}
              loading="lazy"
              decoding="async"
              draggable={false}
              onError={() => setFailed(true)}
            />
          ) : (
            <Frame categoryKey={category.key} />
          )}
          {entry.video && (
            <video
              ref={videoRef}
              className="card__video"
              src={assetUrl(entry.video)}
              poster={hasImage ? assetUrl(entry.image) : undefined}
              muted
              loop
              playsInline
              preload="none"
              aria-hidden="true"
            />
          )}
          <span className="card__veil" aria-hidden="true" />
        </div>

        <span className="card__num">{num}</span>
        <span className="card__tag">{tag}</span>

        <div className="card__caption">
          <p className="card__title">{title}</p>
          {subtitle && <p className="card__subtitle">{subtitle}</p>}
        </div>

        <span className="card__cta" aria-hidden="true">
          {labels.viewProject}
          <Icon name="arrowUpRight" />
        </span>
      </a>
    </li>
  );
}
