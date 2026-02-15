# SEO設計

> 最終更新: 2026-02-15
---

## SEOコンポーネント（`src/components/common/SEO.astro`）

全ページの `<head>` 内に以下のメタタグを出力する共通コンポーネント。

### 出力するメタタグ

```html
<!-- 基本メタ -->
<title>{title}</title>
<meta name="description" content="{description}" />

<!-- Canonical + hreflang -->
<link rel="canonical" href="{canonicalUrl}" />
<link rel="alternate" hreflang="ja" href="{jaUrl}" />
<link rel="alternate" hreflang="en" href="{enUrl}" />
<link rel="alternate" hreflang="x-default" href="{jaUrl}" />

<!-- OGP -->
<meta property="og:type" content="website" />
<meta property="og:title" content="{title}" />
<meta property="og:description" content="{description}" />
<meta property="og:image" content="{ogImageUrl}" />
<meta property="og:url" content="{canonicalUrl}" />
<meta property="og:locale" content="ja_JP" />
<meta property="og:site_name" content="おさんぽタイプ" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="{title}" />
<meta name="twitter:description" content="{description}" />
<meta name="twitter:image" content="{ogImageUrl}" />

<!-- Favicon -->
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />

<!-- JSON-LD -->
<script type="application/ld+json">{jsonLd}</script>
```

### コンポーネントProps

```typescript
interface SEOProps {
  title: string;           // ページタイトル（50-60文字目安）
  description: string;     // メタディスクリプション（150-160文字目安）
  ogImage?: string;        // OGP画像パス（デフォルト: /og/default-{locale}.png）
  noindex?: boolean;       // noindex設定（デフォルト: false）
  jsonLd?: Record<string, unknown>;  // JSON-LD構造化データ
}
```

### hreflang生成ロジック

- `Astro.currentLocale` でロケール判定
- `getAbsoluteLocaleUrl()` で各言語の絶対URLを生成
- `x-default` は日本語URL（デフォルトロケール）

---

## 構造化データ（JSON-LD）

### トップページ

```json
[
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "おさんぽタイプ",
    "applicationCategory": "LifestyleApplication",
    "operatingSystem": "Web",
    "offers": [
      {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "JPY",
        "description": "無料プラン"
      },
      {
        "@type": "Offer",
        "price": "300",
        "priceCurrency": "JPY",
        "description": "月額プレミアム"
      },
      {
        "@type": "Offer",
        "price": "2400",
        "priceCurrency": "JPY",
        "description": "年額プレミアム"
      }
    ],
    "description": "犬の散歩パターンを記録・分析し、愛犬のおさんぽタイプを診断するWebアプリ"
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "おさんぽタイプ",
    "url": "https://tikareta.com",
    "logo": "https://tikareta.com/images/logo.svg"
  }
]
```

### FAQページ

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "おさんぽタイプとは？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "犬の散歩パターンを記録・分析し、愛犬の「おさんぽタイプ」を診断するWebアプリです。"
      }
    },
    {
      "@type": "Question",
      "name": "無料で何ができますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "散歩記録、休憩スポット登録、全期間データ閲覧、基本統計（直近3日間）、基本タイプ診断、コミュニティが無料で利用できます。"
      }
    }
  ]
}
```

### パンくずリスト（サブページ共通）

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "ホーム",
      "item": "https://tikareta.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "{ページ名}",
      "item": "https://tikareta.com/{path}"
    }
  ]
}
```

---

## robots.txt

```
User-agent: *
Allow: /
Sitemap: https://tikareta.com/sitemap-index.xml
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
| `/public/og/default-ja.png` | 1200x630px | 日本語キャッチコピー + 犬イラスト + ロゴ |
| `/public/og/default-en.png` | 1200x630px | 英語キャッチコピー + 犬イラスト + ロゴ |

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

- [ ] 全ページにtitle + description
- [ ] canonical URL設定
- [ ] hreflang（ja/en/x-default）
- [ ] HTTPS有効
- [ ] robots.txtでクロール許可
- [ ] 単一 `<h1>` / ページ

### High Priority

- [ ] sitemap.xml生成・確認
- [ ] OGP画像（日英）
- [ ] モバイルレスポンシブ
- [ ] Core Web Vitals合格

### Medium Priority

- [ ] JSON-LD構造化データ（トップ、FAQ）
- [ ] パンくずリスト
- [ ] 画像altテキスト
- [ ] 内部リンク（ナビゲーション、フッター）

### 検証ツール

| ツール | 用途 |
|--------|------|
| Lighthouse | Performance, Accessibility, SEO, Best Practices |
| Google Rich Results Test | 構造化データの検証 |
| Schema.org Validator | JSON-LDの検証 |
| Google Search Console | クロールエラー、インデックス状況の確認 |
