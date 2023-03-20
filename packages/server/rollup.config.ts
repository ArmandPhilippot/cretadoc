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
        file: `dist/server.cjs`,
        format: 'cjs',
      },
      {
        ...outputOptions,
        file: `dist/server.mjs`,
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
      file: `dist/server.d.ts`,
      format: 'es',
    },
    plugins: [dts()],
  }),
];
