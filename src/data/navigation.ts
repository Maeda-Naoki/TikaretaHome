export interface NavItem {
  labelKey: string;
  href: string;
  external?: boolean;
}

export const mainNav: NavItem[] = [
  {
    labelKey: 'nav.features',
    href: '/features',
  },
  {
    labelKey: 'nav.pricing',
    href: '/pricing',
  },
  {
    labelKey: 'nav.faq',
    href: '/faq',
  },
  {
    labelKey: 'nav.roadmap',
    href: '/roadmap',
  },
];

export const appUrl = 'https://tikareta.com';

export const legalUrls = {
  privacy: `${appUrl}/privacy`,
  terms: `${appUrl}/legal/terms`,
} as const;

// アプリ公開時は false に変更するだけで全ページのリンクが復元される
export const APP_COMING_SOON = true;
