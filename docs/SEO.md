# SEO設計

> 最終更新: 2026-05-16
---

## SEOコンポーネント（`src/components/common/SEO.astro`）

全ページの `<head>` 内に以下のメタタグを出力する共通コンポーネント。

### 出力するメタタグ

```html
<!-- 基本メタ -->
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="description" content="{description}" />
<meta name="keywords" content="{keywords}" />            <!-- オプション -->
<meta name="author" content="Tikareta" />
<meta name="format-detection" content="telephone=no" />
<meta name="theme-color" content="#F97316" />
<meta name="color-scheme" content="light" />
<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
<title>{title}</title>

<!-- Google Search Console (環境変数があれば) -->
<meta name="google-site-verification" content="{token}" />

<!-- Canonical + hreflang -->
<link rel="canonical" href="{canonicalUrl}" />
<link rel="alternate" hreflang="ja" href="{jaUrl}" />
<link rel="alternate" hreflang="en" href="{enUrl}" />
<link rel="alternate" hreflang="x-default" href="{jaUrl}" />

<!-- OGP / Facebook -->
<meta property="og:type" content="{website|article}" />
<meta property="og:title" content="{title}" />
<meta property="og:description" content="{description}" />
<meta property="og:image" content="{ogImageUrl}" />
<meta property="og:image:type" content="{mime}" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="{ogImageAlt}" />
<meta property="og:url" content="{canonicalUrl}" />
<meta property="og:locale" content="ja_JP" />
<meta property="og:locale:alternate" content="en_US" />
<meta property="og:site_name" content="Tikareta" />

<!-- article 専用 (利用規約・プライバシーポリシー等で og:type="article" を指定したときに出力) -->
<meta property="article:modified_time" content="{dateModified}" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="{title}" />
<meta name="twitter:description" content="{description}" />
<meta name="twitter:image" content="{ogImageUrl}" />
<meta name="twitter:image:alt" content="{ogImageAlt}" />

<!-- Favicon (Layout.astro 側で出力) -->
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />

<!-- JSON-LD -->
<script is:inline type="application/ld+json">{jsonLd}</script>
```

### コンポーネントProps

```typescript
interface SEOProps {
  title: string;              // ページタイトル（50-60文字目安）
  description: string;        // メタディスクリプション（150-160文字目安）
  ogImage?: string;           // OGP画像パス（デフォルト: /og/default-{locale}.svg）
  ogImageAlt?: string;        // OG画像 alt（既定はサイトのキャッチコピー）
  ogType?: 'website' | 'article';  // 既定は website。法的ページ等は article
  noindex?: boolean;          // noindex設定（デフォルト: false）
  keywords?: string[];        // meta keywords（カンマ区切りで出力）
  datePublished?: string;     // article:published_time（ISO 8601）
  dateModified?: string;      // article:modified_time（ISO 8601）
  jsonLd?: unknown;           // JSON-LD構造化データ（単体 or 配列）
}
```

### hreflang生成ロジック

- `Astro.currentLocale` でロケール判定
- `getAbsoluteLocaleUrl()` で各言語の絶対URLを生成
- `x-default` は日本語URL（デフォルトロケール）

---

## 構造化データ（JSON-LD）

### 各ページの構造化データ一覧

| ページ | 出力する JSON-LD |
|--------|---------|
| トップ（`/`, `/en/`） | `WebSite` + `SoftwareApplication` + `Organization` + `FAQPage`（上位3件） |
| 機能紹介（`/features`） | `WebPage` + `BreadcrumbList` + `ItemList`（機能一覧） |
| 料金プラン（`/pricing`） | `WebPage` + `BreadcrumbList` + `Product`×3（Free / Standard / Pro） |
| FAQ（`/faq`） | `WebPage` + `FAQPage`（全件） + `BreadcrumbList` |
| ロードマップ（`/roadmap`） | `WebPage` + `BreadcrumbList` |
| プライバシー・利用規約（`/privacy`, `/terms`） | `WebPage`（`dateModified` 付き） + `BreadcrumbList`、`og:type=article` |
| 404 | `noindex` のみ |

### ヘルパー関数（`src/utils/seo.ts`）

呼び出し側は翻訳から `name` / `description` を渡す（単一情報源を翻訳ファイルに統一するため）。ロケール接頭辞付き URL は Astro 標準の `astro:i18n` を使う。

```typescript
SITE_URL              // 'https://tikareta-home.luckyretriever.app'
SITE_NAME             // 'Tikareta'
LEGAL_LAST_MODIFIED   // 法的ページの最終更新日
type Locale = 'ja' | 'en'

// 各ページで URL を生成
import { getAbsoluteLocaleUrl } from 'astro:i18n';
getAbsoluteLocaleUrl(locale, '/pricing')   // -> https://tikareta-home.luckyretriever.app[/en]/pricing/

// JSON-LD ヘルパー
createSoftwareApplicationLD({ locale, name, description, pricingUrl })
createOrganizationLD({ name, description, logo? })
createWebSiteLD({ name, description })
createWebPageLD({ locale, name, description, url, dateModified?, datePublished? })
createFAQPageLD(faqs, locale)
createBreadcrumbListLD(items)
createProductLD({ name, description, offers })       // 有料プラン専用
createItemListLD({ name, items })
```

#### 設計メモ

- ロケール付き URL 生成は Astro の `astro:i18n`（`getAbsoluteLocaleUrl` / `getAbsoluteLocaleUrlList`）に統一。独自ヘルパは持たない。
- `SoftwareApplication.operatingSystem` は現状 `'Web'` のみ（iOS/Android は準備中）
- `SoftwareApplication.offers` は `@data/pricing` の `plans` 配列を単一情報源として自動構築
- `Organization.logo` は実ファイル未配置のためデフォルト未出力
- `Product` は無料プランを除外（Google Merchant の警告を回避）。無料プランの情報は `SoftwareApplication.offers` でカバー
- FAQ のテキスト解決は `mapFAQItems(t, items)` / `resolveFAQItem(t, item)` ヘルパー（`@utils/translationTypes`）に集約

### トップページ（例）

```json
[
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Tikareta",
    "url": "https://tikareta-home.luckyretriever.app",
    "description": "...",
    "inLanguage": ["ja", "en"],
    "publisher": { "@type": "Organization", "name": "Tikareta", "url": "https://tikareta-home.luckyretriever.app" }
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Tikareta",
    "applicationCategory": "LifestyleApplication",
    "operatingSystem": "Web, iOS, Android",
    "url": "https://tikareta-home.luckyretriever.app",
    "description": "...",
    "inLanguage": ["ja", "en"],
    "softwareVersion": "1.0.0",
    "author": { "@type": "Organization", "name": "Tikareta", "url": "https://tikareta-home.luckyretriever.app" },
    "offers": [
      { "@type": "Offer", "price": "0", "priceCurrency": "JPY", "description": "Freeプラン", "availability": "https://schema.org/InStock", "url": "https://tikareta-home.luckyretriever.app/pricing" },
      { "@type": "Offer", "price": "300", "priceCurrency": "JPY", "description": "Standard月額プラン", "availability": "https://schema.org/InStock", "url": "https://tikareta-home.luckyretriever.app/pricing" }
      /* ...（他のプランも） */
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Tikareta",
    "url": "https://tikareta-home.luckyretriever.app",
    "logo": "https://tikareta-home.luckyretriever.app/images/logo.svg",
    "description": "..."
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "inLanguage": "ja-JP",
    "mainEntity": [ /* ...基本カテゴリの先頭3問 */ ]
  }
]
```

### 料金プラン（例）

```json
[
  {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Tikareta Standard",
    "description": "もっと深く知りたい方に",
    "brand": { "@type": "Brand", "name": "Tikareta" },
    "offers": [
      { "@type": "Offer", "price": "300", "priceCurrency": "JPY", "description": "月額プラン", "availability": "https://schema.org/InStock", "url": "https://tikareta-home.luckyretriever.app/pricing" },
      { "@type": "Offer", "price": "2400", "priceCurrency": "JPY", "description": "年額プラン", "availability": "https://schema.org/InStock", "url": "https://tikareta-home.luckyretriever.app/pricing" }
    ]
  }
]
```

### パンくずリスト（サブページ共通）

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "ホーム", "item": "https://tikareta-home.luckyretriever.app/" },
    { "@type": "ListItem", "position": 2, "name": "{ページ名}", "item": "https://tikareta-home.luckyretriever.app/{path}" }
  ]
}
```

---

## Google Search Console 検証

`google-site-verification` メタタグを `SEO.astro` から出力する。値は環境変数 `GOOGLE_SITE_VERIFICATION` で設定する。

### 設定箇所

| 環境 | 設定場所 |
|------|---------|
| ローカル開発 | プロジェクト直下の `.env`（`.env.example` をコピーして利用） |
| GitHub Actions | リポジトリ Settings → Environments → `ci` → Variables に `GOOGLE_SITE_VERIFICATION` を登録 |
| Netlify（本番） | Site settings → Environment variables に `GOOGLE_SITE_VERIFICATION` を登録 |

### 動作仕様

- 値が設定されていれば `<meta name="google-site-verification" content="..." />` が `<head>` に出力される
- 値が未設定なら meta タグ自体が出力されない（空 content の meta タグは出さない）
- `output: 'static'` のためビルド時にのみ評価される。値変更後は再ビルドが必要

### 検証手順

1. Google Search Console → プロパティ追加 → HTML タグ方式 → トークン取得
2. Netlify と GitHub Environment にトークンを登録
3. 再デプロイ → 本番 HTML のソースで meta タグを確認
4. Search Console で「所有権を確認」

---

## robots.txt

```
User-agent: *
Allow: /
Sitemap: https://tikareta-home.luckyretriever.app/sitemap-index.xml
```

---

## sitemap.xml

`@astrojs/sitemap` インテグレーションが `astro.config.ts` の `site` と `i18n` 設定に基づき自動生成。

- 各言語のURLが `hreflang` 付きで出力
- `sitemap-index.xml` + `sitemap-0.xml` 形式

---

## OGP画像

| ファイル | サイズ | 内容 |
|---------|--------|------|
| `/public/og/default-ja.svg` | 1200x630（暫定 SVG） | 日本語キャッチコピー + 犬イラスト + ロゴ |
| `/public/og/default-en.svg` | 1200x630（暫定 SVG） | 英語キャッチコピー + 犬イラスト + ロゴ |

> ⚠️ **既知の制約**: 現状の OG 画像は SVG。Facebook / X (Twitter) / LinkedIn は SVG をプレビュー表示しないため、本番ローンチ前に PNG (1200x630) を生成して差し替える必要がある。`SEO.astro` の `og:image:type` は拡張子から自動判定するため、PNG 配置後にコード変更は不要。

### デザイン要件

- 背景: `cream-50`（`#FFFBF5`）
- メインカラー: `primary-500`（`#F97316`）
- テキスト: キャッチコピー + サブテキスト
- ロゴ: 左上または中央
- 犬のイラスト: 右側

---

## favicon

- 形式: SVG
- デザイン: 犬の足跡モチーフ
- カラー: `primary-500`（`#F97316`）
- パス: `/public/favicon.svg`

---

## SEOチェックリスト

### Critical

- [x] 全ページに title + description
- [x] canonical URL 設定
- [x] hreflang（ja / en / x-default）
- [x] HTTPS 有効（Netlify）
- [x] robots.txt でクロール許可
- [x] 単一 `<h1>` / ページ
- [x] 拡張 `robots` メタ（`max-image-preview:large` 等）
- [x] theme-color / color-scheme メタ

### High Priority

- [x] sitemap.xml 生成（hreflang リンク付き）
- [ ] OGP 画像（日英）と og:image:width/height/alt/type ※ 現状は SVG のため本番前に PNG 生成が必要
- [x] og:locale:alternate（言語切替）
- [x] モバイルレスポンシブ
- [ ] Core Web Vitals 合格（Lighthouse で確認）

### Medium Priority

- [x] JSON-LD: `WebSite`, `SoftwareApplication`, `Organization`（トップ）
- [x] JSON-LD: `FAQPage`（トップ抜粋 + FAQ 全件）
- [x] JSON-LD: `Product`（料金プラン）
- [x] JSON-LD: `ItemList`（機能紹介）
- [x] JSON-LD: `WebPage` + `dateModified`（法的ページ）
- [x] JSON-LD: `BreadcrumbList`（全サブページ）
- [x] パンくずリスト UI
- [x] 画像 alt テキスト
- [x] 内部リンク（ナビゲーション、フッター）

### 検証ツール

| ツール | 用途 |
|--------|------|
| Lighthouse | Performance, Accessibility, SEO, Best Practices |
| Google Rich Results Test | 構造化データの検証 |
| Schema.org Validator | JSON-LD の検証 |
| Google Search Console | クロールエラー、インデックス状況の確認 |
| OpenGraph.xyz / X Card Validator | OGP の見え方確認 |
