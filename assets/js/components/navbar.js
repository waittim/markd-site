/* ============================================
   Mark'd Website - Navbar Component
   ============================================ */

(function() {
    'use strict';

    /**
     * Render navbar component
     * @param {Object} options - Configuration options
     * @param {string} options.downloadLink - Link for download button (default: "#download")
     * @param {boolean} options.showBrand - Show brand (default: true)
     * @param {boolean} options.showDownload - Show download button (default: true)
     * @returns {string} HTML string for navbar
     */
    function renderNavbar(options = {}) {
        // Merge with default config if available
        let config = options;
        if (window.MarkdComponentConfig) {
            config = window.MarkdComponentConfig.mergeConfig('navbar', options);
        }
        
        const downloadLink = config.downloadLink || '#download';
        const showBrand = config.showBrand !== false;
        const showDownload = config.showDownload !== false;
        
        return `
            <nav class="navbar">
                <div class="navbar-container">
                    <div class="navbar-glass">
                        ${showBrand ? `
                        <a href="index.html" class="navbar-brand">
                            <img src="assets/images/Markd-iOS-Default-1024x1024@1x.png" alt="Mark'd" class="app-icon app-icon-light" width="32" height="32">
                            <img src="assets/images/Markd-iOS-Dark-1024x1024@1x.png" alt="Mark'd" class="app-icon app-icon-dark" width="32" height="32">
                            <span class="navbar-brand-text">Mark'd</span>
                        </a>
                        ` : ''}
                        ${showDownload ? `<a href="${downloadLink}" class="navbar-download-btn" data-i18n="nav.download">Download</a>` : ''}
                    </div>
                </div>
            </nav>
        `;
    }

    /**
     * Insert navbar into page
     * @param {string} selector - CSS selector for insertion point (default: "body")
     * @param {Object} options - Configuration options
     */
    function insertNavbar(selector = 'body', options = {}) {
        const target = document.querySelector(selector);
        if (!target) {
            console.error(`Navbar: Target element "${selector}" not found`);
            return;
        }

        // Insert at the beginning of the target
        target.insertAdjacentHTML('afterbegin', renderNavbar(options));
    }

    // Export to global namespace
    if (typeof window !== 'undefined') {
        window.MarkdComponents = window.MarkdComponents || {};
        window.MarkdComponents.Navbar = {
            render: renderNavbar,
            insert: insertNavbar
        };
    }
})();

