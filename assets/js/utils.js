/* ============================================
   Mark'd Website - Utility Functions
   ============================================ */

(function() {
    'use strict';

    /**
     * Debounce function - delays function execution
     * @param {Function} func - Function to debounce
     * @param {number} wait - Wait time in milliseconds
     * @returns {Function} Debounced function
     */
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    /**
     * Throttle function - limits function execution rate
     * @param {Function} func - Function to throttle
     * @param {number} limit - Time limit in milliseconds
     * @returns {Function} Throttled function
     */
    function throttle(func, limit) {
        let inThrottle;
        return function executedFunction(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    /**
     * Check if element is in viewport
     * @param {Element} element - DOM element
     * @param {number} threshold - Threshold percentage (0-1)
     * @returns {boolean} True if element is in viewport
     */
    function isInViewport(element, threshold = 0) {
        if (!element) return false;
        
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        const windowWidth = window.innerWidth || document.documentElement.clientWidth;
        
        const verticalVisible = rect.top < windowHeight * (1 - threshold) && rect.bottom > windowHeight * threshold;
        const horizontalVisible = rect.left < windowWidth * (1 - threshold) && rect.right > windowWidth * threshold;
        
        return verticalVisible && horizontalVisible;
    }

    /**
     * Wait for element to appear in DOM
     * @param {string} selector - CSS selector
     * @param {number} timeout - Timeout in milliseconds
     * @returns {Promise<Element>} Element when found
     */
    function waitForElement(selector, timeout = 5000) {
        return new Promise((resolve, reject) => {
            const element = document.querySelector(selector);
            if (element) {
                resolve(element);
                return;
            }

            const observer = new MutationObserver((mutations, obs) => {
                const element = document.querySelector(selector);
                if (element) {
                    obs.disconnect();
                    resolve(element);
                }
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true
            });

            setTimeout(() => {
                observer.disconnect();
                reject(new Error(`Element "${selector}" not found within ${timeout}ms`));
            }, timeout);
        });
    }

    /**
     * Get nested object value by path
     * @param {Object} obj - Object to search
     * @param {string} path - Dot-separated path (e.g., "user.profile.name")
     * @param {*} defaultValue - Default value if not found
     * @returns {*} Value at path or default value
     */
    function getNestedValue(obj, path, defaultValue = undefined) {
        const keys = path.split('.');
        let result = obj;
        
        for (const key of keys) {
            if (result === null || result === undefined || typeof result !== 'object') {
                return defaultValue;
            }
            result = result[key];
        }
        
        return result !== undefined ? result : defaultValue;
    }

    /**
     * Set nested object value by path
     * @param {Object} obj - Object to modify
     * @param {string} path - Dot-separated path
     * @param {*} value - Value to set
     */
    function setNestedValue(obj, path, value) {
        const keys = path.split('.');
        const lastKey = keys.pop();
        let current = obj;
        
        for (const key of keys) {
            if (!(key in current) || typeof current[key] !== 'object') {
                current[key] = {};
            }
            current = current[key];
        }
        
        current[lastKey] = value;
    }

    /**
     * Check if browser supports feature
     * @param {string} feature - Feature to check (e.g., "IntersectionObserver", "localStorage")
     * @returns {boolean} True if feature is supported
     */
    function supportsFeature(feature) {
        const features = {
            'IntersectionObserver': () => 'IntersectionObserver' in window,
            'localStorage': () => {
                try {
                    const test = '__localStorage_test__';
                    localStorage.setItem(test, test);
                    localStorage.removeItem(test);
                    return true;
                } catch {
                    return false;
                }
            },
            'sessionStorage': () => {
                try {
                    const test = '__sessionStorage_test__';
                    sessionStorage.setItem(test, test);
                    sessionStorage.removeItem(test);
                    return true;
                } catch {
                    return false;
                }
            }
        };

        const check = features[feature];
        return check ? check() : false;
    }

    /**
     * Safe JSON parse
     * @param {string} str - JSON string
     * @param {*} defaultValue - Default value if parse fails
     * @returns {*} Parsed value or default
     */
    function safeJsonParse(str, defaultValue = null) {
        try {
            return JSON.parse(str);
        } catch {
            return defaultValue;
        }
    }

    /**
     * Get URL parameter
     * @param {string} name - Parameter name
     * @param {string} url - URL (optional, defaults to current URL)
     * @returns {string|null} Parameter value or null
     */
    function getUrlParameter(name, url = window.location.href) {
        const urlObj = new URL(url);
        return urlObj.searchParams.get(name);
    }

    /**
     * Format file size
     * @param {number} bytes - Size in bytes
     * @returns {string} Formatted size
     */
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    }

    // Export to global namespace
    if (typeof window !== 'undefined') {
        window.MarkdUtils = {
            debounce,
            throttle,
            isInViewport,
            waitForElement,
            getNestedValue,
            setNestedValue,
            supportsFeature,
            safeJsonParse,
            getUrlParameter,
            formatFileSize
        };
    }
})();




