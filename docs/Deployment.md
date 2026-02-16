# デプロイ設定

> 最終更新: 2026-02-15
---

## デプロイ先

| 項目 | 内容 |
|------|------|
| プラットフォーム | Netlify |
| 出力形式 | 静的サイト（`output: 'static'`） |
| ビルドコマンド | `pnpm build` |
| 公開ディレクトリ | `dist` |

---

## netlify.toml

```toml
[build]
  command = "pnpm build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "24"
  PNPM_VERSION = "10.28.2"

# セキュリティヘッダー
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "camera=(), microphone=(), geolocation=()"
    Content-Security-Policy = "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self'"

# キャッシュ: 静的アセット（1年）
[[headers]]
  for = "/images/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/_astro/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

# キャッシュ: OGP画像（1年）
[[headers]]
  for = "/og/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

# リダイレクト: www → non-www
[[redirects]]
  from = "https://www.tikareta.com/*"
  to = "https://tikareta.com/:splat"
  status = 301
  force = true

# 404ページ
[[redirects]]
  from = "/*"
  to = "/404.html"
  status = 404
```

---

## セキュリティヘッダー詳細

| ヘッダー | 値 | 目的 |
|---------|-----|------|
| X-Frame-Options | DENY | クリックジャッキング防止 |
| X-Content-Type-Options | nosniff | MIMEスニッフィング防止 |
| Referrer-Policy | strict-origin-when-cross-origin | リファラー情報の制御 |
| Permissions-Policy | camera=(), microphone=(), geolocation=() | 不要なブラウザAPI無効化 |
| Content-Security-Policy | ※上記参照 | XSS防止、リソース読み込み制御 |

### CSP詳細

| ディレクティブ | 値 | 理由 |
|---------------|-----|------|
| default-src | 'self' | デフォルトは自サイトのみ |
| script-src | 'self' 'unsafe-inline' | Astroのインラインスクリプト対応 |
| style-src | 'self' 'unsafe-inline' fonts.googleapis.com | Tailwind + Google Fonts |
| font-src | 'self' fonts.gstatic.com | Google Fontsのフォントファイル |
| img-src | 'self' data: https: | 画像（OGP等で外部参照の可能性） |
| connect-src | 'self' | API接続は自サイトのみ |

---

## キャッシュ戦略

| パス | Cache-Control | 対象 |
|------|--------------|------|
| `/_astro/*` | `public, max-age=31536000, immutable` | ビルド済みCSS/JS（ハッシュ付き） |
| `/images/*` | `public, max-age=31536000, immutable` | 画像ファイル |
| `/og/*` | `public, max-age=31536000, immutable` | OGP画像 |
| HTMLページ | Netlifyデフォルト | HTMLファイル |

---

## CD（継続的デプロイ）

GitHub Actions からNetlifyへ自動デプロイする。ワークフローは `.github/workflows/cd.yml` で定義。

### デプロイフロー

```
main へ push → CI (lint + build) → CD (build + deploy production)
PR 作成/更新 → CI (lint + build) → CD (build + deploy preview → PR にコメント)
```

| トリガー | デプロイ先 | 備考 |
|---------|-----------|------|
| `main` への push | 本番環境 | production deploy |
| PR (to `main`) | プレビュー環境 | PR にプレビューURL がコメントされる |

### 必要なシークレット

GitHub リポジトリの **Settings → Secrets and variables → Actions** に以下を設定:

| シークレット名 | 取得方法 |
|---------------|---------|
| `NETLIFY_AUTH_TOKEN` | Netlify: User settings → Applications → Personal access tokens → New access token |
| `NETLIFY_SITE_ID` | Netlify: Site configuration → General → Site ID（API ID） |

### 初回セットアップ手順

1. **Netlify でサイトを作成**
   - Netlify にログイン → 「Add new site」→「Deploy manually」でサイトを作成
   - ※ GitHub連携による自動ビルドは**不要**（GitHub Actions から CLI でデプロイするため）
2. **Site ID を取得**
   - Site configuration → General → Site ID をコピー
3. **Personal Access Token を取得**
   - User settings → Applications → Personal access tokens → 「New access token」
4. **GitHub にシークレットを登録**
   - リポジトリの Settings → Secrets and variables → Actions
   - `NETLIFY_AUTH_TOKEN` と `NETLIFY_SITE_ID` を登録
5. **Netlify の自動ビルドを無効化**（GitHub連携している場合）
   - Site configuration → Build & deploy → Continuous deployment → Build settings
   - 「Stop builds」で Netlify 側のビルドを停止（GitHub Actions 側でビルド・デプロイするため）

### カスタムドメイン設定（将来）

1. Netlifyの「Domain management」でカスタムドメインを追加
2. DNSレコード設定（CNAME or A record）
3. HTTPS自動有効化（Let's Encrypt）
4. `astro.config.ts` の `site` をカスタムドメインに更新

### プレビューデプロイ

PRを作成・更新すると、GitHub Actions が自動でプレビューデプロイを実行。PRにプレビューURLがコメントされる。

---

## 検証チェックリスト

- [ ] `pnpm build` がエラーなしで完了
- [ ] `pnpm preview` で全ページ表示確認
- [ ] Netlifyプレビューデプロイで動作確認
- [ ] 全ページのLighthouse スコア 90以上（Performance, Accessibility, SEO, Best Practices）
- [ ] 日英両言語の全ページ表示確認
- [ ] モバイル / タブレット / PC レスポンシブ確認
- [ ] セキュリティヘッダーが正しく出力されていること（DevTools Network tab）
- [ ] hreflang / canonical URL の正当性
