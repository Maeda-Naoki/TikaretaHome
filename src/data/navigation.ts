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
];

export const footerNav: NavItem[] = [
  {
    labelKey: 'footer.privacy',
    href: '/privacy',
  },
  {
    labelKey: 'footer.terms',
    href: '/terms',
  },
];

export const appUrl = 'https://tikareta.com';
