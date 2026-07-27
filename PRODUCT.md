# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary audiences (both confirmed):

1. **Taste-conscious individuals** who want to keep authentic preferences without algorithmic feeds or social performance—capturing restaurants, wine, fragrance, and similar in-the-moment experiences for themselves.
2. **Collectors / heavy recorders** who systematically archive what they like over time and want a private, durable personal library—not a social graph.

## Product Purpose

Mark'd is a private “life library” for iOS: scan or photograph experiences, attach ratings and notes, and keep them for future self-understanding. Success for this marketing site means a visitor understands the privacy-first positioning and downloads the app from the App Store.

## Positioning

Two mechanisms that neighboring diary, public-rating, or social “seed” products cannot truthfully copy as a pair:

1. **Private taste library** — no feed, no public averages, no algorithmic recommendations; records serve the user, not an audience.
2. **Scan & Mark** — barcode recognition binds a product to the lived moment, then stores photos, private scores, and notes on-device / in the user’s iCloud.

## Operating Context

- Visitors evaluate the product on the marketing site (desktop and mobile browsers) before installing.
- The app itself is used on iPhone in real-world moments (scanning, photographing, rating, optional share-card export).
- Site supports English, Simplified Chinese, and Traditional Chinese; light/dark theme follows system preference with manual override.

## Capabilities and Constraints

**Site (this repository)**

- Static marketing pages: home, about, privacy (`index.html`, `about.html`, `privacy.html`).
- App Store download CTA; custom domain `mark-d.com` (GitHub Pages).
- Theme toggle, language switcher (en / zh / zh-TW), shared navbar/footer components.
- Contact: `support@mark-d.com`.

**Product (app claims the site must not contradict)**

- Local-first storage; optional encrypted sync via the user’s personal iCloud (not accessible to the Mark'd team per published privacy copy).
- Features marketed: Scan & Mark, visual memory (photos), private ratings/notes, share cards, iCloud sync.
- Distribution: App Store (iOS). No Android claim on this site.
- Not intended for children under 13 (privacy policy).

**Confirmed design/product constraints from init**

- Maintain **en / 简 / 繁** language coverage.
- Target at least **WCAG AA** accessibility for the marketing site.

**Open / undecided**

- Whether Android or other platforms are planned (do not invent).
- Pricing, testimonials, press, or customer counts (do not fabricate).

## Brand Commitments

- **Name:** Mark'd (apostrophe spelling).
- **Voice:** Calm, personal, anti-algorithm; emphasize privacy and self-understanding over social proof.
- **Signature line in use:** “Mark'd. Remember your experience, understand your life.”
- **Assets on hand:** app icons and product screenshots under `assets/images/` (light/dark variants).

## Evidence on Hand

- Live site copy and translations: `assets/js/translations.js` (and per-locale stubs).
- Product screenshots: `assets/images/screenshot-*-720.png`, `assets/images/collection-*-720.png`.
- App icons: `assets/images/Markd-iOS-*.png`.
- Privacy and about pages: `privacy.html`, `about.html`.
- App Store listing linked from CTAs (`id6755139749`).
- **Do not fabricate:** user testimonials, download counts, awards, or third-party endorsements not present in the repo.

## Product Principles

1. **Private by default** — never imply a social feed, public scores, or Mark'd access to personal library contents.
2. **Taste over attention** — messaging favors authentic preference and self-understanding, not virality or FOMO.
3. **Moment → memory** — capture should feel light in the moment and valuable when looking back.
4. **Inclusive reach on the site** — keep three locales coherent and meet WCAG AA for the marketing experience.
5. **Honest surfaces** — claims on the site must match shipping product capabilities; absences stay absences.

## Accessibility & Inclusion

- Required standard for this site: **WCAG 2.x Level AA** (confirmed at init).
- Languages: English, Simplified Chinese, Traditional Chinese must remain available and consistent.
- No additional disability-specific user research was recorded at init; treat AA as the floor, not a ceiling.
