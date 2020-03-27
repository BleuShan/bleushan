import setupImportPlugin from './setupImportPlugin'
import setupProposalClassPlugins from './setupProposalClassPlugins'
import setupMinifyPreset from './setupMinifyPreset'
import {declare} from '@babel/helper-plugin-utils'
import {isPlainObject, omitNils} from './utils'
import {COREJS_DEFAULTS} from './constants'

function supportsStaticESM(caller) {
  return Boolean(caller?.supportsStaticESM)
}

export default declare((api, options) => {
  api.assertVersion(7)
  const {imports, minify, decorators, decoratorsBeforeExport, runtime = false, ...rest} = omitNils(
    options
  )
  const {modules = 'auto', targets, corejs = COREJS_DEFAULTS, ...presetENVOptions} = rest
  const targetsESModules = Boolean(targets?.esmodules)
  const {useESModules: importsUsesESModule, mappings} = isPlainObject(imports) ? imports : {}
  const useESModules =
    importsUsesESModule != null
      ? importsUsesESModule
      : modules === false ||
        targetsESModules ||
        (modules === 'auto' && api.caller(supportsStaticESM))
  const decoratorsOptions =
    decorators != null || decoratorsBeforeExport != null
      ? {decorators, decoratorsBeforeExport}
      : false

  const plugins = [
    require('@babel/plugin-syntax-bigint'),
    require('@babel/plugin-syntax-import-meta'),
    ...setupProposalClassPlugins(decoratorsOptions),
    require('@babel/plugin-proposal-export-default-from'),
    require('@babel/plugin-proposal-export-namespace-from'),
    setupImportPlugin({mappings, useESModules})
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

  const presets = [
    ...setupMinifyPreset(minify, api.env()),
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
})
