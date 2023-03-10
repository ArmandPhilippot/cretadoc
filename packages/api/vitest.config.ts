import { resolve } from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    deps: {
      inline: ['graphql', 'graphql-yoga'], // Prevent graphql resolution errors.
      fallbackCJS: true, // Prevent duplicate graphql errors
    },
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
