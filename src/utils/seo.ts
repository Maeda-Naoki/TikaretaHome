export const SITE_URL = 'https://tikareta.com';
export const SITE_NAME = 'Tikareta';

export function getPageUrl(locale: string, path: string): string {
  const prefix = locale === 'en' ? '/en' : '';
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${prefix}${normalized === '/' ? '/' : normalized}`;
}

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
  description: string;
  logo?: string;
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

function langTag(locale: string): string {
  return locale === 'ja' ? 'ja-JP' : 'en-US';
}

export function createSoftwareApplicationLD(params: {
  locale: string;
  name: string;
  description: string;
}): SoftwareApplicationLD {
  const { locale, name, description } = params;
  const localePrefix = locale === 'en' ? '/en' : '';
  const pricingUrl = `${SITE_URL}${localePrefix}/pricing`;

  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    applicationCategory: 'LifestyleApplication',
    operatingSystem: 'Web',
    url: SITE_URL,
    description,
    inLanguage: ['ja', 'en'],
    author: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    offers: [
      {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'JPY',
        description: locale === 'ja' ? 'Freeプラン' : 'Free Plan',
        availability: 'https://schema.org/InStock',
        url: pricingUrl,
      },
      {
        '@type': 'Offer',
        price: '300',
        priceCurrency: 'JPY',
        description: locale === 'ja' ? 'Standard月額プラン' : 'Standard Monthly Plan',
        availability: 'https://schema.org/InStock',
        url: pricingUrl,
      },
      {
        '@type': 'Offer',
        price: '2400',
        priceCurrency: 'JPY',
        description: locale === 'ja' ? 'Standard年額プラン' : 'Standard Yearly Plan',
        availability: 'https://schema.org/InStock',
        url: pricingUrl,
      },
      {
        '@type': 'Offer',
        price: '500',
        priceCurrency: 'JPY',
        description: locale === 'ja' ? 'Pro月額プラン' : 'Pro Monthly Plan',
        availability: 'https://schema.org/InStock',
        url: pricingUrl,
      },
      {
        '@type': 'Offer',
        price: '4800',
        priceCurrency: 'JPY',
        description: locale === 'ja' ? 'Pro年額プラン' : 'Pro Yearly Plan',
        availability: 'https://schema.org/InStock',
        url: pricingUrl,
      },
    ],
  };
}

export function createOrganizationLD(params: {
  name: string;
  description: string;
  logo?: string;
}): OrganizationLD {
  const { name, description, logo } = params;
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    url: SITE_URL,
    description,
    ...(logo && { logo }),
  };
}

export function createWebSiteLD(params: { name: string; description: string }): WebSiteLD {
  const { name, description } = params;
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name,
    url: SITE_URL,
    description,
    inLanguage: ['ja', 'en'],
    publisher: {
      '@type': 'Organization',
      name,
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
    inLanguage: langTag(params.locale),
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_NAME,
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
    inLanguage: langTag(locale),
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
      name: SITE_NAME,
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
