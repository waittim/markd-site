/* ============================================
   Mark'd Website - Main Application Entry
   ============================================ */

// App State (will be initialized by modules)
let currentTheme = 'light';
let currentLang = 'en';

window.currentLang = currentLang;
window.currentTheme = currentTheme;

// Main App Object
window.MarkdApp = {
    getCurrentLang: () => window.MarkdI18n ? window.MarkdI18n.getCurrentLang() : currentLang,
    getCurrentTheme: () => window.MarkdTheme ? window.MarkdTheme.getCurrentTheme() : currentTheme,
    toggleTheme: () => window.MarkdTheme ? window.MarkdTheme.toggle() : null,
    toggleLanguage: () => window.MarkdI18n ? window.MarkdI18n.toggle() : null,
    getTranslation: (key) => window.MarkdI18n ? window.MarkdI18n.getTranslation(key) : key,
    createIcon: (name, size) => window.MarkdIcons ? window.MarkdIcons.createIcon(name, size) : ''
};

function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Initialize App
function initApp() {
    if (window.MarkdTheme) {
        window.MarkdTheme.init();
        currentTheme = window.MarkdTheme.getCurrentTheme();
        window.currentTheme = currentTheme;
    }

    if (window.MarkdI18n) {
        window.MarkdI18n.init();
        currentLang = window.MarkdI18n.getCurrentLang();
        window.currentLang = currentLang;
    }

    setupEventListeners();
}

// Event Listeners
function setupEventListeners() {
    document.querySelectorAll('.theme-toggle').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            if (window.MarkdTheme) {
                window.MarkdTheme.toggle();
                currentTheme = window.MarkdTheme.getCurrentTheme();
                window.currentTheme = currentTheme;
            }
        });
    });

    document.querySelectorAll('.lang-toggle').forEach(btn => {
        btn.addEventListener('click', function(e) {
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

    // Smooth scroll for in-page anchors (respect reduced motion)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
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

    // Fire analytics without delaying navigation (beacon / keepalive when possible)
    function trackEvent(name, params) {
        if (typeof gtag === 'undefined') return;

        const payload = Object.assign({ transport_type: 'beacon' }, params);
        gtag('event', name, payload);
    }

    // App Store CTA tracking (hero + bottom CTA use .btn-primary)
    document.querySelectorAll('a.btn-primary[href*="apps.apple.com"], a.app-store-btn[href*="apps.apple.com"]').forEach(btn => {
        btn.addEventListener('click', function() {
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

    // Navbar download tracking
    document.querySelectorAll('.navbar-download-btn').forEach(btn => {
        btn.addEventListener('click', function() {
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
