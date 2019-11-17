import {buildExpectedOptions as buildExpectedImportOptions} from './setupImportPlugin'
import {MINIFY_DEFAULTS, COREJS_DEFAULTS} from '../constants'
import {assignNonNil} from '../utils'

function buildMinifyOption(minify, env) {
  if (minify != null) {
    const {env: envConfig, useDefaults, ...configRoot} = minify
    if (envConfig) {
      const match = envConfig[env] || false
      if (useDefaults) {
        return assignNonNil(MINIFY_DEFAULTS, configRoot, match)
      }

      return assignNonNil(configRoot, match)
    }

    return assignNonNil(MINIFY_DEFAULTS, configRoot)
  }

  return MINIFY_DEFAULTS
}
export function buildExpectedConfiguration({env, caller}, options) {
  const {import: importOptions, minify, decorators, decoratorsBeforeExport, ...rest} = options
  const {modules = 'auto', targets, corejs = COREJS_DEFAULTS, ...presetENVOptions} = rest
  const targetsESModules = Boolean(targets && targets.esmodules)
  const callerSupportsStaticESM = Boolean(caller && caller.supportsStaticESM)
  const useESModules =
    targetsESModules || modules === false || (modules === 'auto' && callerSupportsStaticESM)
  const importPlugins = buildExpectedImportOptions(useESModules, importOptions)
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
          [
            require('@babel/plugin-proposal-decorators'),
            {decoratorsBeforeExport: decoratorsBeforeExport !== false}
          ],
          require('@babel/plugin-proposal-class-properties'),
          require('@babel/plugin-proposal-private-methods')
        ]
  const plugins = [
    require('@babel/plugin-syntax-bigint'),
    require('@babel/plugin-syntax-import-meta'),
    ...decoratorsPlugins,
    require('@babel/plugin-proposal-nullish-coalescing-operator'),
    require('@babel/plugin-proposal-optional-chaining'),
    require('@babel/plugin-proposal-export-default-from'),
    require('@babel/plugin-proposal-export-namespace-from'),
    ...importPlugins,
    [
      require('@babel/plugin-transform-runtime'),
      {
        corejs,
        useESModules
      }
    ]
  ]

  const minifyPreset =
    env === 'test' || minify === false
      ? []
      : [[require('babel-preset-minify'), buildMinifyOption(minify, env)]]

  const presets = [
    ...minifyPreset,
    [
      require('@babel/preset-env'),
      {
        modules,
        targets,
        useBuiltIns: 'usage',
        corejs,
        spec: true,
        shippedProposals: true,
        ...presetENVOptions
      }
    ]
  ]
  return {
    presets,
    plugins
  }
}
