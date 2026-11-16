/**
 * SITE CONFIGURATION
 * ------------------------------------------------------------------
 * General, non-translated settings. Text that appears on the page
 * lives in `src/i18n/en.js` and `src/i18n/ar.js`.
 */
export const site = {
  /** Default language on a visitor's first visit: 'en' | 'ar' */
  defaultLanguage: 'en',

  /** localStorage key used to remember the visitor's language. */
  languageStorageKey: 'mozon.lang',

  /** Show the short intro animation once per browser session. */
  showLoader: true,

  /** Auto-scroll speed of the work galleries, in pixels per second. */
  gallerySpeed: 38,

  /**
   * How many "reserved" placeholder frames a gallery shows while its
   * project array in `src/data/projects.js` is empty.
   */
  placeholderCount: 5,

  /** Custom cursor on mouse/trackpad devices (always off on touch). */
  customCursor: true,
};
