import { resolve } from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['./tests/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts}'],
    reporters: 'verbose',
    watch: false,
  },
  resolve: {
    alias: {
      src: resolve(__dirname, './src'),
    },
  },
});
