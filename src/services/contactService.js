import { contact } from '../config/contact.js';

/**
 * CONTACT FORM INTEGRATION POINT
 * ------------------------------------------------------------------
 * `sendContactMessage` is the single place the form talks to the
 * outside world. It POSTs JSON to `contact.formEndpoint`
 * (src/config/contact.js or VITE_CONTACT_ENDPOINT).
 *
 * Works out of the box with:
 *   • Formspree / Getform / Basin-style endpoints that accept JSON
 *   • the optional Express API in /server  (POST /api/contact)
 *
 * To use another provider (EmailJS, Resend via a serverless function, …)
 * replace the body of `sendContactMessage` — the form component does
 * not need to change. Throw `ContactNotConfiguredError` when no service
 * exists, and any other Error for delivery failures.
 */

export class ContactNotConfiguredError extends Error {
  constructor() {
    super('Contact form endpoint is not configured.');
    this.name = 'ContactNotConfiguredError';
  }
}

export const isContactConfigured = () => Boolean(contact.formEndpoint);

export async function sendContactMessage(payload, { timeoutMs = 15000 } = {}) {
  if (!isContactConfigured()) throw new ContactNotConfiguredError();

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(contact.formEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    if (res.status === 503) throw new ContactNotConfiguredError(); // API exists, delivery not set up
    if (!res.ok) {
      let detail = '';
      try {
        detail = (await res.json())?.error || '';
      } catch {
        /* non-JSON error body */
      }
      throw new Error(detail || `Request failed with status ${res.status}`);
    }
    return true;
  } finally {
    clearTimeout(timer);
  }
}

/** mailto: fallback with the visitor's message pre-filled. */
export function buildMailto({ name, email, type, message }, subjectPrefix = 'Project enquiry') {
  const subject = `${subjectPrefix}${type ? ` — ${type}` : ''}${name ? ` — ${name}` : ''}`;
  const body = `${message}\n\n— ${name}${email ? ` (${email})` : ''}`;
  return `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
