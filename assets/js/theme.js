/* ============================================
   Mark'd Website - Theme Management
   ============================================ */

(function() {
    'use strict';

    let currentTheme = 'light';
    let isManualTheme = false; // Track if user has manually set theme

    // Initialize theme from system preference or localStorage
    function initTheme() {
        const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        // Check if user has manually set a preference
        const savedTheme = localStorage.getItem('theme');
        const savedManualFlag = localStorage.getItem('theme_manual');
        
        if (savedTheme && savedManualFlag === 'true') {
            // User has manually set theme, use saved preference
            currentTheme = savedTheme;
            isManualTheme = true;
        } else {
            // No manual preference, use system preference
            currentTheme = darkModeQuery.matches ? 'dark' : 'light';
            isManualTheme = false;
        }

        // Listen for system theme changes (only if not manually set)
        darkModeQuery.addEventListener('change', (e) => {
            if (!isManualTheme) {
                currentTheme = e.matches ? 'dark' : 'light';
                applyTheme(false); // false = don't save as manual
            }
        });

        applyTheme(false); // false = initial load, don't mark as manual
    }

    function applyTheme(saveAsManual = true) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        
        if (saveAsManual) {
            // User manually changed theme, save preference
            localStorage.setItem('theme', currentTheme);
            localStorage.setItem('theme_manual', 'true');
            isManualTheme = true;
        } else {
            // Auto-detected, don't save (or clear if exists)
            // Keep current state but don't mark as manual
        }
        
        updateThemeButton();
    }

    function toggleTheme() {
        currentTheme = currentTheme === 'light' ? 'dark' : 'light';
        applyTheme(true); // true = user manually toggled, save as preference
    }
    
    function resetToAuto() {
        // Reset to auto-detect mode
        localStorage.removeItem('theme');
        localStorage.removeItem('theme_manual');
        isManualTheme = false;
        
        // Re-detect from system
        const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
        currentTheme = darkModeQuery.matches ? 'dark' : 'light';
        applyTheme(false);
    }

    function updateThemeButton() {
        const themeButtons = document.querySelectorAll('.theme-toggle');
        themeButtons.forEach(btn => {
            const icon = btn.querySelector('svg');
            if (icon) {
                if (currentTheme === 'dark') {
                    icon.innerHTML = '<path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>';
                } else {
                    icon.innerHTML = '<path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>';
                }
            }
        });
    }

    function getCurrentTheme() {
        return currentTheme;
    }

    function isManual() {
        return isManualTheme;
    }

    // Export to global namespace
    if (typeof window !== 'undefined') {
        window.MarkdTheme = {
            init: initTheme,
            toggle: toggleTheme,
            getCurrentTheme: getCurrentTheme,
            apply: applyTheme,
            resetToAuto: resetToAuto,
            isManual: isManual
        };
    }
})();

