module.exports = {
  root: true,
  extends: ['@cretadoc/eslint-config/react'],
  plugins: ['formatjs'],
  parserOptions: {
    project: ['tsconfig.eslint.json'],
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: ['.eslintrc.cjs'],
  rules: {
    'formatjs/enforce-default-message': ['error', 'literal'],
    'formatjs/enforce-description': ['error', 'literal'],
    'formatjs/enforce-id': [
      'error',
      {
        idInterpolationPattern: '[sha512:contenthash:base64:6]',
      },
    ],
    'formatjs/enforce-placeholders': ['error'],
  },
  overrides: [
    {
      files: [
        './rollup.config.ts',
        './src/**/*',
        './vite.config.ts',
        './vite.setup.ts',
      ],
      rules: {
        'import/no-extraneous-dependencies': 'off',
      },
    },
    {
      files: ['**/*.d.ts'],
      rules: {
        'import/unambiguous': 'off',
      },
    },
  ],
};
