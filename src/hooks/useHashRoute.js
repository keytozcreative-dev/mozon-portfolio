import { useCallback, useEffect, useState } from 'react';

/**
 * Minimal hash router for project pages:  #/work/<category>/<id>
 * Hash routing works on any static host (including GitHub Pages) with
 * no server rewrites, and the browser back button closes the project.
 * Plain section anchors like #about are ignored.
 */
const PATTERN = /^#\/work\/([^/]+)\/([^/?#]+)/;

function parse(hash) {
  const m = PATTERN.exec(hash || '');
  return m ? { category: decodeURIComponent(m[1]), id: decodeURIComponent(m[2]) } : null;
}

export function projectHref(category, id) {
  return `#/work/${encodeURIComponent(category)}/${encodeURIComponent(id)}`;
}

export function useProjectRoute() {
  const [route, setRoute] = useState(() => parse(window.location.hash));

  useEffect(() => {
    const onHash = () => setRoute(parse(window.location.hash));
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const close = useCallback(() => {
    if (window.history.state?.fromSite) {
      window.history.back();
    } else {
      // Opened directly from a shared link — replace instead of leaving the site.
      window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}#works`);
      setRoute(null);
    }
  }, []);

  const open = useCallback((category, id) => {
    window.history.pushState({ fromSite: true }, '', projectHref(category, id));
    setRoute({ category: String(category), id: String(id) });
  }, []);

  return { route, open, close };
}
