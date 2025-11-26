/* ============================================
   Mark'd Website - English Translations
   ============================================ */

const translationsEn = {
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
            scan: { title: "scan & mark", desc: "Point your camera at a barcode. Mark'd recognizes the product instantly, fusing digital data with reality." },
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
            "You encounter a bottle of wine, a café, a scent.\nIt might be just a fleeting experience, or it could be the beginning of a memory.",
            "Mark'd lets you preserve them in the lightest moment.\nNo posting, no likes, no explanations needed. You write down your own feelings, leaving an answer for your future self.",
            "This is not a social platform designed for others. It's a private library where your preferences are stored.",
            "When you look back at your records, you'll discover\nit's not that the world changed you, but that you've begun to understand yourself more clearly."
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
                    "scan & mark: Point your camera at a barcode to instantly recognize products and add them to your library.",
                "Visual Memory: Capture photos with zero compression, preserving the moment exactly as you experienced it.",
                "Personal Ratings: Rate items based on your own preferences, not public opinion.",
                "Private Reflection: Add notes and thoughts that only you can see.",
                "Share When You Want: Generate beautiful share cards to show friends, but only when you choose to."
            ]
        },
            team: {
                title: "Behind Mark'd",
                content: "We believe in the power of personal reflection and authentic taste. We're not trying to build the next social network—we're building a tool for you to understand yourself better."
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
};

// Export to global namespace
if (typeof window !== 'undefined') {
    window.translationsEn = translationsEn;
}



