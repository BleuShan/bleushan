import setupProposalClassPlugins from '../setupProposalClassPlugins.js'
import prettyFormat from 'pretty-format'

describe('setupProposalClassPlugins', () => {
  describe.each`
    options                                                 | expected
    ${{decorators: false}}                                  | ${['@babel/plugin-proposal-class-properties', '@babel/plugin-proposal-private-methods']}
    ${{decorators: false, decoratorsBeforeExport: true}}    | ${['@babel/plugin-proposal-class-properties', '@babel/plugin-proposal-private-methods']}
    ${{decoratorsBeforeExport: false}}                      | ${[['@babel/plugin-proposal-decorators', {decoratorsBeforeExport: false}], '@babel/plugin-proposal-class-properties', '@babel/plugin-proposal-private-methods']}
    ${undefined}                                            | ${[['@babel/plugin-proposal-decorators', {decoratorsBeforeExport: true}], '@babel/plugin-proposal-class-properties', '@babel/plugin-proposal-private-methods']}
    ${false}                                                | ${[['@babel/plugin-proposal-decorators', {decoratorsBeforeExport: true}], '@babel/plugin-proposal-class-properties', '@babel/plugin-proposal-private-methods']}
    ${{decorators: 'legacy', decoratorsBeforeExport: true}} | ${[['@babel/plugin-proposal-decorators', {legacy: true}], ['@babel/plugin-proposal-class-properties', {loose: true}], ['@babel/plugin-proposal-private-methods', {loose: true}]]}
  `('when called with $options', ({options, expected}) => {
    it(`should return with ${prettyFormat(expected)}`, () => {
      expect(setupProposalClassPlugins(options)).toEqual(expected)
    })
  })
})
