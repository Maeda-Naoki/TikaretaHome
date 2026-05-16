export const SITE_URL = 'https://tikareta.com';
export const SITE_NAME_JA = 'Tikareta';
export const SITE_NAME_EN = 'Tikareta';
export const SITE_LOGO_URL = `${SITE_URL}/images/logo.svg`;

export interface OfferLD {
  '@type': 'Offer';
  price: string;
  priceCurrency: string;
  description: string;
  availability?: string;
  url?: string;
}

export interface AggregateOfferLD {
  '@type': 'AggregateOffer';
  priceCurrency: string;
  lowPrice: string;
  highPrice: string;
  offerCount: string;
}

export interface SoftwareApplicationLD {
  '@context': 'https://schema.org';
  '@type': 'SoftwareApplication';
  name: string;
  applicationCategory: string;
  operatingSystem: string;
  url: string;
  description: string;
  inLanguage: string[];
  offers: OfferLD[];
  screenshot?: string;
  softwareVersion?: string;
  author?: {
    '@type': 'Organization';
    name: string;
    url: string;
  };
}

export interface OrganizationLD {
  '@context': 'https://schema.org';
  '@type': 'Organization';
  name: string;
  url: string;
  logo: string;
  description: string;
  sameAs?: string[];
}

export interface WebSiteLD {
  '@context': 'https://schema.org';
  '@type': 'WebSite';
  name: string;
  url: string;
  description: string;
  inLanguage: string[];
  publisher: {
    '@type': 'Organization';
    name: string;
    url: string;
  };
}

export interface WebPageLD {
  '@context': 'https://schema.org';
  '@type': 'WebPage';
  name: string;
  description: string;
  url: string;
  inLanguage: string;
  isPartOf: {
    '@type': 'WebSite';
    name: string;
    url: string;
  };
  datePublished?: string;
  dateModified?: string;
  breadcrumb?: BreadcrumbListLD;
}

export interface FAQPageLD {
  '@context': 'https://schema.org';
  '@type': 'FAQPage';
  inLanguage: string;
  mainEntity: Array<{
    '@type': 'Question';
    name: string;
    acceptedAnswer: {
      '@type': 'Answer';
      text: string;
    };
  }>;
}

export interface BreadcrumbListLD {
  '@context': 'https://schema.org';
  '@type': 'BreadcrumbList';
  itemListElement: Array<{
    '@type': 'ListItem';
    position: number;
    name: string;
    item: string;
  }>;
}

export interface ProductLD {
  '@context': 'https://schema.org';
  '@type': 'Product';
  name: string;
  description: string;
  brand: {
    '@type': 'Brand';
    name: string;
  };
  offers: OfferLD | OfferLD[] | AggregateOfferLD;
}

export interface ItemListLD {
  '@context': 'https://schema.org';
  '@type': 'ItemList';
  name: string;
  itemListElement: Array<{
    '@type': 'ListItem';
    position: number;
    name: string;
    description?: string;
  }>;
}

function siteName(locale: string): string {
  return locale === 'ja' ? SITE_NAME_JA : SITE_NAME_EN;
}

function appDescription(locale: string): string {
  return locale === 'ja'
    ? '犬の散歩パターンを記録・分析し、愛犬のおさんぽタイプを診断するWebアプリ。お散歩記録、お気に入りスポット保存、8タイプ診断、コミュニティを無料で利用できます。'
    : 'A web app that records and analyzes dog walking patterns to diagnose each dog\'s unique "walking type". Free walk logging, favourite spot saving, 8-type diagnosis, and community.';
}

function orgDescription(locale: string): string {
  return locale === 'ja'
    ? 'うちの子だけの「おさんぽタイプ」を見つけるサービスを提供しています。'
    : 'We help dog owners discover their dog\'s unique "Walking Type" through daily walks.';
}

export function createSoftwareApplicationLD(locale: string): SoftwareApplicationLD {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: siteName(locale),
    applicationCategory: 'LifestyleApplication',
    operatingSystem: 'Web, iOS, Android',
    url: SITE_URL,
    description: appDescription(locale),
    inLanguage: ['ja', 'en'],
    softwareVersion: '1.0.0',
    author: {
      '@type': 'Organization',
      name: SITE_NAME_JA,
      url: SITE_URL,
    },
    offers: [
      {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'JPY',
        description: locale === 'ja' ? 'Freeプラン' : 'Free Plan',
        availability: 'https://schema.org/InStock',
        url: `${SITE_URL}${locale === 'en' ? '/en' : ''}/pricing`,
      },
      {
        '@type': 'Offer',
        price: '300',
        priceCurrency: 'JPY',
        description: locale === 'ja' ? 'Standard月額プラン' : 'Standard Monthly Plan',
        availability: 'https://schema.org/InStock',
        url: `${SITE_URL}${locale === 'en' ? '/en' : ''}/pricing`,
      },
      {
        '@type': 'Offer',
        price: '2400',
        priceCurrency: 'JPY',
        description: locale === 'ja' ? 'Standard年額プラン' : 'Standard Yearly Plan',
        availability: 'https://schema.org/InStock',
        url: `${SITE_URL}${locale === 'en' ? '/en' : ''}/pricing`,
      },
      {
        '@type': 'Offer',
        price: '500',
        priceCurrency: 'JPY',
        description: locale === 'ja' ? 'Pro月額プラン' : 'Pro Monthly Plan',
        availability: 'https://schema.org/InStock',
        url: `${SITE_URL}${locale === 'en' ? '/en' : ''}/pricing`,
      },
      {
        '@type': 'Offer',
        price: '4800',
        priceCurrency: 'JPY',
        description: locale === 'ja' ? 'Pro年額プラン' : 'Pro Yearly Plan',
        availability: 'https://schema.org/InStock',
        url: `${SITE_URL}${locale === 'en' ? '/en' : ''}/pricing`,
      },
    ],
  };
}

export function createOrganizationLD(locale: string): OrganizationLD {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteName(locale),
    url: SITE_URL,
    logo: SITE_LOGO_URL,
    description: orgDescription(locale),
  };
}

export function createWebSiteLD(locale: string): WebSiteLD {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteName(locale),
    url: SITE_URL,
    description: appDescription(locale),
    inLanguage: ['ja', 'en'],
    publisher: {
      '@type': 'Organization',
      name: siteName(locale),
      url: SITE_URL,
    },
  };
}

export function createWebPageLD(params: {
  locale: string;
  name: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
}): WebPageLD {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: params.name,
    description: params.description,
    url: params.url,
    inLanguage: params.locale === 'ja' ? 'ja-JP' : 'en-US',
    isPartOf: {
      '@type': 'WebSite',
      name: siteName(params.locale),
      url: SITE_URL,
    },
    ...(params.datePublished && { datePublished: params.datePublished }),
    ...(params.dateModified && { dateModified: params.dateModified }),
  };
}

export function createFAQPageLD(
  faqs: Array<{ question: string; answer: string }>,
  locale = 'ja'
): FAQPageLD {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: locale === 'ja' ? 'ja-JP' : 'en-US',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function createBreadcrumbListLD(
  items: Array<{ name: string; url: string }>
): BreadcrumbListLD {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function createProductLD(params: {
  locale: string;
  name: string;
  description: string;
  offers: Array<{ price: number; description: string; url: string }>;
}): ProductLD {
  const yenOffers: OfferLD[] = params.offers.map((offer) => ({
    '@type': 'Offer',
    price: String(offer.price),
    priceCurrency: 'JPY',
    description: offer.description,
    availability: 'https://schema.org/InStock',
    url: offer.url,
  }));

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: params.name,
    description: params.description,
    brand: {
      '@type': 'Brand',
      name: siteName(params.locale),
    },
    offers: yenOffers.length === 1 ? yenOffers[0] : yenOffers,
  };
}

export function createItemListLD(params: {
  name: string;
  items: Array<{ name: string; description?: string }>;
}): ItemListLD {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: params.name,
    itemListElement: params.items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.description && { description: item.description }),
    })),
  };
}

export function getOGImageUrl(locale: string): string {
  return `/og/default-${locale}.svg`;
}
