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

    // Auto-initialize when DOM is ready
    function initialize() {
        // Use waitForElement if available, otherwise fallback to DOM ready
        if (window.MarkdUtils && window.MarkdUtils.waitForElement) {
            window.MarkdUtils.waitForElement('body').then(() => {
                const body = document.body;
                const downloadLink = body.getAttribute('data-download-link') || '#download';
                initComponents({ downloadLink });
            }).catch(() => {
                // Fallback if waitForElement fails
                const body = document.body;
                const downloadLink = body.getAttribute('data-download-link') || '#download';
                initComponents({ downloadLink });
            });
        } else {
            // Fallback for older browsers
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', function() {
                    const body = document.body;
                    const downloadLink = body.getAttribute('data-download-link') || '#download';
                    initComponents({ downloadLink });
                });
            } else {
                const body = document.body;
                const downloadLink = body.getAttribute('data-download-link') || '#download';
                initComponents({ downloadLink });
            }
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

