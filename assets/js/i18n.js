/* ============================================
   Mark'd Website - Internationalization (i18n)
   ============================================ */

(function () {
    'use strict';

    const supportedLangs = (window.MarkdBoot && Array.isArray(window.MarkdBoot.supportedLangs))
        ? window.MarkdBoot.supportedLangs.slice()
        : ['en', 'zh', 'zh-TW'];

    let currentLang = 'en';
    let dropdownBound = false;

    function storageSet(key, value) {
        try {
            localStorage.setItem(key, value);
        } catch (e) {}
    }

    function langLabel(lang) {
        if (window.MarkdBoot && typeof window.MarkdBoot.langLabel === 'function') {
            return window.MarkdBoot.langLabel(lang);
        }
        if (lang === 'zh') return '简';
        if (lang === 'zh-TW') return '繁';
        return 'En';
    }

    function getNestedValue(obj, path) {
        return path.split('.').reduce((current, key) => current && current[key], obj);
    }

    function initLanguage() {
        const preset = document.documentElement.getAttribute('data-lang');
        if (supportedLangs.includes(preset)) {
            currentLang = preset;
        } else if (window.MarkdBoot && typeof window.MarkdBoot.detectLang === 'function') {
            currentLang = window.MarkdBoot.detectLang();
        }

        updateLanguage(false);
    }

    function setTranslatedContent(el, value) {
        if (Array.isArray(value)) {
            while (el.firstChild) el.removeChild(el.firstChild);
            if (el.tagName === 'UL') {
                value.forEach((item) => {
                    const li = document.createElement('li');
                    li.textContent = String(item);
                    el.appendChild(li);
                });
                return;
            }
            value.forEach((item) => {
                String(item).split('\n\n').forEach((paragraph) => {
                    const p = document.createElement('p');
                    const lines = paragraph.split('\n');
                    lines.forEach((line, index) => {
                        if (index > 0) p.appendChild(document.createElement('br'));
                        p.appendChild(document.createTextNode(line));
                    });
                    el.appendChild(p);
                });
            });
            return;
        }

        if (el.tagName === 'INPUT' && el.type === 'button') {
            el.value = value;
            return;
        }

        el.textContent = value;
    }

    function updateLanguage(saveAsManual = true) {
        if (saveAsManual) {
            storageSet('lang', currentLang);
            storageSet('lang_manual', 'true');
        }

        if (window.MarkdBoot && typeof window.MarkdBoot.applyDocumentLang === 'function') {
            window.MarkdBoot.applyDocumentLang(currentLang);
        }

        if (!window.translations) {
            console.warn('Translations dictionary not loaded');
            return;
        }

        let t = window.translations[currentLang];
        if (!t) {
            console.warn(`Translations for language '${currentLang}' not found, falling back to English`);
            if (currentLang !== 'en' && window.translations.en) {
                currentLang = 'en';
                t = window.translations.en;
                if (window.MarkdBoot && typeof window.MarkdBoot.applyDocumentLang === 'function') {
                    window.MarkdBoot.applyDocumentLang(currentLang);
                }
            } else {
                return;
            }
        }

        document.querySelectorAll('[data-i18n]').forEach((el) => {
            const key = el.getAttribute('data-i18n');
            const value = getNestedValue(t, key);
            if (value !== undefined) setTranslatedContent(el, value);
        });

        document.querySelectorAll('[data-i18n-aria-label]').forEach((el) => {
            if (el.classList.contains('theme-toggle')) return;
            const key = el.getAttribute('data-i18n-aria-label');
            const value = getNestedValue(t, key);
            if (typeof value === 'string') el.setAttribute('aria-label', value);
        });

        document.querySelectorAll('.lang-toggle').forEach((btn) => {
            const span = btn.querySelector('.lang-text');
            if (span) span.textContent = langLabel(currentLang);
        });

        updateLanguageDropdown();

        if (window.MarkdTheme && typeof window.MarkdTheme.refreshLabels === 'function') {
            window.MarkdTheme.refreshLabels();
        }

        updatePageTitle();
    }

    function setLanguage(lang) {
        if (supportedLangs.includes(lang) && lang !== currentLang) {
            currentLang = lang;
            updateLanguage(true);
            closeLanguageDropdown();
        }
    }

    function setDropdownExpanded(expanded) {
        document.querySelectorAll('.lang-toggle').forEach((btn) => {
            btn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
        });
    }

    function toggleLanguageDropdown() {
        const dropdowns = document.querySelectorAll('.lang-dropdown');
        let anyActive = false;
        dropdowns.forEach((dropdown) => {
            const willOpen = !dropdown.classList.contains('active');
            dropdown.classList.toggle('active', willOpen);
            if (willOpen) anyActive = true;
        });
        setDropdownExpanded(anyActive);
    }

    function closeLanguageDropdown() {
        document.querySelectorAll('.lang-dropdown').forEach((dropdown) => {
            dropdown.classList.remove('active');
        });
        setDropdownExpanded(false);
    }

    function menuLabel() {
        const translated = window.translations
            && window.translations[currentLang]
            && getNestedValue(window.translations[currentLang], 'a11y.langMenu');
        return translated || 'Language';
    }

    function updateLanguageDropdown() {
        const label = menuLabel();
        document.querySelectorAll('.lang-dropdown').forEach((dropdown) => {
            dropdown.setAttribute('aria-label', label);
            dropdown.querySelectorAll('.lang-option').forEach((option) => {
                const lang = option.getAttribute('data-lang');
                const selected = lang === currentLang;
                option.classList.toggle('active', selected);
                option.setAttribute('aria-selected', selected ? 'true' : 'false');
            });
        });
    }

    function initLanguageDropdown() {
        document.querySelectorAll('.lang-toggle').forEach((btn, index) => {
            if (btn.parentElement.querySelector('.lang-dropdown')) return;

            const dropdownId = `lang-dropdown-${index}`;
            btn.setAttribute('aria-haspopup', 'listbox');
            btn.setAttribute('aria-expanded', 'false');
            btn.setAttribute('aria-controls', dropdownId);

            const dropdown = document.createElement('div');
            dropdown.className = 'lang-dropdown';
            dropdown.id = dropdownId;
            dropdown.setAttribute('role', 'listbox');
            dropdown.setAttribute('aria-label', menuLabel());

            supportedLangs.forEach((lang) => {
                const option = document.createElement('button');
                option.className = 'lang-option';
                option.type = 'button';
                option.setAttribute('role', 'option');
                option.setAttribute('data-lang', lang);
                option.setAttribute('aria-selected', lang === currentLang ? 'true' : 'false');
                option.textContent = langLabel(lang);
                if (lang === currentLang) option.classList.add('active');
                option.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setLanguage(lang);
                });
                dropdown.appendChild(option);
            });

            btn.parentElement.style.position = 'relative';
            btn.parentElement.appendChild(dropdown);
        });

        if (!dropdownBound) {
            dropdownBound = true;
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.lang-toggle') && !e.target.closest('.lang-dropdown')) {
                    closeLanguageDropdown();
                }
            });
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') closeLanguageDropdown();
            });
        }
    }

    function updatePageTitle() {
        if (!window.translations || !window.translations[currentLang]) return;
        const page = document.body.getAttribute('data-page') || 'home';
        const value = getNestedValue(window.translations[currentLang], 'meta.title.' + page);
        if (typeof value === 'string' && value) document.title = value;
    }

    function getCurrentLang() {
        return currentLang;
    }

    function getTranslation(key) {
        if (!window.translations || !window.translations[currentLang]) return key;
        return getNestedValue(window.translations[currentLang], key) || key;
    }

    if (typeof window !== 'undefined') {
        window.MarkdI18n = {
            init: initLanguage,
            setLanguage: setLanguage,
            toggleDropdown: toggleLanguageDropdown,
            closeDropdown: closeLanguageDropdown,
            initDropdown: initLanguageDropdown,
            getCurrentLang: getCurrentLang,
            getTranslation: getTranslation,
            t: getTranslation,
            update: updateLanguage
        };
    }
})();
