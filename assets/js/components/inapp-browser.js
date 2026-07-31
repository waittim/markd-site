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
        if (window.MarkdI18n && typeof window.MarkdI18n.t === 'function') {
            const translated = window.MarkdI18n.t(key);
            if (translated && translated !== key) return translated;
        }
        return fallback;
    }

    let overlayEl = null;

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
                <svg class="inapp-arrow-svg" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 52 C 24 50, 44 42, 48 18" stroke="white" stroke-width="4" stroke-linecap="round" fill="none"/>
                    <path d="M34 14 L 50 16 L 48 32" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
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
        
        // Refresh translated content if language changed
        if (window.MarkdI18n && typeof window.MarkdI18n.updateDOM === 'function') {
            window.MarkdI18n.updateDOM(overlay);
        }

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
