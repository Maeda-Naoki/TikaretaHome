# 開発環境設定

> 最終更新: 2026-02-15
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
pnpm add -D @astrojs/sitemap @biomejs/biome lefthook
```

---

## .npmrc

tikaretaメインプロジェクトと統一したサプライチェーンセキュリティ設定。

```ini
save-exact=true
ignore-dep-scripts=true
minimum-release-age=10080
trust-policy=no-downgrade
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

## Biome設定

tikaretaメインプロジェクトの `biome.json` をベースに、Astroプロジェクト向けに調整。

```json
{
  "$schema": "https://biomejs.dev/schemas/2.3.11/schema.json",
  "vcs": {
    "enabled": true,
    "clientKind": "git",
    "useIgnoreFile": true
  },
  "assist": {
    "actions": {
      "source": {
        "organizeImports": "on"
      }
    }
  },
  "files": {
    "ignoreUnknown": false,
    "includes": [
      "**",
      "!node_modules",
      "!.pnpm-store",
      "!dist",
      "!.astro",
      "!coverage",
      "!*.min.js"
    ]
  },
  "formatter": {
    "enabled": true,
    "indentStyle": "space",
    "indentWidth": 2,
    "lineWidth": 100
  },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true,
      "correctness": {
        "noUnusedImports": "warn",
        "noUnusedVariables": "warn"
      },
      "suspicious": {
        "noExplicitAny": "warn"
      }
    }
  },
  "css": {
    "parser": {
      "cssModules": false,
      "tailwindDirectives": true
    }
  },
  "javascript": {
    "formatter": {
      "quoteStyle": "single",
      "jsxQuoteStyle": "double",
      "semicolons": "always",
      "trailingCommas": "es5"
    }
  }
}
```

### tikaretaメインとの差異

| 項目 | tikareta | TikaretaHome |
|------|---------|-------------|
| files.includes除外 | `.next`, `.open-next`, `.wrangler`, `.serena` | `.astro` |
| style.noNonNullAssertion | off | 未設定（recommended準拠） |
| complexity.noImportantStyles | off | 未設定（recommended準拠） |

---

## lefthook設定

```yaml
# lefthook.yml
pre-commit:
  commands:
    biome-check:
      glob: "*.{js,ts,astro,css,json}"
      run: pnpm biome check --no-errors-on-unmatched {staged_files}
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
    "lint": "biome lint ./src",
    "lint:fix": "biome lint --write ./src",
    "check": "biome check ./src",
    "check:fix": "biome check --write ./src",
    "format": "biome format --write ./src",
    "type-check": "astro check"
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