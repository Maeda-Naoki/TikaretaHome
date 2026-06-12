# デプロイ設定

> 最終更新: 2026-06-12
---

## デプロイ先

| 項目 | 内容 |
|------|------|
| プラットフォーム | Cloudflare Workers（Static Assets） |
| 出力形式 | 静的サイト（`output: 'static'`、Astro adapter 不要） |
| ビルドコマンド | `pnpm build` |
| 公開ディレクトリ | `dist` |

> 完全静的サイトのため Worker スクリプト（`main`）は持たず、`dist/` を静的アセットとして
> 配信する assets-only 構成。ヘッダー / 404 は `_headers` と `wrangler.toml` で制御する。

---

## wrangler.toml

```toml
name = "tikareta-home"
compatibility_date = "2026-06-02"

# 完全静的サイト（assets-only）。Worker スクリプト（main）は持たない。
[assets]
directory = "./dist"
# Astro が生成する /404.html を 404 応答として自動配信
not_found_handling = "404-page"
```

- `not_found_handling = "404-page"` が存在しないパスに対して `/404.html` を 404 ステータスで
  返すため、リダイレクトルール（旧 `netlify.toml` の `/* → /404.html`）は不要。
- `compatibility_date` はローカルの wrangler バイナリがサポートする範囲で設定する
  （新しすぎると `wrangler dev` のランタイムが起動しないため、過去日付でよい）。

## public/_headers

セキュリティヘッダーとキャッシュは `public/_headers` で定義する。ビルド時に `dist/` へ
コピーされ、Workers がパースして静的アセットのレスポンスに適用する
（最大100ルール / 1ヘッダ最大2,000文字）。

```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self'

/_astro/*
  Cache-Control: public, max-age=31536000, immutable

/images/*
  Cache-Control: public, max-age=31536000, immutable

/og/*
  Cache-Control: public, max-age=31536000, immutable
```

> ローカル確認: `pnpm cf:preview`（`pnpm build && wrangler dev`）で起動し、
> `curl -I http://localhost:8787/` でヘッダーを確認できる。

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
| HTMLページ | Cloudflareデフォルト | HTMLファイル |

---

## CD（継続的デプロイ）

Cloudflare **Workers Builds**（ダッシュボードの Git 連携）によるネイティブ CD。
リポジトリを接続すると push をトリガーに自動でビルド（`pnpm build`）→ `wrangler deploy` を実行する。

### デプロイフロー

```
main へ push → Workers Builds が自動検知 → pnpm build → wrangler deploy → 本番デプロイ
PR 作成/更新 → Workers Builds が自動検知 → ビルド → プレビューデプロイ（プレビューURL 発行）
```

| トリガー | デプロイ先 | 備考 |
|---------|-----------|------|
| `main` への push | 本番環境 | `wrangler.toml` の設定でビルド・デプロイ |
| PR (to `main`) | プレビュー環境 | プレビューURL が発行される |

### CI との連携

GitHub Actions の CI（`.github/workflows/ci.yml`）で Lint・型チェック・ビルド検証を実施。Cloudflare Workers Builds はビルド・デプロイのみを担当。

```
push / PR → CI (oxlint + type check + build)   ← GitHub Actions
            CD (build + wrangler deploy)        ← Cloudflare Workers Builds
```

### 初回セットアップ手順

1. **Cloudflare で Worker を作成**
   - Cloudflare ダッシュボード → Workers & Pages → Create →「Import a repository」
   - GitHub リポジトリ `Maeda-Naoki/TikaretaHome` を選択
2. **ビルド設定を確認**
   - Build command: `pnpm build`
   - Deploy command: `wrangler deploy`（assets ディレクトリは `wrangler.toml` の `./dist`）
   - Node.js: v24（環境変数 `NODE_VERSION=24` などで指定）
3. **デプロイ完了**
   - main ブランチへの push で自動デプロイが開始される
   - PR のプレビューデプロイも自動で有効

> ローカルからの手動デプロイは `pnpm deploy`（`pnpm build && wrangler deploy`）。
> 初回は `wrangler login` で Cloudflare アカウント認証が必要。

### Workers Builds の設定項目

| 項目 | 設定 | 備考 |
|------|------|------|
| Production branch | `main` | 本番デプロイ対象ブランチ |
| Build command | `pnpm build` | dist を生成 |
| Deploy command | `wrangler deploy` | assets-only 配信 |
| Preview deployments | Automatically | PR ごとにプレビュー生成 |

### カスタムドメイン設定

1. Cloudflare ダッシュボード → 該当 Worker → Settings → Domains & Routes →「Add custom domain」
2. `tikareta-home.luckyretriever.app` を追加（同一アカウントの DNS なら自動でレコード設定）
3. HTTPS は Cloudflare により自動有効化
4. `astro.config.ts` の `site` は既に当ドメインを指定済み

---

## 環境変数

ビルド時に参照される環境変数の一覧と設定箇所。

| 変数名 | 用途 | 必須 |
|--------|------|------|
| `GOOGLE_SITE_VERIFICATION` | Google Search Console 所有権確認用トークン | 任意（未設定なら meta タグ自体が出力されない） |

### Cloudflare 設定手順

1. Cloudflare ダッシュボード → 該当 Worker → Settings → Variables and Secrets
   （または Workers Builds の Build configuration → Build variables）
2. **Add** をクリック
3. Name: `GOOGLE_SITE_VERIFICATION` / Value: Search Console から取得したトークン
   / ビルド時に参照させるため **Build variable** として設定
4. 保存後、再デプロイ（push もしくは Workers Builds の Retry）

### GitHub Actions 設定手順

CI の `build` ジョブで `environment: ci` を指定しているため、GitHub Environment のスコープ値を参照する。

1. リポジトリ Settings → Environments → **New environment** → 名前: `ci`
2. **Environment variables** → **Add variable** → Name: `GOOGLE_SITE_VERIFICATION` / Value: 同じトークン
3. 以降の CI 実行で `vars.GOOGLE_SITE_VERIFICATION` が解決され、`pnpm run build` に env として渡される

> 注 1: 環境名を `ci` にしているのは、本物のデプロイ（Cloudflare Workers Builds）と区別するため。`production` 名にすると将来 deployment protection rules を付けた瞬間に CI が承認待ちでブロックされる恐れがある。
>
> 注 2: `google-site-verification` の値は公開 HTML に出力される非機密データのため、Variables（`vars`）で十分。機密扱いしたい場合は Secrets に登録し、`ci.yml` の参照を `${{ secrets.GOOGLE_SITE_VERIFICATION }}` へ変更する。

### ローカル開発

通常は不要だが、検証用に動作確認したい場合:

```bash
cp .env.example .env
# .env を編集して値を入れる
pnpm build
```

`.env` は `.gitignore` 済み。

---

## 検証チェックリスト

- [ ] `pnpm build` がエラーなしで完了（`dist/_headers`・`dist/404.html` が出力される）
- [ ] `pnpm cf:preview`（`wrangler dev`）で全ページ表示・404 応答を確認
- [ ] Cloudflare プレビューデプロイで動作確認
- [ ] 全ページのLighthouse スコア 90以上（Performance, Accessibility, SEO, Best Practices）
- [ ] 日英両言語の全ページ表示確認
- [ ] モバイル / タブレット / PC レスポンシブ確認
- [ ] セキュリティヘッダーが正しく出力されていること（`curl -I` / DevTools Network tab）
- [ ] hreflang / canonical URL の正当性
