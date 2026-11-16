import { Fragment } from 'react';

/**
 * Renders translation strings with two tiny inline markers:
 *   *text*    → accent serif   (.accent)
 *   ==text==  → highlight      (.highlight)
 *
 * `words` wraps every word in <span class="w"> with an index so the
 * paragraph can reveal word-by-word. Words — never letters — so Arabic
 * letter joining is always preserved.
 */
const TOKEN = /(\*[^*]+\*|==[^=]+==)/g;

function segments(text) {
  return String(text)
    .split(TOKEN)
    .filter(Boolean)
    .map((part) => {
      if (part.startsWith('==') && part.endsWith('==')) return { type: 'highlight', text: part.slice(2, -2) };
      if (part.startsWith('*') && part.endsWith('*')) return { type: 'accent', text: part.slice(1, -1) };
      return { type: 'plain', text: part };
    });
}

export default function RichText({ text, words = false, startIndex = 0 }) {
  const segs = segments(text);

  if (!words) {
    return segs.map((s, i) =>
      s.type === 'plain' ? (
        <Fragment key={i}>{s.text}</Fragment>
      ) : (
        <span key={i} className={s.type}>
          {s.text}
        </span>
      ),
    );
  }

  let index = startIndex;
  const out = [];
  segs.forEach((s, si) => {
    s.text.split(/(\s+)/).forEach((piece, pi) => {
      if (!piece) return;
      if (/^\s+$/.test(piece)) {
        out.push(<Fragment key={`${si}-${pi}`}>{piece}</Fragment>);
        return;
      }
      const i = index++;
      out.push(
        <span key={`${si}-${pi}`} className="w" style={{ '--i': i }}>
          {s.type === 'plain' ? piece : <span className={s.type}>{piece}</span>}
        </span>,
      );
    });
  });
  return out;
}

/** Plain text without markers (for aria-labels, titles, etc.). */
export const stripMarkers = (text) => String(text).replace(/==|\*/g, '');
