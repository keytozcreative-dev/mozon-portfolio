import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext.jsx';
import { useActiveSection } from '../../hooks/useActiveSection.js';
import { pad } from '../../utils/helpers.js';
import LanguageSwitcher from './LanguageSwitcher.jsx';
import Icon from '../Icon.jsx';
import { contact } from '../../config/contact.js';
import './Navigation.css';

const ITEMS = ['home', 'about', 'expertise', 'services', 'works', 'contact'];

export default function Navigation() {
  const { t, lang } = useLanguage();
  const active = useActiveSection(ITEMS);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const menuRef = useRef(null);
  const toggleRef = useRef(null);

  // Glass background once scrolled; hide on scroll-down, reveal on scroll-up.
  useEffect(() => {
    let last = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 24);
        setHidden(y > 480 && y > last + 4);
        if (y < last - 4) setHidden(false);
        last = y;
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Mobile menu: lock scroll, Esc to close, keep focus inside.
  useEffect(() => {
    if (!open) return undefined;
    document.body.classList.add('is-locked');
    const first = menuRef.current?.querySelector('a, button');
    first?.focus();

    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (e.key === 'Tab' && menuRef.current) {
        const f = [...menuRef.current.querySelectorAll('a, button'), toggleRef.current].filter(Boolean);
        const i = f.indexOf(document.activeElement);
        if (e.shiftKey && i <= 0) {
          e.preventDefault();
          f[f.length - 1].focus();
        } else if (!e.shiftKey && i === f.length - 1) {
          e.preventDefault();
          f[0].focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.classList.remove('is-locked');
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  // Close the menu if the viewport grows to desktop.
  useEffect(() => {
    const mql = window.matchMedia('(min-width: 1100px)');
    const onChange = () => mql.matches && setOpen(false);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  const label = (id) => t.nav[id];

  return (
    <header
      className={`nav${scrolled ? ' is-scrolled' : ''}${hidden && !open ? ' is-hidden' : ''}${open ? ' is-open' : ''}`}
    >
      <div className="nav__bar container">
        <a href="#home" className="nav__brand" aria-label={t.brand.fullName} onClick={() => setOpen(false)}>
          <span className="nav__word">{t.brand.wordmark}</span>
          <span className="nav__dot" aria-hidden="true" />
        </a>

        <nav className="nav__links" aria-label={t.a11y.primaryNav}>
          <ul>
            {ITEMS.slice(1).map((id) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={`nav__link${active === id ? ' is-active' : ''}`}
                  aria-current={active === id ? 'location' : undefined}
                >
                  {label(id)}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav__actions">
          <LanguageSwitcher />
          <a href="#contact" className="btn btn--solid nav__cta">
            {t.nav.cta}
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="nav__toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.a11y.closeMenu : t.a11y.openMenu}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="nav__toggle-text">{open ? t.nav.close : t.nav.menu}</span>
            <span className="nav__burger" aria-hidden="true">
              <span />
              <span />
            </span>
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        ref={menuRef}
        className="menu"
        inert={!open}
        aria-hidden={!open}
        aria-label={t.a11y.primaryNav}
        role="dialog"
        aria-modal="true"
      >
        <div className="menu__inner container">
          <ul className="menu__list">
            {ITEMS.map((id, i) => (
              <li key={id} style={{ '--d': i * 60 }}>
                <a href={`#${id}`} className={`menu__link${active === id ? ' is-active' : ''}`} onClick={() => setOpen(false)}>
                  <span className="menu__num">{pad(i + 1, lang)}</span>
                  <span className="menu__text">{label(id)}</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="menu__foot">
            <LanguageSwitcher className="lang-switch--lg" />
            <a href={`mailto:${contact.email}`} className="menu__mail link-line">
              {contact.email}
            </a>
            <a href="#contact" className="btn btn--solid" onClick={() => setOpen(false)}>
              {t.nav.cta}
              <Icon name="arrow" className="btn__icon btn__icon--dir" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
