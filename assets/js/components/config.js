/* ============================================
   Mark'd Website - Component Configuration
   ============================================ */

(function() {
    'use strict';

    /**
     * Default component configuration
     */
    const defaultConfig = {
        navbar: {
            downloadLink: '#download',
            showBrand: true,
            showDownload: true
        },
        footer: {
            showBrand: true,
            showLinks: true,
            showControls: true,
            showCopyright: true
        }
    };

    /**
     * Get component configuration from data attributes
     * @param {string} componentName - Name of the component
     * @returns {Object} Configuration object
     */
    function getConfig(componentName) {
        const body = document.body;
        const config = { ...defaultConfig[componentName] };

        // Get config from data attributes
        const dataPrefix = `data-${componentName}-`;
        Array.from(body.attributes).forEach(attr => {
            if (attr.name.startsWith(dataPrefix)) {
                const key = attr.name.replace(dataPrefix, '').replace(/-([a-z])/g, (g) => g[1].toUpperCase());
                const value = attr.value === 'true' ? true : attr.value === 'false' ? false : attr.value;
                config[key] = value;
            }
        });

        return config;
    }

    /**
     * Merge user config with default config
     * @param {string} componentName - Name of the component
     * @param {Object} userConfig - User configuration
     * @returns {Object} Merged configuration
     */
    function mergeConfig(componentName, userConfig = {}) {
        const defaultConfigForComponent = defaultConfig[componentName] || {};
        return { ...defaultConfigForComponent, ...userConfig };
    }

    // Export to global namespace
    if (typeof window !== 'undefined') {
        window.MarkdComponentConfig = {
            getConfig,
            mergeConfig,
            defaultConfig
        };
    }
})();




