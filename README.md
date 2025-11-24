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
├── template.html           # Original template (reference)
├── CNAME                   # GitHub Pages custom domain
├── README.md               # This file
├── PROJECT_STRUCTURE.md    # Detailed project documentation
├── LOCAL_VIEWING.md        # Local viewing guide
│
└── assets/
    ├── css/
    │   └── style.css       # Main stylesheet (all styles)
    │
    ├── js/
    │   └── main.js         # Main JavaScript (i18n, theme, interactions)
    │
    └── images/
        └── (placeholder for App Store badge)
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

## 🔧 JavaScript Features

### main.js
- **Theme Management**: Auto-detect system theme, manual toggle, localStorage persistence
- **Language Management**: Auto-detect browser language, manual toggle, localStorage persistence
- **i18n System**: Data-driven translations with `data-i18n` attributes
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

- All styles are in `style.css` (no Tailwind dependency)
- All JavaScript is vanilla JS (no React/frameworks)
- Icons are inline SVG (no icon library)
- Fonts loaded from Google Fonts CDN
- No build process required - pure static files

