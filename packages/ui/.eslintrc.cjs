module.exports = {
  root: true,
  extends: ['@cretadoc/eslint-config/react'],
  parserOptions: {
    project: ['tsconfig.eslint.json'],
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: ['.eslintrc.cjs'],
  rules: {
    // Useful for translation but too constraining for a components library.
    'react/jsx-no-literals': 'off',
  },
};
