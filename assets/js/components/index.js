/* ============================================
   Mark'd Website - Components Loader
   ============================================ */

(function() {
    'use strict';

    /**
     * Initialize all components
     * @param {Object} options - Configuration options
     */
    function initComponents(options = {}) {
        // Get config from data attributes if available
        let navbarConfig = options.navbar || {};
        let footerConfig = options.footer || {};
        
        if (window.MarkdComponentConfig) {
            navbarConfig = window.MarkdComponentConfig.getConfig('navbar');
            footerConfig = window.MarkdComponentConfig.getConfig('footer');
            // Override with passed options
            navbarConfig = { ...navbarConfig, ...options.navbar };
            footerConfig = { ...footerConfig, ...options.footer };
            if (options.downloadLink && !options.navbar?.downloadLink) {
                navbarConfig.downloadLink = options.downloadLink;
            }
        } else {
            // Fallback: use downloadLink from options for navbar
            if (options.downloadLink) {
                navbarConfig.downloadLink = options.downloadLink;
            }
        }

        // Load navbar
        if (window.MarkdComponents && window.MarkdComponents.Navbar) {
            window.MarkdComponents.Navbar.insert('body', navbarConfig);
        } else {
            console.warn('Navbar component not loaded');
        }

        // Load footer
        if (window.MarkdComponents && window.MarkdComponents.Footer) {
            window.MarkdComponents.Footer.insert('body', footerConfig);
        } else {
            console.warn('Footer component not loaded');
        }
    }

    // Auto-initialize when DOM is ready (sync when body already exists)
    function initialize() {
        const run = () => {
            const body = document.body;
            const downloadLink = body.getAttribute('data-download-link') || '#download';
            const showHome = body.getAttribute('data-navbar-show-home');
            const navbar = {};
            if (showHome === 'true') {
                navbar.showHome = true;
            }
            initComponents({ downloadLink, navbar });
            if (window.MarkdTheme && typeof window.MarkdTheme.syncMedia === 'function') {
                window.MarkdTheme.syncMedia();
            }
        };

        if (document.body) {
            run();
        } else {
            document.addEventListener('DOMContentLoaded', run);
        }
    }

    // Export to global namespace
    if (typeof window !== 'undefined') {
        window.MarkdComponents = window.MarkdComponents || {};
        window.MarkdComponents.init = initComponents;
        
        // Auto-initialize
        initialize();
    }
})();
