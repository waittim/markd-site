/* ============================================
   Mark'd Website - English Translations
   ============================================ */

const translationsEn = {
        nav: {
            download: "Download",
            home: "Home",
            about: "About",
            privacy: "Privacy"
        },
        a11y: {
            skip: "Skip to content",
            langToggle: "Switch language",
            langMenu: "Language",
            themeToLight: "Switch to light theme",
            themeToDark: "Switch to dark theme"
        },
    hero: {
        badge: "",
        titleLine1: "Your Life",
        titleLine2: "Library.",
        subtitlePre: "Not to record everything.",
        subtitleHighlight: "",
        subtitlePost: "To keep what matters.",
        cta: "Download"
    },
    features: {
        titleLine1: "Capture in the moment.",
        titleHighlight: "Keep for yourself.",
        titleSuffix: "",
        spotlight: {
            title: "A private life library",
            desc: "Photos, ratings, and notes stay on your device and iCloud. No feed. No public scores. Just your taste, over time."
        },
        cards: {
            scan: { title: "Scan & Mark", desc: "Point your camera at a barcode. Mark'd recognizes the product and attaches it to the moment." },
            visual: { title: "Visual Memory", desc: "Keep the mood of the moment. Photos stay sharp, with no compression tradeoffs." },
            rating: { title: "Your Rating", desc: "No public averages. No algorithmic feeds. Only your private scores and notes." },
            share: { title: "Share Cards", desc: "Automatically generate a polished share card from your photo and rating." },
            cloud: { title: "iCloud Sync", desc: "Your data lives on your device and your iCloud. Private, secure, and always in sync." }
        }
    },
    philosophy: {
        titleLine1: "Your taste,",
        titleLine2: "not the algorithm.",
        content: [
            "You encounter a bottle of wine, a café, a scent.\nIt might be just a fleeting experience, or it could be the beginning of a memory.",
            "Mark'd lets you preserve them in the lightest moment.\nNo posting, no likes, no explanations needed. You write down your own feelings, leaving an answer for your future self.",
            "This is not a social platform designed for others. It's a private library where your preferences are stored.",
            "When you look back at your records, you'll discover\nit's not that the world changed you, but that you've begun to understand yourself more clearly."
        ],
        signature: "Mark'd. Remember your experience, understand your life.",
        link: "Read our Privacy Pledge",
        visualBadge: "Private & Secure"
    },
    footer: {
        privacy: "Privacy Policy",
        terms: "Terms of Use",
        support: "Support"
    },
    cta: {
        title: "Build your library",
        subtitle: "Download Mark'd and keep a private record of what you actually like.",
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
                content: "We're not about recording everything. We're about capturing what matters: those moments, products, and experiences that shape who you are."
            }
        },
        how: {
            title: "How It Works",
            content: [
                "Mark'd makes it effortless to capture and remember your experiences:"
            ],
            list: [
                "Scan & Mark: Point your camera at a barcode to instantly recognize products and add them to your library.",
                "Visual Memory: Capture photos with zero compression, preserving the moment exactly as you experienced it.",
                "Personal Ratings: Rate items based on your own preferences, not public opinion.",
                "Private Reflection: Add notes and thoughts that only you can see.",
                "Share When You Want: Generate beautiful share cards to show friends, but only when you choose to."
            ]
        },
        team: {
            title: "Behind Mark'd",
            content: "We believe in the power of personal reflection and authentic taste. We're not trying to build the next social network. We're building a tool for you to understand yourself better."
        },
        contact: {
            title: "Get in Touch",
            content: "Have questions, feedback, or suggestions? We'd love to hear from you."
        }
    }
};

if (typeof window !== 'undefined') {
    window.translationsEn = translationsEn;
}
