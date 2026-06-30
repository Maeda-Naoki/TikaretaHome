import { defineConfig } from '@playwright/test';

import base from './playwright.config';

/**
 * VRT(Visual Regression Test)専用設定。
 *
 * `pnpm test:vrt` で実行 / `pnpm test:vrt:update` でスナップショット再生成。
 *
 * スナップショット(e2e/vrt.spec.ts-snapshots/)は Chromium のバージョンや OS の
 * アンチエイリアスに依存するため、別環境で実行する際は `:update` で生成し直すこと。
 * プリインストール Chromium を使う場合は PW_EXECUTABLE_PATH を指定する。
 */
export default defineConfig({
  ...base,
  testIgnore: undefined,
  testMatch: ['**/vrt.spec.ts'],
});
