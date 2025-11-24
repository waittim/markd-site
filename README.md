# Mark'd Website

Website for Mark'd App - A beautiful, responsive static website with modern design features.

## ✨ Features

- 🎨 **Liquid Glass Morphism Design** - Modern, elegant UI with glassmorphism effects
- 🌓 **Dark/Light Theme Toggle** - Automatic system theme detection with manual override
- 🌍 **Bilingual Support** - English/Chinese (简体中文) language switching
- 📱 **Fully Responsive** - Mobile-first design that works on all devices
- ✨ **Smooth Animations** - Scroll-triggered fade-in animations
- 🚀 **Zero Dependencies** - Pure HTML, CSS, and vanilla JavaScript (except Google Fonts)
- ⚡ **Fast Loading** - No build process, pure static files

## 📁 Project Structure

```
markd-site/
├── index.html              # Homepage
├── about.html              # About page
├── privacy.html            # Privacy Policy page
├── CNAME                   # GitHub Pages custom domain
├── README.md               # This file
├── ARCHITECTURE_ANALYSIS.md # Architecture analysis and improvements
├── archive/                 # Archived files
│   └── template.html       # Original React template (archived)
│
└── assets/
    ├── css/
    │   └── style.css       # Main stylesheet (all styles)
    │
    ├── js/
    │   ├── components/     # Reusable HTML components
    │   │   ├── navbar.js   # Navigation bar component
    │   │   ├── footer.js   # Footer component
    │   │   └── index.js    # Component loader
    │   ├── translations/  # Translation files (optional, for future use)
    │   │   ├── en.js
    │   │   ├── zh.js
    │   │   └── zh-TW.js
    │   ├── error-handler.js # Global error handling
    │   ├── translations.js  # All translations (backward compatible)
    │   ├── translations-loader.js # Dynamic translation loader
    │   ├── icons.js         # Icon helper
    │   ├── theme.js         # Theme management
    │   ├── i18n.js          # Internationalization
    │   ├── animations.js    # Scroll animations
    │   └── main.js         # Main application entry
    │
    └── images/
        └── (app icons and screenshots)
```

## 🎨 Design System

### Color Scheme

**Light Mode:**
- Primary BG: `#F2F2F7`
- Secondary BG: `#FFFFFF`
- Text Primary: `#1D1D1F`
- Accent: `#7AA4FF`

**Dark Mode:**
- Primary BG: `#000000`
- Secondary BG: `#1C1C1E`
- Text Primary: `#F5F5F7`
- Accent: `#6080C7`

### Typography
- **Primary Font**: SF Pro Text / Inter / Noto Sans SC
- **Display Font**: SF Pro Display (750 weight)
- **Font Sizes**: Responsive using `clamp()`

## 📄 Pages

### index.html
Main landing page with:
- Hero section with phone mockup
- Features grid
- Philosophy section
- CTA section
- Footer

### about.html
About page with:
- Mission statement
- Company values
- How it works
- Team info
- Contact information

### privacy.html
Privacy Policy page with:
- Data collection info
- Usage policies
- Security measures
- User rights
- Contact for privacy concerns

## 🔧 JavaScript Architecture

### Component System
- **Components**: Reusable HTML components (navbar, footer) to eliminate code duplication
- **Component Loader**: Automatic component injection on page load
- **Component Config**: Configuration system for customizing component behavior
- **Configurable Options**: Components support configuration via data attributes or JavaScript options

### Core Modules
- **error-handler.js**: Global error handling and module dependency checking
- **utils.js**: Utility functions (debounce, throttle, viewport checking, etc.)
- **performance.js**: Performance monitoring and metrics collection
- **lazy-load.js**: Image lazy loading for improved performance
- **theme.js**: Theme management with auto-detect system theme, manual toggle, localStorage persistence
- **i18n.js**: Internationalization with auto-detect browser language, manual toggle, localStorage persistence
- **translations.js**: All translations in one file (backward compatible)
- **translations-loader.js**: Dynamic translation loader for future optimization (optional)
- **animations.js**: Scroll-triggered fade-in animations using Intersection Observer
- **icons.js**: SVG icon helper functions
- **main.js**: Main application entry point and event coordination

### Features
- **Component-based**: Reusable HTML components eliminate duplication
- **Error Handling**: Global error handling with module dependency checking
- **i18n System**: Data-driven translations with `data-i18n` attributes
- **Theme System**: Automatic system theme detection with manual override
- **Scroll Animations**: Intersection Observer for fade-in effects
- **SVG Icons**: Inline SVG icons (no external dependencies)

## 🚀 Local Development

### Method 1: Direct Open (Simplest)
1. Find the project folder in Finder
2. Double-click `index.html`
3. Opens in default browser

**Note**: This method may encounter path issues. If styles or scripts don't load, use Method 2.

### Method 2: Python Local Server (Recommended)

**macOS/Linux:**
```bash
# Navigate to project directory
cd /Users/waittim/Documents/GitHub/markd-site

# Python 3
python3 -m http.server 8000

# Or Python 2
python -m SimpleHTTPServer 8000
```

Then visit: http://localhost:8000

**Stop server:** Press `Ctrl + C`

### Method 3: Node.js http-server

If you have Node.js installed:

```bash
# Install http-server (one time only)
npm install -g http-server

# Run in project directory
cd /Users/waittim/Documents/GitHub/markd-site
http-server -p 8000
```

Visit: http://localhost:8000

### Method 4: VS Code Live Server Extension
1. Install "Live Server" extension in VS Code
2. Right-click `index.html`
3. Select "Open with Live Server"

## 📦 Deployment

### GitHub Pages
1. Push to `main` branch
2. Enable GitHub Pages in repository settings
3. Select `main` branch as source
4. Site will be available at `https://[username].github.io/markd-site/`

### Custom Domain
- Add domain to `CNAME` file
- Configure DNS records as per GitHub Pages instructions

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🌐 Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- iOS Safari 12+
- Android Chrome 80+

## 📝 Technical Notes

### Architecture Improvements
- **Component System**: HTML components (navbar, footer) are now reusable, eliminating code duplication
- **Error Handling**: Global error handler monitors module loading and JavaScript errors
- **Modular Design**: JavaScript is organized into focused modules for better maintainability
- **Backward Compatible**: All existing functionality preserved while improving code organization

### Technology Stack
- All styles are in `style.css` (no Tailwind dependency)
- All JavaScript is vanilla JS (no React/frameworks)
- Icons are inline SVG (no icon library)
- Fonts loaded from Google Fonts CDN
- No build process required - pure static files

### File Organization
- Components in `assets/js/components/` for reusable HTML
- Modules in `assets/js/` for core functionality
- Translations can be split by language (optional optimization)
- See `ARCHITECTURE_ANALYSIS.md` for detailed architecture documentation

