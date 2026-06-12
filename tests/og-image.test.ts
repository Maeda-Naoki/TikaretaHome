import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import { describe, expect, it } from 'vitest';

import { getOGImageUrl } from '../src/utils/seo';

const r = (p: string) => fileURLToPath(new URL(p, import.meta.url));

const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

/** Read the width/height from a PNG's IHDR chunk (bytes 16-23, big-endian). */
function readPngSize(buf: Buffer): { signature: Buffer; width: number; height: number } {
  return {
    signature: buf.subarray(0, 8),
    width: buf.readUInt32BE(16),
    height: buf.readUInt32BE(20),
  };
}

const LOCALES = ['ja', 'en'] as const;

describe('OGP image assets', () => {
  it.each(LOCALES)('default-%s.png exists and is a 1200x630 PNG', (locale) => {
    // The path getOGImageUrl returns must resolve to a real committed file.
    const url = getOGImageUrl(locale);
    expect(url).toBe(`/og/default-${locale}.png`);

    const file = r(`../public${url}`);
    expect(existsSync(file)).toBe(true);

    const { signature, width, height } = readPngSize(readFileSync(file));
    expect(signature.equals(PNG_SIGNATURE)).toBe(true);
    expect(width).toBe(1200);
    expect(height).toBe(630);
  });

  // Regression: the old emoji/Google-Fonts SVGs were replaced by PNGs.
  // Guard against an SVG default sneaking back in (SNS cannot render SVG OGP).
  it('ships no default-*.svg in public/og', () => {
    const stale = readdirSync(r('../public/og')).filter(
      (f) => f.startsWith('default-') && f.endsWith('.svg')
    );
    expect(stale).toEqual([]);
  });

  it('keeps the Tikareta brand logo embedded in the OGP image', () => {
    // The generator embeds public/icons/Tikareta.svg as the centre logo.
    expect(existsSync(r('../public/icons/Tikareta.svg'))).toBe(true);
  });
});
