/* ============================================
   Mark'd Website - Main JavaScript
   ============================================ */

// Translations Data
const translations = {
    en: {
        nav: {
            download: "Download",
            about: "About",
            privacy: "Privacy"
        },
        hero: {
            badge: "iOS 26 Ready",
            titleLine1: "Your Life",
            titleLine2: "Library.",
            subtitlePre: "Not to record everything.",
            subtitleHighlight: "",
            subtitlePost: "But to keep what matters.",
            cta: "Download Mark'd",
            phone: {
                header: "Log",
                card1Title: "Blue Bottle",
                card1Time: "9:41 AM",
                card1Desc: "Pour Over, Ethiopia",
                card2Title: "Pinot Noir",
                card2Time: "YESTERDAY",
                card2Desc: "Burgundy, 2019",
                tagDinner: "DINNER"
            }
        },
        features: {
            titleLine1: "Designed for",
            titleHighlight: "instant capture.",
            titleSuffix: "",
            cards: {
                scan: { title: "Scan & Log", desc: "Point your camera at a barcode. Mark'd recognizes the product instantly, fusing digital data with reality." },
                visual: { title: "Visual Memory", desc: "Capture the mood. Your photos are stored with pristine quality and zero compression." },
                rating: { title: "Your Rating", desc: "No public averages. No algorithms. Just your personal preference preserved in glass." },
                share: { title: "Share Cards", desc: "Generate beautiful, crystalline images to share your finds with friends." },
                cloud: { title: "iCloud Sync", desc: "Your data lives on your device and your iCloud. Private, secure, and always in sync." }
            }
        },
        philosophy: {
            titleLine1: "Your taste,",
            titleLine2: "not the algorithm.",
            content: [
                "Mark'd has no social feed. No \"Hot Right Now\". No influencers.",
                "It is a quiet space to cultivate your own taste. Like a message in a bottle, preserved for your future self.",
                "When you look back, you don't see what was popular. You see who you were."
            ],
            signature: "Mark'd — Remember your experience, understand your life.",
            link: "Read our Privacy Pledge",
            visualBadge: "Private & Secure"
        },
        footer: {
            privacy: "Privacy Policy",
            terms: "Terms of Use",
            support: "Support"
        },
        cta: {
            title: "Start Your Journey",
            subtitle: "Download Mark'd and begin building your personal library of experiences.",
            appStore: "Download on the App Store",
            testFlight: "Try on TestFlight"
        },
        about: {
            title: "About Mark'd",
            subtitle: "A private space to cultivate your own taste and preserve your experiences.",
            mission: {
                title: "Our Mission",
                content: [
                    "Mark'd was born from a simple observation: in an age of social media and algorithmic recommendations, we've lost touch with our own authentic preferences.",
                    "We believe that your taste is personal, evolving, and worth preserving. Not for others to see, but for you to understand yourself better over time."
                ]
            },
            values: {
                title: "What We Stand For",
                privacy: {
                    title: "Privacy First",
                    content: "Your data belongs to you. Mark'd stores everything locally on your device and syncs securely through iCloud. We don't track you, we don't sell your data, and we don't show you ads."
                },
                authenticity: {
                    title: "Authentic Experience",
                    content: "No social feeds. No popularity contests. No algorithms telling you what to like. Just you, your experiences, and your honest reflections."
                },
                quality: {
                    title: "Quality Over Quantity",
                    content: "We're not about recording everything. We're about capturing what matters—those moments, products, and experiences that shape who you are."
                }
            },
            how: {
                title: "How It Works",
                content: [
                    "Mark'd makes it effortless to capture and remember your experiences:"
                ],
                list: [
                    "Scan & Log: Point your camera at a barcode to instantly recognize products and add them to your library.",
                    "Visual Memory: Capture photos with zero compression, preserving the moment exactly as you experienced it.",
                    "Personal Ratings: Rate items based on your own preferences, not public opinion.",
                    "Private Reflection: Add notes and thoughts that only you can see.",
                    "Share When You Want: Generate beautiful share cards to show friends, but only when you choose to."
                ]
            },
            team: {
                title: "Behind Mark'd",
                content: "Mark'd is built by a small team of designers and developers who believe in the power of personal reflection and authentic taste. We're not trying to build the next social network—we're building a tool for you to understand yourself better."
            },
            contact: {
                title: "Get in Touch",
                content: "Have questions, feedback, or suggestions? We'd love to hear from you."
            }
        },
        privacy: {
            title: "Privacy Policy",
            lastUpdated: "Last updated:",
            intro: {
                title: "Our Commitment to Privacy",
                content: [
                    "At Mark'd, we believe privacy is a fundamental right. This Privacy Policy explains how we collect, use, and protect your information when you use Mark'd.",
                    "By using Mark'd, you agree to the collection and use of information in accordance with this policy."
                ]
            },
            data: {
                title: "What Data We Collect",
                local: {
                    title: "Local Data",
                    content: "All your logs, photos, ratings, and notes are stored locally on your device. This data never leaves your device unless you explicitly choose to sync it via iCloud."
                },
                icloud: {
                    title: "iCloud Sync",
                    content: "If you enable iCloud sync, your data is encrypted and stored in your personal iCloud account. This data is subject to Apple's Privacy Policy and is not accessible to us."
                },
                analytics: {
                    title: "Analytics",
                    content: "We may collect anonymous usage analytics to improve the app. This data does not include any personal information or content from your logs."
                }
            },
            use: {
                title: "How We Use Your Data",
                list: [
                    "To provide and maintain the Mark'd service",
                    "To improve and optimize the app experience",
                    "To respond to your support requests"
                ],
                note: "We do not sell, rent, or share your personal data with third parties for marketing purposes."
            },
            security: {
                title: "Data Security",
                content: [
                    "We take data security seriously. All data stored locally on your device is protected by iOS security measures.",
                    "If you use iCloud sync, your data is encrypted both in transit and at rest using Apple's encryption standards."
                ]
            },
            rights: {
                title: "Your Rights",
                content: [
                    "You have the right to:"
                ],
                list: [
                    "Access all data stored in Mark'd (it's all on your device)",
                    "Delete any or all of your data at any time",
                    "Disable iCloud sync if you prefer to keep data only on your device",
                    "Export your data in a standard format"
                ]
            },
            children: {
                title: "Children's Privacy",
                content: "Mark'd is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13."
            },
            changes: {
                title: "Changes to This Policy",
                content: "We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the \"Last updated\" date."
            },
            contact: {
                title: "Contact Us",
                content: "If you have any questions about this Privacy Policy, please contact us at:"
            }
        }
    },
    zh: {
        nav: {
            download: "下载应用",
            about: "关于",
            privacy: "隐私"
        },
        hero: {
            badge: "适配 iOS 26",
            titleLine1: "你的",
            titleLine2: "生活图鉴",
            subtitlePre: "不是为了记录所有东西。",
            subtitleHighlight: "",
            subtitlePost: "而是为了留下重要的那一些。",
            cta: "下载 Mark'd",
            phone: {
                header: "记录",
                card1Title: "蓝瓶咖啡",
                card1Time: "上午 9:41",
                card1Desc: "手冲, 埃塞俄比亚",
                card2Title: "黑皮诺",
                card2Time: "昨天",
                card2Desc: "勃艮第, 2019",
                tagDinner: "晚餐"
            }
        },
        features: {
            titleLine1: "为",
            titleHighlight: "瞬间记录",
            titleSuffix: "而生。",
            cards: {
                scan: { title: "扫码即录", desc: "对准条形码。Mark'd 瞬间识别商品，将数字信息无缝融合进现实体验。" },
                visual: { title: "视觉记忆", desc: "记录当下的氛围。你的照片将以零压缩的原始画质完美保存。" },
                rating: { title: "私人评分", desc: "没有大众均分，没有算法推荐。只有凝固在玻璃般的私密评价。" },
                share: { title: "分享卡片", desc: "生成精美、晶莹剔透的分享卡片，与好友分享你的发现。" },
                cloud: { title: "iCloud 同步", desc: "数据保存在你的设备和 iCloud 中。私密、安全，时刻保持同步。" }
            }
        },
        philosophy: {
            titleLine1: "你的品味，",
            titleLine2: "而非算法。",
            content: [
                "你遇见一瓶酒、一家咖啡馆、一种香气。它可能只是短暂的体验，也可能是一段回忆的起点。",
                "Mark'd 让你在最轻的瞬间保存它们——不需要发布、不需要点赞、不需要解释。你写下自己的感受，你为未来的自己留一个答案。",
                "这不是一个为了他人设计的社交平台。而是一座存放你偏好的私人图鉴。",
                "当你回望自己的记录，你会发现——不是世界改变了你，而是你开始更清晰地理解自己。"
            ],
            signature: "Mark'd — 记住你的体验，理解你的生活。",
            link: "阅读隐私承诺",
            visualBadge: "私密且安全"
        },
        footer: {
            privacy: "隐私政策",
            terms: "使用条款",
            support: "技术支持"
        },
        cta: {
            title: "开始你的旅程",
            subtitle: "下载 Mark'd，开始构建你的个人体验图鉴。",
            appStore: "在 App Store 下载",
            testFlight: "在 TestFlight 试用"
        },
        about: {
            title: "关于 Mark'd",
            subtitle: "一个私密的空间，培养你自己的品味，保存你的体验。",
            mission: {
                title: "我们的使命",
                content: [
                    "Mark'd 源于一个简单的观察：在社交媒体和算法推荐的时代，我们失去了与自己真实偏好的联系。",
                    "我们相信你的品味是个人化的、不断演进的，值得被保存。不是为了给别人看，而是为了让你更好地理解自己。"
                ]
            },
            values: {
                title: "我们的价值观",
                privacy: {
                    title: "隐私优先",
                    content: "你的数据属于你。Mark'd 将所有内容存储在本地设备上，并通过 iCloud 安全同步。我们不追踪你，不出售你的数据，也不向你展示广告。"
                },
                authenticity: {
                    title: "真实体验",
                    content: "没有社交动态。没有人气竞赛。没有算法告诉你该喜欢什么。只有你、你的体验和你诚实的反思。"
                },
                quality: {
                    title: "质量胜过数量",
                    content: "我们不是为了记录一切。我们是为了捕捉重要的东西——那些塑造你是谁的时刻、产品和体验。"
                }
            },
            how: {
                title: "工作原理",
                content: [
                    "Mark'd 让你轻松捕捉和记住你的体验："
                ],
                list: [
                    "扫码即录：将相机对准条形码，即可瞬间识别商品并添加到你的图鉴中。",
                    "视觉记忆：以零压缩的方式拍摄照片，完全按照你体验的方式保存那一刻。",
                    "私人评分：根据你自己的偏好评分，而不是公众意见。",
                    "私密反思：添加只有你能看到的笔记和想法。",
                    "随时分享：生成精美的分享卡片展示给朋友，但只在你想分享的时候。"
                ]
            },
            team: {
                title: "Mark'd 背后",
                content: "Mark'd 由一小群设计师和开发者打造，他们相信个人反思和真实品味的力量。我们不是在尝试构建下一个社交网络——我们是在为你构建一个更好地理解自己的工具。"
            },
            contact: {
                title: "联系我们",
                content: "有问题、反馈或建议？我们很乐意听到你的声音。"
            }
        },
        privacy: {
            title: "隐私政策",
            lastUpdated: "最后更新：",
            intro: {
                title: "我们对隐私的承诺",
                content: [
                    "在 Mark'd，我们相信隐私是一项基本权利。本隐私政策说明了我们在你使用 Mark'd 时如何收集、使用和保护你的信息。",
                    "使用 Mark'd 即表示你同意根据本政策收集和使用信息。"
                ]
            },
            data: {
                title: "我们收集的数据",
                local: {
                    title: "本地数据",
                    content: "你的所有记录、照片、评分和笔记都存储在本地设备上。除非你明确选择通过 iCloud 同步，否则这些数据永远不会离开你的设备。"
                },
                icloud: {
                    title: "iCloud 同步",
                    content: "如果你启用 iCloud 同步，你的数据会被加密并存储在你的个人 iCloud 账户中。这些数据受 Apple 隐私政策约束，我们无法访问。"
                },
                analytics: {
                    title: "分析数据",
                    content: "我们可能会收集匿名使用分析数据以改进应用。这些数据不包括你记录中的任何个人信息或内容。"
                }
            },
            use: {
                title: "我们如何使用你的数据",
                list: [
                    "提供和维护 Mark'd 服务",
                    "改进和优化应用体验",
                    "响应你的支持请求"
                ],
                note: "我们不会为了营销目的向第三方出售、出租或分享你的个人数据。"
            },
            security: {
                title: "数据安全",
                content: [
                    "我们认真对待数据安全。所有存储在本地设备上的数据都受到 iOS 安全措施的保护。",
                    "如果你使用 iCloud 同步，你的数据在传输和存储时都使用 Apple 的加密标准进行加密。"
                ]
            },
            rights: {
                title: "你的权利",
                content: [
                    "你有权："
                ],
                list: [
                    "访问 Mark'd 中存储的所有数据（都在你的设备上）",
                    "随时删除任何或所有数据",
                    "如果你希望仅在设备上保留数据，可以禁用 iCloud 同步",
                    "以标准格式导出你的数据"
                ]
            },
            children: {
                title: "儿童隐私",
                content: "Mark'd 不适用于 13 岁以下的儿童。我们不会故意收集 13 岁以下儿童的个人信息。"
            },
            changes: {
                title: "政策变更",
                content: "我们可能会不时更新本隐私政策。我们会在本页发布新的隐私政策并更新\"最后更新\"日期来通知你任何变更。"
            },
            contact: {
                title: "联系我们",
                content: "如果你对本隐私政策有任何疑问，请通过以下方式联系我们："
            }
        }
    }
};

// App State
let currentTheme = 'light';
let currentLang = 'en';

// Make currentLang and currentTheme accessible globally for debugging
window.currentLang = currentLang;
window.currentTheme = currentTheme;

// Export for use in HTML (will be fully defined after functions are declared)
window.MarkdApp = {
    translations,
    getCurrentLang: () => currentLang,
    getCurrentTheme: () => currentTheme
};

// Initialize App
function initApp() {
    // Detect system theme
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    currentTheme = darkModeQuery.matches ? 'dark' : 'light';
    darkModeQuery.addEventListener('change', (e) => {
        currentTheme = e.matches ? 'dark' : 'light';
        applyTheme();
    });

    // Detect language
    if (navigator.language && navigator.language.startsWith('zh')) {
        currentLang = 'zh';
    }

    // Load saved preferences
    const savedTheme = localStorage.getItem('theme');
    const savedLang = localStorage.getItem('lang');
    if (savedTheme) currentTheme = savedTheme;
    if (savedLang) currentLang = savedLang;

    applyTheme();
    updateLanguage();
    setupEventListeners();
    animateOnScroll();
}

// Theme Management
function applyTheme() {
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
    updateThemeButton();
}

function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    window.currentTheme = currentTheme; // Update global reference
    if (window.MarkdApp) {
        window.MarkdApp.getCurrentTheme = () => currentTheme;
    }
    applyTheme();
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

// Language Management
function updateLanguage() {
    const t = translations[currentLang];
    localStorage.setItem('lang', currentLang);
    
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const value = getNestedValue(t, key);
        if (value !== undefined) {
            if (Array.isArray(value)) {
                // Handle array values (like philosophy.content, about.mission.content)
                if (key.includes('content') || key.includes('list')) {
                    // For content arrays, create paragraphs or list items
                    if (el.tagName === 'UL' || el.parentElement?.tagName === 'UL') {
                        // If parent is UL, create list items
                        el.innerHTML = value.map(item => `<li>${item}</li>`).join('');
                    } else {
                        // Otherwise create paragraphs
                        el.innerHTML = value.map(item => `<p>${item}</p>`).join('');
                    }
                } else {
                    el.innerHTML = value.join('');
                }
            } else if (el.tagName === 'INPUT' && el.type === 'button') {
                el.value = value;
            } else {
                el.textContent = value;
            }
        }
    });

    // Update language button
    const langButtons = document.querySelectorAll('.lang-toggle');
    langButtons.forEach(btn => {
        const span = btn.querySelector('.lang-text');
        if (span) {
            span.textContent = currentLang === 'en' ? '中' : 'En';
        }
    });

    // Update page title
    updatePageTitle();
}

function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'zh' : 'en';
    window.currentLang = currentLang; // Update global reference
    if (window.MarkdApp) {
        window.MarkdApp.getCurrentLang = () => currentLang;
    }
    console.log('Language switched to:', currentLang); // Debug log
    updateLanguage();
}

function getNestedValue(obj, path) {
    return path.split('.').reduce((o, p) => o && o[p], obj);
}

function updatePageTitle() {
    const t = translations[currentLang];
    const page = document.body.getAttribute('data-page');
    if (page === 'about') {
        document.title = currentLang === 'en' ? 'About - Mark\'d' : '关于 - Mark\'d';
    } else if (page === 'privacy') {
        document.title = currentLang === 'en' ? 'Privacy Policy - Mark\'d' : '隐私政策 - Mark\'d';
    } else {
        document.title = 'Mark\'d - Your Life Library';
    }
}

// Event Listeners
function setupEventListeners() {
    // Theme toggle
    const themeButtons = document.querySelectorAll('.theme-toggle');
    console.log('Found theme buttons:', themeButtons.length); // Debug
    themeButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleTheme();
        });
    });

    // Language toggle
    const langButtons = document.querySelectorAll('.lang-toggle');
    console.log('Found language buttons:', langButtons.length); // Debug
    langButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Language button clicked'); // Debug
            toggleLanguage();
        });
    });
    
    if (langButtons.length === 0) {
        console.warn('No language toggle buttons found!');
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Scroll Animations
function animateOnScroll() {
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

// SVG Icons Helper
const icons = {
    scan: '<path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"/><circle cx="12" cy="12" r="3"/>',
    camera: '<path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/>',
    star: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
    share: '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>',
    cloud: '<path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z"/>',
    smartphone: '<rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>',
    moon: '<path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>',
    sun: '<path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>',
    globe: '<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>',
    arrowRight: '<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>'
};

function createIcon(name, size = 24) {
    return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${icons[name] || ''}</svg>`;
}

// Initialize when DOM is ready
function initializeApp() {
    try {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                console.log('DOM loaded, initializing app...');
                initApp();
            });
        } else {
            // DOM already loaded, initialize immediately
            console.log('DOM ready, initializing app immediately...');
            initApp();
        }
    } catch (error) {
        console.error('Error initializing app:', error);
    }
}

// Start initialization
initializeApp();

// Complete MarkdApp export after all functions are defined
if (window.MarkdApp) {
    window.MarkdApp.toggleTheme = toggleTheme;
    window.MarkdApp.toggleLanguage = toggleLanguage;
    window.MarkdApp.createIcon = createIcon;
    window.MarkdApp.getTranslation = (key) => {
        const t = translations[currentLang];
        return getNestedValue(t, key) || key;
    };
}

console.log('MarkdApp initialized:', window.MarkdApp ? 'Yes' : 'No');

