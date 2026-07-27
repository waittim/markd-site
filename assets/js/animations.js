/* ============================================
   Mark'd Website - Scroll Animations
   ============================================ */

(function() {
    'use strict';

    // Hero entrances are CSS-driven via .fade-in-up on first paint.
    // Kept as a no-op export so callers remain stable.
    function initScrollAnimations() {}

    if (typeof window !== 'undefined') {
        window.MarkdAnimations = {
            init: initScrollAnimations
        };
    }
})();
