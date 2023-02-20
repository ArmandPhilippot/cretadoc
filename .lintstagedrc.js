export default {
  '*.(js|jsx|cjs|mjs|ts|tsx)': ['eslint --cache --fix', 'prettier --write'],
  '*.(css|scss)': ['stylelint --allow-empty-input --fix'],
  '*': [
    'prettier --ignore-unknown --write',
    'cspell --no-must-find-files --no-progress',
  ],
};
