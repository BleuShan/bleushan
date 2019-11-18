import {MINIFY_DEFAULTS} from './constants'

export default function setupMinifyPreset(minify, env) {
  const isTest = env === 'test'
  if (minify === false || isTest || (minify?.env && minify?.env[env] === false)) return []

  let minifySettings
  if (minify != null) {
    const {env: minifyEnv, useDefaults, ...configRoot} = minify
    if (minifyEnv) {
      const overrides = minifyEnv[env]
      minifySettings = useDefaults
        ? {...MINIFY_DEFAULTS, ...configRoot, ...overrides}
        : {...configRoot, ...overrides}
    } else {
      minifySettings = {...MINIFY_DEFAULTS, ...configRoot}
    }
  } else {
    minifySettings = MINIFY_DEFAULTS
  }

  return [[require('babel-preset-minify'), minifySettings]]
}
