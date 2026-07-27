---
name: Mark'd Marketing Site
description: Apple-native marketing surface for a private life-library iOS app
colors:
  bg-primary-light: "#F2F2F7"
  bg-secondary-light: "#FFFFFF"
  text-primary-light: "#1D1D1F"
  text-secondary-light: "rgba(29, 29, 31, 0.68)"
  accent-light: "#2B62D9"
  accent-secondary-light: "#3A6FE0"
  bg-primary-dark: "#0B0B0D"
  bg-secondary-dark: "#161618"
  text-primary-dark: "#F5F5F7"
  text-secondary-dark: "rgba(235, 235, 245, 0.62)"
  accent-dark: "#7AA4FF"
  accent-secondary-dark: "#5BB8FF"
  btn-bg: "{colors.text-primary-light}"
  btn-fg: "{colors.bg-primary-light}"
  focus-ring-light: "{colors.accent-light}"
  focus-ring-dark: "{colors.accent-dark}"
typography:
  display:
    fontFamily: "-apple-system, BlinkMacSystemFont, \"SF Pro Text\", \"Noto Sans SC\", \"Segoe UI\", sans-serif"
    fontWeight: 700
    letterSpacing: "-0.03em"
    lineHeight: 1.02
  body:
    fontFamily: "-apple-system, BlinkMacSystemFont, \"SF Pro Text\", \"Noto Sans SC\", \"Segoe UI\", sans-serif"
    fontSize: "17px"
    fontWeight: 500
    lineHeight: 1.6
  cjk:
    fontFamily: "\"Noto Sans SC\", sans-serif"
    fontWeight: 400
    fontSize: "17px"
    lineHeight: 1.6
  label:
    fontFamily: "-apple-system, BlinkMacSystemFont, \"SF Pro Text\", \"Noto Sans SC\", \"Segoe UI\", sans-serif"
    fontSize: "14px"
    fontWeight: 600
    letterSpacing: "-0.02em"
rounded:
  sm: "12px"
  md: "20px"
  lg: "28px"
  pill: "9999px"
spacing:
  page-inline: "24px"
  section-y: "112px"
  container-max: "1080px"
  content-max: "720px"
components:
  button-primary:
    backgroundColor: "{colors.btn-bg}"
    textColor: "{colors.btn-fg}"
    rounded: "{rounded.pill}"
    padding: "14px 22px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.btn-bg}"
    textColor: "{colors.btn-fg}"
    rounded: "{rounded.pill}"
  navbar-glass:
    backgroundColor: "{colors.bg-secondary-light}"
    rounded: "{rounded.pill}"
    padding: "0 12px 0 16px"
    height: "56px"
---

# Design System: Mark'd Marketing Site

## Overview

**Creative North Star: "The Quiet Library"**

The marketing site should feel like a native Apple product page for a personal tool—not a growth landing page. Calm surfaces, system typography, glass navigation, and product screenshots do the persuading. The interface recedes so privacy, taste, and the app itself stay central.

Density is comfortable, not sparse-for-show. Sections breathe (112px vertical rhythm on desktop) but related copy and controls stay tightly grouped. Motion is limited to hero entrances and subtle hover lifts; `prefers-reduced-motion` removes animation without hiding content.

**Key characteristics:**
- System-first typography (SF / system UI; Noto Sans SC for CJK only)
- Light/dark via `data-theme` tokens, not hard-coded per-component colors
- Glass nav pill + soft ambient orbs—not decorative gradient text or metric hero templates
- Private, anti-feed messaging; no fabricated social proof
- WCAG AA contrast floor; 44px minimum touch targets on controls

## Colors

Palette reads as iOS system gray with a single trustworthy blue accent.

### Primary
- **Library Blue (light)** (`#2B62D9`): links, focus rings, philosophy signature on light surfaces. Must meet 4.5:1 on `--bg-primary` and `--bg-secondary`.
- **Library Blue (dark)** (`#7AA4FF`): accent and focus on dark surfaces (~8:1 on `--bg-primary`).

### Neutral
- **System Gray Canvas (light)** (`#F2F2F7`): page background (`--bg-primary`).
- **Pure Surface (light)** (`#FFFFFF`): cards, feature spotlight (`--bg-secondary`).
- **Ink (light)** (`#1D1D1F`): primary text and inverted button fill (`--text-primary`, `--btn-bg`).
- **Muted Ink (light)** (`rgba(29, 29, 31, 0.68)`): secondary body, nav links (`--text-secondary`).
- **Obsidian Canvas (dark)** (`#0B0B0D`): page background.
- **Elevated Surface (dark)** (`#161618`): cards and footer (`--bg-secondary`).
- **Mist (dark)** (`#F5F5F7`): primary text on dark (`--text-primary`).

### Named Rules
**The One Accent Rule.** Blue accent appears on links, focus, and one signature line—not on every heading or card border.

**The Token Rule.** Components use `var(--*)` semantic tokens; theme switches update `:root` / `[data-theme='dark']` only.

## Typography

**Display / Body:** `-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", sans-serif`  
**CJK supplemental:** `Noto Sans SC` (Google Fonts; loaded only for `zh` / `zh-TW` via runtime injection).

**Character:** Tight, confident headlines with restrained negative tracking; body copy stays readable at 17px / 1.6.

### Hierarchy
- **Display** (700, `clamp(40px, 6vw, 72px)`, lh 1.02, ls -0.03em): hero title (`.hero-title`, `.sf-display`).
- **Section headline** (700, `clamp(36px, 5vw, 56px)`, ls -0.03em): features, philosophy, CTA titles.
- **Spotlight title** (700, `clamp(28px, 3vw, 40px)`, ls -0.03em): feature spotlight headings.
- **Body** (500, 17px, lh 1.55–1.75): descriptions; max ~42–58ch in spotlight/philosophy blocks.
- **Label / Nav** (600, 14–15px, ls -0.02em): navbar, footer, buttons.

### Named Rules
**The Tracking Floor Rule.** Display tracking never exceeds `-0.03em`.

## Layout

- **Container max:** 1080px (`.hero-layout`, `.features-container`, `.footer-container`).
- **Reading max:** 720px (philosophy, about/privacy `.content-container`).
- **Page padding:** 24px inline; hero `96px` top (88px mobile) to clear fixed nav.
- **Section rhythm:** features `112px` vertical padding; philosophy `128px`; CTA `104px`.
- **Breakpoints:** 900px hero two-column; 800px feature spotlight split; 700px capability grid 2-col; 768px footer row; 480px full-width primary CTA.
- **Scroll:** `scroll-padding-top: 88px` for in-page anchors under fixed nav.

## Elevation & Depth

Hybrid: soft shadows + glass blur, not stacked borders and shadows together.

### Shadow Vocabulary
- **Glass nav** (`--glass-shadow`): `0 8px 32px -8px rgba(29, 29, 31, 0.08)` light / `rgba(0,0,0,0.45)` dark.
- **Phone screenshot** (`filter: drop-shadow(...)`): lifted product mockups on hero/spotlight.
- **Capability hover:** same glass shadow on lift (`translateY(-3px)`).

### Named Rules
**The Flat Card Rule.** Feature spotlight uses shadow OR border, not both. Default spotlight: shadow only on `--bg-secondary`.

**The Orb Rule.** Hero background orbs are ambient (`blur(64px)`), never interactive; disabled under `prefers-reduced-motion`.

## Shapes

- **Pills:** nav bar, primary buttons, download chip (`--radius-pill`).
- **Cards:** `--radius-lg` (28px) spotlight; `--radius-md` (20px) capabilities.
- **App icons:** 8–18px radius by context (nav 8px, hero 14px, CTA 18px).
- **Phone screenshots:** no extra radius (frame baked into asset).

## Components

### Buttons
- **Shape:** pill (`--radius-pill`), min-height 48px.
- **Primary (`.btn-primary`):** `--btn-bg` / `--btn-fg`; 15px semibold; App Store icon 18px.
- **Hover:** opacity 0.92 + `translateY(-1px)`; active `scale(0.98)`.
- **Focus:** `outline: 2px solid var(--focus-ring); outline-offset: 3px`.

### Navigation (`.navbar-glass`)
- Fixed top; 56px height; glass gradient + `backdrop-filter: blur(28px) saturate(160%)`.
- Brand 18px bold; download chip mirrors primary button colors.
- Links: secondary text, 44px min-height pill hit area.

### Cards
- **Feature spotlight:** `--bg-secondary`, `--radius-lg`, generous padding (40px desktop).
- **Capability:** flat at rest; hover lift + shadow only.

### Footer
- Top border `--glass-border`; brand + text links + circular 44px icon buttons for language/theme.
- Language dropdown: `--bg-secondary`, `--radius-sm`, appears above toggle.

### Themed imagery
- Product screenshots: WebP primary (`*-720.webp`), PNG `onerror` fallback.
- Theme swap via `data-src-light` / `data-src-dark` + `MarkdTheme.syncMedia()`.

## Do's and Don'ts

### Do:
- **Do** use semantic CSS variables for all theme-aware colors.
- **Do** keep primary CTA copy factual ("Download on the App Store") and link to the real listing.
- **Do** maintain en / zh-Hans / zh-Hant parity for visible strings and `aria-label`s.
- **Do** preserve 44px touch targets on footer controls, nav actions, and text links.
- **Do** run `scripts/optimize-images.py` after replacing PNG screenshots, then `scripts/build-js.sh` after JS edits.

### Don't:
- **Don't** add social proof, download counts, or testimonials not in the repo.
- **Don't** imply Android availability or Mark'd access to user library data.
- **Don't** use gradient text, section-number eyebrows, or metric-stat hero templates.
- **Don't** stack 1px border and large soft shadow on the same card (ghost card).
- **Don't** load both light and dark screenshot assets; serve one theme-appropriate WebP per view.
