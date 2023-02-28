import { resolve } from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: [
      './src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts}',
      './src/**/*.test-d.{ts,mts,cts}',
    ],
    reporters: 'verbose',
    watch: false,
  },
  resolve: {
    alias: {
      src: resolve(__dirname, './src'),
    },
  },
});
