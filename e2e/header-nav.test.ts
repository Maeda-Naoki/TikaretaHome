import { expect, test } from '@playwright/test';

const jaNavLinks = [
  { label: '機能紹介', href: '/features' },
  { label: '料金プラン', href: '/pricing' },
  { label: 'よくある質問', href: '/faq' },
  { label: 'ロードマップ', href: '/roadmap' },
];

const enNavLinks = [
  { label: 'Features', href: '/en/features' },
  { label: 'Pricing', href: '/en/pricing' },
  { label: 'FAQ', href: '/en/faq' },
  { label: 'Roadmap', href: '/en/roadmap' },
];

test.describe('Header navigation (Japanese, desktop)', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
  });

  test('shows all nav links', async ({ page }) => {
    const nav = page.locator('header nav.nav-links');
    for (const { label } of jaNavLinks) {
      await expect(nav.locator(`a`, { hasText: label })).toBeVisible();
    }
  });

  test('nav links point to correct subdirectory paths', async ({ page }) => {
    const nav = page.locator('header nav.nav-links');
    for (const { label, href } of jaNavLinks) {
      const link = nav.locator('a', { hasText: label });
      await expect(link).toHaveAttribute('href', href);
    }
  });

  test('clicking a nav link navigates to the correct page', async ({ page }) => {
    await page.locator('header nav.nav-links a', { hasText: '機能紹介' }).click();
    await expect(page).toHaveURL('/features');
  });
});

test.describe('Header navigation (English, desktop)', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/en/');
  });

  test('shows all nav links', async ({ page }) => {
    const nav = page.locator('header nav.nav-links');
    for (const { label } of enNavLinks) {
      await expect(nav.locator('a', { hasText: label })).toBeVisible();
    }
  });

  test('nav links point to correct locale-prefixed paths', async ({ page }) => {
    const nav = page.locator('header nav.nav-links');
    for (const { label, href } of enNavLinks) {
      const link = nav.locator('a', { hasText: label });
      await expect(link).toHaveAttribute('href', href);
    }
  });

  test('clicking a nav link navigates to the correct page', async ({ page }) => {
    await page.locator('header nav.nav-links a', { hasText: 'Features' }).click();
    await expect(page).toHaveURL('/en/features');
  });
});

test.describe('Header mobile menu navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    await page.goto('/');
  });

  test('opens mobile menu on toggle click', async ({ page }) => {
    const menu = page.locator('#mobile-menu');
    await expect(menu).toBeHidden();
    await page.locator('#mobile-menu-btn').click();
    await expect(menu).toBeVisible();
  });

  test('mobile menu links point to correct subdirectory paths', async ({ page }) => {
    await page.locator('#mobile-menu-btn').click();
    const menu = page.locator('#mobile-menu nav');
    for (const { label, href } of jaNavLinks) {
      const link = menu.locator('a', { hasText: label });
      await expect(link).toHaveAttribute('href', href);
    }
  });

  test('clicking a mobile menu link navigates and closes menu', async ({ page }) => {
    await page.locator('#mobile-menu-btn').click();
    await page.locator('#mobile-menu nav a', { hasText: '料金プラン' }).click();
    await expect(page).toHaveURL('/pricing');
    await expect(page.locator('#mobile-menu')).toBeHidden();
  });
});

test.describe('Header has no anchor links', () => {
  test('desktop nav contains no anchor (#) hrefs', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    const nav = page.locator('header nav.nav-links');
    const links = await nav.locator('a').all();
    for (const link of links) {
      const href = await link.getAttribute('href');
      expect(href).not.toMatch(/^#/);
    }
  });

  test('mobile menu contains no anchor (#) hrefs', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    await page.goto('/');
    await page.locator('#mobile-menu-btn').click();
    const menu = page.locator('#mobile-menu nav');
    const links = await menu.locator('a').all();
    for (const link of links) {
      const href = await link.getAttribute('href');
      expect(href).not.toMatch(/^#/);
    }
  });
});
