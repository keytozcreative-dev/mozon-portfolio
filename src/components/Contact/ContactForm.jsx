import { useEffect, useId, useRef, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext.jsx';
import {
  ContactNotConfiguredError,
  buildMailto,
  sendContactMessage,
} from '../../services/contactService.js';
import Icon from '../Icon.jsx';

const EMPTY = { name: '', email: '', type: '', message: '', website: '' };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(v, msgs) {
  const e = {};
  if (v.name.trim().length < 2) e.name = msgs.name;
  if (!EMAIL_RE.test(v.email.trim())) e.email = msgs.email;
  if (v.message.trim().length < 10) e.message = msgs.message;
  return e;
}

/**
 * Validated enquiry form with honest states:
 *   idle → sending → success | error | notConfigured
 * It never claims success unless the configured endpoint accepted the
 * message. Clicking a service row pre-selects it here.
 */
export default function ContactForm() {
  const { t, lang } = useLanguage();
  const f = t.contact.form;
  const services = t.services.items.map((s) => s.title);
  const uid = useId();
  const formRef = useRef(null);

  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle');

  // Pre-select a service when a Services row is clicked.
  useEffect(() => {
    const onPrefill = (e) => {
      const i = e.detail?.service;
      if (typeof i === 'number') setValues((v) => ({ ...v, type: String(i) }));
    };
    window.addEventListener('contact:prefill', onPrefill);
    return () => window.removeEventListener('contact:prefill', onPrefill);
  }, []);

  // Re-validate in the new language so messages stay translated.
  useEffect(() => {
    setErrors((prev) => (Object.keys(prev).length ? validate(values, f.errors) : prev));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  const typeLabel = (v) => (v === 'other' ? f.typeOther : services[Number(v)] || '');

  const onChange = (e) => {
    const { name, value } = e.target;
    const next = { ...values, [name]: value };
    setValues(next);
    if (touched[name]) setErrors(validate(next, f.errors));
    if (status === 'error' || status === 'notConfigured') setStatus('idle');
  };

  const onBlur = (e) => {
    const { name } = e.target;
    setTouched((tch) => ({ ...tch, [name]: true }));
    setErrors(validate(values, f.errors));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (values.website) return; // honeypot: silently ignore bots
    const errs = validate(values, f.errors);
    setErrors(errs);
    setTouched({ name: true, email: true, message: true });
    if (Object.keys(errs).length) {
      const first = ['name', 'email', 'message'].find((k) => errs[k]);
      formRef.current?.querySelector(`[name="${first}"]`)?.focus();
      return;
    }

    setStatus('sending');
    try {
      await sendContactMessage({
        name: values.name.trim(),
        email: values.email.trim(),
        service: typeLabel(values.type),
        message: values.message.trim(),
        language: lang,
      });
      setStatus('success');
      setValues(EMPTY);
      setTouched({});
    } catch (err) {
      setStatus(err instanceof ContactNotConfiguredError ? 'notConfigured' : 'error');
    }
  };

  const field = (name) => ({
    id: `${uid}-${name}`,
    name,
    value: values[name],
    onChange,
    onBlur,
    'aria-invalid': touched[name] && errors[name] ? 'true' : 'false',
    'aria-describedby': touched[name] && errors[name] ? `${uid}-${name}-err` : undefined,
  });

  const errorText = (name) =>
    touched[name] && errors[name] ? (
      <p id={`${uid}-${name}-err`} className="field__error">
        {errors[name]}
      </p>
    ) : null;

  if (status === 'success') {
    return (
      <div className="form-state form-state--success" role="status" aria-live="polite">
        <span className="form-state__icon">
          <Icon name="check" />
        </span>
        <h3 className="form-state__title">{f.success.title}</h3>
        <p>{f.success.text}</p>
        <button type="button" className="btn" onClick={() => setStatus('idle')}>
          {f.success.again}
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} className="form" onSubmit={onSubmit} noValidate aria-describedby={`${uid}-status`}>
      <h3 className="form__title">{f.title}</h3>

      <div className="form__row">
        <div className={`field${values.name ? ' has-value' : ''}`}>
          <input type="text" autoComplete="name" required {...field('name')} placeholder=" " />
          <label htmlFor={`${uid}-name`}>
            {f.name} <span aria-hidden="true">*</span>
          </label>
          {errorText('name')}
        </div>
        <div className={`field${values.email ? ' has-value' : ''}`}>
          <input type="email" autoComplete="email" inputMode="email" dir="ltr" required {...field('email')} placeholder=" " />
          <label htmlFor={`${uid}-email`}>
            {f.email} <span aria-hidden="true">*</span>
          </label>
          {errorText('email')}
        </div>
      </div>

      <div className="field field--select has-value">
        <select {...field('type')}>
          <option value="">{f.typePlaceholder}</option>
          {services.map((s, i) => (
            <option key={i} value={String(i)}>
              {s}
            </option>
          ))}
          <option value="other">{f.typeOther}</option>
        </select>
        <label htmlFor={`${uid}-type`}>{f.type}</label>
        <Icon name="arrowDown" className="field__chevron" />
      </div>

      <div className={`field${values.message ? ' has-value' : ''}`}>
        <textarea rows={5} required {...field('message')} placeholder=" " />
        <label htmlFor={`${uid}-message`}>
          {f.message} <span aria-hidden="true">*</span>
        </label>
        {errorText('message')}
      </div>

      {/* Honeypot — hidden from people, tempting for bots */}
      <div className="form__hp" aria-hidden="true">
        <label htmlFor={`${uid}-website`}>Website</label>
        <input id={`${uid}-website`} name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={onChange} />
      </div>

      <div id={`${uid}-status`} aria-live="polite">
        {status === 'error' && (
          <div className="form-note form-note--error" role="alert">
            <strong>{f.error.title}</strong> {f.error.text}
          </div>
        )}
        {status === 'notConfigured' && (
          <div className="form-note form-note--info" role="alert">
            <strong>{f.notConfigured.title}</strong>
            <span>{f.notConfigured.text}</span>
            <a
              className="btn btn--solid form-note__cta"
              href={buildMailto({ ...values, type: typeLabel(values.type) }, f.title)}
            >
              <Icon name="mail" className="btn__icon" />
              {f.notConfigured.cta}
            </a>
          </div>
        )}
      </div>

      <div className="form__foot">
        <span className="form__req">* {f.required}</span>
        <button type="submit" className="btn btn--solid form__submit" disabled={status === 'sending'}>
          {status === 'sending' ? f.sending : f.submit}
          <Icon name="arrow" className="btn__icon btn__icon--dir" />
        </button>
      </div>
    </form>
  );
}
