/* ============================================
   Mark'd Website - Theme Management
   ============================================ */

(function () {
    'use strict';

    const MOON_PATH = 'M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z';
    const SUN_PATH = 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z';

    let currentTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    let isManualTheme = false;

    function storageGet(key) {
        try {
            return localStorage.getItem(key);
        } catch (e) {
            return null;
        }
    }

    function storageSet(key, value) {
        try {
            localStorage.setItem(key, value);
        } catch (e) {}
    }

    function pathDataFor(theme) {
        return theme === 'dark' ? SUN_PATH : MOON_PATH;
    }

    function initTheme() {
        const attr = document.documentElement.getAttribute('data-theme');
        currentTheme = attr === 'dark' ? 'dark' : 'light';
        isManualTheme = storageGet('theme_manual') === 'true';

        const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
        darkModeQuery.addEventListener('change', (e) => {
            if (!isManualTheme) {
                currentTheme = e.matches ? 'dark' : 'light';
                applyTheme(false);
            }
        });

        applyTheme(false);
    }

    function syncThemeMedia() {
        if (window.MarkdBoot && typeof window.MarkdBoot.applyThemedImages === 'function') {
            window.MarkdBoot.applyThemedImages(currentTheme);
        }
    }

    function applyTheme(saveAsManual = true) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        syncThemeMedia();

        if (saveAsManual) {
            storageSet('theme', currentTheme);
            storageSet('theme_manual', 'true');
            isManualTheme = true;
        }

        updateThemeButton();
    }

    function toggleTheme() {
        currentTheme = currentTheme === 'light' ? 'dark' : 'light';
        applyTheme(true);
    }

    function updateThemeButton() {
        const lightLabel = translateLabel('a11y.themeToLight', 'Switch to light theme');
        const darkLabel = translateLabel('a11y.themeToDark', 'Switch to dark theme');
        const nextLabel = currentTheme === 'dark' ? lightLabel : darkLabel;
        const markup = `<path d="${pathDataFor(currentTheme)}"/>`;

        document.querySelectorAll('.theme-toggle').forEach((btn) => {
            btn.setAttribute('aria-label', nextLabel);
            const icon = btn.querySelector('svg');
            if (icon) icon.innerHTML = markup;
        });
    }

    function translateLabel(key, fallback) {
        if (window.MarkdI18n && typeof window.MarkdI18n.getTranslation === 'function') {
            const value = window.MarkdI18n.getTranslation(key);
            if (value && value !== key) return value;
        }
        return fallback;
    }

    if (typeof window !== 'undefined') {
        window.MarkdTheme = {
            init: initTheme,
            toggle: toggleTheme,
            getCurrentTheme: () => currentTheme,
            apply: applyTheme,
            syncMedia: syncThemeMedia,
            refreshLabels: updateThemeButton,
            iconPathData: () => pathDataFor(currentTheme)
        };
    }
})();
