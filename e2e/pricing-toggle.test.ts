import { expect, test } from '@playwright/test';

test.describe('Pricing page billing toggle (ja)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/pricing');
  });

  test('shows monthly prices by default', async ({ page }) => {
    const wrapper = page.locator('.pricing-cards-wrapper');
    await expect(wrapper).toHaveAttribute('data-billing', 'monthly');

    const standardCard = page.locator('.pricing-card[data-plan="standard"]');
    const proCard = page.locator('.pricing-card[data-plan="pro"]');

    await expect(standardCard.locator('.billing-monthly').first()).toContainText('¥300');
    await expect(proCard.locator('.billing-monthly').first()).toContainText('¥500');
  });

  test('switches to yearly prices when toggled', async ({ page }) => {
    await page.click('[data-billing-toggle="yearly"]');

    const wrapper = page.locator('.pricing-cards-wrapper');
    await expect(wrapper).toHaveAttribute('data-billing', 'yearly');

    const yearlyButton = page.locator('[data-billing-toggle="yearly"]');
    await expect(yearlyButton).toHaveAttribute('aria-pressed', 'true');

    const standardCard = page.locator('.pricing-card[data-plan="standard"]');
    const proCard = page.locator('.pricing-card[data-plan="pro"]');

    // Yearly per-month for Standard: 2400/12 = 200
    await expect(standardCard.locator('span.billing-yearly').first()).toContainText('¥200');
    // Yearly per-month for Pro: 4800/12 = 400
    await expect(proCard.locator('span.billing-yearly').first()).toContainText('¥400');

    // Standard saves 4 months, Pro saves 2 months — verify per-plan accuracy
    await expect(standardCard.locator('div.billing-yearly')).toContainText('4ヶ月分お得');
    await expect(proCard.locator('div.billing-yearly')).toContainText('2ヶ月分お得');
  });

  test('Free plan stays at ¥0 regardless of toggle', async ({ page }) => {
    const freeCard = page.locator('.pricing-card[data-plan="free"]');
    await expect(freeCard).toContainText('Free');

    await page.click('[data-billing-toggle="yearly"]');
    await expect(freeCard).toContainText('Free');
    // No price-per-month rendering on the free card
    await expect(freeCard.locator('.billing-monthly')).toHaveCount(0);
    await expect(freeCard.locator('span.billing-yearly')).toHaveCount(0);
  });
});

test.describe('Pricing page billing toggle (en)', () => {
  test('switches to yearly with localized savings text', async ({ page }) => {
    await page.goto('/en/pricing');
    await page.click('[data-billing-toggle="yearly"]');

    const standardCard = page.locator('.pricing-card[data-plan="standard"]');
    await expect(standardCard.locator('div.billing-yearly')).toContainText('Save 4 months');

    const proCard = page.locator('.pricing-card[data-plan="pro"]');
    await expect(proCard.locator('div.billing-yearly')).toContainText('Save 2 months');
  });
});
