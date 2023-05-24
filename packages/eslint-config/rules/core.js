'use strict';

/** @type {import('eslint').Linter.RulesRecord} */
module.exports = {
  'accessor-pairs': [
    'error',
    {
      getWithoutSet: false,
      setWithoutGet: true,
      enforceForClassMembers: true,
    },
  ],
  'array-callback-return': [
    'error',
    { allowImplicit: false, checkForEach: true },
  ],
  'arrow-body-style': [
    'error',
    'as-needed',
    { requireReturnForObjectLiteral: true },
  ],
  'block-scoped-var': 'error',
  // cspell:disable-next-line
  camelcase: [
    'error',
    {
      properties: 'always',
      ignoreDestructuring: false,
      ignoreImports: false,
      ignoreGlobals: true,
    },
  ],
  'capitalized-comments': 'off', // too many allowed patterns...
  'class-methods-use-this': 'off',
  complexity: ['error', { max: 20 }],
  'consistent-return': ['error', { treatUndefinedAsUnspecified: false }],
  'consistent-this': 'off',
  curly: ['error', 'multi'],
  'default-case': 'error',
  'default-case-last': 'error',
  'default-param-last': 'error',
  'dot-notation': ['error', { allowKeywords: true }],
  eqeqeq: ['error', 'always', { null: 'always' }],
  'func-name-matching': ['error', 'always'],
  'func-names': ['error', 'always'],
  'func-style': ['error', 'declaration', { allowArrowFunctions: true }],
  'grouped-accessor-pairs': ['error', 'anyOrder'],
  'guard-for-in': 'error',
  'id-denylist': 'off',
  'id-length': 'off',
  'id-match': 'off',
  'init-declarations': ['error', 'always'],
  'logical-assignment-operators': 'off',
  'max-classes-per-file': 'off',
  'max-depth': ['error', { max: 4 }],
  'max-lines': ['warn', { max: 500, skipBlankLines: true, skipComments: true }],
  'max-lines-per-function': 'off',
  'max-nested-callbacks': ['error', { max: 10 }],
  'max-params': ['error', { max: 3 }],
  'max-statements': ['error', { max: 10 }],
  'multiline-comment-style': ['error', 'starred-block'],
  'new-cap': [
    'error',
    {
      capIsNew: true,
      capIsNewExceptionPattern: '^[A-Z]+[A-Z._]*[A-Z]+$',
      newIsCap: true,
      properties: true,
    },
  ],
  'no-alert': 'error',
  'no-array-constructor': 'error',
  'no-await-in-loop': 'error',
  'no-bitwise': 'error',
  'no-caller': 'error',
  'no-confusing-arrow': [
    'error',
    { allowParens: false, onlyOneSimpleParam: false },
  ],
  'no-console': 'off',
  'no-constant-binary-expression': 'error',
  'no-constructor-return': 'error',
  'no-continue': 'off',
  'no-div-regex': 'error',
  'no-duplicate-imports': ['error', { includeExports: false }],
  'no-else-return': ['error', { allowElseIf: false }],
  'no-empty-function': 'error',
  'no-empty-static-block': 'error',
  'no-eq-null': 'error',
  'no-eval': 'error',
  'no-extend-native': 'error',
  'no-extra-bind': 'error',
  'no-extra-label': 'error',
  'no-floating-decimal': 'error',
  'no-implicit-coercion': [
    'error',
    {
      boolean: false,
      number: true,
      string: true,
      disallowTemplateShorthand: false,
    },
  ],
  'no-implicit-globals': 'error',
  'no-implied-eval': 'error',
  'no-inline-comments': 'off',
  'no-invalid-this': ['error', { capIsConstructor: true }],
  'no-iterator': 'error',
  'no-label-var': 'error',
  'no-labels': ['error', { allowLoop: false, allowSwitch: false }],
  'no-lone-blocks': 'error',
  'no-lonely-if': 'error',
  'no-loop-func': 'error',
  'no-magic-numbers': [
    'error',
    {
      detectObjects: false,
      enforceConst: false,
      ignore: [-1, 0, 1, 2],
      ignoreArrayIndexes: false,
      ignoreClassFieldInitialValues: true,
      ignoreDefaultValues: true,
    },
  ],
  'no-mixed-operators': 'off',
  'no-multi-assign': ['error', { ignoreNonDeclaration: false }],
  'no-multi-str': 'error',
  'no-negated-condition': 'error',
  'no-nested-ternary': 'off',
  'no-new': 'error',
  'no-new-func': 'error',
  // cspell:disable-next-line
  'no-new-native-nonconstructor': 'error',
  'no-new-object': 'error',
  'no-new-wrappers': 'error',
  'no-octal-escape': 'error',
  'no-param-reassign': ['error', { props: false }],
  // cspell:disable-next-line
  'no-plusplus': 'off',
  'no-promise-executor-return': 'error',
  'no-proto': 'error',
  'no-restricted-exports': 'off',
  // cspell:disable-next-line
  'no-restricted-globals': ['error', 'event', 'fdescribe'],
  'no-restricted-imports': 'off',
  'no-restricted-properties': 'off',
  'no-restricted-syntax': ['error', 'WithStatement'],
  'no-return-assign': ['error', 'always'],
  'no-return-await': 'error',
  'no-script-url': 'error',
  'no-self-compare': 'error',
  'no-sequences': ['error', { allowInParentheses: true }],
  'no-shadow': [
    'error',
    {
      builtinGlobals: true,
      hoist: 'functions',
      allow: ['name'],
      ignoreOnInitialization: false,
    },
  ],
  'no-template-curly-in-string': 'error',
  'no-ternary': 'off',
  'no-throw-literal': 'error',
  'no-undef-init': 'off',
  'no-underscore-dangle': 'off',
  'no-unmodified-loop-condition': 'error',
  'no-unneeded-ternary': ['error', { defaultAssignment: false }],
  'no-unreachable-loop': 'error',
  'no-unused-expressions': [
    'error',
    {
      allowShortCircuit: false,
      allowTernary: false,
      allowTaggedTemplates: false,
      enforceForJSX: true,
    },
  ],
  'no-unused-private-class-members': 'error',
  'no-unused-vars': [
    'error',
    {
      argsIgnorePattern: '^_',
      ignoreRestSiblings: true,
      varsIgnorePattern: '^_',
    },
  ],
  'no-use-before-define': [
    'error',
    {
      functions: true,
      classes: true,
      variables: true,
      allowNamedExports: false,
    },
  ],
  'no-useless-call': 'error',
  'no-useless-computed-key': ['error', { enforceForClassMembers: true }],
  'no-useless-concat': 'error',
  'no-useless-constructor': 'error',
  'no-useless-rename': [
    'error',
    { ignoreImport: false, ignoreExport: false, ignoreDestructuring: false },
  ],
  'no-useless-return': 'error',
  'no-var': 'error',
  'no-void': 'off',
  'no-warning-comments': ['error', { location: 'anywhere', terms: ['fixme'] }],
  'object-shorthand': ['error', 'properties'],
  'one-var': ['error', 'never'],
  'one-var-declaration-per-line': 'off',
  'operator-assignment': 'off',
  'prefer-arrow-callback': [
    'error',
    { allowNamedFunctions: false, allowUnboundThis: true },
  ],
  'prefer-const': [
    'error',
    { destructuring: 'any', ignoreReadBeforeAssign: false },
  ],
  'prefer-destructuring': [
    'error',
    {
      array: false,
      object: true,
    },
    {
      enforceForRenamedProperties: false,
    },
  ],
  'prefer-exponentiation-operator': 'off',
  'prefer-named-capture-group': 'error',
  'prefer-numeric-literals': 'off',
  'prefer-object-has-own': 'error',
  'prefer-object-spread': 'error',
  'prefer-promise-reject-errors': ['error', { allowEmptyReject: false }],
  'prefer-regex-literals': ['error', { disallowRedundantWrapping: true }],
  'prefer-rest-params': 'error',
  'prefer-spread': 'error',
  'prefer-template': 'error',
  'quote-props': [
    'error',
    'as-needed',
    { keywords: false, numbers: true, unnecessary: true },
  ],
  radix: ['error', 'always'],
  'require-atomic-updates': ['error', { allowProperties: false }],
  'require-await': 'error',
  'require-unicode-regexp': 'off',
  'sort-imports': 'off',
  'sort-keys': 'off',
  'sort-vars': 'off',
  'spaced-comment': 'off',
  strict: ['error', 'safe'],
  'symbol-description': 'error',
  'vars-on-top': 'error',
  yoda: ['error', 'never', { exceptRange: false, onlyEquality: false }],
};
