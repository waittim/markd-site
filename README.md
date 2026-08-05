# Mark'd Website

Marketing site for Mark'd — a private life library for iOS. Static HTML/CSS/JS, served via GitHub Pages at [mark-d.com](https://mark-d.com).

## Features

- Light / dark theme with system preference and manual override
- English, Simplified Chinese, and Traditional Chinese (`en` / `zh` / `zh-TW`)
- Responsive layout for mobile and desktop
- Shared navbar / footer components
- Single deferred JS bundle for page load
- No framework; vanilla HTML, CSS, and JavaScript

## Project Structure

```
markd-site/
├── index.html                 # Landing page
├── about.html                 # About page
├── privacy.html               # Privacy policy
├── CNAME                      # Custom domain (mark-d.com)
├── PRODUCT.md                 # Product brief
├── DESIGN.md                  # Design notes
├── start-server.sh            # Local Python HTTP server helper
├── start-server.command       # macOS double-click launcher
├── scripts/
│   ├── build-js.sh            # Concatenate JS modules into markd.bundle.js
│   └── optimize-images.py     # Generate WebP variants (requires Pillow)
└── assets/
    ├── css/
    │   └── style.css          # All site styles and design tokens
    ├── js/
    │   ├── markd.bundle.js    # Built bundle (loaded by pages; do not edit by hand)
    │   ├── error-handler.js
    │   ├── utils.js
    │   ├── performance.js
    │   ├── lazy-load.js       # Image and background lazy loading
    │   ├── theme.js
    │   ├── i18n.js
    │   ├── translations.js
    │   ├── icons.js
    │   ├── main.js
    │   └── components/
    │       ├── config.js
    │       ├── inapp-browser.js
    │       ├── navbar.js
    │       ├── footer.js
    │       └── index.js
    └── images/                     # App icons and screenshots (PNG + WebP)
```

## Design Tokens

Defined in `assets/css/style.css`.

**Light**

| Token | Value |
| --- | --- |
| Primary BG | `#F2F2F7` |
| Secondary BG | `#FFFFFF` |
| Text Primary | `#1D1D1F` |
| Accent | `#2B62D9` |

**Dark**

| Token | Value |
| --- | --- |
| Primary BG | `#0B0B0D` |
| Secondary BG | `#161618` |
| Text Primary | `#F5F5F7` |
| Accent | `#7AA4FF` |

**Typography**

- UI: `-apple-system`, BlinkMacSystemFont, SF Pro Text, Noto Sans SC (loaded when language is Chinese), Segoe UI
- Display headings use system display weight via `.sf-display` (font-weight 700)
- Sizes use responsive `clamp()` where needed

## Pages

### `index.html`

Landing page: hero with phone mockup, features, philosophy, App Store CTA, footer.

### `about.html`

Mission, values, how it works, team, contact (`support@mark-d.com`).

### `privacy.html`

Privacy policy: data collection, usage, security, user rights, contact.

## JavaScript

Pages load one file:

```html
<script defer src="assets/js/markd.bundle.js"></script>
```

Edit source modules under `assets/js/`, then rebuild:

```bash
./scripts/build-js.sh
```

Bundle order (from `scripts/build-js.sh`):

1. `error-handler.js`
2. `utils.js`
3. `performance.js`
4. `lazy-load.js`
5. `components/config.js`
6. `components/inapp-browser.js`
7. `theme.js`
8. `components/navbar.js`
9. `components/footer.js`
10. `components/index.js`
11. `translations.js`
12. `icons.js`
13. `i18n.js`
14. `main.js`

## Local Development

Prefer a local HTTP server so relative asset paths resolve correctly.

### Python (recommended)

```bash
cd /path/to/markd-site
python3 -m http.server 8000
```

Or:

```bash
./start-server.sh
```

On macOS you can also double-click `start-server.command`.

Open http://localhost:8000

Stop with `Ctrl + C`.

### Node.js (optional)

```bash
npx --yes http-server -p 8000
```

There is no `package.json` in this repo; `npm run dev` will not work.

### Opening `index.html` directly

Possible, but some browsers may block or mis-resolve paths. Use a local server if assets fail to load.

## Image Optimization

Generate WebP siblings for the 720px screenshots (PNG kept as fallback):

```bash
pip3 install pillow
python3 scripts/optimize-images.py
```

## Deployment

### GitHub Pages

1. Push to `main`
2. Enable GitHub Pages with `main` as the source
3. Custom domain is set in `CNAME` to `mark-d.com`
4. Point DNS to GitHub Pages as documented by GitHub

Site: https://mark-d.com

## Browser Support

- Current Chrome, Firefox, Safari, Edge
- iOS Safari 12+
- Android Chrome 80+

## Notes

- All styles live in `assets/css/style.css` (no Tailwind in production pages)
- Icons are inline SVG helpers in `icons.js`
- Chinese pages load Noto Sans SC from Google Fonts when needed
- See `PRODUCT.md` and `DESIGN.md` for product and design context
