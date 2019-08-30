module.exports = {
  extends: [
    'standard',
    'plugin:jest/recommended',
    'plugin:prettier/recommended',
    'prettier/standard'
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      legacyDecorators: true
    }
  },
  env: {
    browser: true,
    node: true,
    serviceworker: true,
    worker: true
  },
  globals: {
    globalThis: false
  },
  rules: {
    'no-console': ['error', {allow: ['error', 'warn']}],
    'space-before-function-paren': [
      'error',
      {anonymous: 'always', named: 'never', asyncArrow: 'always'}
    ],
    'no-unused-expressions': 'off',
    'babel/no-unused-expressions': 'error',
    'spaced-comment': ['error', 'always', {markers: ['/', '?', '?.']}]
  },
  plugins: ['babel']
}
