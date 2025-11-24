/* ============================================
   Mark'd Website - Footer Component
   ============================================ */

(function() {
    'use strict';

    /**
     * Render footer component
     * @param {Object} options - Configuration options
     * @param {boolean} options.showBrand - Show brand (default: true)
     * @param {boolean} options.showLinks - Show links (default: true)
     * @param {boolean} options.showControls - Show controls (default: true)
     * @param {boolean} options.showCopyright - Show copyright (default: true)
     * @returns {string} HTML string for footer
     */
    function renderFooter(options = {}) {
        // Merge with default config if available
        let config = options;
        if (window.MarkdComponentConfig) {
            config = window.MarkdComponentConfig.mergeConfig('footer', options);
        }
        
        const showBrand = config.showBrand !== false;
        const showLinks = config.showLinks !== false;
        const showControls = config.showControls !== false;
        const showCopyright = config.showCopyright !== false;
        
        return `
            <footer class="footer">
                <div class="footer-container">
                    <div class="footer-content">
                        ${showBrand ? '<div class="footer-brand">Mark\'d</div>' : ''}

                        ${showLinks ? `
                        <div class="footer-links">
                            <a href="privacy.html" data-i18n="footer.privacy">Privacy Policy</a>
                            <a href="about.html" data-i18n="nav.about">About</a>
                            <a href="mailto:support@mark-d.com" data-i18n="footer.support">Support</a>
                        </div>
                        ` : ''}

                        ${showControls || showCopyright ? `
                        <div class="footer-controls">
                            ${showControls ? `
                            <div class="footer-controls-group">
                                <button class="footer-btn lang-toggle" aria-label="Switch Language">
                                    <svg class="footer-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <circle cx="12" cy="12" r="10"/>
                                        <line x1="2" y1="12" x2="22" y2="12"/>
                                        <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
                                    </svg>
                                    <span class="lang-text">中</span>
                                </button>
                                <button class="footer-btn theme-toggle" aria-label="Toggle Theme">
                                    <svg class="footer-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
                                    </svg>
                                </button>
                            </div>
                            ` : ''}
                            ${showCopyright ? '<div class="footer-copyright">© <span id="year"></span></div>' : ''}
                        </div>
                        ` : ''}
                    </div>
                </div>
            </footer>
        `;
    }

    /**
     * Insert footer into page
     * @param {string} selector - CSS selector for insertion point (default: "body")
     * @param {Object} options - Configuration options
     */
    function insertFooter(selector = 'body', options = {}) {
        const target = document.querySelector(selector);
        if (!target) {
            console.error(`Footer: Target element "${selector}" not found`);
            return;
        }

        // Insert at the end of the target
        target.insertAdjacentHTML('beforeend', renderFooter(options));
        
        // Set current year
        const yearEl = document.getElementById('year');
        if (yearEl) {
            yearEl.textContent = new Date().getFullYear();
        }
    }

    // Export to global namespace
    if (typeof window !== 'undefined') {
        window.MarkdComponents = window.MarkdComponents || {};
        window.MarkdComponents.Footer = {
            render: renderFooter,
            insert: insertFooter
        };
    }
})();

