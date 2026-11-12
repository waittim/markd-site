/* ============================================
   Mark'd Website - Components Loader
   ============================================ */

(function () {
    'use strict';

    function initComponents() {
        const body = document.body;
        const downloadLink = (body && body.getAttribute('data-download-link')) || '#download';
        const showHome = !!(body && body.getAttribute('data-navbar-show-home') === 'true');

        if (window.MarkdComponents && window.MarkdComponents.Navbar) {
            window.MarkdComponents.Navbar.insert('body', { downloadLink, showHome });
        }

        if (window.MarkdComponents && window.MarkdComponents.Footer) {
            window.MarkdComponents.Footer.insert('body');
        }

        if (window.MarkdTheme && typeof window.MarkdTheme.syncMedia === 'function') {
            window.MarkdTheme.syncMedia();
        }
    }

    function initialize() {
        if (document.body) {
            initComponents();
        } else {
            document.addEventListener('DOMContentLoaded', initComponents);
        }
    }

    if (typeof window !== 'undefined') {
        window.MarkdComponents = window.MarkdComponents || {};
        window.MarkdComponents.init = initComponents;
        initialize();
    }
})();
