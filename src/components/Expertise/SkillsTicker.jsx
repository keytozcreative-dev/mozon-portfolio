/**
 * Oversized typographic ticker of every skill — a pure-CSS marquee
 * (one duplicated track, translated by -50%). Pauses on hover and is
 * static for reduced-motion users. Decorative: the real, accessible
 * skill lists live in the cards above, so this is hidden from
 * assistive technology.
 */
export default function SkillsTicker({ groups }) {
  const items = groups.flatMap((g) => g.skills);

  const row = (
    <ul className="ticker__row">
      {items.map((s, i) => (
        <li key={i} className={`ticker__item${i % 3 === 1 ? ' is-accent' : i % 3 === 2 ? ' is-outline' : ''}`}>
          <span dir="auto">{s}</span>
          <span className="ticker__sep">✦</span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker__track">
        {row}
        {row}
      </div>
    </div>
  );
}
