/* ============================================
   Mark'd Website - Translations Loader
   Dynamic loading of translations by language
   ============================================ */

(function() {
    'use strict';

    const translationsCache = {};
    const supportedLangs = ['en', 'zh', 'zh-TW'];

    function getLoadedTranslation(lang) {
        const translationMap = {
            'en': window.translationsEn,
            'zh': window.translationsZh,
            'zh-TW': window.translationsZhTW
        };

        return translationMap[lang];
    }

    function getCanonicalTranslation(lang) {
        return window.translations?.[lang];
    }

    function isCompleteTranslation(translation) {
        return Boolean(
            translation &&
            translation.nav &&
            translation.hero &&
            translation.features &&
            translation.cta
        );
    }

    function loadCanonicalTranslations(lang) {
        const loaded = getCanonicalTranslation(lang);
        if (isCompleteTranslation(loaded)) {
            translationsCache[lang] = loaded;
            return Promise.resolve(loaded);
        }

        return new Promise((resolve, reject) => {
            const existingScript = document.querySelector('script[src="assets/js/translations.js"]');
            const resolveFromGlobal = () => {
                const translation = getCanonicalTranslation(lang);
                if (isCompleteTranslation(translation)) {
                    translationsCache[lang] = translation;
                    resolve(translation);
                } else {
                    reject(new Error(`Canonical translation for '${lang}' not found`));
                }
            };

            if (existingScript) {
                existingScript.addEventListener('load', resolveFromGlobal, { once: true });
                existingScript.addEventListener('error', () => reject(new Error('Failed to load canonical translations')), { once: true });
                return;
            }

            const script = document.createElement('script');
            script.src = 'assets/js/translations.js';
            script.onload = resolveFromGlobal;
            script.onerror = () => reject(new Error('Failed to load canonical translations'));
            document.head.appendChild(script);
        });
    }

    /**
     * Load translation file for a specific language
     * @param {string} lang - Language code
     * @returns {Promise<Object>} Translations object
     */
    function loadTranslation(lang) {
        // Check cache first
        if (translationsCache[lang]) {
            return Promise.resolve(translationsCache[lang]);
        }

        const loaded = getCanonicalTranslation(lang);
        if (isCompleteTranslation(loaded)) {
            translationsCache[lang] = loaded;
            return Promise.resolve(loaded);
        }

        // Validate language
        if (!supportedLangs.includes(lang)) {
            console.warn(`Unsupported language: ${lang}, falling back to 'en'`);
            lang = 'en';
        }

        return loadCanonicalTranslations(lang).catch(() => loadSplitTranslation(lang));
    }

    function loadSplitTranslation(lang) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = `assets/js/translations/${lang}.js`;
            script.onload = () => {
                const translation = getLoadedTranslation(lang);
                if (isCompleteTranslation(translation)) {
                    translationsCache[lang] = translation;
                    resolve(translation);
                } else {
                    loadCanonicalTranslations(lang).then(resolve).catch(reject);
                }
            };
            script.onerror = () => {
                console.error(`Failed to load translation for '${lang}'`);
                // Fallback to English
                if (lang !== 'en') {
                    loadTranslation('en').then(resolve).catch(() => {
                        loadCanonicalTranslations(lang).then(resolve).catch(reject);
                    });
                } else {
                    loadCanonicalTranslations(lang).then(resolve).catch(reject);
                }
            };
            document.head.appendChild(script);
        });
    }

    /**
     * Initialize translations - load default language
     * @param {string} defaultLang - Default language code
     * @returns {Promise<void>}
     */
    function initTranslations(defaultLang = 'en') {
        return loadTranslation(defaultLang).then(translation => {
            // Set as current translation
            window.translations = window.translations || {};
            window.translations[defaultLang] = translation;
        }).catch(error => {
            console.error('Failed to initialize translations:', error);
        });
    }

    // Export to global namespace
    if (typeof window !== 'undefined') {
        window.MarkdTranslationsLoader = {
            load: loadTranslation,
            init: initTranslations,
            getSupportedLangs: () => supportedLangs
        };
    }
})();



