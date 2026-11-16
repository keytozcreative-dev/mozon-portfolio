import './Atmosphere.css';

/**
 * The "muzn" atmosphere: a slow, muted aurora (the cloud) and fine
 * falling hairlines (the rain). Decorative only — hidden from assistive
 * tech, frozen for reduced-motion users, GPU-friendly transforms only.
 */
const RAIN = [
  { x: 6, d: 7.5, delay: -1.2, h: 22 },
  { x: 14, d: 9.2, delay: -5.1, h: 14 },
  { x: 23, d: 6.8, delay: -3.3, h: 26 },
  { x: 31, d: 10.5, delay: -7.4, h: 12 },
  { x: 42, d: 8.1, delay: -2.2, h: 20 },
  { x: 51, d: 11.2, delay: -6.6, h: 16 },
  { x: 58, d: 7.2, delay: -0.4, h: 24 },
  { x: 67, d: 9.8, delay: -4.8, h: 13 },
  { x: 74, d: 8.6, delay: -8.1, h: 21 },
  { x: 83, d: 10.1, delay: -2.9, h: 15 },
  { x: 91, d: 7.9, delay: -5.7, h: 19 },
];

export function Aurora({ className = '' }) {
  return (
    <div className={`aurora ${className}`} aria-hidden="true">
      <span className="aurora__blob aurora__blob--1" />
      <span className="aurora__blob aurora__blob--2" />
      <span className="aurora__blob aurora__blob--3" />
    </div>
  );
}

export function Rain({ className = '' }) {
  return (
    <div className={`rain ${className}`} aria-hidden="true">
      {RAIN.map((r, i) => (
        <span
          key={i}
          className="rain__line"
          style={{ '--x': `${r.x}%`, '--dur': `${r.d}s`, '--delay': `${r.delay}s`, '--h': `${r.h}vh` }}
        />
      ))}
    </div>
  );
}
