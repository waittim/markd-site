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

    // App Store download button tracking (GA4 optimized)
    // Note: This runs after DOM is loaded (via initializeApp -> initApp -> setupEventListeners)
    const appStoreButtons = document.querySelectorAll('.app-store-btn');
    appStoreButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const href = this.getAttribute('href') || '';
            const buttonText = this.textContent.trim() || 'App Store Download';
            
            // If gtag is not available, allow normal navigation
            if (typeof gtag === 'undefined') {
                return; // Let the default link behavior proceed
            }
            
            // Prevent default navigation to ensure event is sent
            e.preventDefault();
            
            // Flag to prevent double navigation
            let navigated = false;
            const safeNavigate = () => {
                if (!navigated) {
                    navigated = true;
                    window.location.href = href;
                }
            };
            
            // Send GA4 event with custom event name and parameters
            gtag('event', 'app_store_click', {
                button_text: buttonText,
                link_url: href,
                link_type: 'app_store_badge',
                value: 1,
                event_callback: () => {
                    // Navigate after event is confirmed sent
                    safeNavigate();
                }
            });
            
            // Fallback: navigate after 150ms if callback doesn't fire
            setTimeout(safeNavigate, 150);
        });
    });

    // Navbar download button tracking (GA4 optimized)
    // Handles both anchor links (page scroll) and external links (navigation)
    const navbarDownloadButtons = document.querySelectorAll('.navbar-download-btn');
    navbarDownloadButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const href = this.getAttribute('href') || '';
            const buttonText = this.textContent.trim() || 'Download';
            
            // If gtag is not available, allow normal navigation
            if (typeof gtag === 'undefined') {
                return; // Let the default link behavior proceed
            }
            
            // Check if it's an anchor link (starts with #) or relative link with anchor
            // External links start with http:// or https://
            const isAnchorLink = href.startsWith('#') || 
                                (href.includes('#') && !href.startsWith('http://') && !href.startsWith('https://'));
            
            if (isAnchorLink) {
                // For anchor links, allow default scroll behavior but still track the event
                gtag('event', 'navbar_download_click', {
                    button_text: buttonText,
                    link_url: href,
                    link_type: 'navbar_anchor',
                    value: 1
                });
                // Let the default anchor link behavior proceed (smooth scroll)
                return;
            } else {
                // For external links, prevent default and ensure event is sent before navigation
                e.preventDefault();
                
                // Flag to prevent double navigation
                let navigated = false;
                const safeNavigate = () => {
                    if (!navigated) {
                        navigated = true;
                        window.location.href = href;
                    }
                };
                
                // Send GA4 event with custom event name and parameters
                gtag('event', 'navbar_download_click', {
                    button_text: buttonText,
                    link_url: href,
                    link_type: 'navbar_external',
                    value: 1,
                    event_callback: () => {
                        // Navigate after event is confirmed sent
                        safeNavigate();
                    }
                });
                
                // Fallback: navigate after 150ms if callback doesn't fire
                setTimeout(safeNavigate, 150);
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
