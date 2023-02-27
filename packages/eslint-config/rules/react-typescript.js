'use strict';

// Disable some React rules. See `./react.js` for rules list.

/** @type {import('eslint').Linter.RulesRecord} */
module.exports = {
  'react/default-props-match-prop-types': 'off',
  'react/forbid-foreign-prop-types': 'off',
  'react/jsx-filename-extension': [
    'error',
    { allow: 'as-needed', extensions: ['.ts', '.tsx'] },
  ],
  'react/no-unused-prop-types': 'off',
  'react/prop-types': 'off',
};
