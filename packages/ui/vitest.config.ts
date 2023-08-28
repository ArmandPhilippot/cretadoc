import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react(), vanillaExtractPlugin()],
  test: {
    coverage: {
      exclude: ['src/**/*.vanilla.js'],
    },
    environment: 'jsdom',
    globals: false,
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    reporters: 'verbose',
    setupFiles: './vitest.setup.ts',
    watch: false,
  },
});
