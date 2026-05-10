import { expect, test } from '@playwright/test';

const jaQuestions = [
  'Tikaretaとは？',
  'どうやって始めるの？',
  '対応しているスマホは？',
  '機種変更してもデータは残る？',
  'スマホのバッテリーは減りやすい？',
  'タイプ診断はいつ結果が出る？',
  'タイプは変わる？',
  '無料で何ができますか？',
  '有料にしないと記録が見られなくなる？',
  '解約はいつでもできますか？',
  '支払い方法は？',
  '位置情報は他の人に見られる？',
  '退会（アカウント削除）したいときは？',
  '個人情報の取り扱いは？',
];

const enQuestions = [
  'What is Tikareta?',
  'How do I get started?',
  'Which devices are supported?',
  'Will my data carry over if I change phones?',
  'Will it drain my phone battery?',
  'When will my dog get a type?',
  'Can the type change?',
  'What can I do for free?',
  'Will I lose my walk records without premium?',
  'Can I cancel anytime?',
  'What payment methods are available?',
  'Can others see my location data?',
  'How do I delete my account?',
  'How is personal data handled?',
];

test.describe('FAQ page (Japanese)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/faq');
  });

  test('displays page title', async ({ page }) => {
    await expect(page.locator('h1')).toHaveText('よくある質問');
    await expect(page.locator('h1')).toBeVisible();
  });

  test('displays all category headings', async ({ page }) => {
    const categories = [
      '基本的な使い方',
      'タイプ診断について',
      '料金・課金について',
      'プライバシー・セキュリティ',
    ];
    for (const category of categories) {
      await expect(page.locator('h2', { hasText: category })).toBeVisible();
    }
  });

  test('displays all question texts', async ({ page }) => {
    for (const question of jaQuestions) {
      const summary = page.locator('summary', { hasText: question });
      await expect(summary).toBeVisible();
      await expect(summary).not.toHaveText('');
    }
  });

  test('displays answer text when FAQ item is opened', async ({ page }) => {
    const firstQuestion = page.locator('details').first();
    await firstQuestion.locator('summary').click();
    const answer = firstQuestion.locator('div > p');
    await expect(answer).toBeVisible();
    await expect(answer).not.toHaveText('');
  });

  test('all FAQ items have non-empty question and answer', async ({ page }) => {
    const details = page.locator('details');
    const count = await details.count();
    expect(count).toBe(14);

    for (let i = 0; i < count; i++) {
      const item = details.nth(i);
      const questionText = await item.locator('summary span').textContent();
      expect(questionText?.trim().length).toBeGreaterThan(0);

      await item.locator('summary').click();
      const answerText = await item.locator('div > p').textContent();
      expect(answerText?.trim().length).toBeGreaterThan(0);
    }
  });
});

test.describe('FAQ page (English)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/en/faq');
  });

  test('displays page title', async ({ page }) => {
    await expect(page.locator('h1')).toHaveText('Frequently Asked Questions');
    await expect(page.locator('h1')).toBeVisible();
  });

  test('displays all category headings', async ({ page }) => {
    const categories = ['Basic Usage', 'Type Diagnosis', 'Pricing & Billing', 'Privacy & Security'];
    for (const category of categories) {
      await expect(page.locator('h2', { hasText: category })).toBeVisible();
    }
  });

  test('displays all question texts', async ({ page }) => {
    for (const question of enQuestions) {
      const summary = page.locator('summary', { hasText: question });
      await expect(summary).toBeVisible();
      await expect(summary).not.toHaveText('');
    }
  });

  test('all FAQ items have non-empty question and answer', async ({ page }) => {
    const details = page.locator('details');
    const count = await details.count();
    expect(count).toBe(14);

    for (let i = 0; i < count; i++) {
      const item = details.nth(i);
      const questionText = await item.locator('summary span').textContent();
      expect(questionText?.trim().length).toBeGreaterThan(0);

      await item.locator('summary').click();
      const answerText = await item.locator('div > p').textContent();
      expect(answerText?.trim().length).toBeGreaterThan(0);
    }
  });
});
