module.exports = {
  extends: ['standard', 'cleanjs', 'plugin:jest/recommended', 'prettier'],
  env: {
    browser: true,
    serviceworker: true,
    worker: true
  },
  parser: 'babel-eslint',
  rules: {
    'arrow-parens': ['error', 'as-needed', { requireForBlockBody: true }],
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always'
      }
    ],
    'fp/no-rest-parameters': 'off'
  },
  overrides: [
    {
      files: [
        '*-test.js',
        '*.spec.js',
        '*.test.js',
        '**/__tests__/**/*.js',
        '**/tests/**/*.js'
      ],
      rules: {
        'fp/no-unused-expression': 'off',
        'fp/no-nil': 'off',
        'better/explicit-return': 'off'
      }
    }
  ]
}
