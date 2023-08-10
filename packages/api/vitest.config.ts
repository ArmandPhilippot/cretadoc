import { resolve } from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: [
      './src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts}',
      './tests/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts}',
    ],
    reporters: 'verbose',
    server: {
      deps: {
        fallbackCJS: true, // Prevent duplicate graphql errors
      },
    },
    watch: false,
  },
  resolve: {
    alias: {
      src: resolve(__dirname, './src'),
    },
  },
});
