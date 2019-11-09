import setupImportPlugin from './setupImportPlugin'
import setupProposalClassPlugins from './setupProposalClassPlugins'
import {declare} from '@babel/helper-plugin-utils'
import {isPlainObject} from './utils'

const MINIFY_DEFAULTS = {
  keepFnName: true,
  keepClassName: true
}

export default declare((api, options) => {
  const {
    import: importOptions,
    minify,
    decorators,
    decoratorsBeforeExport,
    ...presetOptions
  } = options
  const {modules, targets} = presetOptions
  const esModuleTarget = targets ? !!targets.esmodules : false
  const esModules = modules === false || esModuleTarget
  const importPlugins = setupImportPlugin(importOptions, esModules)
  const decoratorsOptions =
    decorators != null || decoratorsBeforeExport != null
      ? {decorators, decoratorsBeforeExport}
      : false
  const isTest = api.env() === 'test'
  const plugins = [
    ...setupProposalClassPlugins(decoratorsOptions),
    require('@babel/plugin-syntax-bigint'),
    require('@babel/plugin-proposal-nullish-coalescing-operator'),
    require('@babel/plugin-proposal-optional-chaining'),
    require('@babel/plugin-syntax-import-meta'),
    require('@babel/plugin-proposal-export-default-from'),
    require('@babel/plugin-proposal-export-namespace-from'),
    ...importPlugins
  ]

  const {env: minifyEnv, useDefaults, ...minifyRoot} = isPlainObject(minify)
    ? minify
    : MINIFY_DEFAULTS

  const minifyEnvSettings = isPlainObject(minifyEnv)
    ? isPlainObject(minifyEnv[api.env()])
      ? minifyEnv[api.env()]
      : minifyEnv[api.env()] === false
      ? false
      : Object.keys(minifyRoot).length || useDefaults
      ? minifyRoot
      : false
    : {}

  const minifySettings =
    isTest || minify === false || minifyEnvSettings === false
      ? false
      : {
          ...MINIFY_DEFAULTS,
          ...minifyRoot,
          ...minifyEnvSettings
        }

  const minifyPreset =
    minifySettings === false ? [] : [[require('babel-preset-minify'), minifySettings]]

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
})
