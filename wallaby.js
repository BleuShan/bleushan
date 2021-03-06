process.env.NODE_ENV = 'test'
const babelPreprocessor = (file) =>
  !file.path.includes('compile')
    ? require('@babel/core').transform(file.content, {
        sourceMap: true,
        filename: file.path
      })
    : file.content

module.exports = (wallaby) => ({
  files: [
    {pattern: 'packages/**/__@(mocks|fixtures)__/**/*.js', instrument: false},
    {pattern: 'packages/*/.babelrc', instrument: false},
    {pattern: '**/*.config.js', instrument: false},
    'packages/**/src/**/*.js',
    '!packages/**/__tests__/*.js'
  ],
  tests: ['packages/**/__tests__/*.js'],
  preprocessors: {
    'packages/**/__@(mocks|fixtures)__/**/*.js': babelPreprocessor
  },
  compilers: {
    '**/*.js': wallaby.compilers.babel()
  },
  testFramework: 'jest',
  setup({testFramework}) {
    const jestConfig = require('./package.json').jest
    testFramework.configure(jestConfig)
  },
  env: {
    type: 'node',
    runner: 'node'
  },
  hints: {
    ignoreCoverage: /istanbul ignore next/
  }
})
