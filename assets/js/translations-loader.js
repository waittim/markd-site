/* ============================================
   Mark'd Website - Translations Loader
   Dynamic loading of translations by language
   ============================================ */

(function() {
    'use strict';

    const translationsCache = {};
    const supportedLangs = ['en', 'zh', 'zh-TW'];

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

        // Validate language
        if (!supportedLangs.includes(lang)) {
            console.warn(`Unsupported language: ${lang}, falling back to 'en'`);
            lang = 'en';
        }

        // Load translation file
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = `assets/js/translations/${lang}.js`;
            script.onload = () => {
                // Get translation from global namespace
                const translationMap = {
                    'en': window.translationsEn,
                    'zh': window.translationsZh,
                    'zh-TW': window.translationsZhTW
                };
                
                const translation = translationMap[lang];
                if (translation) {
                    translationsCache[lang] = translation;
                    resolve(translation);
                } else {
                    reject(new Error(`Translation for '${lang}' not found`));
                }
            };
            script.onerror = () => {
                console.error(`Failed to load translation for '${lang}'`);
                // Fallback to English
                if (lang !== 'en') {
                    loadTranslation('en').then(resolve).catch(reject);
                } else {
                    reject(new Error('Failed to load fallback translation'));
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





