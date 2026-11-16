import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext.jsx';
import { useReducedMotion } from '../../hooks/useMediaQuery.js';
import { site } from '../../config/site.js';
import Icon from '../Icon.jsx';
import ProjectCard from './ProjectCard.jsx';

/**
 * WORK GALLERY — one independent horizontal showcase per category.
 *
 * It is a real scroll container, so touch-swipe, trackpad, keyboard
 * arrows and screen readers all work natively. On top of that:
 *   • a gentle auto-drift (when content is wider than the viewport),
 *     made seamless by rendering one inert clone of the set;
 *   • mouse drag-to-scroll with click suppression after a drag;
 *   • pause on hover / focus / touch, when off-screen, when the tab is
 *     hidden, via the pause button, and always for reduced motion;
 *   • graceful layouts for 0, 1, 2 … n projects.
 *
 * Works identically in RTL: progress is measured from the reading
 * start (modern browsers use negative scrollLeft in RTL containers).
 */
export default function GalleryRow({ category, items, labels, onOpen }) {
  const { lang, dir } = useLanguage();
  const reduced = useReducedMotion();

  const viewportRef = useRef(null);
  const setRef = useRef(null);
  const [loop, setLoop] = useState(false);
  const [overflowing, setOverflowing] = useState(false);
  const [userPaused, setUserPaused] = useState(false);

  // Mutable flags read every frame (no re-render needed).
  const flags = useRef({ hover: false, focus: false, drag: false, touch: 0, hold: 0, inView: false });
  const pos = useRef(0); // progress from reading start, in px
  const period = useRef(0); // width of one full set (for looping)
  const drag = useRef({ active: false, startX: 0, startPos: 0, moved: 0, id: null });

  const isEmpty = items.length === 0;
  const entries = isEmpty
    ? Array.from({ length: site.placeholderCount }, (_, i) => ({ placeholder: true, id: `p${i}` }))
    : items;

  const sign = dir === 'rtl' ? -1 : 1;
  const flow = category.direction || 1; // +1 drifts toward the reading end

  const readPos = () => Math.abs(viewportRef.current?.scrollLeft || 0);
  const writePos = (p) => {
    pos.current = p;
    if (viewportRef.current) viewportRef.current.scrollLeft = p * sign;
  };

  // Measure: does one set overflow the viewport? Only then loop / drift.
  useLayoutEffect(() => {
    const vp = viewportRef.current;
    const set = setRef.current;
    if (!vp || !set) return undefined;

    const measure = () => {
      const setWidth = set.getBoundingClientRect().width;
      const vpWidth = vp.clientWidth;
      period.current = setWidth;
      setOverflowing(setWidth > vpWidth + 2);
      setLoop(setWidth > vpWidth + 2 && entries.length > 1);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(vp);
    ro.observe(set);
    return () => ro.disconnect();
  }, [entries.length, lang]);

  // Reset position when the layout mode or direction changes.
  useLayoutEffect(() => {
    writePos(loop && flow < 0 ? period.current : 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loop, dir]);

  // Visibility of the row & the tab.
  useEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return undefined;
    const io = new IntersectionObserver(([e]) => {
      flags.current.inView = e.isIntersecting;
    });
    io.observe(vp);
    return () => io.disconnect();
  }, []);

  const autoplay = loop && !reduced && !userPaused;

  // The drift loop.
  useEffect(() => {
    if (!autoplay) return undefined;
    let raf = 0;
    let last = performance.now();
    const speed = site.gallerySpeed;

    const tick = (now) => {
      const dt = Math.min(64, now - last) / 1000;
      last = now;
      const f = flags.current;
      const idle =
        !f.hover && !f.focus && !f.drag && !document.hidden && f.inView && now > f.hold && !f.touch;
      if (idle && period.current > 0) {
        let p = pos.current + speed * dt * flow;
        if (p >= period.current) p -= period.current;
        if (p <= 0) p += period.current;
        writePos(p);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoplay, flow, sign]);

  // Keep `pos` in sync with native scrolling and wrap for infinite feel.
  const onScroll = useCallback(() => {
    const p = readPos();
    if (Math.abs(p - pos.current) < 0.75) return; // our own write
    const prev = pos.current;
    pos.current = p;
    if (!loop || period.current <= 0) return;
    if (p >= period.current) writePos(p - period.current);
    else if (p < 1 && prev > p) writePos(p + period.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loop, sign]);

  // Mouse drag-to-scroll (touch & pen use native scrolling).
  const onPointerDown = (e) => {
    if (e.pointerType !== 'mouse' || e.button !== 0 || !overflowing) return;
    drag.current = { active: true, startX: e.clientX, startPos: readPos(), moved: 0, id: e.pointerId };
    flags.current.drag = true;
  };
  const onPointerMove = (e) => {
    const d = drag.current;
    if (!d.active) return;
    const dx = e.clientX - d.startX;
    d.moved = Math.max(d.moved, Math.abs(dx));
    if (d.moved > 4 && !viewportRef.current.hasPointerCapture?.(d.id)) {
      viewportRef.current.setPointerCapture?.(d.id);
      viewportRef.current.classList.add('is-dragging');
    }
    let p = d.startPos - dx * sign;
    if (loop && period.current > 0) {
      p = ((p % period.current) + period.current) % period.current;
    } else {
      p = Math.max(0, p);
    }
    writePos(p);
  };
  const endDrag = () => {
    const d = drag.current;
    if (!d.active) return;
    d.active = false;
    flags.current.drag = false;
    flags.current.hold = performance.now() + 600;
    viewportRef.current?.classList.remove('is-dragging');
  };
  // Swallow the click that ends a drag so cards don't open accidentally.
  const onClickCapture = (e) => {
    if (drag.current.moved > 6) {
      e.preventDefault();
      e.stopPropagation();
    }
    drag.current.moved = 0;
  };

  // Prev / next: an eased tween in "loop space", so it never hits an edge.
  const tween = useRef(0);
  const step = (n) => {
    const vp = viewportRef.current;
    const set = setRef.current;
    if (!vp || !set) return;
    const card = set.firstElementChild;
    const gap = parseFloat(getComputedStyle(set).columnGap) || 0;
    const w = card ? card.getBoundingClientRect().width + gap : 300;
    const max = vp.scrollWidth - vp.clientWidth;
    const wrap = (p) => (loop && period.current > 0 ? ((p % period.current) + period.current) % period.current : Math.min(max, Math.max(0, p)));
    const from = readPos();
    const to = from + n * w;
    cancelAnimationFrame(tween.current);

    if (reduced) {
      writePos(wrap(to));
      return;
    }
    const dur = 650;
    const t0 = performance.now();
    flags.current.hold = t0 + dur + 1200;
    const run = (now) => {
      const k = Math.min(1, (now - t0) / dur);
      const e = 1 - Math.pow(1 - k, 3);
      writePos(wrap(from + (to - from) * e));
      if (k < 1) tween.current = requestAnimationFrame(run);
    };
    tween.current = requestAnimationFrame(run);
  };
  useEffect(() => () => cancelAnimationFrame(tween.current), []);

  const onKeyDown = (e) => {
    const next = dir === 'rtl' ? 'ArrowLeft' : 'ArrowRight';
    const prev = dir === 'rtl' ? 'ArrowRight' : 'ArrowLeft';
    if (e.key === next) {
      e.preventDefault();
      step(1);
    } else if (e.key === prev) {
      e.preventDefault();
      step(-1);
    }
  };

  const renderSet = (clone) =>
    entries.map((entry, i) => (
      <ProjectCard
        key={`${clone ? 'c' : 'o'}-${entry.id ?? i}`}
        entry={entry}
        index={i}
        category={category}
        labels={labels}
        onOpen={onOpen}
        tabbable={!clone}
      />
    ));

  return (
    <div className={`gallery${isEmpty ? ' gallery--empty' : ''}${overflowing ? '' : ' gallery--static'}`}>
      <div
        ref={viewportRef}
        className="gallery__viewport"
        style={{ '--card-w': category.width, '--card-ratio': category.ratio }}
        tabIndex={overflowing ? 0 : -1}
        role="region"
        aria-roledescription="carousel"
        aria-label={labels.title}
        data-cursor={overflowing ? labels.drag : undefined}
        onScroll={onScroll}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onLostPointerCapture={endDrag}
        onClickCapture={onClickCapture}
        onPointerEnter={(e) => e.pointerType === 'mouse' && (flags.current.hover = true)}
        onPointerLeave={(e) => {
          if (e.pointerType === 'mouse') flags.current.hover = false;
          endDrag();
        }}
        onFocus={() => (flags.current.focus = true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) flags.current.focus = false;
        }}
        onTouchStart={() => (flags.current.touch += 1)}
        onTouchEnd={() => {
          flags.current.touch = Math.max(0, flags.current.touch - 1);
          flags.current.hold = performance.now() + 2500;
        }}
        onKeyDown={onKeyDown}
        onDragStart={(e) => e.preventDefault()}
      >
        <div className="gallery__track">
          <ul ref={setRef} className="gallery__set">
            {renderSet(false)}
          </ul>
          {loop && (
            <ul className="gallery__set" aria-hidden="true" inert>
              {renderSet(true)}
            </ul>
          )}
        </div>
      </div>

      {overflowing && (
        <div className="gallery__controls">
          {loop && !reduced && (
            <button
              type="button"
              className="icon-btn"
              onClick={() => setUserPaused((v) => !v)}
              aria-pressed={userPaused}
              aria-label={userPaused ? labels.play : labels.pause}
              title={userPaused ? labels.play : labels.pause}
            >
              <Icon name={userPaused ? 'play' : 'pause'} />
            </button>
          )}
          <button type="button" className="icon-btn gallery__nav" onClick={() => step(-1)} aria-label={labels.prev} title={labels.prev}>
            <Icon name={dir === 'rtl' ? 'chevronRight' : 'chevronLeft'} />
          </button>
          <button type="button" className="icon-btn gallery__nav" onClick={() => step(1)} aria-label={labels.next} title={labels.next}>
            <Icon name={dir === 'rtl' ? 'chevronLeft' : 'chevronRight'} />
          </button>
        </div>
      )}
    </div>
  );
}
