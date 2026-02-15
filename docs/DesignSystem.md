# デザインシステム

> 最終更新: 2026-02-15
---

## デザイントーン

**温かみ・親しみ系** — 犬の散歩アプリらしい温かみと親しみやすさ。パステルカラーと丸みのあるUIで、ユーザーに安心感を与える。

---

## カラーパレット

### Tailwind @theme 定義

```css
/* src/styles/global.css */
@import 'tailwindcss';

@theme {
  /* メインカラー: 温かみオレンジ */
  --color-primary-50: #FFF8F0;
  --color-primary-100: #FFEDD5;
  --color-primary-200: #FED7AA;
  --color-primary-300: #FDBA74;
  --color-primary-400: #FB923C;
  --color-primary-500: #F97316;
  --color-primary-600: #EA580C;
  --color-primary-700: #C2410C;

  /* アクセントカラー: 爽やかグリーン */
  --color-secondary-50: #F0FDF4;
  --color-secondary-100: #DCFCE7;
  --color-secondary-200: #BBF7D0;
  --color-secondary-300: #86EFAC;
  --color-secondary-400: #4ADE80;
  --color-secondary-500: #22C55E;

  /* 背景: クリーム系 */
  --color-cream-50: #FFFBF5;
  --color-cream-100: #FFF5E6;
  --color-cream-200: #FFECD1;

  /* テキスト: ウォームグレー */
  --color-warm-gray-50: #FAF9F7;
  --color-warm-gray-100: #F5F3F0;
  --color-warm-gray-200: #E8E4DF;
  --color-warm-gray-300: #D5CFC7;
  --color-warm-gray-400: #A89F94;
  --color-warm-gray-500: #78716C;
  --color-warm-gray-600: #57534E;
  --color-warm-gray-700: #44403C;
  --color-warm-gray-800: #292524;
  --color-warm-gray-900: #1C1917;

  /* フォント */
  --font-sans: 'Noto Sans JP', 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', Meiryo, sans-serif;
  --font-display: 'Rounded Mplus 1c', 'Noto Sans JP', sans-serif;

  /* 角丸 */
  --radius-soft: 1rem;
  --radius-card: 1.5rem;
  --radius-button: 9999px;

  /* シャドウ */
  --shadow-soft: 0 2px 8px rgba(0, 0, 0, 0.06);
  --shadow-card: 0 4px 16px rgba(0, 0, 0, 0.08);
  --shadow-hover: 0 8px 24px rgba(0, 0, 0, 0.12);
}
```

### カラー用途一覧

| 用途 | トークン | 値 | 使用箇所 |
|------|---------|-----|---------|
| メインカラー | `primary-500` | `#F97316` | CTAボタン、アクティブ状態、ロゴ |
| メインホバー | `primary-600` | `#EA580C` | ボタンホバー |
| メイン背景 | `primary-50` | `#FFF8F0` | セクション背景（交互） |
| アクセント | `secondary-500` | `#22C55E` | 成功状態、チェックマーク、価格ハイライト |
| ページ背景 | `cream-50` | `#FFFBF5` | body背景 |
| セクション背景 | `cream-100` | `#FFF5E6` | 交互セクション |
| 本文テキスト | `warm-gray-800` | `#292524` | 本文 |
| 補助テキスト | `warm-gray-500` | `#78716C` | キャプション、ラベル |
| ボーダー | `warm-gray-100` | `#F5F3F0` | 区切り線、カードボーダー |

---

## タイポグラフィ

### フォント

| フォント | 用途 | 読み込み |
|---------|------|---------|
| Rounded Mplus 1c | 見出し（`font-display`） | Google Fonts（400, 700） |
| Noto Sans JP | 本文（`font-sans`） | Google Fonts（400, 500, 700） |

### フォント読み込み

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&family=Rounded+Mplus+1c:wght@400;700&display=swap"
  rel="stylesheet"
/>
```

### サイズ・ウェイト

| 要素 | フォント | サイズ | ウェイト |
|------|---------|--------|---------|
| ヒーロー h1 | Rounded Mplus 1c | `text-4xl` / `text-5xl`（md以上） | 700 |
| セクション h2 | Rounded Mplus 1c | `text-3xl` | 700 |
| サブ見出し h3 | Noto Sans JP | `text-xl` | 700 |
| 本文 | Noto Sans JP | `text-base` (16px) | 400 |
| 小テキスト | Noto Sans JP | `text-sm` (14px) | 400 |
| ボタン | Noto Sans JP | `text-sm` / `text-base` | 700 |

---

## スペーシング

| 要素 | 値 |
|------|-----|
| セクション間 | `py-16` (64px) / `py-24` (96px, md以上) |
| カード内 | `p-6` (24px) / `p-8` (32px) |
| 要素間（大） | `gap-8` (32px) |
| 要素間（中） | `gap-4` (16px) |
| 要素間（小） | `gap-2` (8px) |
| コンテンツ最大幅 | `max-w-6xl` (1152px) |
| コンテンツ左右padding | `px-4` / `px-6`（sm以上） / `px-8`（lg以上） |

---

## UI特徴

### 角丸

| 要素 | クラス |
|------|-------|
| カード | `rounded-card` (1.5rem) |
| ボタン | `rounded-button` (9999px = ピル型) |
| 入力フィールド | `rounded-soft` (1rem) |
| 画像 | `rounded-2xl` |

### シャドウ

| 状態 | クラス | 値 |
|------|-------|-----|
| デフォルト | `shadow-soft` | `0 2px 8px rgba(0,0,0,0.06)` |
| カード | `shadow-card` | `0 4px 16px rgba(0,0,0,0.08)` |
| ホバー | `shadow-hover` | `0 8px 24px rgba(0,0,0,0.12)` |

### アニメーション

スクロールフェードインは `IntersectionObserver` で実装。

```css
/* global.css に追加 */
@layer utilities {
  .fade-in-up {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  }
  .fade-in-up.is-visible {
    opacity: 1;
    transform: translateY(0);
  }
}
```

```html
<script>
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    },
    { threshold: 0.1 }
  );
  document.querySelectorAll('.fade-in-up').forEach((el) => observer.observe(el));
</script>
```

---

## コンポーネント一覧

### 共通コンポーネント（`src/components/common/`）

| コンポーネント | 役割 |
|---------------|------|
| `Header.astro` | ロゴ + ナビゲーション + 言語切替 + モバイルメニュー |
| `Footer.astro` | フッターリンク + コピーライト |
| `SEO.astro` | canonical, hreflang, OGP, Twitter Card, JSON-LD |
| `LanguageSwitcher.astro` | 日英言語切替リンク |
| `SkipToContent.astro` | スクリーンリーダー用スキップリンク |
| `Breadcrumbs.astro` | パンくずリスト |
| `CTAButton.astro` | メインアプリへの誘導ボタン |

### トップページ（`src/components/home/`）

| コンポーネント | 役割 |
|---------------|------|
| `Hero.astro` | キャッチコピー + CTA + ヒーロー画像 |
| `ValueProposition.astro` | 3つの提供価値（パターン発見、タイプ診断、共感） |
| `HowItWorks.astro` | 使い方3ステップ |
| `TypeDiagnosis.astro` | 8つのおさんぽタイプ紹介カード |
| `FeatureHighlights.astro` | 主要機能サマリー（4-6個） |
| `PricingSummary.astro` | 料金プラン概要（3カラム） |
| `Testimonials.astro` | ユーザーの声（カード形式） |
| `FinalCTA.astro` | 最終アクション誘導 |

### 機能紹介（`src/components/features/`）

| コンポーネント | 役割 |
|---------------|------|
| `FeatureCard.astro` | 個別機能カード（アイコン + タイトル + 説明） |
| `FeatureSection.astro` | 機能カテゴリセクション（無料/プレミアム） |
| `FreeVsPremium.astro` | 無料 vs 有料 比較表 |

### 料金（`src/components/pricing/`）

| コンポーネント | 役割 |
|---------------|------|
| `PricingCard.astro` | 個別プランカード（無料/月額/年額） |
| `PricingTable.astro` | 全機能比較表（チェックマーク形式） |
| `PricingFAQ.astro` | 料金に関するFAQ |

### FAQ（`src/components/faq/`）

| コンポーネント | 役割 |
|---------------|------|
| `FAQItem.astro` | アコーディオン形式の質問・回答 |
| `FAQSection.astro` | カテゴリ別FAQグループ |
