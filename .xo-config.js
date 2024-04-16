const { ignore } = require('typesafe-i18n/formatters');

module.exports = {
  'eslintConfig': {
    'parserOptions': {
      'sourceType': 'module',
      'tsconfigRootDir': __dirname,
      'project': ['./tsconfig.json'],
    },
  },
  envs: ['browser'],
  ignores: ['src/dom-to-image-more.js', 'main.js', 'src/i18n/*.ts'],
  space: true,
  rules: {
    'no-new': 'off',
    'no-warning-comments': 'off',
    'capitalized-comments': 'off',
    'max-params': ['warn', {'max': 8}],
    'prefer-const': ['warn', {ignoreReadBeforeAssign: true}],
    'no-await-in-loop': 'off',
    'import/extensions': ['error', 'ignorePackages', {'js': 'never', 'jsx': 'never', 'ts': 'never', 'tsx': 'never'}],
    'unicorn/filename-case': 'off',
    'unicorn/no-await-expression-member': 'off',
    'unicorn/no-array-for-each': 'off',
    'unicorn/no-array-callback-reference': 'off',
    'unicorn/text-encoding-identifier-case': 'off',
    'unicorn/prevent-abbreviations': 'off',
    'unicorn/prefer-array-some': 'off',
    'unicorn/no-abusive-eslint-disable': 'off',
    'unicorn/prefer-add-event-listener': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/prefer-nullish-coalescing': 'off',
    'prefer-promise-reject-errors': 'off',
    '@typescript-eslint/prefer-promise-reject-errors': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        'vars': 'all',
        'args': 'all',
        'argsIgnorePattern': '^_',
        'caughtErrors': 'all',
        'caughtErrorsIgnorePattern': '^e$',
        'destructuredArrayIgnorePattern': '^_',
        'ignoreRestSiblings': true
      }
    ],
    'no-use-extend-native/no-use-extend-native': 'off',
    'import/no-anonymous-default-export': 'off',
    '@typescript-eslint/prefer-ts-expect-error': 'off'
  },
  overrides: [
    {
      files: '*.mjs',
      rules: {
        'no-unused-vars': 'error',
        '@typescript-eslint/no-unused-vars': 'off',
      }
    }
  ]
}
