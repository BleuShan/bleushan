import setupImportPlugin from './setupImportPlugin'
import {declare} from '@babel/helper-plugin-utils'

const isPlainObject = object =>
  !!object &&
  typeof object === 'object' &&
  Object.prototype.toString.call(object) === '[object Object]'

const MINIFY_DEFAULTS = {
  keepFnName: true,
  keepClassName: true
}

export default declare((api, options) => {
  const {import: importOptions, minify, ...presetOptions} = options
  const {modules, targets} = presetOptions
  const esModuleTarget = targets ? !!targets.esModules : false
  const esModules = modules === false || esModuleTarget
  const importPlugins = setupImportPlugin(importOptions, esModules)
  const isTest = api.env() === 'test'
  const testEnvPlugins = isTest
    ? [
      'dynamic-import-node',
      '@babel/transform-modules-commonjs'
    ] : []
  const plugins = [
    '@babel/plugin-proposal-export-namespace-from',
    ...testEnvPlugins,
    ...importPlugins
  ]

  const {env: minifyEnv, useDefaults, ...minifyRoot} = isPlainObject(minify)
    ? minify
    : MINIFY_DEFAULTS

  const minifyEnvSettings =
    isPlainObject(minifyEnv)
      ? isPlainObject(minifyEnv[api.env()])
        ? minifyEnv[api.env()]
        : minifyEnv[api.env()] === false
          ? false
          : Object.keys(minifyRoot).length || useDefaults ? minifyRoot : false
      : {}

  const minifySettings =
    isTest || minify === false || minifyEnvSettings === false
      ? false
      : {
        ...MINIFY_DEFAULTS,
        ...minifyRoot,
        ...minifyEnvSettings
      }

  const minifyPreset = minifySettings === false ? [] : [
    [
      'minify',
      minifySettings
    ]
  ]

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
