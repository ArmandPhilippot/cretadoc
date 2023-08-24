'use strict';

const coreRules = require('./rules/core');
const importRules = require('./rules/import');
const typescriptRules = require('./rules/typescript-eslint');

/** @type {import('eslint').ESLint.ConfigData}  */
module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:import/recommended'],
  plugins: ['import'],
  settings: {
    'import/extensions': ['.js'],
    'import/ignore': ['node_modules', '.json$', '.(scss|less|css)$'],
    'import/resolver': {
      node: true,
    },
  },
  rules: {
    ...coreRules,
    ...importRules,
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx', '.mts', '.cts'],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/stylistic-type-checked',
        'plugin:import/typescript',
      ],
      plugins: ['@typescript-eslint'],
      parserOptions: {
        ecmaVersion: 'latest',
        project: true,
        sourceType: 'module',
        warnOnUnsupportedTypeScriptVersion: true,
      },
      settings: {
        'import/extensions': ['.js', '.ts'],
        'import/parsers': {
          '@typescript-eslint/parser': ['.ts'],
        },
        'import/resolver': {
          node: true,
          typescript: {
            alwaysTryTypes: true,
          },
        },
      },
      rules: {
        ...typescriptRules,
      },
    },
  ],
};
