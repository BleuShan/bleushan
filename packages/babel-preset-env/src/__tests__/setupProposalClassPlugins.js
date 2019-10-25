import setupProposalClassPlugins from '../setupProposalClassPlugins.js'
import prettyFormat from 'pretty-format'

describe('setupProposalClassPlugins', () => {
  describe.each`
    options                                                 | expected
    ${{decorators: false}}                                  | ${[require('@babel/plugin-proposal-class-properties'), require('@babel/plugin-proposal-private-methods')]}
    ${{decorators: false, decoratorsBeforeExport: true}}    | ${[require('@babel/plugin-proposal-class-properties'), require('@babel/plugin-proposal-private-methods')]}
    ${{decoratorsBeforeExport: false}}                      | ${[[require('@babel/plugin-proposal-decorators'), {decoratorsBeforeExport: false}], require('@babel/plugin-proposal-class-properties'), require('@babel/plugin-proposal-private-methods')]}
    ${undefined}                                            | ${[[require('@babel/plugin-proposal-decorators'), {decoratorsBeforeExport: true}], require('@babel/plugin-proposal-class-properties'), require('@babel/plugin-proposal-private-methods')]}
    ${false}                                                | ${[[require('@babel/plugin-proposal-decorators'), {decoratorsBeforeExport: true}], require('@babel/plugin-proposal-class-properties'), require('@babel/plugin-proposal-private-methods')]}
    ${{decorators: 'legacy', decoratorsBeforeExport: true}} | ${[[require('@babel/plugin-proposal-decorators'), {legacy: true}], [require('@babel/plugin-proposal-class-properties'), {loose: true}], [require('@babel/plugin-proposal-private-methods'), {loose: true}]]}
  `('when called with $options', ({options, expected}) => {
    it(`should return with ${prettyFormat(expected)}`, () => {
      expect(setupProposalClassPlugins(options)).toEqual(expected)
    })
  })
})
