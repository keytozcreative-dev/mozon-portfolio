/**
 * Turn a project path like "/images/projects/logos/a.png" into a URL that
 * works wherever the site is hosted (domain root or a GitHub Pages sub-path).
 * Absolute URLs (https://…) and data: URIs are returned unchanged.
 */
export function assetUrl(path) {
  if (!path) return '';
  if (/^(https?:)?\/\//i.test(path) || path.startsWith('data:') || path.startsWith('blob:')) return path;
  const base = import.meta.env?.BASE_URL ?? '/';
  return `${base.replace(/\/?$/, '/')}${path.replace(/^\.?\//, '')}`;
}

/** Same as assetUrl, applied to every URL inside a srcset string. */
export function assetSrcSet(srcSet) {
  if (!srcSet) return undefined;
  return srcSet
    .split(',')
    .map((part) => {
      const [url, ...descriptor] = part.trim().split(/\s+/);
      return [assetUrl(url), ...descriptor].join(' ');
    })
    .join(', ');
}

/**
 * Pick the right language from a value that may be a plain string or a
 * { en, ar } object. Falls back to English, then to any available value.
 */
export function pick(value, lang) {
  if (value == null) return '';
  if (typeof value === 'string' || typeof value === 'number') return String(value);
  return value[lang] ?? value.en ?? Object.values(value)[0] ?? '';
}

/** Two-digit index: 1 → "01". Uses Arabic-Indic digits for Arabic. */
export function pad(n, lang = 'en') {
  const s = String(n).padStart(2, '0');
  return lang === 'ar' ? toArabicDigits(s) : s;
}

export function toArabicDigits(s) {
  return String(s).replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[d]);
}

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
