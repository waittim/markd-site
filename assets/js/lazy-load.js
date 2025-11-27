/* ============================================
   Mark'd Website - Lazy Loading for Images
   ============================================ */

(function() {
    'use strict';

    /**
     * Initialize lazy loading for images
     */
    function initLazyLoad() {
        // Check if IntersectionObserver is supported
        if (!window.MarkdUtils || !window.MarkdUtils.supportsFeature('IntersectionObserver')) {
            // Fallback: load all images immediately
            document.querySelectorAll('img[data-src]').forEach(img => {
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
            });
            return;
        }

        // Use IntersectionObserver for lazy loading
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.dataset.src;
                    
                    if (src) {
                        // Load image
                        img.src = src;
                        img.classList.add('loaded');
                        img.removeAttribute('data-src');
                        
                        // Add error handling
                        img.addEventListener('error', () => {
                            img.classList.add('error');
                            console.warn('Failed to load image:', src);
                        });
                        
                        // Stop observing this image
                        observer.unobserve(img);
                    }
                }
            });
        }, {
            rootMargin: '50px' // Start loading 50px before image enters viewport
        });

        // Observe all images with data-src attribute
        document.querySelectorAll('img[data-src]').forEach(img => {
            // Add placeholder if not exists
            if (!img.src) {
                img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E';
            }
            imageObserver.observe(img);
        });
    }

    /**
     * Initialize lazy loading for background images
     */
    function initLazyBackground() {
        if (!window.MarkdUtils || !window.MarkdUtils.supportsFeature('IntersectionObserver')) {
            // Fallback: load all background images immediately
            document.querySelectorAll('[data-bg]').forEach(el => {
                if (el.dataset.bg) {
                    el.style.backgroundImage = `url(${el.dataset.bg})`;
                    el.removeAttribute('data-bg');
                }
            });
            return;
        }

        const bgObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const bg = el.dataset.bg;
                    
                    if (bg) {
                        el.style.backgroundImage = `url(${bg})`;
                        el.classList.add('bg-loaded');
                        el.removeAttribute('data-bg');
                        observer.unobserve(el);
                    }
                }
            });
        }, {
            rootMargin: '50px'
        });

        document.querySelectorAll('[data-bg]').forEach(el => {
            bgObserver.observe(el);
        });
    }

    /**
     * Initialize all lazy loading
     */
    function init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                initLazyLoad();
                initLazyBackground();
            });
        } else {
            initLazyLoad();
            initLazyBackground();
        }
    }

    // Initialize
    init();

    // Export to global namespace
    if (typeof window !== 'undefined') {
        window.MarkdLazyLoad = {
            init: init,
            initImages: initLazyLoad,
            initBackgrounds: initLazyBackground
        };
    }
})();





