export interface SoftwareApplicationLD {
  '@context': string;
  '@type': string;
  name: string;
  applicationCategory: string;
  operatingSystem: string;
  offers: Array<{
    '@type': string;
    price: string;
    priceCurrency: string;
    description: string;
  }>;
  description: string;
}

export interface OrganizationLD {
  '@context': string;
  '@type': string;
  name: string;
  url: string;
  logo?: string;
}

export interface FAQPageLD {
  '@context': string;
  '@type': string;
  mainEntity: Array<{
    '@type': string;
    name: string;
    acceptedAnswer: {
      '@type': string;
      text: string;
    };
  }>;
}

export interface BreadcrumbListLD {
  '@context': string;
  '@type': string;
  itemListElement: Array<{
    '@type': string;
    position: number;
    name: string;
    item: string;
  }>;
}

export function createSoftwareApplicationLD(locale: string): SoftwareApplicationLD {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: locale === 'ja' ? 'おさんぽタイプ' : 'Osanpo Type',
    applicationCategory: 'LifestyleApplication',
    operatingSystem: 'Web',
    offers: [
      {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'JPY',
        description: locale === 'ja' ? '無料プラン' : 'Free Plan',
      },
      {
        '@type': 'Offer',
        price: '300',
        priceCurrency: 'JPY',
        description: locale === 'ja' ? '月額プレミアム' : 'Monthly Premium',
      },
      {
        '@type': 'Offer',
        price: '2400',
        priceCurrency: 'JPY',
        description: locale === 'ja' ? '年額プレミアム' : 'Yearly Premium',
      },
    ],
    description:
      locale === 'ja'
        ? '犬の散歩パターンを記録・分析し、愛犬のおさんぽタイプを診断するWebアプリ'
        : 'A web app that records and analyzes dog walking patterns to diagnose their "walking type"',
  };
}

export function createOrganizationLD(locale: string): OrganizationLD {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: locale === 'ja' ? 'おさんぽタイプ' : 'Osanpo Type',
    url: 'https://tikareta.com',
    logo: 'https://tikareta.com/images/logo.svg',
  };
}

export function createFAQPageLD(faqs: Array<{ question: string; answer: string }>): FAQPageLD {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
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

export function getOGImageUrl(locale: string): string {
  return `/og/default-${locale}.svg`;
}
