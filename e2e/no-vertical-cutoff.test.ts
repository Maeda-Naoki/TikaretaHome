import { expect, test } from '@playwright/test';

const pages = [
  { path: '/', name: 'top (ja)' },
  { path: '/features', name: 'features (ja)' },
  { path: '/pricing', name: 'pricing (ja)' },
  { path: '/faq', name: 'faq (ja)' },
  { path: '/terms', name: 'terms (ja)' },
  { path: '/privacy', name: 'privacy (ja)' },
  { path: '/en/', name: 'top (en)' },
];

const mobileViewports = [
  { width: 360, height: 640 },
  { width: 375, height: 667 },
  { width: 390, height: 844 },
];

for (const { path, name } of pages) {
  test.describe(`${name} - no vertical content cutoff`, () => {
    for (const viewport of mobileViewports) {
      test(`viewport ${viewport.width}x${viewport.height}`, async ({ page }) => {
        await page.setViewportSize(viewport);
        await page.goto(path);
        await page.waitForLoadState('networkidle');

        const scrollHeight = await page.evaluate(() => document.documentElement.scrollHeight);
        expect(scrollHeight).toBeGreaterThan(0);

        const bodyOverflow = await page.evaluate(
          () => window.getComputedStyle(document.body).overflow
        );
        expect(bodyOverflow).not.toBe('hidden');

        const footer = page.locator('footer.foot');
        await footer.scrollIntoViewIfNeeded();
        await expect(footer).toBeVisible();

        // ヘッダー内の .btn-primary は狭い viewport で display:none になるため
        // main コンテンツ内のボタンのみ対象にする
        const primaryBtn = page.locator('main .btn-primary').first();
        const btnCount = await primaryBtn.count();
        if (btnCount > 0) {
          await primaryBtn.scrollIntoViewIfNeeded();
          await expect(primaryBtn).toBeVisible();
        }
      });
    }
  });
}
