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
  // ピクセル厳密比較のため、必ず最新ソースをビルドした dist/ を preview で配信する。
  // reuseExistingServer:false で、別に起動中の dev サーバ(HMR入り・未minify)を
  // 誤って再利用して偽の差分が出るのを防ぐ。
  webServer: {
    command: 'pnpm build && pnpm preview',
    port: 4321,
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
