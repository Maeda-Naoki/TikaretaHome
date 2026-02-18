import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import { EnumChangefreq } from 'sitemap';

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
          return { ...item, changefreq: EnumChangefreq.WEEKLY, priority: 1.0 };
        }
        // 機能紹介・料金ページ（高優先度）
        if (url.includes('/features') || url.includes('/pricing')) {
          return { ...item, changefreq: EnumChangefreq.WEEKLY, priority: 0.8 };
        }
        // FAQページ（中優先度）
        if (url.includes('/faq')) {
          return { ...item, changefreq: EnumChangefreq.MONTHLY, priority: 0.7 };
        }
        // プライバシーポリシー・利用規約（低優先度）
        if (url.includes('/privacy') || url.includes('/terms')) {
          return { ...item, changefreq: EnumChangefreq.YEARLY, priority: 0.3 };
        }
        return item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
