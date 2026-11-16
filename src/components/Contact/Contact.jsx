import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext.jsx';
import { useReveal } from '../../hooks/useReveal.js';
import { contact, whatsappLink } from '../../config/contact.js';
import { pad } from '../../utils/helpers.js';
import RichText from '../RichText.jsx';
import Icon from '../Icon.jsx';
import { Aurora } from '../Hero/Atmosphere.jsx';
import ContactForm from './ContactForm.jsx';
import './Contact.css';

export default function Contact() {
  const { t, lang } = useLanguage();
  const c = t.contact;
  const ref = useReveal();
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${contact.email}`;
    }
  };

  return (
    <section id="contact" ref={ref} className="section contact" aria-labelledby="contact-title">
      <Aurora className="aurora--contact" />

      <div className="container contact__inner">
        <p className="label" data-reveal>
          <span className="label__index">({pad(5, lang)})</span>
          <span aria-hidden="true">—</span>
          {c.label}
        </p>

        <h2 id="contact-title" className="contact__title display" data-reveal="mask">
          <span className="mask-inner">
            <RichText text={c.title} />
          </span>
        </h2>

        <div className="contact__grid">
          <div className="contact__direct">
            <p className="contact__intro" data-reveal>
              {c.intro}
            </p>

            <div className="contact__channel" data-reveal style={{ '--d': 100 }}>
              <span className="label">{c.emailLabel}</span>
              <div className="contact__email-row">
                <a className="contact__email" href={`mailto:${contact.email}`} dir="ltr">
                  {contact.email}
                </a>
                <button
                  type="button"
                  className="icon-btn"
                  onClick={copy}
                  aria-label={copied ? c.copied : c.copy}
                  title={copied ? c.copied : c.copy}
                >
                  <Icon name={copied ? 'check' : 'copy'} />
                </button>
                <span className="sr-only" role="status" aria-live="polite">
                  {copied ? c.copied : ''}
                </span>
              </div>
            </div>

            <div className="contact__channel" data-reveal style={{ '--d': 180 }}>
              <span className="label">{c.whatsappLabel}</span>
              <a className="contact__phone link-line" href={whatsappLink(lang)} target="_blank" rel="noopener noreferrer" dir="ltr">
                {contact.whatsapp}
              </a>
            </div>

            <div className="contact__ctas" data-reveal style={{ '--d': 260 }}>
              <a href={`mailto:${contact.email}`} className="btn btn--solid">
                <Icon name="mail" className="btn__icon" />
                {c.emailCta}
              </a>
              <a href={whatsappLink(lang)} className="btn" target="_blank" rel="noopener noreferrer">
                <Icon name="chat" className="btn__icon" />
                {c.whatsappCta}
              </a>
            </div>

            {contact.socials?.length > 0 && (
              <ul className="contact__socials" data-reveal>
                {contact.socials.map((s) => (
                  <li key={s.url}>
                    <a href={s.url} target="_blank" rel="noopener noreferrer" className="link-line">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="contact__form-wrap" data-reveal style={{ '--d': 200 }}>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
