/**
 * Gallery categories — order, layout and motion for each Selected Works
 * row. Headings and descriptions are translated in src/i18n/*.js under
 * `works.categories.<key>`.
 *
 *  key        must match a key in src/data/projects.js
 *  folder     image folder inside public/images/projects/
 *  ratio      card aspect ratio (width / height)
 *  width      card width (CSS clamp) — tuned per format
 *  direction  1 = drifts toward the reading end, -1 = the opposite way
 */
export const categories = [
  { key: 'websites',       folder: 'websites',        ratio: '16 / 10', width: 'clamp(280px, 38vw, 560px)', direction: 1 },
  { key: 'socialMedia',    folder: 'social-media',    ratio: '4 / 5',   width: 'clamp(220px, 22vw, 340px)', direction: -1 },
  { key: 'logos',          folder: 'logos',           ratio: '1 / 1',   width: 'clamp(220px, 24vw, 360px)', direction: 1 },
  { key: 'branding',       folder: 'branding',        ratio: '4 / 3',   width: 'clamp(260px, 32vw, 480px)', direction: -1 },
  { key: 'motionGraphics', folder: 'motion-graphics', ratio: '16 / 9',  width: 'clamp(280px, 36vw, 540px)', direction: 1 },
];
