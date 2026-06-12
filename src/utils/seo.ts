import { plans } from '@data/pricing';

export type Locale = 'ja' | 'en';

export const SITE_URL = 'https://tikareta.com';
export const SITE_NAME = 'Tikareta';
export const LEGAL_LAST_MODIFIED = '2026-02-15';

const LANG_TAG: Record<Locale, string> = {
  ja: 'ja-JP',
  en: 'en-US',
};

export interface OfferLD {
  '@type': 'Offer';
  price: string;
  priceCurrency: string;
  description: string;
  availability?: string;
  url?: string;
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
  offers: OfferLD[];
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

function describeOffer(
  planKey: string,
  period: 'free' | 'monthly' | 'yearly',
  locale: Locale
): string {
  if (period === 'free') return locale === 'ja' ? 'Freeプラン' : 'Free Plan';
  const planName = planKey.charAt(0).toUpperCase() + planKey.slice(1);
  const ja = period === 'monthly' ? `${planName}月額プラン` : `${planName}年額プラン`;
  const en = period === 'monthly' ? `${planName} Monthly Plan` : `${planName} Yearly Plan`;
  return locale === 'ja' ? ja : en;
}

function buildAppOffers(locale: Locale, pricingUrl: string): OfferLD[] {
  const baseOffer = (price: number, description: string): OfferLD => ({
    '@type': 'Offer',
    price: String(price),
    priceCurrency: 'JPY',
    description,
    availability: 'https://schema.org/InStock',
    url: pricingUrl,
  });

  return plans.flatMap((plan) => {
    if (plan.monthly === 0 && plan.yearly === 0) {
      return [baseOffer(plan.monthly, describeOffer(plan.key, 'free', locale))];
    }
    return [
      baseOffer(plan.monthly, describeOffer(plan.key, 'monthly', locale)),
      baseOffer(plan.yearly, describeOffer(plan.key, 'yearly', locale)),
    ];
  });
}

export function createSoftwareApplicationLD(params: {
  locale: Locale;
  name: string;
  description: string;
  pricingUrl: string;
}): SoftwareApplicationLD {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: params.name,
    applicationCategory: 'LifestyleApplication',
    operatingSystem: 'Web',
    url: SITE_URL,
    description: params.description,
    inLanguage: ['ja', 'en'],
    author: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    offers: buildAppOffers(params.locale, params.pricingUrl),
  };
}

export function createOrganizationLD(params: {
  name: string;
  description: string;
  logo?: string;
}): OrganizationLD {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: params.name,
    url: SITE_URL,
    description: params.description,
    ...(params.logo && { logo: params.logo }),
  };
}

export function createWebSiteLD(params: { name: string; description: string }): WebSiteLD {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: params.name,
    url: SITE_URL,
    description: params.description,
    inLanguage: ['ja', 'en'],
    publisher: {
      '@type': 'Organization',
      name: params.name,
      url: SITE_URL,
    },
  };
}

export function createWebPageLD(params: {
  locale: Locale;
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
    inLanguage: LANG_TAG[params.locale],
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
  locale: Locale = 'ja'
): FAQPageLD {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: LANG_TAG[locale],
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
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: params.name,
    description: params.description,
    brand: {
      '@type': 'Brand',
      name: SITE_NAME,
    },
    offers: params.offers.map((offer) => ({
      '@type': 'Offer',
      price: String(offer.price),
      priceCurrency: 'JPY',
      description: offer.description,
      availability: 'https://schema.org/InStock',
      url: offer.url,
    })),
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

export function getOGImageUrl(locale: Locale): string {
  return `/og/default-${locale}.png`;
}
