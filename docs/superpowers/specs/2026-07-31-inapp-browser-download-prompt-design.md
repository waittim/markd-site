# Design Spec: In-App Browser Download Prompt & Scheme Redirect

## Overview
When users access the Mark'd website inside in-app webviews (such as Instagram, WeChat, TikTok, Facebook, Line, Twitter/X), clicking the App Store download buttons often fails to trigger the iOS App Store due to in-app browser webview restrictions.

This specification details the environment detection, protocol scheme fallback, and UI overlay prompt designed to guide users to open the link in Safari or their default browser while maintaining Mark'd's Apple-native aesthetic.

---

## 1. Technical Architecture & Flow

### 1.1 In-App Browser Detection (`assets/js/utils.js` / `main.js`)
We inspect `navigator.userAgent` to detect common in-app browser environments:
- **Instagram**: `/Instagram/i`
- **WeChat**: `/MicroMessenger/i`
- **Facebook**: `/FB_IAB|FBAV|FBAN/i`
- **TikTok / Douyin**: `/ByteLocale|musical_ly|TikTok/i`
- **Line**: `/Line/i`
- **Twitter/X**: `/Twitter/i`
- **General iOS WebView**: `/iPhone|iPod|iPad/i` combined with non-Safari webview signatures

### 1.2 Download Button Click Behavior
When a user clicks any App Store CTA (`a.btn-primary[href*="apps.apple.com"]`, `a.app-store-btn`, etc.):
1. **If In-App Browser detected**:
   - Intercept click event (`e.preventDefault()`).
   - Trigger full-screen frosted glass overlay pointing to top-right menu `•••`.
   - Attempt direct scheme redirection using `itms-apps://apps.apple.com/app/id6755139749`.
2. **If standard Safari/Chrome browser**:
   - Allow default navigation to `https://apps.apple.com/us/app/markd/id6755139749`.

---

## 2. Visual & Component Design

### 2.1 Full-Screen Overlay (`#inapp-browser-overlay`)
- **Backdrop**: Fixed full screen (`position: fixed; inset: 0; z-index: 99999;`), background `rgba(0, 0, 0, 0.75)` with `backdrop-filter: blur(20px)` matching `DESIGN.md` Apple glass aesthetic.
- **Top-Right Arrow Indicator**: A sleek curved SVG arrow positioned near the top right corner (`top: 16px; right: 24px;`) pointing directly at the system `•••` action menu.
- **Guide Card**: Centered iOS-style modal card with `--rounded-lg` (28px), subtle border `1px solid rgba(255, 255, 255, 0.15)`, dark background token `--bg-secondary-dark`.
- **Text & Steps**:
  - **Header**: "Open in Safari" / "在 Safari 中打开"
  - **Subtitle**: "Instagram or built-in browsers restrict direct App Store access." / "当前内置浏览器无法直接跳转 App Store"
  - **Step 1**: "1. Click top-right `•••` menu" / "1. 点击右上角「•••」菜单"
  - **Step 2**: "2. Select 'Open in Safari' or default browser" / "2. 选择在 Safari 或默认浏览器中打开"
- **Actions**:
  - Close button (`Got it` / `我知道了`): Pill button (`btn-primary` styling) to dismiss overlay.
  - Backdrop click: Dismisses overlay.

---

## 3. i18n Internationalization (`assets/js/translations.js`)
Add localized string tokens to `translations.js` for `en`, `zh`, and `zh-TW`.

---

## 4. Verification Plan

### Manual Verification
- Test UserAgent overriding in Safari/Chrome DevTools to simulate Instagram UserAgent (`Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 289.0.0.25.109`).
- Verify overlay appears upon clicking download buttons.
- Verify smooth dismiss action and dark/light theme background blur compatibility.
- Verify standard mobile Safari behavior remains unaffected.
