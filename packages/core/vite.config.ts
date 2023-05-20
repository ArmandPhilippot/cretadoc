/*
 * <reference types="vitest" />
 * <reference types="vite/client" />
 */
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isProd = mode === 'production';

  return {
    base: './',
    build: {
      outDir: './dist',
      sourcemap: !isProd,
    },
    plugins: [react(), vanillaExtractPlugin()],
    test: {
      deps: {
        inline: true,
      },
      environment: 'jsdom',
      globals: false,
      setupFiles: './vite.setup.ts',
      watch: false,
    },
  };
});
