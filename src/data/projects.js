/**
 * ==================================================================
 *  PROJECT DATA — the only file you edit to add / replace / remove work
 * ==================================================================
 *
 *  HOW TO ADD A PROJECT
 *  1. Put the image in the matching folder:
 *        public/images/projects/websites/
 *        public/images/projects/social-media/
 *        public/images/projects/logos/
 *        public/images/projects/branding/
 *        public/images/projects/motion-graphics/
 *  2. Add an object to the matching array below.
 *  3. Set `image` to the path *starting at /images/...* (no "public").
 *  4. Save. The gallery updates itself — no component changes needed.
 *
 *  REMOVE a project: delete its object. REPLACE an image: overwrite the
 *  file with the same name, or point `image` to the new file.
 *
 *  ── Fields ──────────────────────────────────────────────────────
 *  Required:
 *    id        unique within its array (number or string) — used in the URL
 *    title     'Text'  or  { en: 'Text', ar: 'نص' }
 *  Recommended:
 *    subtitle  short supporting line (string or { en, ar })
 *    image     '/images/projects/websites/project-01.jpg'
 *  Optional:
 *    category  label shown on the card (string or { en, ar })
 *    alt       image description for screen readers (string or { en, ar })
 *    srcSet    responsive images, e.g.
 *              '/images/projects/websites/p1-800.jpg 800w, /images/projects/websites/p1-1600.jpg 1600w'
 *    video     '/images/projects/motion-graphics/reel.mp4' — plays muted
 *              on hover (uses `image` as poster). Great for motion work.
 *    link      external live URL ('' to hide)
 *    year, client, role               (string or { en, ar })
 *    details   case-study content shown on the project page:
 *      {
 *        overview:  string | { en, ar },
 *        challenge: string | { en, ar },
 *        direction: string | { en, ar },   // creative direction
 *        process:   string | { en, ar },
 *        tools:     ['Figma', 'React', 'Illustrator'],
 *        outcome:   string | { en, ar },
 *        gallery:   ['/images/projects/websites/p1-a.jpg', ...],
 *      }
 *
 *  ── Example (copy into an array and edit) ────────────────────────
 *  {
 *    id: 1,
 *    title: { en: 'Project Title', ar: 'عنوان المشروع' },
 *    subtitle: { en: 'A short project description', ar: 'وصف قصير للمشروع' },
 *    image: '/images/projects/websites/project-01.jpg',
 *    category: { en: 'Web Development', ar: 'تطوير الويب' },
 *    link: '',
 *    year: '2026',
 *    details: {
 *      overview: { en: '...', ar: '...' },
 *      tools: ['React', 'Node.js'],
 *    },
 *  },
 *
 *  Empty arrays are fine — the gallery shows elegant "reserved" frames.
 *  One or two projects are fine too — the gallery adapts.
 * ==================================================================
 */
export const projects = {
  websites: [
     { id: 1, title: 'website 1', image: '/images/projects/websites/1.jpg' },
     { id: 2, title: 'website 2', image: '/images/projects/websites/2.jpg' },
     { id: 3, title: 'website 3', image: '/images/projects/websites/3.jpg' },


  ],
  socialMedia: [
     { id: 1, title: 'social media 1', image: '/images/projects/social-media/1.jpg' },
     { id: 2, title: 'social media 2', image: '/images/projects/social-media/2.jpg' },
     { id: 3, title: 'social media 3', image: '/images/projects/social-media/3.jpg' },
  ],
  logos: [
     { id: 1, title: 'Logo 1', image: '/images/projects/logos/1.jpg' },
     { id: 2, title: 'Logo 2', image: '/images/projects/logos/2.jpg' },
     { id: 3, title: 'Logo 3', image: '/images/projects/logos/3.jpg' },

  ],
  branding: [
     { id: 1, title: 'identity 1', image: '/images/projects/branding/1.jpg' },
     { id: 2, title: 'identity 2', image: '/images/projects/branding/2.jpg' },
     { id: 3, title: 'identity 3', image: '/images/projects/branding/3.jpg' },

  ],
  motionGraphics: [
     {
    id: 1,
    title: 'Motion 1',
    video: '/images/projects/motion-graphics/1.mp4',
  },
  {
    id: 2,
    title: 'Motion 2',
    video: '/images/projects/motion-graphics/2.mp4',
  },
  {
    id: 3,
    title: 'Motion 3',
    video: '/images/projects/motion-graphics/3.mp4',
  },
  {
    id: 4,
    title: 'Motion 4',
    video: '/images/projects/motion-graphics/4.mp4',
  },





  ],
};
