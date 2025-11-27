/* ============================================
   Mark'd Website - Scroll Animations
   ============================================ */

(function() {
    'use strict';

    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in-up').forEach(el => {
            observer.observe(el);
        });
    }

    // Export to global namespace
    if (typeof window !== 'undefined') {
        window.MarkdAnimations = {
            init: initScrollAnimations
        };
    }
})();





