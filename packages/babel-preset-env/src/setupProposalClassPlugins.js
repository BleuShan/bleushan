const configureClassProperties = (loose) =>
  loose
    ? [
        [require('@babel/plugin-proposal-class-properties'), {loose: true}],
        [require('@babel/plugin-proposal-private-methods'), {loose: true}]
      ]
    : [
        require('@babel/plugin-proposal-class-properties'),
        require('@babel/plugin-proposal-private-methods')
      ]

const configureDecoratorsPlugin = (mode, decoratorsBeforeExport) => [
  [
    require('@babel/plugin-proposal-decorators'),
    mode === 'legacy' ? {legacy: true} : {decoratorsBeforeExport}
  ]
]
const setupProposalClassPlugins = ({decorators = true, decoratorsBeforeExport = true} = {}) => {
  return decorators
    ? configureDecoratorsPlugin(decorators, decoratorsBeforeExport).concat(
        configureClassProperties(decorators === 'legacy')
      )
    : configureClassProperties()
}

export default setupProposalClassPlugins
