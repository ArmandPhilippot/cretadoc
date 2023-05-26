import { vanillaExtractPlugin } from '@vanilla-extract/rollup-plugin';
import type { RollupOptions } from 'rollup';
import dts from 'rollup-plugin-dts';
import esbuild from 'rollup-plugin-esbuild';

const bundle = (config: RollupOptions): RollupOptions => {
  return {
    ...config,
    input: 'src/index.ts',
    external: [
      '@cretadoc/utils',
      'react',
      'react/jsx-runtime',
      '@vanilla-extract/css',
      '@vanilla-extract/dynamic',
      '@vanilla-extract/recipes/createRuntimeFn',
    ],
  };
};

const outputOptions: RollupOptions['output'] = {
  preserveModules: true,
  preserveModulesRoot: 'src',
  sourcemap: true,
  entryFileNames({ name }) {
    return `${name.replace(/\.css$/, '.css.vanilla')}.js`;
  },
  assetFileNames({ name }) {
    return name?.replace(/^src\//, '') ?? '';
  },
};

export default [
  bundle({
    output: [
      {
        ...outputOptions,
        dir: 'dist/cjs',
        format: 'cjs',
      },
      {
        ...outputOptions,
        dir: 'dist/esm',
        format: 'es',
      },
    ],
    plugins: [
      vanillaExtractPlugin(),
      esbuild({
        jsx: 'automatic',
        minify: true,
        tsconfig: 'tsconfig.json',
      }),
    ],
  }),
  bundle({
    output: {
      dir: 'dist/types',
      format: 'es',
    },
    plugins: [dts()],
  }),
];
