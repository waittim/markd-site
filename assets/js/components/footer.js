/* ============================================
   Mark'd Website - Footer Component
   ============================================ */

(function () {
    'use strict';

    function initialLangLabel() {
        const lang = document.documentElement.getAttribute('data-lang') || 'en';
        if (window.MarkdBoot && typeof window.MarkdBoot.langLabel === 'function') {
            return window.MarkdBoot.langLabel(lang);
        }
        if (lang === 'zh') return '简';
        if (lang === 'zh-TW') return '繁';
        return 'En';
    }

    function initialThemePath() {
        if (window.MarkdTheme && typeof window.MarkdTheme.iconPathData === 'function') {
            return window.MarkdTheme.iconPathData();
        }
        return 'M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z';
    }

    function renderFooter() {
        const langLabel = initialLangLabel();
        const themePath = initialThemePath();

        return `
            <footer class="footer">
                <div class="footer-container">
                    <div class="footer-content">
                        <a href="index.html" class="footer-brand">Mark'd</a>

                        <div class="footer-links">
                            <a href="privacy.html" data-i18n="footer.privacy">Privacy Policy</a>
                            <a href="about.html" data-i18n="nav.about">About</a>
                            <a href="mailto:support@mark-d.com" data-i18n="footer.support">Support</a>
                        </div>

                        <div class="footer-controls">
                            <div class="footer-controls-group">
                                <button type="button" class="footer-btn lang-toggle" data-i18n-aria-label="a11y.langToggle" aria-label="Switch language" aria-haspopup="listbox" aria-expanded="false">
                                    <svg class="footer-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                                        <circle cx="12" cy="12" r="10"/>
                                        <line x1="2" y1="12" x2="22" y2="12"/>
                                        <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
                                    </svg>
                                    <span class="lang-text">${langLabel}</span>
                                </button>
                                <button type="button" class="footer-btn theme-toggle" aria-label="Switch to dark theme">
                                    <svg class="footer-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                                        <path d="${themePath}"/>
                                    </svg>
                                </button>
                            </div>
                            <div class="footer-copyright">© <span id="year"></span></div>
                        </div>
                    </div>
                </div>
            </footer>
        `;
    }

    function insertFooter(selector = 'body') {
        const target = document.querySelector(selector);
        if (!target) {
            console.error(`Footer: Target element "${selector}" not found`);
            return;
        }

        target.insertAdjacentHTML('beforeend', renderFooter());

        const yearEl = document.getElementById('year');
        if (yearEl) {
            yearEl.textContent = new Date().getFullYear();
        }
    }

    if (typeof window !== 'undefined') {
        window.MarkdComponents = window.MarkdComponents || {};
        window.MarkdComponents.Footer = {
            render: renderFooter,
            insert: insertFooter
        };
    }
})();
