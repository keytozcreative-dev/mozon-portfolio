/**
 * ENGLISH COPY
 * ------------------------------------------------------------------
 * Inline styling markers (work in both languages):
 *   *word*     → set in the accent serif (italic in English)
 *   ==word==   → highlighted keyword (champagne)
 * Keep the same keys in ar.js.
 */
const en = {
  meta: {
    title: 'Mozon Salaheldin — Full-Stack Developer, Graphic & Brand Designer',
    description:
      'Mozon Salaheldin is a multidisciplinary creative working at the intersection of technology, visual communication and digital experiences.',
  },

  brand: {
    wordmark: 'Mozon',
    fullName: 'Mozon Salaheldin',
    roles: ['Full-Stack Developer', 'Creative Graphic Designer', 'Brand Designer'],
  },

  a11y: {
    skip: 'Skip to content',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    primaryNav: 'Primary',
    languageSwitch: 'Change language',
    backToTop: 'Back to top',
  },

  nav: {
    home: 'Home',
    about: 'About',
    expertise: 'Expertise',
    services: 'Services',
    works: 'Selected Works',
    contact: 'Contact',
    cta: "Let's talk",
    menu: 'Menu',
    close: 'Close',
  },

  language: { en: 'EN', ar: 'ع', enFull: 'English', arFull: 'العربية' },

  loader: { line: 'Portfolio — Vol. 01' },

  hero: {
    kicker: 'Portfolio · Development · Design · Brand',
    lines: ['I build.', 'I *design.*', 'I create.'],
    lead: 'Turning ideas into digital experiences — the way clouds gather and become rain.',
    positioning:
      'A multidisciplinary creative at the intersection of technology, visual communication and digital experiences.',
    ctaPrimary: 'View selected work',
    ctaSecondary: 'Start a project',
    scroll: 'Scroll',
    meta: [
      { label: 'Disciplines', value: 'Development · Design · Brand' },
      { label: 'Services', value: '07' },
      { label: 'Work categories', value: '05' },
      { label: 'Languages', value: 'English / العربية' },
    ],
  },

  about: {
    label: 'About',
    title: 'Where *code* meets *craft.*',
    nameNote: {
      term: 'Muzn · مُزن',
      text: 'In Arabic, the name means rain clouds — the ones that carry rain. Ideas gather; work falls into form.',
    },
    lead:
      "I'm a multidisciplinary creative passionate about building ==meaningful digital experiences== through the intersection of ==technology==, ==design==, and ==creativity==.",
    paragraphs: [
      'As a ==Full-Stack Developer==, ==Creative Graphic Designer==, and ==Brand Designer==, I bring ideas to life by combining technical expertise with a strong visual perspective.',
      'I enjoy transforming complex concepts into functional websites, crafting distinctive visual identities, and creating digital experiences that are both aesthetically engaging and purposeful.',
      "I'm constantly exploring new technologies, refining my creative approach, and challenging myself to turn imagination into reality.",
    ],
    quote:
      'For me, development is more than writing code, and design is more than creating visuals. Both are ways of *solving problems*, *communicating ideas*, and *creating something meaningful.*',
    signature: 'Mozon Salaheldin',
  },

  expertise: {
    label: 'Expertise',
    title: 'Three disciplines, *one* practice.',
    intro:
      'Engineering and image-making are not separate rooms. Each informs the other — structure gives design its logic; design gives code its voice.',
    groups: [
      {
        key: 'dev',
        title: 'Development',
        note: 'Interfaces, APIs and the systems in between.',
        skills: ['HTML', 'CSS', 'JavaScript', 'React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS'],
      },
      {
        key: 'design',
        title: 'Graphic & Brand Design',
        note: 'Identities with a point of view.',
        skills: ['Adobe Illustrator', 'Adobe Photoshop', 'Brand Identity Design', 'Visual Communication'],
      },
      {
        key: 'creative',
        title: 'Creative & Social Media',
        note: 'Stories built for motion and the feed.',
        skills: ['Social Media Design', 'Motion Graphics', 'Creative Direction', 'Social Media Content Design'],
      },
    ],
  },

  services: {
    label: 'Services',
    title: 'What I can *make* for you.',
    intro: 'From a single landing page to a complete identity system — each engagement is shaped around the idea it serves.',
    items: [
      {
        title: 'Website Development',
        description: 'Fast, accessible, maintainable websites — from front-end craft to the back-end that powers it.',
      },
      {
        title: 'Landing Page Development',
        description: 'Focused, persuasive single pages designed to launch, convert and load in an instant.',
      },
      {
        title: 'Brand Identity Design',
        description: 'Logos, typography, colour and guidelines that give a brand a clear, recognisable voice.',
      },
      {
        title: 'Social Media Management & Design',
        description: 'Consistent, on-brand content systems and visuals that keep a presence alive and coherent.',
      },
      {
        title: 'Motion Graphics',
        description: 'Animated identities, explainers and social motion that add rhythm and life to a message.',
      },
      {
        title: 'UI/UX Design',
        description: 'Interfaces grounded in clarity — structure, flows and details that make products feel effortless.',
      },
      {
        title: 'Personal & Business Portfolio Development',
        description: 'Portfolios that present work with intention — for individuals, studios and growing businesses.',
      },
    ],
  },

  works: {
    label: 'Selected Works',
    title: 'Selected *works.*',
    intro: 'Five disciplines, five independent archives. Drag, swipe or simply watch them drift.',
    countOne: 'project',
    countMany: 'projects',
    reserved: 'Reserved frames',
    pause: 'Pause gallery',
    play: 'Play gallery',
    prev: 'Previous',
    next: 'Next',
    drag: 'Drag',
    view: 'View',
    viewProject: 'View project',
    placeholderTitle: 'In the studio',
    placeholderSubtitle: 'Reserved for upcoming work',
    placeholderTag: 'Soon',
    categories: {
      websites: {
        title: 'Websites & *Web Development*',
        description: 'Sites and applications engineered end-to-end — considered interfaces on solid foundations.',
        label: 'Web Development',
      },
      socialMedia: {
        title: 'Social Media *Design*',
        description: 'Content systems and campaign visuals made for the scroll — consistent, sharp, on-brand.',
        label: 'Social Media',
      },
      logos: {
        title: 'Logo *Design*',
        description: 'Marks reduced to their essence — memorable at every size, from favicon to façade.',
        label: 'Logo',
      },
      branding: {
        title: 'Visual Identity & *Branding*',
        description: 'Complete identity systems: typography, colour, rules and the stories that hold them together.',
        label: 'Branding',
      },
      motionGraphics: {
        title: 'Motion *Graphics*',
        description: 'Identities and ideas in movement — timing, rhythm and transitions with intent.',
        label: 'Motion',
      },
    },
  },

  project: {
    back: 'Back to works',
    close: 'Close project',
    visit: 'Visit live project',
    overview: 'Overview',
    challenge: 'Challenge',
    direction: 'Creative direction',
    process: 'Design process',
    tools: 'Tools & technologies',
    outcome: 'Final outcome',
    gallery: 'Project gallery',
    year: 'Year',
    client: 'Client',
    role: 'Role',
    category: 'Category',
    empty: 'The full case study for this project is being prepared.',
    notFound: 'This project could not be found.',
    next: 'Next project',
  },

  contact: {
    label: 'Contact',
    title: "Let's make something *meaningful.*",
    intro: 'Have a project, an idea or a question? Write to me directly, send a WhatsApp message, or use the form.',
    emailLabel: 'Email',
    whatsappLabel: 'WhatsApp',
    emailCta: 'Send an email',
    whatsappCta: 'Message on WhatsApp',
    copy: 'Copy',
    copied: 'Copied',
    form: {
      title: 'Project enquiry',
      name: 'Your name',
      email: 'Email address',
      type: 'What do you need?',
      typePlaceholder: 'Choose a service (optional)',
      typeOther: 'Something else',
      message: 'Tell me about your project',
      submit: 'Send message',
      sending: 'Sending…',
      required: 'Required',
      errors: {
        name: 'Please enter your name (at least 2 characters).',
        email: 'Please enter a valid email address.',
        message: 'Please write a little more — at least 10 characters.',
      },
      success: {
        title: 'Message sent.',
        text: "Thank you — I've received your message and will reply as soon as I can.",
        again: 'Send another message',
      },
      error: {
        title: 'Something went wrong.',
        text: "Your message couldn't be delivered. Please try again, or email me directly.",
      },
      notConfigured: {
        title: 'Online sending isn’t set up yet.',
        text: 'Your message has not been sent. You can open it in your email app instead — everything you wrote will be filled in.',
        cta: 'Open in email app',
      },
    },
  },

  footer: {
    statement: 'Designed & developed with intention.',
    rights: 'All rights reserved.',
    backToTop: 'Back to top',
  },

  skillsTicker: 'Skills',
};

export default en;
