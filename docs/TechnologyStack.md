# 技術スタック詳細

> 最終更新: 2026-02-15
---

## 技術選定一覧

| カテゴリ | 選択 | バージョン | 選定理由 |
|----------|------|-----------|---------|
| フレームワーク | Astro | 5.x（最新安定版） | 静的サイト生成に最適、ゼロJSデフォルト、高速 |
| CSS | Tailwind CSS | 4.x | CSS-first設定、@themeでカスタマイズ、MotekitaHomeと同一 |
| Tailwind統合 | @tailwindcss/vite | 4.x | Astro（Viteベース）との統合プラグイン |
| i18n | Astro ビルトイン | - | 外部依存なし、Astro公式サポート |
| サイトマップ | @astrojs/sitemap | 最新 | 自動sitemap.xml生成、i18n対応 |
| Linter/Formatter | Biome | 2.x | tikaretaメインプロジェクトと統一 |
| Git hooks | lefthook | 2.x | pre-commitでBiome自動実行 |
| デプロイ | Netlify | - | 無料枠で十分、CDN、自動デプロイ |

---

## Astro設定

### astro.config.ts

```typescript
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://tikareta.com', // 本番URL（初期はNetlifyドメイン）
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
      i18n: {
        defaultLocale: 'ja',
        locales: {
          ja: 'ja',
          en: 'en',
        },
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
```

### 設計判断

| 判断 | 選択 | 理由 |
|------|------|------|
| output | `static` | ランディングページは完全静的、SSR不要 |
| prefixDefaultLocale | `false` | 日本語がメイン。`/features`（日本語）、`/en/features`（英語） |
| Netlifyアダプター | 不使用（初期） | 静的サイトでは不要。画像最適化が必要になった時点で追加 |

---

## i18n設計

### Astroビルトインi18nを採用した理由

MotekitaHomeでは `astro-i18n-aut` を使用していたが、TikaretaHomeでは **Astroビルトインi18n** を採用する。

| 比較項目 | astro-i18n-aut | Astroビルトインi18n |
|----------|---------------|-------------------|
| メンテナンス | 最終リリース2024年、停滞 | Astro本体に含まれ、継続的に更新 |
| 外部依存 | あり | なし |
| ページファイル | 1ファイルから自動生成 | 言語別にファイルを用意 |
| 柔軟性 | 自動生成のため制約あり | 言語別にページ構成を変えられる |
| 型安全性 | JSONベース | TypeScriptでの翻訳データ管理可能 |

### 翻訳データ構造

JSONではなくTypeScriptで翻訳データを管理し、型安全性を確保する。

```typescript
// src/data/translations/ja.ts
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
  // ... 各セクションの翻訳
} as const;

export type TranslationKeys = typeof ja;
```

```typescript
// src/data/translations/en.ts
import type { TranslationKeys } from './ja';

export const en: TranslationKeys = {
  site: {
    name: 'Osanpo Type',
    tagline: "Do you know your dog's walking style?",
    description: 'A web app that records and analyzes dog walking patterns to diagnose their "walking type"',
  },
  // ...
};
```

### 翻訳ヘルパー

```typescript
// src/utils/i18n.ts
import { ja } from '@data/translations/ja';
import { en } from '@data/translations/en';
import type { TranslationKeys } from '@data/translations/ja';

const translations: Record<string, TranslationKeys> = { ja, en };

export function useTranslations(locale: string | undefined) {
  const lang = locale ?? 'ja';
  return translations[lang] ?? translations.ja;
}
```

### ページファイルのパターン

各ページは薄いラッパーとし、コンテンツはコンポーネント + データで管理する。

```astro
---
// src/pages/features.astro（日本語版）
import Layout from '@layouts/Layout.astro';
import FeatureSection from '@components/features/FeatureSection.astro';
import { useTranslations } from '@utils/i18n';
const t = useTranslations(Astro.currentLocale);
---
<Layout title={t.pages.features.title} description={t.pages.features.description}>
  <FeatureSection locale={Astro.currentLocale} />
</Layout>
```

```astro
---
// src/pages/en/features.astro（英語版 — ほぼ同一）
import Layout from '@layouts/Layout.astro';
import FeatureSection from '@components/features/FeatureSection.astro';
import { useTranslations } from '@utils/i18n';
const t = useTranslations(Astro.currentLocale);
---
<Layout title={t.pages.features.title} description={t.pages.features.description}>
  <FeatureSection locale={Astro.currentLocale} />
</Layout>
```

---

## Tailwind CSS 4 設定

Tailwind CSS 4はCSS-first設定。`tailwind.config.ts`は不要で、グローバルCSSの`@theme`ディレクティブでカスタマイズする。

> カラーパレット・フォント・角丸・シャドウの詳細は [デザインシステム](./DESIGN_SYSTEM.md) を参照
---

## MotekitaHomeとの差異

| 項目 | MotekitaHome | TikaretaHome |
|------|-------------|-------------|
| Astro | 5.2 | 5.x（最新安定版） |
| i18n | astro-i18n-aut（外部パッケージ） | Astroビルトインi18n |
| 翻訳データ | JSON (`public/locales/*.json`) | TypeScript (`src/data/translations/*.ts`) |
| Node.js | v22 | v24 |
| Linter/Formatter | 不明 | Biome |
| tailwind設定 | tailwind.config.ts | CSS-first（@theme） |
| デザイントーン | 不明 | 温かみ・親しみ系 |

---

## ディレクトリ構成

```
TikaretaHome/
├── astro.config.ts
├── package.json
├── tsconfig.json
├── biome.json
├── lefthook.yml
├── netlify.toml
├── .node-version
├── .npmrc
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   ├── og/
│   │   ├── default-ja.png
│   │   └── default-en.png
│   └── images/
└── src/
    ├── assets/images/
    ├── components/
    │   ├── common/
    │   ├── home/
    │   ├── features/
    │   ├── pricing/
    │   └── faq/
    ├── layouts/
    │   └── Layout.astro
    ├── pages/
    │   ├── index.astro
    │   ├── features.astro
    │   ├── pricing.astro
    │   ├── faq.astro
    │   ├── privacy.astro
    │   ├── terms.astro
    │   ├── 404.astro
    │   └── en/
    │       ├── index.astro
    │       ├── features.astro
    │       ├── pricing.astro
    │       ├── faq.astro
    │       ├── privacy.astro
    │       └── terms.astro
    ├── styles/
    │   └── global.css
    ├── utils/
    │   ├── i18n.ts
    │   └── seo.ts
    └── data/
        ├── translations/
        │   ├── ja.ts
        │   └── en.ts
        ├── features.ts
        ├── pricing.ts
        ├── faq.ts
        └── navigation.ts
```
