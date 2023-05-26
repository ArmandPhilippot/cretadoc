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
    plugins: [
      react(),
      vanillaExtractPlugin({ esbuildOptions: { loader: { '.css': 'empty' } } }),
    ],
    test: {
      deps: {
        /*
         * Using `['@cretadoc/ui']` with or without @vanilla-extract packages
         * is not enough to avoid the `Unknown file extension ".css"` error. So
         * far only this workaround is working: https://github.com/vitest-dev/vitest/issues/2806#issuecomment-1474468560
         */
        inline: [/^(?!.*vitest).*$/],
      },
      environment: 'jsdom',
      globals: false,
      setupFiles: './vite.setup.ts',
      watch: false,
    },
  };
});
