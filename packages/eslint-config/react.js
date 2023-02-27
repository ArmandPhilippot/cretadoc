'use strict';

const jsxA11yRules = require('./rules/jsx-a11y');
const reactRules = require('./rules/react');
const reactTypescriptRules = require('./rules/react-typescript');
const storybookRules = require('./rules/storybook');

/** @type {import('eslint').ESLint.ConfigData}  */
module.exports = {
  extends: [
    './index.js',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
  ],
  plugins: ['react', 'jsx-a11y'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    'import/extensions': ['.js', '.jsx'],
  },
  rules: {
    ...reactRules,
    ...jsxA11yRules,
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx', '.mts', '.cts'],
      settings: {
        'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
        'import/parsers': {
          '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
      },
      rules: {
        ...reactTypescriptRules,
      },
    },
    {
      files: ['*.stories.@(ts|tsx|js|jsx|mjs|cjs)'],
      extends: ['plugin:storybook/recommended'],
      rules: {
        ...storybookRules,
      },
    },
  ],
};
