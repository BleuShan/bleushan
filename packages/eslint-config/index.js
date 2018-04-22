module.exports = {
  extends: [
    'standard',
    'cleanjs',
    'plugin:jest/recommended'
  ],
  env: {
    browser: true,
    serviceworker: true,
    worker: true
  },
  parser: 'babel-eslint',
  rules: {
    'arrow-parens': ["error", "as-needed", { "requireForBlockBody": true }],
    'space-before-function-paren': ['error', {
        'anonymous': 'always',
        'named': 'never',
        'asyncArrow': 'always'
    }],
    'fp/no-rest-parameters': 'off'
  }
}
