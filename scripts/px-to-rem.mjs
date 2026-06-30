// px → rem 変換スクリプト (root font-size = 16px 前提 / 1rem = 16px)
//
// 変換対象は「ボックスモデルの寸法・間隔」プロパティのみ:
//   width / height / min|max-(width|height) / margin* / padding* /
//   top / right / bottom / left / inset* / gap / *border-radius
//
// 変換しない (px のまま残す):
//   - border / outline / box-shadow / filter / backdrop-filter / transform
//     / background(gradient) など寸法以外のプロパティ
//   - メディアクエリ等 `(` 直後のプロパティ (例: @media (max-width: 760px))
//   - 1px のヘアライン (height:1px, margin:-1px 等) … 可読性維持のため
//   - 9999px / 99px のピル半径
//   - .astro の <script> ブロックやテンプレート式 (style 関連のみ処理)
//
// N px → (N/16) rem。N/16 は必ず4桁以内の有限小数 (2^-4 の倍数) で
// IEEE754 でも正確に表現でき、ブラウザで ×16 すると元の N に厳密に戻るため
// 描画結果は1ピクセルも変わらない。

import { readFileSync, writeFileSync } from 'node:fs';

const PROPS = [
  'width',
  'height',
  'min-width',
  'max-width',
  'min-height',
  'max-height',
  'margin',
  'margin-top',
  'margin-right',
  'margin-bottom',
  'margin-left',
  'margin-block',
  'margin-inline',
  'padding',
  'padding-top',
  'padding-right',
  'padding-bottom',
  'padding-left',
  'padding-block',
  'padding-inline',
  'top',
  'right',
  'bottom',
  'left',
  'inset',
  'gap',
  'row-gap',
  'column-gap',
  'border-radius',
  'border-top-left-radius',
  'border-top-right-radius',
  'border-bottom-left-radius',
  'border-bottom-right-radius',
];

// 値の中の px を rem に変換 (1 / 99 / 9999 はそのまま)
function convertValue(value) {
  return value.replace(/(\d+(?:\.\d+)?)px\b/g, (m, num) => {
    const n = Number(num);
    if (n === 1 || n === 99 || n === 9999) return m; // ヘアライン / ピル半径は維持
    const rem = n / 16;
    return `${rem}rem`;
  });
}

// CSS テキスト中の対象プロパティ宣言の値だけを変換
function convertCss(css) {
  // プロパティ名の直前が `(` の場合 (メディアクエリ条件) は対象外。
  // 長い名前を先に並べ、padding-left より padding が先にマッチするのを防ぐ。
  const propAlt = [...PROPS].sort((a, b) => b.length - a.length).join('|');
  const re = new RegExp(`(^|[^\\w(-])(${propAlt})(\\s*:\\s*)([^;{}"']*)`, 'g');
  return css.replace(re, (full, pre, prop, sep, value) => {
    if (!/\d+(?:\.\d+)?px\b/.test(value)) return full;
    return `${pre}${prop}${sep}${convertValue(value)}`;
  });
}

// .astro は <style> ブロックと style="" 属性のみを処理する
function convertAstro(src) {
  let out = src.replace(/(<style[^>]*>)([\s\S]*?)(<\/style>)/g, (_m, open, body, close) => {
    return `${open}${convertCss(body)}${close}`;
  });
  out = out.replace(/style="([^"]*)"/g, (_m, body) => {
    return `style="${convertCss(body)}"`;
  });
  return out;
}

const files = process.argv.slice(2);
let changedTotal = 0;
for (const file of files) {
  const src = readFileSync(file, 'utf8');
  const out = file.endsWith('.astro') ? convertAstro(src) : convertCss(src);
  if (out !== src) {
    writeFileSync(file, out);
    // 変更行数の簡易カウント
    const before = src.split('\n');
    const after = out.split('\n');
    let n = 0;
    for (let i = 0; i < before.length; i++) if (before[i] !== after[i]) n++;
    changedTotal += n;
    console.log(`${file}: ${n} line(s) changed`);
  }
}
console.log(`TOTAL changed lines: ${changedTotal}`);
