import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://tikareta.com',
  output: 'static',
  i18n: {
    locales: ['ja', 'en'],
    defaultLocale: 'ja',
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    sitemap({
      // 404ページをサイトマップから除外
      filter: (page) => !page.includes('/404'),
      i18n: {
        defaultLocale: 'ja',
        locales: {
          ja: 'ja',
          en: 'en',
        },
      },
      // ページ種別ごとにchangefreqとpriorityを設定
      serialize(item) {
        const url = item.url;
        // トップページ（最高優先度）
        if (url === 'https://tikareta.com/' || url === 'https://tikareta.com/en/') {
          return { ...item, changefreq: 'weekly', priority: 1.0 } as unknown as typeof item;
        }
        // 機能紹介・料金ページ（高優先度）
        if (url.includes('/features') || url.includes('/pricing')) {
          return { ...item, changefreq: 'weekly', priority: 0.8 } as unknown as typeof item;
        }
        // FAQ・ロードマップページ（中優先度）
        if (url.includes('/faq') || url.includes('/roadmap')) {
          return { ...item, changefreq: 'monthly', priority: 0.7 } as unknown as typeof item;
        }
        // プライバシーポリシー・利用規約（低優先度）
        if (url.includes('/privacy') || url.includes('/terms')) {
          return { ...item, changefreq: 'yearly', priority: 0.3 } as unknown as typeof item;
        }
        return item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
