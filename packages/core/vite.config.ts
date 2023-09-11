/// <reference types="vitest" />
import { vanillaExtractPlugin as veEsbuildPlugin } from '@vanilla-extract/esbuild-plugin';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import react from '@vitejs/plugin-react';
import { defineConfig, type DepOptimizationConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isProd = mode === 'production';

  return {
    base: './',
    build: {
      outDir: './dist',
      sourcemap: !isProd,
    },
    optimizeDeps: {
      esbuildOptions: {
        plugins: [veEsbuildPlugin()],
      },
      /*
       * Because of esbuildOptions, Typescript complains wrongly about
       * non assignable type
       */
    } as DepOptimizationConfig,
    plugins: [react(), vanillaExtractPlugin()],
    ssr: {
      noExternal: ['@cretadoc/ui'],
    },
    test: {
      environment: 'jsdom',
      globals: false,
      server: {
        deps: {
          /*
           * Using `['@cretadoc/ui']` with or without @vanilla-extract packages
           * is not enough to avoid the `Unknown file extension ".css"` error.
           * So far only this workaround is working: https://github.com/vitest-dev/vitest/issues/2806#issuecomment-1474468560
           */
          inline: [/^(?!.*vitest).*$/],
        },
      },
      setupFiles: './vite.setup.ts',
      watch: false,
    },
  };
});
