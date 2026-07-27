/* ============================================
   Mark'd Website - Internationalization (i18n)
   ============================================ */

(function() {
    'use strict';

    let currentLang = 'en';
    let isManualLang = false; // Track if user has manually set language
    
    // Supported languages in order
    const supportedLangs = ['en', 'zh', 'zh-TW'];
    const langLabels = {
        'en': 'En',
        'zh': '简',
        'zh-TW': '繁'
    };
    const htmlLangMap = {
        'en': 'en',
        'zh': 'zh-Hans',
        'zh-TW': 'zh-Hant'
    };

    function applyDocumentLang() {
        document.documentElement.lang = htmlLangMap[currentLang] || 'en';
    }

    function ensureCjkFont() {
        if (!String(currentLang).startsWith('zh')) return;
        if (document.getElementById('font-noto-sc')) return;
        const link = document.createElement('link');
        link.id = 'font-noto-sc';
        link.rel = 'stylesheet';
        link.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700&display=swap';
        document.head.appendChild(link);
    }

    // Initialize language from browser or localStorage
    function initLanguage() {
        // Check if user has manually set a preference
        const savedLang = localStorage.getItem('lang');
        const savedManualFlag = localStorage.getItem('lang_manual');
        
        if (savedLang && savedManualFlag === 'true' && supportedLangs.includes(savedLang)) {
            // User has manually set language, use saved preference
            currentLang = savedLang;
            isManualLang = true;
        } else {
            // No manual preference, detect from browser
            if (navigator.language) {
                const browserLang = navigator.language.toLowerCase();
                if (browserLang === 'zh-tw' || browserLang === 'zh-hant') {
                    currentLang = 'zh-TW';
                } else if (browserLang.startsWith('zh')) {
                    currentLang = 'zh';
                } else {
                    currentLang = 'en';
                }
            }
            isManualLang = false;
        }

        updateLanguage(false); // false = initial load, don't mark as manual
    }

    function updateLanguage(saveAsManual = true) {
        if (saveAsManual) {
            localStorage.setItem('lang', currentLang);
            localStorage.setItem('lang_manual', 'true');
            isManualLang = true;
        }

        applyDocumentLang();
        ensureCjkFont();

        if (!window.translations) {
            console.warn('Translations not loaded yet');
            // Try to load translations dynamically if loader is available
            if (window.MarkdTranslationsLoader) {
                window.MarkdTranslationsLoader.load(currentLang).then(translation => {
                    window.translations = window.translations || {};
                    window.translations[currentLang] = translation;
                    updateLanguage(saveAsManual);
                }).catch(error => {
                    console.error('Failed to load translation:', error);
                });
            }
            return;
        }

        const t = window.translations[currentLang];
        if (!t) {
            console.warn(`Translations for language '${currentLang}' not found`);
            // Try to load dynamically
            if (window.MarkdTranslationsLoader) {
                window.MarkdTranslationsLoader.load(currentLang).then(translation => {
                    window.translations[currentLang] = translation;
                    updateLanguage(saveAsManual);
                }).catch(error => {
                    console.error('Failed to load translation:', error);
                    // Fallback to English
                    if (currentLang !== 'en' && window.translations.en) {
                        currentLang = 'en';
                        updateLanguage(saveAsManual);
                    }
                });
            }
            return;
        }

        // Update all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const value = getNestedValue(t, key);
            if (value !== undefined) {
                if (Array.isArray(value)) {
                    // Handle array values (like philosophy.content, about.mission.content)
                    if (key.includes('content') || key.includes('list')) {
                        // For content arrays, create paragraphs or list items
                        if (el.tagName === 'UL' || el.parentElement?.tagName === 'UL') {
                            // If parent is UL, create list items
                            el.innerHTML = value.map(item => `<li>${item}</li>`).join('');
                        } else {
                            // Otherwise create paragraphs, preserving line breaks within each paragraph
                            el.innerHTML = value.map(item => {
                                // Replace \n\n with paragraph break, \n with <br>
                                const formatted = item.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>');
                                return `<p>${formatted}</p>`;
                            }).join('');
                        }
                    } else {
                        el.innerHTML = value.join('');
                    }
                } else if (el.tagName === 'INPUT' && el.type === 'button') {
                    el.value = value;
                } else {
                    el.textContent = value;
                }
            }
        });

        // Update static aria-labels from translation keys
        document.querySelectorAll('[data-i18n-aria-label]').forEach(el => {
            // Theme toggle labels are state-dependent; MarkdTheme.refreshLabels owns them
            if (el.classList.contains('theme-toggle')) {
                return;
            }
            const key = el.getAttribute('data-i18n-aria-label');
            const value = getNestedValue(t, key);
            if (typeof value === 'string') {
                el.setAttribute('aria-label', value);
            }
        });

        // Update language button (show current language)
        const langButtons = document.querySelectorAll('.lang-toggle');
        langButtons.forEach(btn => {
            const span = btn.querySelector('.lang-text');
            if (span) {
                // Show current language label
                span.textContent = langLabels[currentLang] || currentLang;
            }
        });
        
        // Update language dropdown if exists
        updateLanguageDropdown();

        // Keep theme toggle aria-label in sync with current language
        if (window.MarkdTheme && typeof window.MarkdTheme.refreshLabels === 'function') {
            window.MarkdTheme.refreshLabels();
        }

        // Update page title
        updatePageTitle();
    }

    function setLanguage(lang) {
        if (supportedLangs.includes(lang) && lang !== currentLang) {
            currentLang = lang;
            updateLanguage(true); // true = user manually toggled, save as preference
            closeLanguageDropdown();
        }
    }
    
    function toggleLanguage() {
        // For backward compatibility, cycle through languages
        const currentIndex = supportedLangs.indexOf(currentLang);
        const nextIndex = (currentIndex + 1) % supportedLangs.length;
        setLanguage(supportedLangs[nextIndex]);
    }
    
    function setDropdownExpanded(expanded) {
        document.querySelectorAll('.lang-toggle').forEach((btn) => {
            btn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
        });
    }

    function toggleLanguageDropdown() {
        const dropdowns = document.querySelectorAll('.lang-dropdown');
        let anyActive = false;
        dropdowns.forEach(dropdown => {
            const willOpen = !dropdown.classList.contains('active');
            dropdown.classList.toggle('active', willOpen);
            if (willOpen) anyActive = true;
        });
        setDropdownExpanded(anyActive);
    }
    
    function closeLanguageDropdown() {
        const dropdowns = document.querySelectorAll('.lang-dropdown');
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
        });
        setDropdownExpanded(false);
    }
    
    function updateLanguageDropdown() {
        const dropdowns = document.querySelectorAll('.lang-dropdown');
        const menuLabel = (window.translations
            && window.translations[currentLang]
            && getNestedValue(window.translations[currentLang], 'a11y.langMenu'))
            || 'Language';
        dropdowns.forEach(dropdown => {
            dropdown.setAttribute('aria-label', menuLabel);
            // Update active state for each language option
            const options = dropdown.querySelectorAll('.lang-option');
            options.forEach(option => {
                const lang = option.getAttribute('data-lang');
                if (lang === currentLang) {
                    option.classList.add('active');
                    option.setAttribute('aria-selected', 'true');
                } else {
                    option.classList.remove('active');
                    option.setAttribute('aria-selected', 'false');
                }
            });
        });
    }
    
    function initLanguageDropdown() {
        // Create dropdown menu if it doesn't exist
        const langButtons = document.querySelectorAll('.lang-toggle');
        langButtons.forEach((btn, index) => {
            // Check if dropdown already exists
            if (btn.parentElement.querySelector('.lang-dropdown')) {
                return;
            }

            const dropdownId = `lang-dropdown-${index}`;
            btn.setAttribute('aria-haspopup', 'listbox');
            btn.setAttribute('aria-expanded', 'false');
            btn.setAttribute('aria-controls', dropdownId);
            
            // Create dropdown container
            const dropdown = document.createElement('div');
            dropdown.className = 'lang-dropdown';
            dropdown.id = dropdownId;
            dropdown.setAttribute('role', 'listbox');
            const menuLabel = (window.translations
                && window.translations[currentLang]
                && getNestedValue(window.translations[currentLang], 'a11y.langMenu'))
                || 'Language';
            dropdown.setAttribute('aria-label', menuLabel);
            
            // Create language options
            supportedLangs.forEach(lang => {
                const option = document.createElement('button');
                option.className = 'lang-option';
                option.type = 'button';
                option.setAttribute('role', 'option');
                option.setAttribute('data-lang', lang);
                option.setAttribute('aria-selected', lang === currentLang ? 'true' : 'false');
                option.textContent = langLabels[lang] || lang;
                if (lang === currentLang) {
                    option.classList.add('active');
                }
                option.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setLanguage(lang);
                });
                dropdown.appendChild(option);
            });
            
            // Insert dropdown after button
            btn.parentElement.style.position = 'relative';
            btn.parentElement.appendChild(dropdown);
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.lang-toggle') && !e.target.closest('.lang-dropdown')) {
                closeLanguageDropdown();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeLanguageDropdown();
            }
        });
    }
    
    function resetToAuto() {
        // Reset to auto-detect mode
        localStorage.removeItem('lang');
        localStorage.removeItem('lang_manual');
        isManualLang = false;
        
        // Re-detect from browser
        if (navigator.language) {
            const browserLang = navigator.language.toLowerCase();
            if (browserLang === 'zh-tw' || browserLang === 'zh-hant') {
                currentLang = 'zh-TW';
            } else if (browserLang.startsWith('zh')) {
                currentLang = 'zh';
            } else {
                currentLang = 'en';
            }
        }
        updateLanguage(false);
    }
    
    function isManual() {
        return isManualLang;
    }

    function getNestedValue(obj, path) {
        // Use utility function if available, otherwise fallback
        if (window.MarkdUtils && window.MarkdUtils.getNestedValue) {
            return window.MarkdUtils.getNestedValue(obj, path);
        }
        return path.split('.').reduce((o, p) => o && o[p], obj);
    }

    function updatePageTitle() {
        if (!window.translations || !window.translations[currentLang]) {
            return;
        }

        const page = document.body.getAttribute('data-page');
        const titles = {
            'en': {
                'about': 'About - Mark\'d',
                'privacy': 'Privacy Policy - Mark\'d',
                'home': 'Mark\'d - Your Life Library'
            },
            'zh': {
                'about': '关于 - Mark\'d',
                'privacy': '隐私政策 - Mark\'d',
                'home': 'Mark\'d - Your Life Library'
            },
            'zh-TW': {
                'about': '關於 - Mark\'d',
                'privacy': '隱私政策 - Mark\'d',
                'home': 'Mark\'d - Your Life Library'
            }
        };

        const pageKey = page || 'home';
        document.title = titles[currentLang]?.[pageKey] || titles['en'][pageKey] || 'Mark\'d';
    }

    function getCurrentLang() {
        return currentLang;
    }

    function getTranslation(key) {
        if (!window.translations || !window.translations[currentLang]) {
            return key;
        }
        const t = window.translations[currentLang];
        return getNestedValue(t, key) || key;
    }

    // Export to global namespace
    if (typeof window !== 'undefined') {
        window.MarkdI18n = {
            init: initLanguage,
            toggle: toggleLanguage,
            setLanguage: setLanguage,
            toggleDropdown: toggleLanguageDropdown,
            closeDropdown: closeLanguageDropdown,
            initDropdown: initLanguageDropdown,
            getCurrentLang: getCurrentLang,
            getTranslation: getTranslation,
            update: updateLanguage,
            resetToAuto: resetToAuto,
            isManual: isManual,
            getSupportedLangs: () => supportedLangs,
            getLangLabel: (lang) => langLabels[lang] || lang
        };
    }
})();

