import {buildExpectedOptions as buildExpectedImportOptions} from './setupImportPlugin'
import {MINIFY_DEFAULTS, COREJS_DEFAULTS} from '../constants'
import {isPlainObject, omitNils} from '../utils'
import {promises as fs} from 'fs'
import {resolve, join} from 'path'
import {transformFileAsync} from '@babel/core'

export function createMockApi(options) {
  const {env, caller} = options
  return {
    assertVersion: jest.fn(),
    caller: jest.fn((callback) => callback(caller)),
    env: jest.fn().mockReturnValue(env)
  }
}

function buildMinifyOption(minify, env) {
  if (minify != null) {
    const {env: envConfig, useDefaults, ...configRoot} = minify
    const overrides = envConfig?.[env]
    if (envConfig) {
      if (useDefaults) {
        return Object.assign(MINIFY_DEFAULTS, configRoot, overrides)
      }

      return Object.assign(configRoot, overrides)
    }

    return Object.assign(MINIFY_DEFAULTS, configRoot)
  }

  return MINIFY_DEFAULTS
}
export function buildExpectedConfiguration({env, caller}, options) {
  const {imports, minify, decorators, decoratorsBeforeExport, runtime, ...rest} = omitNils(options)
  const {modules = 'auto', targets, corejs = COREJS_DEFAULTS, ...presetENVOptions} = rest
  const {useESModules: importsUsesESModules, mappings} = isPlainObject(imports) ? imports : {}
  const useESModules =
    importsUsesESModules != null
      ? importsUsesESModules
      : !!targets?.esmodules ||
        modules === false ||
        (modules === 'auto' && !!caller?.supportsStaticESM)

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
    require('@babel/plugin-proposal-export-default-from'),
    require('@babel/plugin-proposal-export-namespace-from'),
    buildExpectedImportOptions({useESModules, mappings})
  ]

  if (runtime) {
    plugins.push([
      require('@babel/plugin-transform-runtime'),
      {
        corejs,
        useESModules,
        ...(isPlainObject(runtime) ? runtime : {})
      }
    ])
  }

  const minifyPreset =
    env === 'test' || minify === false || (minify?.env != null && minify?.env[env] === false)
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
        bugfixes: true,
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

export async function resolveCompileTestCasesFilePaths() {
  const dirname = resolve(__dirname, 'compile')
  const filenames = await fs.readdir(dirname)

  return filenames.map((filename) => join(dirname, filename))
}

export function transformFileWithPreset(filename, envName, configuration) {
  const presets = configuration
    ? [[require('../preset.js'), configuration]]
    : [require('../preset')]
  return transformFileAsync(filename, {
    configFile: false,
    babelrc: false,
    envName,
    presets
  })
}
