import { useLanguage } from '../../context/LanguageContext.jsx';
import { contact } from '../../config/contact.js';
import { toArabicDigits } from '../../utils/helpers.js';
import Icon from '../Icon.jsx';
import './Footer.css';

const LINKS = ['about', 'expertise', 'services', 'works', 'contact'];

export default function Footer() {
  const { t, lang } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <p className="footer__statement">{t.footer.statement}</p>
          <nav aria-label={t.a11y.primaryNav} className="footer__nav">
            <ul>
              {LINKS.map((id) => (
                <li key={id}>
                  <a href={`#${id}`} className="link-line">
                    {t.nav[id]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <a href={`mailto:${contact.email}`} className="footer__mail link-line" dir="ltr">
            {contact.email}
          </a>
        </div>

        <p className="footer__mark" aria-hidden="true">
          <span>{t.brand.wordmark}</span>
          <span className="footer__mark-dot" />
        </p>

        <div className="footer__bottom">
          <p>
            © {lang === 'ar' ? toArabicDigits(year) : year} {t.brand.fullName}. {t.footer.rights}
          </p>
          <a href="#home" className="footer__top-link">
            {t.footer.backToTop}
            <span className="icon-btn" aria-hidden="true">
              <Icon name="arrowUp" />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
