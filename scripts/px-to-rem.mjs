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
//   - 1px のヘアライン (height:1px, margin:-1px 等) … どのプロパティでも維持
//   - 9999px / 99px のピル半径 … border-radius のときだけ維持
//   - .astro の <script> ブロック・動的 style={...} (静的 style 属性と <style> のみ処理)
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

// 長い名前を先に並べ、padding-left より padding が先にマッチするのを防ぐ。
// PROPS は不変なので正規表現はモジュール初期化時に一度だけ組み立てる。
const PROP_ALT = [...PROPS].sort((a, b) => b.length - a.length).join('|');

// 対象プロパティ宣言 `<prop>: <value>` を1つ捕捉する。
//   group1: プロパティ直前の1文字 (`(` ならメディアクエリ条件なので除外)
//   group4: 値。`;{}"'` と改行の手前まで — 改行を含めることで、末尾セミコロンの
//           無い宣言が次行の宣言まで値を飲み込むのを防ぐ。
const DECL_RE = new RegExp(`(^|[^\\w(-])(${PROP_ALT})(\\s*:\\s*)([^;{}"'\\n]*)`, 'g');

// 値の中の px トークン。先頭が小数点の `.5px` も1トークンとして捕捉する。
const NUM_PX = /(\d*\.?\d+)px\b/g;
const HAS_PX = /\d*\.?\d+px\b/; // gate 用 (非 global = ステートレス)

// border-radius でのみ維持するピル半径
const PILL = new Set([99, 9999]);

// 値の中の px を rem に変換。1px ヘアラインは常に維持、ピル半径は radius のみ維持。
function convertValue(value, isRadius) {
  return value.replace(NUM_PX, (m, num) => {
    const n = Number(num);
    if (n === 1) return m; // ヘアライン (どのプロパティでも)
    if (isRadius && PILL.has(n)) return m; // ピル半径 (border-radius 限定)
    return `${n / 16}rem`;
  });
}

// CSS テキスト中の対象プロパティ宣言の値だけを変換
function convertCss(css) {
  return css.replace(DECL_RE, (full, pre, prop, sep, value) => {
    if (!HAS_PX.test(value)) return full;
    return `${pre}${prop}${sep}${convertValue(value, prop.endsWith('radius'))}`;
  });
}

// .astro は <style> ブロックと静的な style 属性 (単/二重引用符) のみ処理する。
// 交互パターンで <script>…</script> を丸ごと1マッチとして消費し (無変換で返す)、
// その内側の style="…" 風文字列や動的 style={…} には触れない。
function convertAstro(src) {
  return src.replace(
    /(<style[^>]*>)([\s\S]*?)(<\/style>)|<script[\s\S]*?<\/script>|style=(["'])([^"']*)\4/g,
    (m, styleOpen, styleBody, styleClose, quote, attr) => {
      if (styleOpen !== undefined) return `${styleOpen}${convertCss(styleBody)}${styleClose}`;
      if (quote !== undefined) return `style=${quote}${convertCss(attr)}${quote}`;
      return m; // <script>…</script> は変換しない
    }
  );
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
