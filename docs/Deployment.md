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

Netlify GitHub App 連携によるネイティブ CD。トークンやシークレットの設定は不要。

### デプロイフロー

```
main へ push → Netlify が自動検知 → ビルド → 本番デプロイ
PR 作成/更新 → Netlify が自動検知 → ビルド → プレビューデプロイ（PR にコメント）
```

| トリガー | デプロイ先 | 備考 |
|---------|-----------|------|
| `main` への push | 本番環境 | `netlify.toml` の設定でビルド・デプロイ |
| PR (to `main`) | プレビュー環境 | PR にプレビューURL が自動コメントされる |

### CI との連携

GitHub Actions の CI（`.github/workflows/ci.yml`）で Lint・型チェック・ビルド検証を実施。Netlify はビルド・デプロイのみを担当。

```
push / PR → CI (Biome lint + type check + build) ← GitHub Actions
            CD (build + deploy)                  ← Netlify
```

### 初回セットアップ手順

1. **Netlify でサイトをインポート**
   - Netlify にログイン → 「Add new site」→「Import an existing project」
   - GitHub リポジトリ `Maeda-Naoki/TikaretaHome` を選択
2. **ビルド設定を確認**
   - Build command: `pnpm build`（`netlify.toml` で指定済み）
   - Publish directory: `dist`（`netlify.toml` で指定済み）
   - Node.js: v24（`netlify.toml` で指定済み）
3. **デプロイ完了**
   - main ブランチへの push で自動デプロイが開始される
   - PR のプレビューデプロイも自動で有効

### Netlify の設定項目

| 項目 | 設定 | 備考 |
|------|------|------|
| Production branch | `main` | 本番デプロイ対象ブランチ |
| Branch deploys | None | main のみデプロイ |
| Deploy Previews | Automatically | PR ごとにプレビュー生成 |

### カスタムドメイン設定（将来）

1. Netlifyの「Domain management」でカスタムドメインを追加
2. DNSレコード設定（CNAME or A record）
3. HTTPS自動有効化（Let's Encrypt）
4. `astro.config.ts` の `site` をカスタムドメインに更新

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
