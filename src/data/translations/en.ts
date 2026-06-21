import type { Translations } from './ja';

export const en: Translations = {
  site: {
    name: 'Tikareta',
    tagline: "Do you know your dog's walking style?",
    description: 'Track your daily walks and discover your dog\'s unique "Walking Type"',
  },
  nav: {
    features: 'Features',
    pricing: 'Pricing',
    faq: 'FAQ',
    roadmap: 'Roadmap',
    startFree: 'Start Free',
    home: 'Home',
    mainLabel: 'Main navigation',
    howItWorks: 'How It Works',
    typeDiagnosis: 'Walking Types',
    login: 'Log In',
  },
  hero: {
    title: "Do you know\nyour dog's\nwalking style?",
    subtitle:
      "Just keep walking together. Your dog's unique walking personality will reveal itself naturally.",
    cta: 'Start Free',
    subCta: 'Sign up in 30 seconds',
    secondaryCta: 'See How It Works',
    badge: 'Spring 2026 Release / Phase 1 in Development',
    meta: ['No credit card required', 'iOS & Android', 'Family sharing'],
    floatCards: {
      streak: { label: 'Streak', value: '3 days' },
      myDog: { label: 'My dog is' },
      todayWalk: { label: "Today's Walk", duration: '30 min' },
    },
  },
  about: {
    eyebrow: 'About Tikareta',
    title: 'About Tikareta',
    lead: 'Tikareta is a mobile app (PWA) for logging your daily walks with your dog. Easily record the routes you take, the spots you visit, and your dog\'s breaks — and Tikareta visualises your dog\'s tendencies and personality, diagnosing them as a "Walking Type".',
    items: [
      {
        title: 'Log your walks',
        description: 'Record routes, spots, breaks, and more in just a few taps.',
      },
      {
        title: 'Diagnose their personality',
        description: "Automatically determine your dog's walking type from your logged data.",
      },
      {
        title: 'Connect with owners',
        description:
          'Loosely connect with owners who share similar tendencies and enjoy logging together.',
      },
    ],
  },
  valueProposition: {
    title: 'Make every walk with your dog more meaningful',
    subtitle: 'Every walk you log brings you closer to understanding your dog.',
    items: [
      {
        title: "Understand your dog's habits",
        description: "See the patterns and quirks you've always sensed but couldn't quite describe",
        icon: 'Search',
        iconType: 'lucide',
      },
      {
        title: 'Discover their personality',
        description: "Discover your dog's unique personality in a fun, easy way",
        icon: 'Target',
        iconType: 'lucide',
      },
      {
        title: 'Connect with others',
        description: 'Feel reassured knowing "you\'re not alone"',
        icon: 'Heart',
        iconType: 'lucide',
      },
    ],
  },
  howItWorks: {
    title: 'Just three simple things to do',
    subtitle: 'Log your walks in the app and discover what makes your dog unique.',
    steps: [
      {
        number: '01',
        title: 'Log your walks',
        description: 'Just note your daily walks in the app',
      },
      {
        number: '02',
        title: 'Save favourite spots',
        description: 'Save places, photos, and reasons as memories',
      },
      {
        number: '03',
        title: 'Discover Your Type!',
        description: 'Keep walking together and your dog\'s "Walking Type" will be revealed!',
      },
    ],
  },
  typeDiagnosis: {
    title: 'What Type is Your Dog?',
    subtitle: 'Discover from 8 walking types',
    cta: 'Start Diagnosis',
  },
  featureHighlights: {
    title: 'Key Features',
    subtitle: 'Start free, upgrade when you want deeper insights.',
    cta: 'See All Features',
  },
  pricingSummary: {
    title: 'Pricing Plans',
    subtitle: 'Walk tracking is free to start. Go premium for deeper insights.',
    cta: 'View Details',
    billingLabel: 'Billing cycle',
    billingMonthly: 'Monthly',
    billingYearly: 'Yearly',
    savingsTag: 'Save',
  },
  finalCTA: {
    title: 'Start Free Today',
    subtitle: 'Your walk records are always there to look back on. Try it free.',
    cta: 'Start Free',
    seePricing: 'View Pricing',
    meta: 'iOS / Android · PWA · Cancel anytime',
  },
  showcase: {
    title: 'Everything in one app.',
    subtitle: 'Walk logging, type diagnosis, memories, and community — all in Tikareta.',
    screens: ['Home', 'Walk Tracking', 'Type Diagnosis', 'Stats', 'Community'],
  },
  footer: {
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    copyright: '© 2026 Tikareta',
    tagline: "Do you know your dog's walking style? Daily walks reveal their unique personality.",
    serviceTitle: 'Services',
    appTitle: 'App',
    legalTitle: 'Legal',
    openWebApp: 'Open Web App',
    iosApp: 'iOS (Coming Soon)',
    androidApp: 'Android (Coming Soon)',
  },
  features: {
    walkTracking: {
      title: 'Walk Logging',
      description: 'Easily log your daily walks as you go',
    },
    restSpots: {
      title: 'Favourite Spot Saving',
      description: 'Save places, photos, and reason tags as memories',
    },
    weatherTracking: {
      title: 'Auto Weather Logging',
      description: 'Weather during walks is saved automatically',
    },
    allDataAccess: {
      title: 'Revisit Walks on the Map',
      description: 'Look back on your saved spots and past walks together with the home map',
    },
    basicStats: {
      title: 'Walk Recap (Last 3 Days)',
      description: 'Look back at the last 3 days of walks',
    },
    basicType: {
      title: 'Basic Type Diagnosis',
      description: "Discover your dog's personality from 8 walking types",
    },
    community: {
      title: 'Community',
      description: 'Connect with fellow dog owners via timeline and reactions',
    },
    fullStats: {
      title: 'Full Walk History',
      description: "Look back on every walk you've taken together",
    },
    detailedType: {
      title: 'Detailed Type Analysis',
      description: "Deeper insight into your dog's personality, with walking tips",
    },
    breedComparison: {
      title: 'Compare with Same Breed',
      description: 'See how your dog compares to others of the same breed',
    },
    routeSuggestion: {
      title: 'Avoid Stressful Spots',
      description: 'Get route suggestions that skip the places your dog dislikes',
    },
    heatmap: {
      title: 'Where Others Like to Stop',
      description: 'See popular spots where other owners and their dogs love to pause',
    },
    dataExport: {
      title: 'Save Your Walk Records',
      description: 'Export and keep your walk records as files',
    },
    trendAnalysis: {
      title: 'Trend Analysis',
      description:
        'Visualise month-on-month and seasonal changes. Spot how habits shift over time.',
    },
  },
  pricing: {
    plans: {
      free: {
        name: 'Free Plan',
        tagline: 'Great for getting started',
        cta: 'Start Free',
        features: {
          walkTracking: 'Walk Logging',
          restSpots: 'Favourite Spot Saving',
          weatherTracking: 'Auto Weather Logging',
          allDataAccess: 'Revisit Walks on the Map',
          basicStats: 'Walk Recap (Last 3 Days)',
          basicType: 'Basic Type Diagnosis',
          community: 'Community',
        },
      },
      standard: {
        name: 'Standard',
        tagline: 'For those who want deeper insights',
        cta: 'Start Standard',
        features: {
          allFree: 'Everything in Free',
          fullStats: 'Full Walk History',
          detailedType: 'Detailed Type Analysis',
          dataExport: 'Save Your Walk Records',
        },
      },
      pro: {
        name: 'Pro',
        tagline: 'For dedicated walking researchers',
        cta: 'Start Pro',
        features: {
          allStandard: 'Everything in Standard',
          breedComparison: 'Compare with Same Breed',
          routeSuggestion: 'Avoid Stressful Spots',
          heatmap: 'Where Others Like to Stop',
          trendAnalysis: 'Trend Analysis',
        },
      },
    },
    freeLabel: 'Free',
    perMonth: '/ month',
    perYear: '/ year',
    recommended: 'Recommended',
    savingsMonthsTemplate: 'Save {months} months',
    yearlyParenTemplate: ' ({label})',
    monthlyEquivTemplate: '≈ ¥{amount} / month',
    comparison: {
      title: 'Plan Feature Comparison',
      feature: 'Feature',
    },
  },
  walkingTypes: {
    shadeHunter: {
      name: 'Shade Hunter',
      description: 'Cautious type that seeks shade to avoid heat',
    },
    explorer: {
      name: 'Explorer',
      description: 'Loves pioneering new routes',
    },
    morningEnjoyer: {
      name: 'Morning Enjoyer',
      description: 'Enjoys morning walks the most',
    },
    shortBurst: {
      name: 'Short Burst',
      description: 'Prefers concentrated short walks',
    },
    socialButterfly: {
      name: 'Social Butterfly',
      description: 'Loves interacting with other dogs',
    },
    steadyWalker: {
      name: 'Steady Walker',
      description: 'Comfortably walks the usual route',
    },
    nightOwl: {
      name: 'Night Owl',
      description: 'Often walks in the evening or night',
    },
    weatherFlexible: {
      name: 'Weather Flexible',
      description: 'Enjoys walks regardless of weather',
    },
  },
  faq: {
    title: 'Frequently Asked Questions',
    categories: {
      basic: 'Basic Usage',
      diagnosis: 'Type Diagnosis',
      pricing: 'Pricing & Billing',
      privacy: 'Privacy & Security',
    },
    basic: {
      whatIsOsanpoType: {
        question: 'What is Tikareta?',
        answer:
          'As you log your daily walks, your dog\'s habits and personality start to emerge. From those everyday moments, Tikareta diagnoses your dog\'s unique "Walking Type". You can also save favourite spots and connect with fellow dog owners.',
      },
      howToStart: {
        question: 'How do I get started?',
        answer:
          'Click "Start Free" on the homepage to register an account (Google account), then register your dog\'s profile. Takes just 30 seconds.',
      },
      supportedDevices: {
        question: 'Which devices are supported?',
        answer:
          'Tikareta is available on iOS and Android smartphones. Since walks are tracked via GPS, smartphone use is recommended.',
      },
      deviceChange: {
        question: 'Will my data carry over if I change phones?',
        answer:
          'Yes. Your data is stored in the cloud, so as long as you log in with the same account on your new phone, your dog profile and walk history will carry over seamlessly.',
      },
      batteryUsage: {
        question: 'Will it drain my phone battery?',
        answer:
          'Using GPS does consume some battery. If that concerns you, you can also enter the walk distance and duration manually after you get home.',
      },
    },
    diagnosis: {
      whenDiagnosis: {
        question: 'When will my dog get a type?',
        answer:
          'Once you\'ve logged 7 or more walks and saved 5 or more favourite spots, your dog\'s "Walking Type" will be revealed automatically. The more you walk together, the more accurate it gets.',
      },
      typeChange: {
        question: 'Can the type change?',
        answer:
          'Yes, the type will update as walking patterns change. You can enjoy changes by season or as your dog grows.',
      },
    },
    pricing: {
      freeFeatures: {
        question: 'What can I do for free?',
        answer:
          'Logging walks, saving favourite spots, revisiting past walks on the map, a 3-day look-back, and basic type diagnosis — all free.',
      },
      dataAfterDowngrade: {
        question: 'Will I lose my walk records without premium?',
        answer:
          'No. Even on the free plan you can revisit your saved spots and past walks on the map. Only premium-specific features like detailed analysis become unavailable.',
      },
      cancelAnytime: {
        question: 'Can I cancel anytime?',
        answer:
          'Yes, you can cancel anytime. After canceling, you can continue using the free plan.',
      },
      paymentMethods: {
        question: 'What payment methods are available?',
        answer: 'Credit card payments via Stripe are supported.',
      },
    },
    privacy: {
      locationPrivacy: {
        question: 'Can others see my location data?',
        answer:
          'Walk location data is basically private. Even when shared in the community, detailed location is not displayed.',
      },
      accountDeletion: {
        question: 'How do I delete my account?',
        answer:
          'You can delete your account anytime from the in-app settings. Deletion removes your account, dog profile, and walk records, and cannot be undone.',
      },
      dataHandling: {
        question: 'How is personal data handled?',
        answer:
          'Managed appropriately according to our Privacy Policy. See the "Privacy Policy" page for details.',
      },
    },
  },
  roadmap: {
    title: 'Roadmap',
    subtitle: "Tikareta's development roadmap",
    comingSoon: 'Coming Soon',
    plannedTitle: 'Planned Features',
    released: 'Released',
    plannedItems: ['Enhanced multi-dog profile management'],
    versions: [
      {
        version: 'v1.0.0',
        date: 'March 2026 (Planned)',
        title: 'Initial Release',
        items: [
          'Walk logging (GPS / manual input)',
          'Favourite spot saving with photos',
          'Auto weather & temperature logging',
          '8 Walking Type diagnosis',
          'Community (timeline & reactions)',
          'Free / Monthly / Yearly plans',
        ],
      },
    ],
  },
  pages: {
    home: {
      title: "Tikareta - Do you know your dog's walking style?",
      description:
        'Track your daily walks and discover your dog\'s unique "Walking Type". Free walk logging, favourite spot saving, and basic type diagnosis.',
    },
    features: {
      title: 'Features | Tikareta',
      description:
        'Walk logging, favourite spot saving, type diagnosis, community, and more — everything Tikareta has to offer.',
    },
    pricing: {
      title: 'Pricing | Tikareta',
      description:
        'Free plan to ¥300/month premium. Walk logging is free; go premium for deeper insights into your dog.',
    },
    faq: {
      title: 'FAQ | Tikareta',
      description:
        'Answers to common questions about getting started, type diagnosis, pricing, and privacy.',
    },
    privacy: {
      title: 'Privacy Policy | Tikareta',
      description:
        "Tikareta's Privacy Policy — how we collect, use, and protect your personal data, including data obtained via Google OAuth sign-in and third-party services.",
    },
    terms: {
      title: 'Terms of Service | Tikareta',
      description: 'Terms of Service for Tikareta.',
    },
    roadmap: {
      title: 'Roadmap | Tikareta',
      description: "Tikareta's development roadmap. See planned features and released updates.",
    },
    notFound: {
      title: 'Page Not Found | Tikareta',
      description: 'The page you are looking for could not be found.',
      heading: 'Page Not Found',
      message: 'The page you are looking for does not exist or may have been moved.',
      backToHome: 'Back to Home',
    },
  },
  common: {
    readMore: 'Read More',
    learnMore: 'Learn More',
    getStarted: 'Get Started',
    backToTop: 'Back to Top',
    skipToContent: 'Skip to Content',
    menu: 'Menu',
    close: 'Close',
    language: 'Language',
    newTab: '(opens in new tab)',
    comingSoon: 'Coming Soon',
  },
};
