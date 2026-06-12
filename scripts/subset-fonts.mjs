// セルフホスト用フォントのサブセット生成スクリプト。
//
// Google Fonts(CDN)から Zen Kaku Gothic New を読み込むと、日本語フォントが
// 約100個の unicode-range サブセットに分割され、本文がほぼ全レンジに跨るため
// 80以上のwoff2(計~780KB)をダウンロードしてしまう。これが Lighthouse の
// TBT / Style&Layout を大きく悪化させていた。
//
// 対策として、サイトで実際に使う文字だけを含むwoff2をビルドし public/fonts に
// セルフホストする。テキスト(src配下)を変更してフォントに無い字が増えた場合は
// `pnpm fonts` を再実行すること(不足字は system-ui へフォールバックする)。
//
// 依存: subset-font(harfbuzz WASM。ネイティブ依存なし)
// 入力TTFは Google Fonts(OFL) から取得し scripts/.fonts にキャッシュ(git管理外)。

import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import subsetFont from 'subset-font';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const fontDir = join(__dirname, '.fonts');
const outDir = join(root, 'public', 'fonts');

const ZEN_BASE = 'https://raw.githubusercontent.com/google/fonts/main/ofl/zenkakugothicnew';
const JBM_BASE = 'https://raw.githubusercontent.com/google/fonts/main/ofl/jetbrainsmono';

// ---- 1. サイトで使う文字を収集 -------------------------------------------------
// src配下の表示テキストを総なめにし、念のため基本セット(ASCII・和文約物)を足す。
// 過剰に含めても多少サイズが増えるだけ。不足するとフォールバックになるため広めに取る。
function collectText() {
  const chars = new Set();
  const exts = new Set(['.astro', '.ts', '.tsx', '.md', '.mdx', '.html']);
  const walk = (dir) => {
    for (const name of readdirSync(dir)) {
      if (name === 'node_modules' || name.startsWith('.')) continue;
      const p = join(dir, name);
      const s = statSync(p);
      if (s.isDirectory()) walk(p);
      else if (exts.has(p.slice(p.lastIndexOf('.')))) {
        for (const ch of readFileSync(p, 'utf8')) chars.add(ch);
      }
    }
  };
  walk(join(root, 'src'));

  // 基本セット: 半角英数記号 + 和文の約物・記号・矢印など
  const base =
    ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`' +
    'abcdefghijklmnopqrstuvwxyz{|}~' +
    '　、。・「」『』（）〔〕［］｛｝〈〉《》【】〜～ー－…‥・※→←↑↓◎○●△▲▽▼□■◇◆☆★♪♥' +
    '“”‘’＋＝％＆＃＠／＼｜＜＞°±×÷ ¥€$';
  for (const ch of base) chars.add(ch);

  // 改行・制御文字は不要
  for (const ch of ['\n', '\r', '\t']) chars.delete(ch);
  return Array.from(chars).join('');
}

// ---- 2. 入力TTF/ライセンスの取得(キャッシュ) ----------------------------------
async function download(url, dest) {
  if (existsSync(dest)) return dest;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`download failed ${res.status}: ${url}`);
  writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
  console.log(`downloaded ${url.split('/').pop()}`);
  return dest;
}

// ---- 3. サブセット実行 ---------------------------------------------------------
async function main() {
  mkdirSync(fontDir, { recursive: true });
  mkdirSync(outDir, { recursive: true });

  const text = collectText();
  console.log(`unique glyphs to keep: ${new Set(text).size}`);

  // Zen Kaku Gothic New: 静的ウェイト(400/500/700/900)
  const zenWeights = [
    [400, 'Regular'],
    [500, 'Medium'],
    [700, 'Bold'],
    [900, 'Black'],
  ];
  for (const [weight, name] of zenWeights) {
    const ttf = await download(
      `${ZEN_BASE}/ZenKakuGothicNew-${name}.ttf`,
      join(fontDir, `ZenKakuGothicNew-${name}.ttf`)
    );
    const woff2 = await subsetFont(readFileSync(ttf), text, { targetFormat: 'woff2' });
    const out = join(outDir, `zen-kaku-gothic-new-${weight}.woff2`);
    writeFileSync(out, woff2);
    console.log(`  zen-kaku-gothic-new-${weight}.woff2  ${(woff2.length / 1024).toFixed(1)} KB`);
  }

  // JetBrains Mono: 可変フォントを 400/500 にピン留めしてサブセット
  const jbmTtf = await download(
    `${JBM_BASE}/JetBrainsMono[wght].ttf`,
    join(fontDir, 'JetBrainsMono[wght].ttf')
  );
  for (const weight of [400, 500]) {
    const woff2 = await subsetFont(readFileSync(jbmTtf), text, {
      targetFormat: 'woff2',
      variationAxes: { wght: weight },
    });
    const out = join(outDir, `jetbrains-mono-${weight}.woff2`);
    writeFileSync(out, woff2);
    console.log(`  jetbrains-mono-${weight}.woff2  ${(woff2.length / 1024).toFixed(1)} KB`);
  }

  // OFL ライセンスを同梱(再配布要件)
  await download(`${ZEN_BASE}/OFL.txt`, join(outDir, 'Zen-Kaku-Gothic-New-OFL.txt'));
  await download(`${JBM_BASE}/OFL.txt`, join(outDir, 'JetBrains-Mono-OFL.txt'));

  console.log('done. fonts written to public/fonts/');
}

await main();
