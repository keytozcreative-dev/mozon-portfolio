import { useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';

/**
 * Adds `is-visible` to the element (and any `[data-reveal]` children)
 * once it enters the viewport. Styling lives in styles/motion.css, so
 * reduced-motion users simply see the final state.
 *
 * Re-scans after a language switch so any freshly mounted text is
 * revealed too (already-visible elements are left untouched).
 *
 *   const ref = useReveal();
 *   <section ref={ref}> <h2 data-reveal>…</h2> </section>
 */
export function useReveal({ threshold = 0.15, rootMargin = '0px 0px -8% 0px' } = {}) {
  const ref = useRef(null);
  const { lang } = useLanguage();

  useEffect(() => {
    const root = ref.current;
    if (!root) return undefined;

    const targets = [root, ...root.querySelectorAll('[data-reveal]')].filter(
      (el) => !el.classList.contains('is-visible'),
    );

    if (!('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('is-visible'));
      return undefined;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin },
    );

    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [threshold, rootMargin, lang]);

  return ref;
}
