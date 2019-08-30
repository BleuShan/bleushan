const configureClassProperties = (loose) =>
  loose
    ? [
        ['@babel/plugin-proposal-class-properties', {loose: true}],
        ['@babel/plugin-proposal-private-methods', {loose: true}]
      ]
    : ['@babel/plugin-proposal-class-properties', '@babel/plugin-proposal-private-methods']

const configureDecoratorsPlugin = (mode, decoratorsBeforeExport) => [
  [
    '@babel/plugin-proposal-decorators',
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
