# TikaretaHome - おさんぽタイプ ランディングページ

> 最終更新: 2026-02-15
---

## ドキュメント一覧

| ドキュメント | 内容 | ファイル |
|-------------|------|---------|
| **プロジェクト概要** | 本ドキュメント。概要と確定事項 | `CLAUDE.md` |
| **技術スタック** | Astro, Tailwind CSS, i18n設計、MotekitaHomeとの差異 | [docs/TechnologyStack.md](./docs/TechnologyStack.md) |
| **開発環境設定** | pnpm, Node.js, Biome, lefthook, scripts | [docs/Development.md](./docs/Development.md) |
| **デザインシステム** | カラー、フォント、スペーシング、コンポーネント | [docs/DesignSystem.md](./docs/DesignSystem.md) |
| **ページ設計** | 各ページの構成、メタタグ、ワイヤーフレーム | [docs/Pages.md](./docs/Pages.md) |
| **SEO設計** | メタタグ戦略、構造化データ、OGP | [docs/SEO.md](./docs/SEO.md) |
| **デプロイ設定** | Netlify設定、セキュリティヘッダー | [docs/Deployment.md](./docs/Deployment.md) |

---

## プロジェクト概要

### コンセプト

おさんぽタイプ（メインアプリ）のプロダクト紹介用ランディングページサイト。メインアプリとは別リポジトリで管理し、Astroで静的サイトとして構築する。

- **メインアプリ**: [tikareta](https://github.com/Maeda-Naoki/tikareta)（Next.js + Supabase + Cloudflare Workers）
- **リファレンス**: [MotekitaHome](https://github.com/Maeda-Naoki/MotekitaHome)（Astro + Tailwind CSS + Netlify）

### キャッチコピー

> 「うちの子のおさんぽスタイル、知ってる？」
### ターゲットユーザー

| 優先度 | ユーザー層 |
|--------|----------|
| メイン | 犬を飼っている人（毎日散歩する飼い主） |
| サブ | これから犬を飼いたい人、犬好きな人 |

---

## 技術スタック（概要）

> **詳細は [技術スタック詳細](./docs/TechnologyStack.md) を参照**
| カテゴリ | 選択 |
|----------|------|
| フレームワーク | Astro 5.x（最新安定版） |
| CSS | Tailwind CSS 4.x（@tailwindcss/vite） |
| i18n | Astro ビルトイン i18n |
| サイトマップ | @astrojs/sitemap |
| Linter / Formatter | Biome |
| Git hooks | lefthook |
| デプロイ先 | Netlify |
| Node.js | v24 |
| パッケージマネージャー | pnpm |

---

## ページ構成（概要）

> **詳細は [ページ設計](./docs/Pages.md) を参照**
| ページ | パス（ja） | パス（en） |
|--------|-----------|-----------|
| トップ | `/` | `/en/` |
| 機能紹介 | `/features` | `/en/features` |
| 料金プラン | `/pricing` | `/en/pricing` |
| よくある質問 | `/faq` | `/en/faq` |
| プライバシーポリシー | `/privacy` | `/en/privacy` |
| 利用規約 | `/terms` | `/en/terms` |
| 404 | `/404` | `/404` |

---

## 料金プラン

| プラン | 価格 | 特徴 |
|--------|------|------|
| 無料 | 0円 | 基本機能 + 統計3日間 + 基本タイプ診断 |
| 月額 | 300円 | 全機能 |
| 年額 | 2,400円 | 4ヶ月分お得（実質200円/月） |

---

## 実装フェーズ

### Phase A: 基盤構築
1. Astroプロジェクト初期化（pnpm create astro）
2. パッケージインストール（tailwindcss, @astrojs/sitemap, biome, lefthook）
3. 設定ファイル作成（astro.config.ts, tsconfig.json, biome.json, netlify.toml等）
4. グローバルCSS（Tailwind @theme カスタムテーマ）

### Phase B: i18n基盤 + 共通コンポーネント
5. 翻訳データ構造（TypeScript、型安全）
6. ユーティリティ（i18n.ts, seo.ts）
7. 共通コンポーネント（Layout, Header, Footer, SEO, LanguageSwitcher等）

### Phase C: トップページ
8. Hero, ValueProposition, HowItWorks, TypeDiagnosis, FeatureHighlights, PricingSummary, FinalCTA

### Phase D: サブページ
9. 機能紹介、料金、FAQ、利用規約、プライバシーポリシー

### Phase E: SEO + 仕上げ
10. robots.txt, favicon, OGP画像, JSON-LD, アニメーション, 404ページ

### Phase F: 検証 + デプロイ
11. Lighthouse全項目90以上、日英レスポンシブ確認、Netlifyデプロイ

---

## 確定事項

- [x] リポジトリ名: **TikaretaHome**
- [x] 言語対応: **日本語 + 英語**（i18n）
- [x] ページ構成: **複数ページ**（6ページ × 2言語 + 404）
- [x] デザイントーン: **温かみ・親しみ系**（パステルカラー + 丸みのあるUI）
- [x] デプロイ先: **Netlify**
- [x] i18n方式: **Astroビルトイン**（astro-i18n-autは非採用）
- [x] 翻訳データ: **TypeScript**（JSONではなく型安全なTS）
- [x] 出力: **完全静的**（output: 'static'）
- [x] SEO対策: **メタタグ + JSON-LD + OGP**（構造化データも実装）
- [x] パフォーマンス目標: **Lighthouse 90以上**（Performance, Accessibility, SEO, Best Practices全て）
- [x] セキュリティヘッダー: **CSP + その他**（Content-Security-Policy, X-Content-Type-Options, X-Frame-Options, Referrer-Policy）
- [x] キャッシュ戦略: **静的アセットは長期キャッシュ**（Cache-Control: public, max-age=31536000, immutable）
- [x] Node.jsバージョン: **24**（Netlifyでサポートされている最新安定版）
- [x] パッケージマネージャー: **pnpm**（軽量で高速なパッケージ管理）
- [x] Linter/Formatter: **Biome**（コード品質と一貫性のため）
- [x] Git hooks: **lefthook**（コミット前のコードチェックとフォーマット）  
