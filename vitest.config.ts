import { fileURLToPath } from 'node:url';

import { defineConfig } from 'vitest/config';

const r = (p: string) => fileURLToPath(new URL(p, import.meta.url));

export default defineConfig({
  test: {
    include: ['tests/**/*.test.ts'],
    exclude: ['node_modules', 'dist', 'e2e'],
  },
  resolve: {
    alias: {
      '@components': r('./src/components'),
      '@layouts': r('./src/layouts'),
      '@utils': r('./src/utils'),
      '@data': r('./src/data'),
      '@styles': r('./src/styles'),
      '@assets': r('./src/assets'),
    },
  },
});
