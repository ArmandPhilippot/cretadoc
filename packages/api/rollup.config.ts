import type { RollupOptions } from 'rollup';
import dts from 'rollup-plugin-dts';
import esbuild from 'rollup-plugin-esbuild';

const bundle = (config: RollupOptions): RollupOptions => {
  return {
    ...config,
    input: 'src/index.ts',
    external: (id: string) => !/^[./]/.test(id),
  };
};

const outputOptions: RollupOptions['output'] = {
  exports: 'auto',
  sourcemap: true,
};

export default [
  bundle({
    output: [
      {
        ...outputOptions,
        file: `dist/api.cjs`,
        format: 'cjs',
      },
      {
        ...outputOptions,
        file: `dist/api.mjs`,
        format: 'es',
      },
    ],
    plugins: [
      esbuild({
        minify: true,
        tsconfig: 'tsconfig.json',
        target: 'esnext',
      }),
    ],
  }),
  bundle({
    output: {
      file: `dist/api.d.ts`,
      format: 'es',
    },
    plugins: [dts()],
  }),
];
