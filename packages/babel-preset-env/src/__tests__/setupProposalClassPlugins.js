import setupProposalClassPlugins from '../setupProposalClassPlugins.js'
import prettyFormat from 'pretty-format'

describe('setupProposalClassPlugins', () => {
  describe.each`
    options                                                   | expected
    ${{ decorators: false }}                                  | ${['@babel/plugin-proposal-class-properties']}
    ${{ decorators: false, decoratorsBeforeExport: true }}    | ${['@babel/plugin-proposal-class-properties']}
    ${{ decoratorsBeforeExport: false }}                      | ${[['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: false }], '@babel/plugin-proposal-class-properties']}
    ${undefined}                                              | ${[['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: true }], '@babel/plugin-proposal-class-properties']}
    ${false}                                                  | ${[['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: true }], '@babel/plugin-proposal-class-properties']}
    ${{ decorators: 'legacy', decoratorsBeforeExport: true }} | ${[['@babel/plugin-proposal-decorators', { legacy: true, decoratorsBeforeExport: true }], ['@babel/plugin-proposal-class-properties', { loose: true }]]}
  `('when called with $options', ({ options, expected }) => {
    it(`should return with ${prettyFormat(expected)}`, () => {
      expect(setupProposalClassPlugins(options)).toEqual(expected)
    })
  })
})
