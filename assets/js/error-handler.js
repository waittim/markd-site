/* ============================================
   Mark'd Website - Global Error Handler
   ============================================ */

(function() {
    'use strict';

    /**
     * Handle global JavaScript errors
     */
    function handleGlobalError(event) {
        console.error('Global error:', event.error || event.message, event.filename, event.lineno);
        
        // In production, you might want to send this to an error tracking service
        // For now, we just log it
        
        // Prevent default browser error handling if needed
        // event.preventDefault();
    }

    /**
     * Handle unhandled promise rejections
     */
    function handleUnhandledRejection(event) {
        console.error('Unhandled promise rejection:', event.reason);
        
        // In production, you might want to send this to an error tracking service
    }

    /**
     * Check if required modules are loaded
     */
    function checkModuleDependencies() {
        const requiredModules = [
            { name: 'translations', check: () => typeof window.translations !== 'undefined' },
            { name: 'MarkdTheme', check: () => typeof window.MarkdTheme !== 'undefined' },
            { name: 'MarkdI18n', check: () => typeof window.MarkdI18n !== 'undefined' },
            { name: 'MarkdAnimations', check: () => typeof window.MarkdAnimations !== 'undefined' }
        ];

        const missingModules = requiredModules.filter(module => !module.check());
        
        if (missingModules.length > 0) {
            console.warn('Missing modules:', missingModules.map(m => m.name).join(', '));
            return false;
        }
        
        return true;
    }

    /**
     * Initialize error handling
     */
    function initErrorHandling() {
        // Global error handler
        window.addEventListener('error', handleGlobalError);
        
        // Unhandled promise rejection handler
        window.addEventListener('unhandledrejection', handleUnhandledRejection);

        // Check dependencies when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                setTimeout(checkModuleDependencies, 100);
            });
        } else {
            setTimeout(checkModuleDependencies, 100);
        }
    }

    // Initialize when script loads
    initErrorHandling();

    // Export to global namespace
    if (typeof window !== 'undefined') {
        window.MarkdErrorHandler = {
            checkDependencies: checkModuleDependencies
        };
    }
})();



