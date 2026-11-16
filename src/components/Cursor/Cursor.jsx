import { useEffect, useRef, useState } from 'react';
import { useFinePointer, useReducedMotion } from '../../hooks/useMediaQuery.js';
import './Cursor.css';

/**
 * A two-part cursor: a precise dot and a lagging ring. The ring grows
 * over interactive elements and shows a label for anything carrying
 * `data-cursor="Label"` (e.g. "Drag" over galleries, "View" on cards).
 * Only active on mouse/trackpad devices without reduced-motion.
 */
export default function Cursor() {
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const enabled = fine && !reduced;

  const dot = useRef(null);
  const ring = useRef(null);
  const [label, setLabel] = useState('');
  const [mode, setMode] = useState('');

  useEffect(() => {
    if (!enabled) return undefined;
    const root = document.documentElement;
    root.classList.add('has-cursor');

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const pos = { ...target };
    let raf = 0;
    let visible = false;

    const loop = () => {
      pos.x += (target.x - pos.x) * 0.18;
      pos.y += (target.y - pos.y) * 0.18;
      if (ring.current) ring.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onMove = (e) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (dot.current) dot.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      if (!visible) {
        visible = true;
        pos.x = e.clientX;
        pos.y = e.clientY;
        root.classList.add('cursor-visible');
      }
    };

    const onOver = (e) => {
      const el = e.target instanceof Element ? e.target : null;
      const labelled = el?.closest('[data-cursor]');
      if (labelled) {
        setLabel(labelled.getAttribute('data-cursor'));
        setMode('label');
        return;
      }
      setLabel('');
      if (el?.closest('input, textarea, select')) setMode('text');
      else if (el?.closest('a, button, [role="button"], label')) setMode('hover');
      else setMode('');
    };

    const onLeave = () => {
      visible = false;
      root.classList.remove('cursor-visible');
    };
    const onDown = () => root.classList.add('cursor-down');
    const onUp = () => root.classList.remove('cursor-down');

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerover', onOver, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);

    return () => {
      cancelAnimationFrame(raf);
      root.classList.remove('has-cursor', 'cursor-visible', 'cursor-down');
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerover', onOver);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className={`cursor${mode ? ` cursor--${mode}` : ''}`} aria-hidden="true">
      <div ref={ring} className="cursor__ring">
        <span className="cursor__label">{label}</span>
      </div>
      <div ref={dot} className="cursor__dot" />
    </div>
  );
}
