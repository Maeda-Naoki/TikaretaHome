import { describe, expect, it } from 'vitest';

import {
  SITE_NAME,
  SITE_URL,
  createBreadcrumbListLD,
  createFAQPageLD,
  createItemListLD,
  createOrganizationLD,
  createProductLD,
  createSoftwareApplicationLD,
  createWebPageLD,
  createWebSiteLD,
  getOGImageUrl,
} from '../src/utils/seo';

describe('constants', () => {
  it('exports the canonical site URL and name', () => {
    expect(SITE_URL).toBe('https://tikareta-home.luckyretriever.app');
    expect(SITE_NAME).toBe('Tikareta');
  });
});

describe('createWebSiteLD', () => {
  it('emits the WebSite type with both locales', () => {
    const ld = createWebSiteLD({ name: 'Tikareta', description: 'desc' });
    expect(ld['@type']).toBe('WebSite');
    expect(ld.url).toBe(SITE_URL);
    expect(ld.name).toBe('Tikareta');
    expect(ld.description).toBe('desc');
    expect(ld.inLanguage).toEqual(['ja', 'en']);
    expect(ld.publisher.name).toBe('Tikareta');
  });
});

describe('createWebPageLD', () => {
  it('emits ja-JP for the ja locale and isPartOf the WebSite', () => {
    const ld = createWebPageLD({
      locale: 'ja',
      name: 'FAQ',
      description: 'よくある質問',
      url: 'https://tikareta-home.luckyretriever.app/faq/',
    });
    expect(ld['@type']).toBe('WebPage');
    expect(ld.inLanguage).toBe('ja-JP');
    expect(ld.isPartOf.name).toBe(SITE_NAME);
    expect(ld.isPartOf.url).toBe(SITE_URL);
    expect(ld.url).toBe('https://tikareta-home.luckyretriever.app/faq/');
  });

  it('emits en-US for the en locale', () => {
    const ld = createWebPageLD({
      locale: 'en',
      name: 'FAQ',
      description: 'desc',
      url: 'https://tikareta-home.luckyretriever.app/en/faq/',
    });
    expect(ld.inLanguage).toBe('en-US');
  });

  it('omits datePublished/dateModified when not provided', () => {
    const ld = createWebPageLD({
      locale: 'ja',
      name: 'p',
      description: 'd',
      url: 'https://tikareta-home.luckyretriever.app/p',
    });
    expect(ld.datePublished).toBeUndefined();
    expect(ld.dateModified).toBeUndefined();
  });

  it('includes dateModified when provided', () => {
    const ld = createWebPageLD({
      locale: 'ja',
      name: 'Privacy',
      description: 'd',
      url: 'https://tikareta-home.luckyretriever.app/privacy/',
      dateModified: '2026-04-25',
    });
    expect(ld.dateModified).toBe('2026-04-25');
  });
});

describe('createSoftwareApplicationLD', () => {
  it('emits SoftwareApplication with five offers covering all paid tiers', () => {
    const ld = createSoftwareApplicationLD({
      locale: 'ja',
      name: 'Tikareta',
      description: 'desc',
      pricingUrl: 'https://tikareta-home.luckyretriever.app/pricing/',
    });
    expect(ld['@type']).toBe('SoftwareApplication');
    expect(ld.applicationCategory).toBe('LifestyleApplication');
    expect(ld.operatingSystem).toBe('Web');
    expect(ld.offers).toHaveLength(5);
    expect(ld.offers.every((o) => o.priceCurrency === 'JPY')).toBe(true);
    expect(ld.offers.every((o) => o.availability === 'https://schema.org/InStock')).toBe(true);
    expect(
      ld.offers.every((o) => o.url === 'https://tikareta-home.luckyretriever.app/pricing/')
    ).toBe(true);
    expect(ld.offers.map((o) => o.price)).toEqual(['0', '300', '2400', '500', '4800']);
  });

  it('uses the caller-supplied pricing URL for every offer', () => {
    const ld = createSoftwareApplicationLD({
      locale: 'en',
      name: 'Tikareta',
      description: 'desc',
      pricingUrl: 'https://tikareta-home.luckyretriever.app/en/pricing/',
    });
    expect(
      ld.offers.every((o) => o.url === 'https://tikareta-home.luckyretriever.app/en/pricing/')
    ).toBe(true);
  });

  it('localises offer descriptions', () => {
    const ja = createSoftwareApplicationLD({
      locale: 'ja',
      name: 'Tikareta',
      description: 'desc',
      pricingUrl: 'https://tikareta-home.luckyretriever.app/pricing/',
    });
    const en = createSoftwareApplicationLD({
      locale: 'en',
      name: 'Tikareta',
      description: 'desc',
      pricingUrl: 'https://tikareta-home.luckyretriever.app/en/pricing/',
    });
    expect(ja.offers[0].description).toBe('Freeプラン');
    expect(en.offers[0].description).toBe('Free Plan');
    expect(ja.offers[1].description).toBe('Standard月額プラン');
    expect(en.offers[1].description).toBe('Standard Monthly Plan');
  });

  it('does not include a softwareVersion (pre-release)', () => {
    const ld = createSoftwareApplicationLD({
      locale: 'ja',
      name: 'Tikareta',
      description: 'desc',
      pricingUrl: 'https://tikareta-home.luckyretriever.app/pricing/',
    });
    expect('softwareVersion' in ld).toBe(false);
  });
});

describe('createOrganizationLD', () => {
  it('omits logo when not provided', () => {
    const ld = createOrganizationLD({ name: 'Tikareta', description: 'd' });
    expect(ld.logo).toBeUndefined();
    expect(ld.name).toBe('Tikareta');
    expect(ld.url).toBe(SITE_URL);
  });

  it('includes logo when provided', () => {
    const ld = createOrganizationLD({
      name: 'Tikareta',
      description: 'd',
      logo: 'https://tikareta-home.luckyretriever.app/images/logo.svg',
    });
    expect(ld.logo).toBe('https://tikareta-home.luckyretriever.app/images/logo.svg');
  });
});

describe('createFAQPageLD', () => {
  it('maps questions and answers into Question/Answer nodes', () => {
    const ld = createFAQPageLD(
      [
        { question: 'Q1', answer: 'A1' },
        { question: 'Q2', answer: 'A2' },
      ],
      'ja'
    );
    expect(ld.inLanguage).toBe('ja-JP');
    expect(ld.mainEntity).toHaveLength(2);
    expect(ld.mainEntity[0].name).toBe('Q1');
    expect(ld.mainEntity[0].acceptedAnswer.text).toBe('A1');
  });

  it('defaults to ja when locale is omitted', () => {
    const ld = createFAQPageLD([]);
    expect(ld.inLanguage).toBe('ja-JP');
  });
});

describe('createBreadcrumbListLD', () => {
  it('assigns 1-based positions', () => {
    const ld = createBreadcrumbListLD([
      { name: 'Home', url: 'https://tikareta-home.luckyretriever.app/' },
      { name: 'FAQ', url: 'https://tikareta-home.luckyretriever.app/faq/' },
    ]);
    expect(ld.itemListElement[0].position).toBe(1);
    expect(ld.itemListElement[1].position).toBe(2);
    expect(ld.itemListElement[1].item).toBe('https://tikareta-home.luckyretriever.app/faq/');
  });
});

describe('createProductLD', () => {
  it('always returns offers as an array (even for single offer)', () => {
    const ld = createProductLD({
      name: 'Tikareta Standard',
      description: 'tagline',
      offers: [
        {
          price: 300,
          description: 'Monthly',
          url: 'https://tikareta-home.luckyretriever.app/pricing/',
        },
      ],
    });
    expect(Array.isArray(ld.offers)).toBe(true);
    expect(ld.offers).toHaveLength(1);
    expect(ld.offers[0].price).toBe('300');
  });

  it('preserves offer order for multiple offers', () => {
    const ld = createProductLD({
      name: 'Tikareta Standard',
      description: 'tagline',
      offers: [
        {
          price: 300,
          description: 'Monthly',
          url: 'https://tikareta-home.luckyretriever.app/pricing/',
        },
        {
          price: 2400,
          description: 'Yearly',
          url: 'https://tikareta-home.luckyretriever.app/pricing/',
        },
      ],
    });
    expect(ld.offers).toHaveLength(2);
    expect(ld.offers[0].price).toBe('300');
    expect(ld.offers[1].price).toBe('2400');
  });

  it('uses SITE_NAME for the brand', () => {
    const ld = createProductLD({
      name: 'Tikareta Standard',
      description: 'tagline',
      offers: [
        {
          price: 300,
          description: 'Monthly',
          url: 'https://tikareta-home.luckyretriever.app/pricing/',
        },
      ],
    });
    expect(ld.brand.name).toBe(SITE_NAME);
  });
});

describe('createItemListLD', () => {
  it('assigns 1-based positions and optional descriptions', () => {
    const ld = createItemListLD({
      name: 'Features',
      items: [{ name: 'Walk Tracking', description: 'Log walks' }, { name: 'Spots' }],
    });
    expect(ld.itemListElement[0].position).toBe(1);
    expect(ld.itemListElement[0].description).toBe('Log walks');
    expect(ld.itemListElement[1].position).toBe(2);
    expect(ld.itemListElement[1].description).toBeUndefined();
  });
});

describe('getOGImageUrl', () => {
  it('returns the locale-specific OGP image path', () => {
    expect(getOGImageUrl('ja')).toBe('/og/default-ja.png');
    expect(getOGImageUrl('en')).toBe('/og/default-en.png');
  });

  // Regression: social platforms (X, Facebook, LINE, Slack, ...) do not render
  // SVG og:image, so the OGP image must stay a raster (PNG) format.
  it('uses a raster format, never SVG', () => {
    for (const locale of ['ja', 'en'] as const) {
      const url = getOGImageUrl(locale);
      expect(url.endsWith('.png')).toBe(true);
      expect(url.endsWith('.svg')).toBe(false);
    }
  });
});
