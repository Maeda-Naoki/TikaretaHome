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

export const appUrl = 'https://tikareta.luckyretriever.app';
export const welcomeUrl = 'https://tikareta.luckyretriever.app/welcome';
export const loginUrl = 'https://tikareta.luckyretriever.app/auth/login';

export const legalUrls = {
  privacy: `${appUrl}/privacy`,
  terms: `${appUrl}/legal/terms`,
} as const;

export const APP_COMING_SOON = false;
