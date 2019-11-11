import setupProposalClassPlugins from '../setupProposalClassPlugins.js'

describe('setupProposalClassPlugins', () => {
  describe.each([
    [
      {decorators: false},
      [
        require('@babel/plugin-proposal-class-properties'),
        require('@babel/plugin-proposal-private-methods')
      ]
    ],
    [
      {decorators: false, decoratorsBeforeExport: true},
      [
        require('@babel/plugin-proposal-class-properties'),
        require('@babel/plugin-proposal-private-methods')
      ]
    ],
    [
      {decoratorsBeforeExport: false},
      [
        [require('@babel/plugin-proposal-decorators'), {decoratorsBeforeExport: false}],
        require('@babel/plugin-proposal-class-properties'),
        require('@babel/plugin-proposal-private-methods')
      ]
    ],
    [
      undefined,
      [
        [require('@babel/plugin-proposal-decorators'), {decoratorsBeforeExport: true}],
        require('@babel/plugin-proposal-class-properties'),
        require('@babel/plugin-proposal-private-methods')
      ]
    ],
    [
      false,
      [
        [require('@babel/plugin-proposal-decorators'), {decoratorsBeforeExport: true}],
        require('@babel/plugin-proposal-class-properties'),
        require('@babel/plugin-proposal-private-methods')
      ]
    ],
    [
      {decorators: 'legacy', decoratorsBeforeExport: true},
      [
        [require('@babel/plugin-proposal-decorators'), {legacy: true}],
        [require('@babel/plugin-proposal-class-properties'), {loose: true}],
        [require('@babel/plugin-proposal-private-methods'), {loose: true}]
      ]
    ]
  ])('when called with %o', (options, expected) => {
    it(`should return with expected result`, () => {
      expect(setupProposalClassPlugins(options)).toEqual(expected)
    })
  })
})
