/* ============================================
   Mark'd Website - Navbar Component
   ============================================ */

(function () {
    'use strict';

    function escapeAttr(value) {
        return String(value)
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/</g, '&lt;');
    }

    function renderNavbar(options = {}) {
        const downloadLink = escapeAttr(options.downloadLink || '#download');
        const showHome = options.showHome === true;

        return `
            <nav class="navbar">
                <div class="navbar-container">
                    <div class="navbar-glass">
                        <a href="index.html" class="navbar-brand">
                            <img
                                data-src-light="assets/images/Markd-iOS-Default-240.png"
                                data-src-dark="assets/images/Markd-iOS-Dark-240.png"
                                alt="Mark'd"
                                class="app-icon"
                                width="32"
                                height="32"
                                decoding="async"
                            >
                            <span class="navbar-brand-text">Mark'd</span>
                        </a>
                        <div class="navbar-actions">
                            ${showHome ? `<a href="index.html" class="navbar-link" data-i18n="nav.home">Home</a>` : ''}
                            <a href="${downloadLink}" class="navbar-download-btn" data-i18n="nav.download">Download</a>
                        </div>
                    </div>
                </div>
            </nav>
        `;
    }

    function insertNavbar(selector = 'body', options = {}) {
        const target = document.querySelector(selector);
        if (!target) {
            console.error(`Navbar: Target element "${selector}" not found`);
            return;
        }

        target.insertAdjacentHTML('afterbegin', renderNavbar(options));
    }

    if (typeof window !== 'undefined') {
        window.MarkdComponents = window.MarkdComponents || {};
        window.MarkdComponents.Navbar = {
            render: renderNavbar,
            insert: insertNavbar
        };
    }
})();
