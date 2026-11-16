/**
 * CONTACT CONFIGURATION — the only file you need to edit to change
 * your contact details.
 * ------------------------------------------------------------------
 * ⚠️  The values below are PLACEHOLDERS. Replace them before publishing.
 */
export const contact = {
  /** Shown prominently in the Contact section and used for mailto links. */
  email: 'hello@example.com',

  /**
   * WhatsApp number in international format. Spaces, dashes and the "+"
   * are allowed — they are stripped automatically for the wa.me link.
   */
  whatsapp: '+000000000000',

  /** Optional pre-filled WhatsApp message, per language. */
  whatsappMessage: {
    en: "Hello Mozon, I'd like to talk about a project.",
    ar: 'مرحبًا مُزن، أودّ التحدث معكِ بخصوص مشروع.',
  },

  /**
   * Where the contact form sends submissions.
   *
   * Leave EMPTY ('') until you connect a real service. While empty, the
   * form validates input and then tells the visitor plainly that online
   * sending isn't set up yet, offering to open their email app instead.
   * It never pretends a message was sent.
   *
   * Options:
   *   • A form service such as Formspree:   'https://formspree.io/f/xxxxxxx'
   *   • The optional Express API in /server: 'https://your-api.onrender.com/api/contact'
   *
   * You can also set it at build time with VITE_CONTACT_ENDPOINT in `.env`.
   */
  formEndpoint: import.meta.env?.VITE_CONTACT_ENDPOINT || '',

  /**
   * Social profiles. Intentionally empty — add only real accounts.
   * Example: { label: 'Behance', url: 'https://www.behance.net/yourname' }
   */
  socials: [],
};

/** Digits-only WhatsApp number, e.g. "000000000000". */
export const whatsappDigits = contact.whatsapp.replace(/[^\d]/g, '');

/** Build a wa.me link with an optional pre-filled message. */
export function whatsappLink(lang = 'en') {
  const text = contact.whatsappMessage?.[lang] || '';
  return `https://wa.me/${whatsappDigits}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
}
