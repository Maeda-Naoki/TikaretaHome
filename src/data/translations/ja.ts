export const ja = {
  site: {
    name: 'おさんぽタイプ',
    tagline: 'うちの子のおさんぽスタイル、知ってる？',
    description: '犬の散歩パターンを記録・分析し、愛犬の「おさんぽタイプ」を診断するWebアプリ',
  },
  nav: {
    features: '機能紹介',
    pricing: '料金プラン',
    faq: 'よくある質問',
    startFree: '無料で始める',
  },
  hero: {
    title: 'うちの子の\nおさんぽスタイル、\n知ってる？',
    subtitle: '犬の散歩パターンを記録・分析して、愛犬の「おさんぽタイプ」を発見しよう',
    cta: '無料で始める',
    subCta: 'アカウント登録は30秒',
  },
  footer: {
    privacy: 'プライバシーポリシー',
    terms: '利用規約',
    copyright: '© 2026 おさんぽタイプ',
  },
} as const satisfies Translations;

export type Translations = {
  site: {
    name: string;
    tagline: string;
    description: string;
  };
  nav: {
    features: string;
    pricing: string;
    faq: string;
    startFree: string;
  };
  hero: {
    title: string;
    subtitle: string;
    cta: string;
    subCta: string;
  };
  footer: {
    privacy: string;
    terms: string;
    copyright: string;
  };
};
