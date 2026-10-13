# 開発環境設定

> 最終更新: 2026-10-13
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

## pnpm-workspace.yaml

pnpm のバージョンは `package.json` の `packageManager` で固定し、設定は
[pnpm-workspace.yaml](../pnpm-workspace.yaml) で管理する。

- 依存バージョンは完全固定し、原則として公開後7日以上経過した安定版を使用する。
- `minimumReleaseAgeExclude` に列挙されたパッケージは公開直後でも更新できる。
- 依存のライフサイクルスクリプトは `allowBuilds` に列挙されたパッケージだけ許可し、
  未承認のスクリプトは `strictDepBuilds: true` でエラーにする。
- pnpm 12 では従来の `trustPolicy: accept` に相当する設定は `trustPolicy: off`。
  公開後の待機期間、依存ソースの制限、ストアの整合性検証は個別の設定で維持する。

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
    "paths": {
      "@components/*": ["./src/components/*"],
      "@layouts/*": ["./src/layouts/*"],
      "@utils/*": ["./src/utils/*"],
      "@data/*": ["./src/data/*"],
      "@styles/*": ["./src/styles/*"],
      "@assets/*": ["./src/assets/*"]
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

TypeScript は Astro 標準の型チェッカーが対応する **6.0.3** を使用する。
`pnpm type-check`（`astro check`）で TypeScript と Astro ファイルをまとめて検査し、
ビルドと CI でも同じチェッカーを使用する。

エイリアスは `paths` に `./src/...` の相対パスで指定し、`baseUrl` は使用しない。
