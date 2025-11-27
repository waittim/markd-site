/* ============================================
   Mark'd Website - Performance Monitoring
   ============================================ */

(function() {
    'use strict';

    const metrics = {
        pageLoadTime: 0,
        domContentLoaded: 0,
        firstPaint: 0,
        firstContentfulPaint: 0,
        timeToInteractive: 0
    };

    /**
     * Measure page load performance
     */
    function measurePerformance() {
        if (!window.performance || !window.performance.timing) {
            console.warn('Performance API not available');
            return;
        }

        const timing = window.performance.timing;
        const navigation = window.performance.navigation;

        // Page load time
        metrics.pageLoadTime = timing.loadEventEnd - timing.navigationStart;
        metrics.domContentLoaded = timing.domContentLoadedEventEnd - timing.navigationStart;

        // Log metrics (only in development)
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            console.log('Performance Metrics:', {
                pageLoadTime: metrics.pageLoadTime + 'ms',
                domContentLoaded: metrics.domContentLoaded + 'ms',
                navigationType: navigation.type === 0 ? 'navigate' : 
                               navigation.type === 1 ? 'reload' : 
                               navigation.type === 2 ? 'back_forward' : 'other'
            });
        }

        // Check for performance issues
        if (metrics.pageLoadTime > 3000) {
            console.warn('Page load time is slow:', metrics.pageLoadTime + 'ms');
        }
    }

    /**
     * Measure paint timing (if available)
     */
    function measurePaintTiming() {
        if (!window.performance || !window.performance.getEntriesByType) {
            return;
        }

        try {
            const paintEntries = window.performance.getEntriesByType('paint');
            
            paintEntries.forEach(entry => {
                if (entry.name === 'first-paint') {
                    metrics.firstPaint = entry.startTime;
                } else if (entry.name === 'first-contentful-paint') {
                    metrics.firstContentfulPaint = entry.startTime;
                }
            });

            if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                if (metrics.firstPaint) {
                    console.log('First Paint:', metrics.firstPaint.toFixed(2) + 'ms');
                }
                if (metrics.firstContentfulPaint) {
                    console.log('First Contentful Paint:', metrics.firstContentfulPaint.toFixed(2) + 'ms');
                }
            }
        } catch (e) {
            // Paint Timing API not supported
        }
    }

    /**
     * Measure resource loading
     */
    function measureResourceLoading() {
        if (!window.performance || !window.performance.getEntriesByType) {
            return;
        }

        try {
            const resources = window.performance.getEntriesByType('resource');
            const slowResources = resources.filter(resource => resource.duration > 1000);
            
            if (slowResources.length > 0 && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
                console.warn('Slow resources detected:', slowResources.map(r => ({
                    name: r.name.split('/').pop(),
                    duration: r.duration.toFixed(2) + 'ms'
                })));
            }
        } catch (e) {
            // Resource Timing API not fully supported
        }
    }

    /**
     * Get performance metrics
     * @returns {Object} Performance metrics
     */
    function getMetrics() {
        return { ...metrics };
    }

    /**
     * Initialize performance monitoring
     */
    function init() {
        // Measure when page loads
        if (document.readyState === 'complete') {
            measurePerformance();
            measurePaintTiming();
            measureResourceLoading();
        } else {
            window.addEventListener('load', () => {
                measurePerformance();
                measurePaintTiming();
                measureResourceLoading();
            });
        }

        // Measure paint timing (may be available earlier)
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', measurePaintTiming);
        } else {
            measurePaintTiming();
        }
    }

    // Initialize
    init();

    // Export to global namespace
    if (typeof window !== 'undefined') {
        window.MarkdPerformance = {
            init,
            getMetrics,
            measurePerformance,
            measurePaintTiming,
            measureResourceLoading
        };
    }
})();





