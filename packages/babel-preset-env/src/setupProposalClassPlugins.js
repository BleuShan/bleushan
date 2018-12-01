const DEFAULT_RESULT = ['@babel/plugin-proposal-class-properties']
const configureDecoratorsPlugin = (mode, decoratorsBeforeExport) => [
  '@babel/plugin-proposal-decorators',
  mode === 'legacy' ? { legacy: true } : { decoratorsBeforeExport }
]

const setupProposalClassPlugins = ({
  decorators = true,
  decoratorsBeforeExport = true
} = {}) => {
  return decorators
    ? [
        configureDecoratorsPlugin(decorators, decoratorsBeforeExport),
        decorators === 'legacy'
          ? DEFAULT_RESULT.concat({ loose: true })
          : DEFAULT_RESULT[0]
      ]
    : DEFAULT_RESULT
}

export default setupProposalClassPlugins
