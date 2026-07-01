import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  // VRT(ビジュアル回帰)はブラウザ/OS依存のスナップショットを使うため
  // 通常の機能 e2e (pnpm test:e2e) からは除外し、専用設定で実行する。
  testIgnore: ['**/vrt.spec.ts'],
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:4321',
  },
  webServer: {
    command: 'pnpm preview',
    port: 4321,
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
        launchOptions: {
          // スクリーンショット比較(VRT)のフォント/アンチエイリアスを実行間で
          // 決定的にし、GPU ラスタライズ由来の 1/255 レベルのゆらぎを排除する。
          args: [
            '--disable-gpu',
            '--force-color-profile=srgb',
            '--disable-lcd-text',
            '--font-render-hinting=none',
          ],
          // 実行環境にプリインストールされた Chromium を使う場合のみ上書き
          // (未設定時は Playwright 既定のブラウザを使用)。
          ...(process.env.PW_EXECUTABLE_PATH
            ? { executablePath: process.env.PW_EXECUTABLE_PATH }
            : {}),
        },
      },
    },
  ],
});
