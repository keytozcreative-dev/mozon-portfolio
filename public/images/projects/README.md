# Project images

Put each image in the folder for its category:

| Folder             | Array in `src/data/projects.js` | Card shape            | Suggested export        |
| ------------------ | ------------------------------- | --------------------- | ----------------------- |
| `websites/`        | `websites`                      | 16 : 10 (landscape)   | 1600 × 1000 px          |
| `social-media/`    | `socialMedia`                   | 4 : 5 (portrait)      | 1080 × 1350 px          |
| `logos/`           | `logos`                         | 1 : 1 (square)        | 1200 × 1200 px          |
| `branding/`        | `branding`                      | 4 : 3                 | 1600 × 1200 px          |
| `motion-graphics/` | `motionGraphics`                | 16 : 9 (+ optional mp4) | 1600 × 900 px         |

Then reference it in `src/data/projects.js` **starting from `/images/...`**
(leave out `public`):

```js
image: '/images/projects/logos/atlas-mark.jpg',
```

Tips

- Use `.jpg` or `.webp`, ideally under ~400 KB each. Images are lazy-loaded.
- Use lowercase file names without spaces: `brand-atlas-01.jpg`.
- Images are cropped to the card shape with `object-fit: cover` — keep the
  important part of the image near the centre.
- A wrong path never breaks the page: the card shows its frame art instead.
