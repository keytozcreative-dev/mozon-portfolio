# Mozon Salaheldin — Portfolio

A bilingual (English / العربية) personal portfolio for **Mozon Salaheldin**:
Full-Stack Developer, Creative Graphic Designer and Brand Designer.

- **Concept: "Muzn" (مُزن).** In Arabic, *muzn* means rain clouds. Ideas gather like clouds, then fall into form. That idea drives the slow aurora, the falling hairlines in the hero and the cloud note in About.
- **Stack:** React 19 + Vite. Plain CSS with design tokens. No animation libraries (motion is CSS plus small `requestAnimationFrame` loops, which keeps it fast).
- **Hosting:** the site is fully static, so it works on GitHub Pages, Netlify, Vercel or Cloudflare Pages. An optional Express API for the contact form lives in `/server`, kept separate.

---

## 1. Quick start

You need **Node.js 20.19 or newer**. Check your version with `node -v`.

```bash
npm install        # install dependencies (first time only)
npm run dev        # start the dev server → http://localhost:5173
npm run build      # production build → ./dist
npm run preview    # preview the production build locally
```

No images, accounts or API keys are needed for the site to run.

---

## 2. Project structure

```
mozon-portfolio/
├─ index.html                  ← SEO, Open Graph, fonts, favicon
├─ public/
│  ├─ favicon.svg, favicon-32.png, apple-touch-icon.png, og-image.png
│  └─ images/projects/         ← YOUR PROJECT IMAGES GO HERE
│     ├─ websites/  social-media/  logos/  branding/  motion-graphics/
├─ src/
│  ├─ config/
│  │  ├─ contact.js            ← email, WhatsApp, form endpoint, socials
│  │  └─ site.js               ← default language, gallery speed, loader…
│  ├─ data/
│  │  ├─ projects.js           ← YOUR PROJECTS (one array per category)
│  │  └─ categories.js         ← gallery order, card shape, drift direction
│  ├─ i18n/
│  │  ├─ en.js                 ← all English text
│  │  └─ ar.js                 ← all Arabic text
│  ├─ styles/
│  │  ├─ tokens.css            ← COLOURS, fonts, sizes, spacing, motion
│  │  ├─ base.css              ← reset, layout, buttons, labels
│  │  └─ motion.css            ← scroll reveals (reduced-motion aware)
│  ├─ components/              ← one folder per section (JSX + CSS)
│  ├─ context/LanguageContext.jsx  ← language state, RTL/LTR, persistence
│  ├─ hooks/  services/  utils/
│  └─ main.jsx, App.jsx
├─ server/                     ← OPTIONAL contact API (Express)
└─ .github/workflows/deploy.yml ← automatic GitHub Pages deployment
```

---

## 3. Adding, replacing and removing projects

**You never need to edit a component.** All work lives in `src/data/projects.js`.

### Add a project

1. **Put the image in the right folder**, for example
   `public/images/projects/logos/north-mark.jpg`
2. **Add an entry to the matching array** in `src/data/projects.js`:
   ```js
   logos: [
     {
       id: 'north-mark',
       title: { en: 'North Mark', ar: 'علامة الشمال' },
       subtitle: { en: 'Logo for a coffee roastery', ar: 'شعار لمحمصة قهوة' },
       image: '/images/projects/logos/north-mark.jpg',
     },
   ],
   ```
3. **Set the image path** starting from `/images/...`. Don't include `public`.
4. **Save.** The gallery updates on its own.

| Category   | Array            | Folder             | Card shape |
| ---------- | ---------------- | ------------------ | ---------- |
| Websites   | `websites`       | `websites/`        | 16 : 10    |
| Social     | `socialMedia`    | `social-media/`    | 4 : 5      |
| Logos      | `logos`          | `logos/`           | 1 : 1      |
| Branding   | `branding`       | `branding/`        | 4 : 3      |
| Motion     | `motionGraphics` | `motion-graphics/` | 16 : 9     |

Good to know:

- Any text field can be a plain string (`'North Mark'`) or bilingual (`{ en: '…', ar: '…' }`).
- `id` must be unique within its array. It is used in the project's link (`#/work/logos/north-mark`).
- **Optional fields:** `category`, `alt`, `link`, `year`, `client`, `role`, `srcSet` (responsive images) and `video` (an `.mp4` that plays muted on hover, which suits motion work). The `details` field holds the case study: `overview`, `challenge`, `direction`, `process`, `tools`, `outcome` and `gallery`. A full commented example is at the top of `projects.js`.
- **Empty arrays** show designed "reserved" frames. **One or two projects** sit in a calm, aligned row. **Enough to fill the screen** makes the row drift on its own; it can be dragged, swiped or paused.
- **A wrong image path won't break anything.** The card shows its frame art instead of a broken image.

### Replace an image

Either overwrite the file and keep the same name, or point `image` to the new file.

### Remove a project

Delete its `{ … }` entry from the array.

### Project pages

Clicking a project opens a case-study page at `#/work/<category>/<id>`. The page shows only the fields you've filled in. If there are no `details` yet, it says the case study is being prepared.

---

## 4. Editing text and translations

All visible text is in **`src/i18n/en.js`** and **`src/i18n/ar.js`**. Both files have the same structure, so edit the same key in each.

Two small inline markers work in both languages:

| Marker      | Result                                                             |
| ----------- | ------------------------------------------------------------------ |
| `*text*`    | accent serif: Instrument Serif *italic* (EN) / Amiri (AR)         |
| `==text==`  | highlighted keyword (champagne)                                    |

Example: `title: 'Selected *works.*'`

How the language system behaves:

- English is the default. You can change this in `src/config/site.js`.
- The visitor's choice is saved in `localStorage` and restored on their next visit, before the first paint, so the page never flashes the wrong direction.
- Switching sets `<html lang dir>`, swaps the font system, updates the page title and description, and fades through a short veil so the RTL ⇄ LTR re-layout is never visible.
- **Arabic is designed in its own right, not mirrored.** It has its own fonts (Noto Kufi Arabic, Amiri and IBM Plex Sans Arabic), more generous line heights, no letter-spacing (which would break letter joins), a different hero composition, Arabic-Indic numerals, and word-level reveals (never letter-level).

---

## 5. Changing contact details

Edit **`src/config/contact.js`**. It is the only place they live.

```js
email: 'hello@example.com',      // ← your email
whatsapp: '+000000000000',       // ← your WhatsApp number, international format
socials: [],                     // ← add real profiles only: { label: 'Behance', url: '…' }
```

### The contact form

The form validates input and **never pretends to send**. While `formEndpoint` is empty, a submitted message gets an honest notice ("Online sending isn't set up yet") and a button that opens the visitor's email app with their message already filled in.

To make the form send messages, choose **one** of these:

- **A form service (simplest, free tier).** Create a form at a service such as [Formspree](https://formspree.io), then set
  `formEndpoint: 'https://formspree.io/f/xxxxxxx'` in `contact.js`
  (or `VITE_CONTACT_ENDPOINT=…` in a `.env` file).
- **The bundled Express API.** See section 9.

All network code lives in `src/services/contactService.js`, so you can swap providers without touching the form.

---

## 6. Customising colours, type and motion

Everything is in **`src/styles/tokens.css`**:

```css
--c-obsidian:  #08080a;   /* background            */
--c-charcoal:  #16161a;   /* cards & panels        */
--c-paper:     #ece6da;   /* warm off-white text   */
--c-silver:    #a3a3a8;   /* secondary text        */
--c-champagne: #cdb68b;   /* soft metallic accent  */
--c-accent:    #ff5a36;   /* "Desert Ember" accent */
```

- **Fonts:** change the `--ff-*` variables, and the Google Fonts `<link>` in `index.html` if you pick new families.
- **Type scale:** `--fs-*`. Arabic overrides are in the `:root[lang='ar']` block.
- **Motion:** `--ease-*` and `--dur-*`.
- **Gallery speed, placeholder count, loader and custom cursor:** `src/config/site.js`.
- **Gallery order, card shapes and drift directions:** `src/data/categories.js`.

---

## 7. Deploying for free: GitHub Pages (recommended)

The build uses relative paths and hash links, so it works at `https://<user>.github.io/<repo>/` with no extra setup.

1. Create a new repository on GitHub, then push the project:
   ```bash
   git init
   git add .
   git commit -m "Portfolio"
   git branch -M main
   git remote add origin https://github.com/<user>/<repo>.git
   git push -u origin main
   ```
2. On GitHub, go to **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**.
3. The included workflow (`.github/workflows/deploy.yml`) builds and publishes the site on every push to `main`. The live URL appears in the **Actions** tab.

Tip: after your first `npm install`, commit the generated `package-lock.json` so builds are reproducible.

**Optional:** to connect the contact form on GitHub Pages, add a repository variable `VITE_CONTACT_ENDPOINT` under **Settings → Secrets and variables → Actions → Variables**.

### Other free hosts

The settings are the same for each: build command `npm run build`, output folder `dist`.

- **Netlify:** "Add new site → Import from Git".
- **Vercel:** "Add New → Project", framework preset **Vite**.
- **Cloudflare Pages:** "Create → Pages → Connect to Git", framework preset **Vite**.

After deploying, open `index.html` and change `og:image` / `twitter:image` to the absolute URL of `og-image.png`. That way link previews work on every social platform.

---

## 8. Production checklist

- [ ] Replace `hello@example.com` and `+000000000000` in `src/config/contact.js`
- [ ] Add your projects and images (section 3)
- [ ] Connect the contact form (section 5), or leave the honest mailto fallback
- [ ] Set absolute `og:image` URLs in `index.html` after deploying
- [ ] Optional: add real social profiles to `contact.socials`

---

## 9. Optional: the Express contact API (`/server`)

Use this only if you want your own backend instead of a form service. It is fully separate: the website never needs it to run.

```bash
cd server
npm install
cp .env.example .env     # set ALLOWED_ORIGINS to your site's URL
npm run dev              # → http://localhost:8787/api/health
```

- `POST /api/contact` validates input, applies a small rate limit and a honeypot, then calls `deliver()`.
- **Connect your email provider inside `deliver()`** in `server/index.js`. Read keys from environment variables and never commit them. Until you do, the API answers `503`, and the site shows its honest "not set up yet" notice.
- **Free hosting for the API:** [Render](https://render.com) (Web Service: root directory `server`, build `npm install`, start `npm start`), or Railway, Fly.io or Koyeb. Then set
  `formEndpoint` / `VITE_CONTACT_ENDPOINT` to `https://<your-api>/api/contact`
  and add your site's URL to `ALLOWED_ORIGINS`.

No secrets, keys or `.env` files are included in this project, and `.gitignore` keeps them out of Git.

---

## 10. Accessibility and performance notes

- **Structure:** semantic landmarks, a skip link, one `h1`, an ordered heading hierarchy, labelled controls and visible focus rings.
- **Keyboard:** the mobile menu and project pages trap focus and close with `Esc`. Galleries scroll with the arrow keys.
- **Reduced motion:** `prefers-reduced-motion` turns off the loader, the custom cursor, the gallery drift, the parallax and the reveals; content is simply shown.
- **Galleries pause** on hover, focus or touch, when off-screen, when the tab is hidden, or with their pause button.
- **Performance:** images are lazy-loaded with async decoding, and `srcSet` is supported. Animations use only `transform` and `opacity`. Arabic fonts download only when Arabic text is shown (Google Fonts unicode-range).
- **Contrast:** text colours are tuned for WCAG AA contrast on the dark background.
