/* ============================================
   Mark'd Website - Main Application Entry
   ============================================ */

// App State (will be initialized by modules)
let currentTheme = 'light';
let currentLang = 'en';

// Make state accessible globally for debugging
window.currentLang = currentLang;
window.currentTheme = currentTheme;

// Main App Object
window.MarkdApp = {
    getCurrentLang: () => window.MarkdI18n ? window.MarkdI18n.getCurrentLang() : currentLang,
    getCurrentTheme: () => window.MarkdTheme ? window.MarkdTheme.getCurrentTheme() : currentTheme,
    toggleTheme: () => window.MarkdTheme ? window.MarkdTheme.toggle() : null,
    toggleLanguage: () => window.MarkdI18n ? window.MarkdI18n.toggle() : null,
    getTranslation: (key) => window.MarkdI18n ? window.MarkdI18n.getTranslation(key) : key,
    createIcon: (name, size) => window.MarkdIcons ? window.MarkdIcons.createIcon(name, size) : ''
};

// Initialize App
function initApp() {
    // Initialize theme
    if (window.MarkdTheme) {
        window.MarkdTheme.init();
        currentTheme = window.MarkdTheme.getCurrentTheme();
        window.currentTheme = currentTheme;
    }

    // Initialize language
    if (window.MarkdI18n) {
        window.MarkdI18n.init();
        currentLang = window.MarkdI18n.getCurrentLang();
        window.currentLang = currentLang;
    }

    // Setup event listeners
    setupEventListeners();

    // Initialize scroll animations
    if (window.MarkdAnimations) {
        window.MarkdAnimations.init();
    }
}

// Event Listeners
function setupEventListeners() {
    // Theme toggle
    const themeButtons = document.querySelectorAll('.theme-toggle');
    themeButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            if (window.MarkdTheme) {
                window.MarkdTheme.toggle();
                currentTheme = window.MarkdTheme.getCurrentTheme();
                window.currentTheme = currentTheme;
            }
        });
    });

    // Language toggle - show dropdown instead of cycling
    const langButtons = document.querySelectorAll('.lang-toggle');
    langButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            if (window.MarkdI18n) {
                // Toggle dropdown menu
                window.MarkdI18n.toggleDropdown();
            }
        });
    });
    
    // Initialize language dropdown
    if (window.MarkdI18n) {
        window.MarkdI18n.initDropdown();
    }
    
    if (langButtons.length === 0) {
        console.warn('No language toggle buttons found!');
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Initialize when DOM is ready
function initializeApp() {
    try {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                console.log('DOM loaded, initializing app...');
                initApp();
            });
        } else {
            // DOM already loaded, initialize immediately
            console.log('DOM ready, initializing app immediately...');
            initApp();
        }
    } catch (error) {
        console.error('Error initializing app:', error);
    }
}

// Start initialization
initializeApp();

console.log('MarkdApp initialized:', window.MarkdApp ? 'Yes' : 'No');
