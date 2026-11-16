import { useLanguage } from './context/LanguageContext.jsx';
import { useProjectRoute } from './hooks/useHashRoute.js';
import { site } from './config/site.js';

import Loader from './components/Loader/Loader.jsx';
import Cursor from './components/Cursor/Cursor.jsx';
import Navigation from './components/Navigation/Navigation.jsx';
import Hero from './components/Hero/Hero.jsx';
import About from './components/About/About.jsx';
import Expertise from './components/Expertise/Expertise.jsx';
import Services from './components/Services/Services.jsx';
import Works from './components/Works/Works.jsx';
import ProjectDetail from './components/ProjectDetail/ProjectDetail.jsx';
import Contact from './components/Contact/Contact.jsx';
import Footer from './components/Footer/Footer.jsx';

export default function App() {
  const { t, switching } = useLanguage();
  const { route, open, close } = useProjectRoute();

  return (
    <>
      <a className="skip-link" href="#main">
        {t.a11y.skip}
      </a>

      {site.showLoader && <Loader />}
      {site.customCursor && <Cursor />}
      <div className="grain" aria-hidden="true" />
      <div className={`lang-veil${switching ? ' is-active' : ''}`} aria-hidden="true" />

      <Navigation />

      <main id="main" tabIndex={-1}>
        <Hero />
        <About />
        <Expertise />
        <Services />
        <Works onOpenProject={open} />
        <Contact />
      </main>

      <Footer />

      {route && <ProjectDetail route={route} onClose={close} onNavigate={open} />}
    </>
  );
}
