import en from './en.js';
import ar from './ar.js';

/**
 * Registered languages. To add another language, create a file like
 * `fr.js` with the same keys and register it here.
 */
export const translations = { en, ar };

export const languages = {
  en: { code: 'en', dir: 'ltr', label: 'EN', name: 'English', ogLocale: 'en_GB' },
  ar: { code: 'ar', dir: 'rtl', label: 'ع', name: 'العربية', ogLocale: 'ar_AR' },
};
