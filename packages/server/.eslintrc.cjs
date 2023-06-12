module.exports = {
  root: true,
  env: {
    browser: false,
  },
  extends: ['@cretadoc/eslint-config'],
  parserOptions: {
    project: ['tsconfig.eslint.json'],
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: ['.eslintrc.cjs'],
};
