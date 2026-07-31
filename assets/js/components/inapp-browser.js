/* ============================================
   Mark'd Website - In-App Browser Handler Component
   ============================================ */

(function() {
    'use strict';

    /**
     * Check if current userAgent is an in-app browser
     * @returns {boolean} True if running inside Instagram, WeChat, FB, TikTok, etc.
     */
    function isInAppBrowser() {
        const ua = navigator.userAgent || navigator.vendor || window.opera || '';
        
        // Target specific in-app webviews
        const isInstagram = /Instagram/i.test(ua);
        const isWeChat = /MicroMessenger/i.test(ua);
        const isFB = /FB_IAB|FBAV|FBAN/i.test(ua);
        const isTikTok = /ByteLocale|musical_ly|TikTok/i.test(ua);
        const isLine = /Line/i.test(ua);
        const isTwitter = /Twitter/i.test(ua);
        
        // General iOS WebView (iOS devices with non-Safari webview string)
        const isIOS = /iPhone|iPod|iPad/i.test(ua);
        const isIOSWebView = isIOS && (
            /WebView/i.test(ua) ||
            (!/Safari/i.test(ua) && /AppleWebKit/i.test(ua))
        );

        return isInstagram || isWeChat || isFB || isTikTok || isLine || isTwitter || isIOSWebView;
    }

    /**
     * Get translated text string
     */
    function getText(key, fallback) {
        if (window.MarkdI18n) {
            if (typeof window.MarkdI18n.getTranslation === 'function') {
                const translated = window.MarkdI18n.getTranslation(key);
                if (translated && translated !== key) return translated;
            }
            if (typeof window.MarkdI18n.t === 'function') {
                const translated = window.MarkdI18n.t(key);
                if (translated && translated !== key) return translated;
            }
            if (typeof window.MarkdI18n.getCurrentLang === 'function' && window.translations) {
                const lang = window.MarkdI18n.getCurrentLang();
                if (window.translations[lang] && window.translations[lang][key]) {
                    return window.translations[lang][key];
                }
            }
        }
        return fallback;
    }

    let overlayEl = null;

    /**
     * Refresh overlay text to match current language
     */
    function updateOverlayText() {
        if (!overlayEl) return;
        const titleEl = overlayEl.querySelector('.inapp-title');
        const subtitleEl = overlayEl.querySelector('.inapp-subtitle');
        const steps = overlayEl.querySelectorAll('.inapp-step-item');
        const dismissBtn = overlayEl.querySelector('.inapp-dismiss-btn');

        if (titleEl) titleEl.textContent = getText('inapp_title', 'Open in Safari');
        if (subtitleEl) subtitleEl.textContent = getText('inapp_subtitle', 'In-app browsers restrict direct App Store access.');
        if (steps && steps.length >= 2) {
            steps[0].textContent = getText('inapp_step1', '1. Tap top-right menu (•••)');
            steps[1].textContent = getText('inapp_step2', '2. Select "Open in Safari" or Default Browser');
        }
        if (dismissBtn) dismissBtn.textContent = getText('inapp_dismiss', 'Got it');
    }

    /**
     * Build and inject the overlay DOM element
     */
    function createOverlay() {
        if (overlayEl) return overlayEl;

        overlayEl = document.createElement('div');
        overlayEl.id = 'inapp-browser-overlay';
        overlayEl.className = 'inapp-overlay';
        overlayEl.setAttribute('role', 'dialog');
        overlayEl.setAttribute('aria-modal', 'true');

        overlayEl.innerHTML = `
            <div class="inapp-arrow-container">
                <svg class="inapp-arrow-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M 24 78 C 36 74, 62 55, 73 25" stroke="currentColor" stroke-width="7" stroke-linecap="round" fill="none"/>
                    <path d="M 55 38 L 74 21 L 75 43" stroke="currentColor" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                </svg>
            </div>
            <div class="inapp-card">
                <div class="inapp-title" data-i18n="inapp_title">${getText('inapp_title', 'Open in Safari')}</div>
                <div class="inapp-subtitle" data-i18n="inapp_subtitle">${getText('inapp_subtitle', 'In-app browsers restrict direct App Store access.')}</div>
                <div class="inapp-steps">
                    <div class="inapp-step-item" data-i18n="inapp_step1">${getText('inapp_step1', '1. Tap top-right menu (•••)')}</div>
                    <div class="inapp-step-item" data-i18n="inapp_step2">${getText('inapp_step2', '2. Select "Open in Safari" or Default Browser')}</div>
                </div>
                <button type="button" class="inapp-dismiss-btn" data-i18n="inapp_dismiss">${getText('inapp_dismiss', 'Got it')}</button>
            </div>
        `;

        // Click dismiss
        const dismissBtn = overlayEl.querySelector('.inapp-dismiss-btn');
        if (dismissBtn) {
            dismissBtn.addEventListener('click', hideOverlay);
        }

        // Close on backdrop click
        overlayEl.addEventListener('click', function(e) {
            if (e.target === overlayEl) {
                hideOverlay();
            }
        });

        document.body.appendChild(overlayEl);
        return overlayEl;
    }

    /**
     * Show overlay and attempt scheme redirect
     */
    function showOverlay(appStoreUrl) {
        const overlay = createOverlay();
        
        // Refresh translated content for current language
        updateOverlayText();

        requestAnimationFrame(() => {
            overlay.classList.add('is-visible');
        });

        // Attempt direct scheme jump: itms-apps://
        const appIdMatch = appStoreUrl && appStoreUrl.match(/id(\d+)/);
        const appId = appIdMatch ? appIdMatch[1] : '6755139749';
        const schemeUrl = `itms-apps://apps.apple.com/app/id${appId}`;

        try {
            window.location.href = schemeUrl;
        } catch (e) {
            // Ignore scheme jump errors
        }
    }

    /**
     * Hide overlay
     */
    function hideOverlay() {
        if (!overlayEl) return;
        overlayEl.classList.remove('is-visible');
    }

    /**
     * Intercept download links
     */
    function bindDownloadLinks() {
        if (!isInAppBrowser()) return;

        const downloadSelectors = [
            'a.btn-primary[href*="apps.apple.com"]',
            'a.app-store-btn[href*="apps.apple.com"]',
            'a[href*="apps.apple.com"]'
        ];

        document.querySelectorAll(downloadSelectors.join(',')).forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const href = this.getAttribute('href') || '';
                showOverlay(href);
            });
        });
    }

    // Export component to global namespace
    if (typeof window !== 'undefined') {
        window.MarkdInAppBrowser = {
            isInAppBrowser: isInAppBrowser,
            showOverlay: showOverlay,
            hideOverlay: hideOverlay,
            init: bindDownloadLinks
        };
    }
})();
