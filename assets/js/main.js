/* ============================================
   Mark'd Website - Main Application Entry
   ============================================ */

function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function initApp() {
    if (window.MarkdTheme) {
        window.MarkdTheme.init();
    }

    if (window.MarkdI18n) {
        window.MarkdI18n.init();
    }

    setupEventListeners();
}

function setupEventListeners() {
    // Enable instant :active feedback on iOS Safari / WebKit touch devices
    document.addEventListener('touchstart', function () {}, { passive: true });

    document.querySelectorAll('.theme-toggle').forEach((btn) => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            if (window.MarkdTheme) {
                window.MarkdTheme.toggle();
            }
        });
    });

    document.querySelectorAll('.lang-toggle').forEach((btn) => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            if (window.MarkdI18n) {
                window.MarkdI18n.toggleDropdown();
            }
        });
    });

    if (window.MarkdI18n) {
        window.MarkdI18n.initDropdown();
    }

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href || href === '#') return;
            const target = document.querySelector(href);
            if (!target) return;

            e.preventDefault();
            target.scrollIntoView({
                behavior: prefersReducedMotion() ? 'auto' : 'smooth',
                block: 'start'
            });
            if (typeof target.focus === 'function') {
                try {
                    target.focus({ preventScroll: true });
                } catch (err) {
                    target.focus();
                }
            }
            history.pushState(null, '', href);
        });
    });

    function trackEvent(name, params) {
        if (typeof gtag === 'undefined') return;
        const payload = Object.assign({ transport_type: 'beacon' }, params);
        gtag('event', name, payload);
    }

    document.querySelectorAll('a.btn-primary[href*="apps.apple.com"]').forEach((btn) => {
        btn.addEventListener('click', function () {
            const href = this.getAttribute('href') || '';
            const buttonText = this.textContent.trim() || 'App Store Download';

            trackEvent('app_store_click', {
                button_text: buttonText,
                link_url: href,
                link_type: 'app_store_badge',
                value: 1
            });
        });
    });

    document.querySelectorAll('.navbar-download-btn').forEach((btn) => {
        btn.addEventListener('click', function () {
            const href = this.getAttribute('href') || '';
            const buttonText = this.textContent.trim() || 'Download';
            const isAnchorLink = href.startsWith('#') ||
                (href.includes('#') && !href.startsWith('http://') && !href.startsWith('https://'));

            trackEvent('navbar_download_click', {
                button_text: buttonText,
                link_url: href,
                link_type: isAnchorLink ? 'navbar_anchor' : 'navbar_external',
                value: 1
            });
        });
    });

    if (window.MarkdInAppBrowser && typeof window.MarkdInAppBrowser.init === 'function') {
        window.MarkdInAppBrowser.init();
    }
}

function initializeApp() {
    try {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initApp);
        } else {
            initApp();
        }
    } catch (error) {
        console.error('Error initializing app:', error);
    }
}

initializeApp();
