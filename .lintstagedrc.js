export default {
  '*.(js|jsx|cjs|mjs|ts|tsx)': ['eslint --cache --fix', 'prettier --write'],
  '*': [
    'prettier --ignore-unknown --write',
    'cspell --no-must-find-files --no-progress',
  ],
};
