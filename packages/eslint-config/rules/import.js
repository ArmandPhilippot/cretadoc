'use strict';

/** @type {import('eslint').Linter.RulesRecord} */
module.exports = {
  'import/consistent-type-specifier-style': 'off',
  'import/first': 'error',
  'import/group-exports': 'off',
  'import/max-dependencies': 'off',
  'import/newline-after-import': [
    'error',
    { considerComments: true, count: 1 },
  ],
  'import/no-absolute-path': 'error',
  'import/no-amd': 'error',
  'import/no-commonjs': 'off',
  'import/no-cycle': 'off', // too slow
  'import/no-default-export': 'off',
  'import/no-deprecated': 'warn',
  'import/no-duplicates': [
    'error',
    { considerQueryString: true, 'prefer-inline': true },
  ],
  'import/no-dynamic-require': 'off',
  'import/no-empty-named-blocks': 'error',
  'import/no-extraneous-dependencies': [
    'error',
    {
      devDependencies: [
        '**/.storybook/**',
        '**/tests/**',
        '**/rollup.config.{cjs,mjs,js,cts,mts,ts}',
        '**/vitest.config.{cjs,mjs,js,cts,mts,ts}',
        '**/vitest.setup.{cjs,mjs,js,cts,mts,ts}',
        '**/*.stories.{cjs,mjs,js,jsx,cts,mts,ts,tsx,mdx}',
        '**/*.test.{cjs,mjs,js,jsx,cts,mts,ts,tsx}',
        '**/*.test-d.{ts,cts,mts}',
        '**/*.spec.{cjs,mjs,js,jsx,cts,mts,ts,tsx}',
      ],
      optionalDependencies: false,
      peerDependencies: true,
    },
  ],
  'import/no-import-module-exports': 'error',
  'import/no-internal-modules': 'off',
  'import/no-mutable-exports': 'error',
  'import/no-named-default': 'error',
  'import/no-named-export': 'off',
  'import/no-namespace': 'off',
  'import/no-nodejs-modules': 'off',
  'import/no-relative-packages': 'off',
  'import/no-relative-parent-imports': 'off',
  'import/no-restricted-paths': 'off',
  'import/no-self-import': 'error',
  'import/no-unassigned-import': 'off',
  'import/no-unused-modules': 'off', // does not support module.exports
  'import/no-useless-path-segments': [
    'error',
    {
      noUselessIndex: true,
    },
  ],
  'import/no-webpack-loader-syntax': 'error',
  'import/order': [
    'error',
    { alphabetize: { order: 'asc', caseInsensitive: true } },
  ],
  'import/prefer-default-export': 'off',
  'import/unambiguous': 'error',
};
