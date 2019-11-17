import setupImportPlugin from './setupImportPlugin'
import setupProposalClassPlugins from './setupProposalClassPlugins'
import {declare} from '@babel/helper-plugin-utils'
import {isPlainObject, assignNonNil} from './utils'
import {MINIFY_DEFAULTS, COREJS_DEFAULTS} from './constants'

function supportsStaticESM(caller) {
  return Boolean(caller?.supportsStaticESM)
}

export default declare((api, options) => {
  api.assertVersion(7)
  const {import: importOptions, minify, decorators, decoratorsBeforeExport, ...rest} = options
  const {modules = 'auto', targets, corejs = COREJS_DEFAULTS, ...presetENVOptions} = rest
  const targetsESModules = Boolean(targets?.esmodules)
  const useESModules =
    modules === false || targetsESModules || (modules === 'auto' && api.caller(supportsStaticESM))
  const importPlugins = setupImportPlugin(importOptions, useESModules)
  const decoratorsOptions =
    decorators != null || decoratorsBeforeExport != null
      ? {decorators, decoratorsBeforeExport}
      : false
  const isTest = api.env() === 'test'
  const plugins = [
    require('@babel/plugin-syntax-bigint'),
    require('@babel/plugin-syntax-import-meta'),
    ...setupProposalClassPlugins(decoratorsOptions),
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

  const {env: minifyEnv, useDefaults, ...minifyRoot} = isPlainObject(minify)
    ? minify
    : MINIFY_DEFAULTS

  const minifyEnvSettings = isPlainObject(minifyEnv) ? minifyEnv[api.env()] : undefined

  const minifySettings =
    isTest || minify === false || minifyEnvSettings === false
      ? false
      : useDefaults || minifyEnvSettings == null
      ? assignNonNil(MINIFY_DEFAULTS, minifyRoot, minifyEnvSettings)
      : assignNonNil(minifyRoot, minifyEnvSettings)

  const minifyPreset =
    minifySettings === false ? [] : [[require('babel-preset-minify'), minifySettings]]

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
})
