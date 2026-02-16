import type { Translations } from './ja';

export const en: Translations = {
  site: {
    name: 'Osanpo Type',
    tagline: "Do you know your dog's walking style?",
    description:
      'A web app that records and analyzes dog walking patterns to diagnose their "walking type"',
  },
  nav: {
    features: 'Features',
    pricing: 'Pricing',
    faq: 'FAQ',
    startFree: 'Start Free',
    home: 'Home',
  },
  hero: {
    title: "Do you know\nyour dog's\nwalking style?",
    subtitle:
      'Record and analyze your dog\'s walking patterns to discover their unique "Walking Type"',
    cta: 'Start Free',
    subCta: 'Sign up in 30 seconds',
  },
  valueProposition: {
    title: 'What Osanpo Type Can Do',
    items: [
      {
        title: 'Pattern Discovery',
        description: 'Visualize walking trends you might not notice by intuition alone',
        icon: 'Search',
        iconType: 'lucide',
      },
      {
        title: 'Type Diagnosis',
        description: "Fun gamified analysis of your dog's personality",
        icon: 'Target',
        iconType: 'lucide',
      },
      {
        title: 'Community Connection',
        description: 'Feel reassured knowing "you\'re not alone"',
        icon: 'Heart',
        iconType: 'lucide',
      },
    ],
  },
  howItWorks: {
    title: 'Simple 3-Step Process',
    steps: [
      {
        number: '1',
        title: 'Record Walks',
        description: 'Track walks via GPS or manual input',
      },
      {
        number: '2',
        title: 'Register Rest Spots',
        description: 'Save locations, reasons, and photos as memories',
      },
      {
        number: '3',
        title: 'Discover Your Type!',
        description: 'Automatic diagnosis as data accumulates',
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
    cta: 'See All Features',
  },
  pricingSummary: {
    title: 'Pricing Plans',
    subtitle: 'Basic features free. Detailed analysis with premium.',
    cta: 'View Details',
  },
  testimonials: {
    title: 'User Testimonials',
    items: [
      {
        name: 'Tanaka (Shiba Inu, 3 years)',
        comment: 'I never knew my dog was a morning type! Data makes it convincing.',
        avatar: '🐕',
        avatarType: 'emoji',
      },
      {
        name: 'Sato (Toy Poodle, 5 years)',
        comment: 'Recording rest spots is fun. Photos bring back walk memories.',
        avatar: '🐩',
        avatarType: 'emoji',
      },
      {
        name: 'Suzuki (Golden Retriever, 2 years)',
        comment: 'Type diagnosis was spot on! I recommended it to friends.',
        avatar: '🦮',
        avatarType: 'emoji',
      },
    ],
  },
  finalCTA: {
    title: 'Start Free Today',
    subtitle: 'All data you enter is accessible with the free plan',
    cta: 'Start Free',
  },
  footer: {
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    copyright: '© 2026 Osanpo Type',
  },
  features: {
    walkTracking: {
      title: 'Walk Recording',
      description: 'Track walks via GPS or manual input',
    },
    restSpots: {
      title: 'Rest Spot Registration',
      description: 'Save locations, photos, and reason tags as memories',
    },
    weatherTracking: {
      title: 'Auto Weather Recording',
      description: 'Automatically log weather during walks',
    },
    allDataAccess: {
      title: 'All-Time Data Access',
      description: 'View all records even on free plan',
    },
    basicStats: {
      title: 'Basic Stats (Last 3 Days)',
      description: 'Display statistics for the last 3 days',
    },
    basicType: {
      title: 'Basic Type Diagnosis',
      description: 'Diagnose from 8 walking types',
    },
    community: {
      title: 'Community',
      description: 'Interact via timeline and reactions',
    },
    fullStats: {
      title: 'Full Statistics',
      description: 'Detailed stats for all time periods',
    },
    detailedType: {
      title: 'Detailed Type Analysis',
      description: 'In-depth personality analysis and advice',
    },
    breedComparison: {
      title: 'Breed Comparison',
      description: 'Compare with average data for the same breed',
    },
    routeSuggestion: {
      title: 'Route Suggestions',
      description: 'Suggest routes that avoid problematic spots',
    },
    heatmap: {
      title: 'Popular Rest Spots',
      description: 'Heatmap showing popular spots',
    },
    dataExport: {
      title: 'Data Export',
      description: 'Download data in CSV/JSON/PDF formats',
    },
    vetReport: {
      title: 'Vet Report Output',
      description: 'Generate reports useful for vet visits',
    },
    customShare: {
      title: 'Custom Share Cards',
      description: 'Create stylish share images',
    },
  },
  pricing: {
    plans: {
      free: {
        name: 'Free Plan',
        cta: 'Start Free',
        features: {
          walkTracking: 'Walk Recording (GPS + Manual)',
          restSpots: 'Rest Spot Registration',
          weatherTracking: 'Auto Weather Recording',
          allDataAccess: 'All-Time Data Access',
          basicStats: 'Basic Stats (Last 3 Days)',
          basicType: 'Basic Type Diagnosis',
          community: 'Community',
        },
      },
      monthly: {
        name: 'Monthly Plan',
        cta: 'Start Premium',
        features: {
          allFree: 'All Free Plan Features',
          fullStats: 'Full Statistics',
          detailedType: 'Detailed Type Analysis',
          breedComparison: 'Breed Comparison',
          routeSuggestion: 'Route Suggestions',
          heatmap: 'Popular Rest Spots',
          dataExport: 'Data Export',
          vetReport: 'Vet Report Output',
          customShare: 'Custom Share Cards',
        },
      },
      yearly: {
        name: 'Yearly Plan',
        cta: 'Start Yearly Plan',
        features: {
          allFree: 'All Free Plan Features',
          fullStats: 'Full Statistics',
          detailedType: 'Detailed Type Analysis',
          breedComparison: 'Breed Comparison',
          routeSuggestion: 'Route Suggestions',
          heatmap: 'Popular Rest Spots',
          dataExport: 'Data Export',
          vetReport: 'Vet Report Output',
          customShare: 'Custom Share Cards',
        },
      },
    },
    perMonth: '/ month',
    perYear: '/ year',
    recommended: 'Recommended',
    savings: 'Save 4 months',
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
        question: 'What is Osanpo Type?',
        answer:
          'A web app that records and analyzes dog walking patterns to diagnose their "walking type". Record walks via GPS or manual input, register rest spots, and visualize your dog\'s walking trends.',
      },
      howToStart: {
        question: 'How do I get started?',
        answer:
          'Click "Start Free" on the homepage to register an account (email or Google account), then register your dog\'s profile. Takes just 30 seconds.',
      },
      howManyDogs: {
        question: 'How many dogs can I register?',
        answer: 'Free plan allows 1 dog, premium plan allows up to 5 dogs.',
      },
      batteryUsage: {
        question: 'Does GPS tracking consume battery?',
        answer:
          'Yes, GPS tracking consumes some battery. If you want to save battery, manual input mode is also available.',
      },
    },
    diagnosis: {
      whenDiagnosis: {
        question: 'When do I get diagnosis results?',
        answer:
          'After recording 7 or more walks and registering 5 or more rest spots, the "Walking Type" will be automatically diagnosed. Accuracy improves as data increases.',
      },
      typeChange: {
        question: 'Can the type change?',
        answer:
          'Yes, the type will update as walking patterns change. You can enjoy changes by season or as your dog grows.',
      },
      usingAI: {
        question: 'Does it use AI?',
        answer:
          'No, we currently use a rule-based diagnosis system. It judges based on walk time, distance, rest frequency, weather, and other conditions.',
      },
    },
    pricing: {
      freeFeatures: {
        question: 'What can I do for free?',
        answer:
          'Walk recording, rest spot registration, all-time data access, basic stats (last 3 days), basic type diagnosis, and community are all free.',
      },
      dataAfterDowngrade: {
        question: 'Will I lose access to data without premium?',
        answer:
          'No, all recorded data is accessible even on the free plan. Only premium features (detailed stats, data export, etc.) will be restricted.',
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
      dataHandling: {
        question: 'How is personal data handled?',
        answer:
          'Managed appropriately according to our Privacy Policy. See the "Privacy Policy" page for details.',
      },
    },
  },
  pages: {
    home: {
      title: "Osanpo Type - Do you know your dog's walking style?",
      description:
        'Record and analyze your dog\'s walking patterns to diagnose their "Walking Type". Free walk recording, rest spot registration, and basic type diagnosis.',
    },
    features: {
      title: 'Features | Osanpo Type',
      description:
        'Explore all features: GPS walk tracking, rest spot registration, type diagnosis, community, and more.',
    },
    pricing: {
      title: 'Pricing | Osanpo Type',
      description:
        'From free plan to 300 yen/month premium. All basic features free, detailed analysis and data export with premium.',
    },
    faq: {
      title: 'FAQ | Osanpo Type',
      description:
        'Answers to frequently asked questions about usage, type diagnosis, pricing, and privacy.',
    },
    privacy: {
      title: 'Privacy Policy | Osanpo Type',
      description: 'How we handle your personal data at Osanpo Type.',
    },
    terms: {
      title: 'Terms of Service | Osanpo Type',
      description: 'Terms of Service for Osanpo Type.',
    },
    notFound: {
      title: 'Page Not Found | Osanpo Type',
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
  },
};
