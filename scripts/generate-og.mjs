import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

// OGP画像(1200x630 PNG)を生成するスクリプト。
// 背景クリーム + 中央に Tikareta ブランドロゴ + ワードマーク + キャッチコピー。
// SNS(X/Facebook/LINE等)はOGPのSVGを非対応のため、PNGとして書き出す。
//
// 実行: pnpm og
//
// テキストは src/data/translations/{ja,en}.ts の site.tagline / site.description と一致させること。
import { Resvg } from '@resvg/resvg-js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const W = 1200;
const H = 630;

// カラー(デザインシステム準拠)
const C = {
  bg: '#FFFBF5',
  ink: '#292524',
  inkMute: '#78716C',
  accent: '#F97316',
  green: '#10B981',
};

// フォント(Zen Kaku Gothic New TTF)。resvgはwoff非対応のためTTFを使う。
// 無ければGoogle Fonts(OFL)から取得してキャッシュ(scripts/.fonts はgit管理外)。
const fontDir = join(__dirname, '.fonts');
const FONT_BASE = 'https://raw.githubusercontent.com/google/fonts/main/ofl/zenkakugothicnew';
const FONT_WEIGHTS = ['Regular', 'Bold', 'Black'];

async function ensureFonts() {
  mkdirSync(fontDir, { recursive: true });
  const paths = [];
  for (const w of FONT_WEIGHTS) {
    const p = join(fontDir, `ZenKakuGothicNew-${w}.ttf`);
    if (!existsSync(p)) {
      const res = await fetch(`${FONT_BASE}/ZenKakuGothicNew-${w}.ttf`);
      if (!res.ok) throw new Error(`font download failed: ${w} (${res.status})`);
      writeFileSync(p, Buffer.from(await res.arrayBuffer()));
      console.log(`downloaded font ${w}`);
    }
    paths.push(p);
  }
  return paths;
}

const fontFiles = await ensureFonts();

// ブランドロゴ(別リポジトリ Tikareta の public/icons/Tikareta.svg)をネストSVGとして埋め込む
const logoRaw = readFileSync(join(root, 'public/icons/Tikareta.svg'), 'utf8');
const logoInner = logoRaw.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');
const LOGO_VB = '3 62 244 125'; // 元SVGのviewBox
const LOGO_RATIO = 125 / 244;

function logoEl(cx, topY, width) {
  const height = width * LOGO_RATIO;
  const x = cx - width / 2;
  return `<svg x="${x}" y="${topY}" width="${width}" height="${height}" viewBox="${LOGO_VB}" preserveAspectRatio="xMidYMid meet">${logoInner}</svg>`;
}

function esc(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// taglineParts: [{ t, c }] 同一行を色違いtspanで構成
function taglineEl(cx, y, parts, fontSize) {
  const tspans = parts.map((p) => `<tspan fill="${p.c}">${esc(p.t)}</tspan>`).join('');
  return `<text x="${cx}" y="${y}" text-anchor="middle" font-family="Zen Kaku Gothic New" font-size="${fontSize}" font-weight="900">${tspans}</text>`;
}

function buildSvg({ tagline, subtitle }) {
  const cx = W / 2;
  const subtitleEls = subtitle
    .map(
      (line, i) =>
        `<text x="${cx}" y="${500 + i * 42}" text-anchor="middle" font-family="Zen Kaku Gothic New" font-size="28" font-weight="400" fill="${C.inkMute}">${esc(line)}</text>`
    )
    .join('\n  ');

  return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${W}" height="${H}" fill="${C.bg}"/>
  <circle cx="90" cy="90" r="170" fill="${C.accent}" opacity="0.10"/>
  <circle cx="1120" cy="560" r="140" fill="${C.green}" opacity="0.10"/>
  <circle cx="1140" cy="80" r="70" fill="${C.accent}" opacity="0.08"/>
  <circle cx="70" cy="540" r="60" fill="${C.green}" opacity="0.08"/>
  ${logoEl(cx, 78, 300)}
  <text x="${cx}" y="370" text-anchor="middle" font-family="Zen Kaku Gothic New" font-size="64" font-weight="900" letter-spacing="2" fill="${C.ink}">Tikareta</text>
  ${taglineEl(cx, 448, tagline, 50)}
  ${subtitleEls}
</svg>`;
}

const LOCALES = {
  ja: {
    tagline: [
      { t: 'うちの子のおさんぽスタイル、', c: C.ink },
      { t: '知ってる？', c: C.accent },
    ],
    subtitle: ['毎日のおさんぽを記録して、愛犬だけの', '「おさんぽタイプ」を発見しよう'],
  },
  en: {
    tagline: [
      { t: "Do you know your dog's ", c: C.ink },
      { t: 'walking style?', c: C.accent },
    ],
    subtitle: ['Track your daily walks and discover', 'your dog’s unique “Walking Type”'],
  },
};

const outDir = join(root, 'public/og');
mkdirSync(outDir, { recursive: true });

for (const [locale, data] of Object.entries(LOCALES)) {
  const svg = buildSvg(data);
  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: W },
    background: C.bg,
    font: {
      fontFiles,
      loadSystemFonts: false,
      defaultFontFamily: 'Zen Kaku Gothic New',
    },
  });
  const png = resvg.render().asPng();
  const out = join(outDir, `default-${locale}.png`);
  writeFileSync(out, png);
  console.log(`generated ${out} (${png.length} bytes)`);
}
