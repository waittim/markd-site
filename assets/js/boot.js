/* ============================================
   Mark'd Website - Synchronous first paint
   Runs from <head> before CSS. Not part of the deferred bundle.
   ============================================ */
(function () {
    'use strict';

    var SUPPORTED_LANGS = ['en', 'zh', 'zh-TW'];
    var HTML_LANG = { en: 'en', zh: 'zh-Hans', 'zh-TW': 'zh-Hant' };
    var LANG_LABELS = { en: 'En', zh: '简', 'zh-TW': '繁' };

    function storageGet(key) {
        try {
            return localStorage.getItem(key);
        } catch (e) {
            return null;
        }
    }

    function systemTheme() {
        try {
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        } catch (e) {
            return 'light';
        }
    }

    function detectTheme() {
        var manual = storageGet('theme_manual') === 'true';
        var theme = manual ? storageGet('theme') : null;
        if (theme !== 'light' && theme !== 'dark') {
            theme = systemTheme();
        }
        return theme;
    }

    function detectLang() {
        var browserLang = (navigator.language || '').toLowerCase();
        if (
            browserLang === 'zh-tw' ||
            browserLang === 'zh-hk' ||
            browserLang === 'zh-mo' ||
            browserLang.indexOf('zh-hant') === 0
        ) {
            return 'zh-TW';
        }
        if (browserLang.indexOf('zh') === 0) return 'zh';
        return 'en';
    }

    function resolveLang() {
        var manual = storageGet('lang_manual') === 'true';
        var lang = manual ? storageGet('lang') : null;
        if (SUPPORTED_LANGS.indexOf(lang) === -1) {
            lang = detectLang();
        }
        return lang;
    }

    function cjkFontHref(lang) {
        var family = lang === 'zh-TW' ? 'Noto+Sans+TC' : 'Noto+Sans+SC';
        return 'https://fonts.googleapis.com/css2?family=' + family + ':wght@400;500;700&display=swap';
    }

    function ensureCjkFont(lang) {
        if (!lang || String(lang).indexOf('zh') !== 0) return;
        var href = cjkFontHref(lang);
        var existing = document.getElementById('font-noto-cjk') || document.getElementById('font-noto-sc');
        if (!existing) {
            var link = document.createElement('link');
            link.id = 'font-noto-cjk';
            link.rel = 'stylesheet';
            link.href = href;
            document.head.appendChild(link);
            return;
        }
        existing.id = 'font-noto-cjk';
        if (existing.getAttribute('href') !== href) existing.setAttribute('href', href);
    }

    function applyDocumentLang(lang) {
        if (SUPPORTED_LANGS.indexOf(lang) === -1) lang = 'en';
        document.documentElement.lang = HTML_LANG[lang] || 'en';
        document.documentElement.setAttribute('data-lang', lang);
        ensureCjkFont(lang);
    }

    function themedImageSrc(el, theme) {
        var primary = theme === 'dark' ? el.getAttribute('data-src-dark') : el.getAttribute('data-src-light');
        var fallback = theme === 'dark' ? el.getAttribute('data-fallback-dark') : el.getAttribute('data-fallback-light');
        if (!primary) return;
        el.onerror = function () {
            if (fallback && el.getAttribute('src') !== fallback) {
                el.onerror = null;
                el.src = fallback;
            }
        };
        el.src = primary;
    }

    function applyThemedImages(theme) {
        var active = theme === 'dark' || theme === 'light'
            ? theme
            : (document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');
        var nodes = document.querySelectorAll('[data-src-light][data-src-dark]');
        for (var i = 0; i < nodes.length; i++) {
            themedImageSrc(nodes[i], active);
        }
    }

    function langLabel(lang) {
        return LANG_LABELS[lang] || LANG_LABELS.en;
    }

    try {
        document.documentElement.setAttribute('data-theme', detectTheme());
        applyDocumentLang(resolveLang());
    } catch (e) {}

    window.MarkdBoot = {
        supportedLangs: SUPPORTED_LANGS,
        detectLang: detectLang,
        langLabel: langLabel,
        applyDocumentLang: applyDocumentLang,
        ensureCjkFont: ensureCjkFont,
        applyThemedImages: applyThemedImages
    };
})();
