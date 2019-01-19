import setupImportPlugin from './setupImportPlugin'
import setupProposalClassPlugins from './setupProposalClassPlugins'
import { declare } from '@babel/helper-plugin-utils'
import { isPlainObject } from './utils'

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
  const { modules, targets } = presetOptions
  const esModuleTarget = targets ? !!targets.esModules : false
  const esModules = modules === false || esModuleTarget
  const importPlugins = setupImportPlugin(importOptions, esModules)
  const decoratorsOptions =
    decorators != null || decoratorsBeforeExport != null
      ? { decorators, decoratorsBeforeExport }
      : false
  const isTest = api.env() === 'test'
  const testEnvPlugins = isTest
    ? [
        'babel-plugin-dynamic-import-node',
        '@babel/plugin-transform-modules-commonjs'
      ]
    : []
  const plugins = [
    ...setupProposalClassPlugins(decoratorsOptions),
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-export-namespace-from',
    ...importPlugins,
    ...testEnvPlugins
  ]

  const { env: minifyEnv, useDefaults, ...minifyRoot } = isPlainObject(minify)
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
    minifySettings === false ? [] : [['minify', minifySettings]]

  const presets = [
    ...minifyPreset,
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
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
