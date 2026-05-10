import { expect, test } from '@playwright/test';

const mobileWidths = [320, 360, 375, 390, 414];

const pages = [
  { path: '/', name: 'top (ja)' },
  { path: '/features', name: 'features (ja)' },
  { path: '/pricing', name: 'pricing (ja)' },
  { path: '/faq', name: 'faq (ja)' },
  { path: '/en/', name: 'top (en)' },
];

for (const { path, name } of pages) {
  test.describe(`${name} - no page-level horizontal scroll`, () => {
    for (const width of mobileWidths) {
      test(`viewport ${width}px`, async ({ page }) => {
        await page.setViewportSize({ width, height: 800 });
        await page.goto(path);
        await page.waitForLoadState('networkidle');

        const { scrollWidth, clientWidth } = await page.evaluate(() => ({
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
        }));

        expect(scrollWidth).toBeLessThanOrEqual(clientWidth);
      });
    }
  });
}
