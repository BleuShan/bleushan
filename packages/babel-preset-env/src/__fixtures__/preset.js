import {buildDefaultImportPluginSettings} from './setupImportPlugin'
export function buildExpectedConfiguration(
  env,
  {import: _import, minify, decorators, ...presetOptions}
) {
  const {modules, targets} = presetOptions
  const esModuleTarget = targets ? !!targets.esmodules : false
  const esModules = modules === false || esModuleTarget
  const importPlugins = buildDefaultImportPluginSettings(esModules)
  const decoratorsPlugins =
    decorators === 'legacy'
      ? [
          [require('@babel/plugin-proposal-decorators'), {legacy: true}],
          [require('@babel/plugin-proposal-class-properties'), {loose: true}],
          [require('@babel/plugin-proposal-private-methods'), {loose: true}]
        ]
      : decorators === false
      ? [
          require('@babel/plugin-proposal-class-properties'),
          require('@babel/plugin-proposal-private-methods')
        ]
      : [
          [require('@babel/plugin-proposal-decorators'), {decoratorsBeforeExport: true}],
          require('@babel/plugin-proposal-class-properties'),
          require('@babel/plugin-proposal-private-methods')
        ]
  const plugins = [
    ...decoratorsPlugins,
    require('@babel/plugin-syntax-bigint'),
    require('@babel/plugin-proposal-nullish-coalescing-operator'),
    require('@babel/plugin-proposal-optional-chaining'),
    require('@babel/plugin-syntax-import-meta'),
    require('@babel/plugin-proposal-export-default-from'),
    require('@babel/plugin-proposal-export-namespace-from'),
    ...importPlugins
  ]

  const minifyPreset =
    env === 'test' || minify === false
      ? []
      : [
          [
            require('babel-preset-minify'),
            {
              keepFnName: true,
              keepClassName: true,
              ...(minify != null ? minify : {})
            }
          ]
        ]

  const presets = [
    ...minifyPreset,
    [
      require('@babel/preset-env'),
      {
        useBuiltIns: 'usage',
        corejs: {
          version: 3,
          proposals: true
        },
        spec: true,
        shippedProposals: true,
        ...presetOptions
      }
    ]
  ]
  return {
    presets,
    plugins
  }
}
