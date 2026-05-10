# 開発環境設定

> 最終更新: 2026-05-10
---

## パッケージマネージャー

| 項目 | 内容 |
|------|------|
| 使用するもの | **pnpm** |
| 禁止 | npm, yarn |
| 理由 | tikaretaメインプロジェクトと統一、ディスク効率、厳格な依存関係管理 |

---

## Node.js

| 項目 | 内容 |
|------|------|
| バージョン | **v24 LTS** |
| バージョン管理 | `.node-version` で指定 |

---

## プロジェクト初期化

```bash
# Astroプロジェクト作成
pnpm create astro@latest TikaretaHome -- --template minimal --typescript strict --install --git

cd TikaretaHome

# 本番依存
pnpm add tailwindcss @tailwindcss/vite

# 開発依存
pnpm add -D @astrojs/sitemap oxlint oxfmt lefthook
```

---

## .npmrc

tikaretaメインプロジェクトと統一したサプライチェーンセキュリティ設定。

```ini
save-exact=true
ignore-dep-scripts=true
minimum-release-age=10080
minimum-release-age-exclude[]='oxlint'
minimum-release-age-exclude[]='oxfmt'
minimum-release-age-exclude[]='@astrojs/*'
minimum-release-age-exclude[]='astro'
trust-policy=accept
block-exotic-subdeps=true
verify-store-integrity=true
strict-store-pkg-content-check=true
```

---

## .node-version

```
24
```

---

## tsconfig.json

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@components/*": ["src/components/*"],
      "@layouts/*": ["src/layouts/*"],
      "@utils/*": ["src/utils/*"],
      "@data/*": ["src/data/*"],
      "@styles/*": ["src/styles/*"],
      "@assets/*": ["src/assets/*"]
    }
  }
}
```

---

## Linter / Formatter（oxlint + oxfmt）

oxc-projectが提供する高速なRust製ツール。Biomeから移行済み。

| 項目 | 内容 |
|------|------|
| Linter | **oxlint**（ESLint v8互換のconfig） |
| Formatter | **oxfmt**（Prettier互換のconfig） |
| 設定ファイル | `.oxlintrc.json`, `.oxfmtrc.json` |

### .oxlintrc.json

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["typescript", "unicorn", "oxc", "import"],
  "env": {
    "browser": true,
    "node": true,
    "es2026": true,
    "astro": true
  },
  "ignorePatterns": [
    "node_modules",
    ".pnpm-store",
    "dist",
    ".astro",
    "coverage",
    "*.min.js"
  ],
  "rules": {
    "no-unused-vars": "warn",
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/no-explicit-any": "warn"
  },
  "overrides": [
    {
      "files": ["*.astro"],
      "rules": {
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": "off"
      }
    }
  ]
}
```

### .oxfmtrc.json

```json
{
  "$schema": "./node_modules/oxfmt/configuration_schema.json",
  "useTabs": false,
  "tabWidth": 2,
  "printWidth": 100,
  "singleQuote": true,
  "jsxSingleQuote": false,
  "quoteProps": "as-needed",
  "trailingComma": "es5",
  "semi": true,
  "arrowParens": "always",
  "bracketSameLine": false,
  "bracketSpacing": true,
  "sortImports": true,
  "ignorePatterns": [
    "node_modules",
    ".pnpm-store",
    "dist",
    ".astro",
    "coverage",
    "*.min.js"
  ]
}
```

---

## lefthook設定

```yaml
# lefthook.yml
pre-commit:
  commands:
    oxlint:
      glob: "*.{js,jsx,ts,tsx,mjs,cjs}"
      run: pnpm oxlint --no-error-on-unmatched-pattern {staged_files}
    oxfmt:
      glob: "*.{js,jsx,ts,tsx,mjs,cjs,json,jsonc,css,html,md,astro}"
      run: pnpm oxfmt --check --no-error-on-unmatched-pattern {staged_files}
```

---

## package.json scripts

```json
{
  "scripts": {
    "prepare": "lefthook install",
    "dev": "astro dev",
    "build": "astro check && astro build",
    "preview": "astro preview",
    "lint": "oxlint",
    "lint:fix": "oxlint --fix",
    "format": "oxfmt",
    "format:check": "oxfmt --check",
    "check": "oxlint && oxfmt --check",
    "check:fix": "oxlint --fix && oxfmt",
    "type-check": "astro check",
    "test:e2e": "playwright test"
  }
}
```

---

## ライブラリバージョンポリシー

| 方針 | 詳細 |
|------|------|
| 原則 | **最新の安定版を使用** |
| バージョン固定 | `save-exact=true` で正確なバージョンを指定 |
| ロックファイル | `pnpm-lock.yaml` を必ずコミット |
| 定期的な更新 | 依存関係は定期的に更新してセキュリティと機能を維持 |
