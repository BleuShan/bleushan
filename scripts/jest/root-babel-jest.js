const {createTransformer} = require('babel-jest')

module.exports = createTransformer({
  babelrcRoots: 'packages/*'
})
