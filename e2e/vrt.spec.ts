import { expect, type Page, test } from '@playwright/test';

/**
 * Visual Regression Test (VRT)
 *
 * px → rem 単位変換が「現在のレイアウトと1ピクセルもズレていない」ことを
 * 保証するためのピクセル単位スクリーンショット比較。
 *
 * - 既定 root font-size は 16px のため `Npx` と `(N/16)rem` は同一の計算値になり、
 *   レンダリング結果はバイト単位で一致する想定。
 * - threshold:0 / maxDiffPixels:0 = 1ピクセルの差異も許容しない。
 * - アニメーション・スクロールリビールは固定し、フォント読込完了を待つことで
 *   実行ごとの非決定性を排除する。
 *
 * baseline は変換前のコードで `--update-snapshots` 生成し、変換後に再実行して比較する。
 */

const PATHS = [
  '/',
  '/features',
  '/pricing',
  '/faq',
  '/roadmap',
  '/404',
  '/en/',
  '/en/features',
  '/en/pricing',
  '/en/faq',
  '/en/roadmap',
] as const;

const VIEWPORTS = [
  { name: 'mobile', width: 375, height: 800 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1280, height: 900 },
  { name: 'wide', width: 1440, height: 900 },
] as const;

// アニメーション/トランジション/スクロールリビールを最終状態に固定し、
// キャレット点滅などの非決定要素も無効化する。両 run で同一に適用するため
// px→rem 変換そのものの差分のみが比較対象になる。
const FREEZE_CSS = `
  *, *::before, *::after {
    animation: none !important;
    transition: none !important;
    caret-color: transparent !important;
  }
  .reveal, .fade-in-up, .slide-in-left, .slide-in-right, .scale-in {
    opacity: 1 !important;
    transform: none !important;
  }
`;

async function stabilize(page: Page): Promise<void> {
  await page.addStyleTag({ content: FREEZE_CSS });
  // Web フォント(セルフホスト woff2)の読込完了を待つ
  await page.evaluate(() => document.fonts.ready);
  await page.waitForLoadState('networkidle');
  // ホバー状態を避ける
  await page.mouse.move(0, 0);
}

function snapName(viewport: string, path: string): string {
  const slug = path === '/' ? 'root' : path.replace(/^\/|\/$/g, '').replace(/\//g, '_');
  return `${viewport}__${slug}.png`;
}

for (const vp of VIEWPORTS) {
  for (const path of PATHS) {
    test(`vrt ${vp.name} ${path}`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto(path, { waitUntil: 'networkidle' });
      await stabilize(page);
      await expect(page).toHaveScreenshot(snapName(vp.name, path), {
        fullPage: true,
        animations: 'disabled',
        threshold: 0,
        maxDiffPixels: 0,
      });
    });
  }
}
