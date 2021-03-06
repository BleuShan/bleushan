import {isPlainObject} from './utils'

/* eslint-disable no-template-curly-in-string */
const defaultOptions = (esModules) => ({
  lodash: {
    transform: 'lodash/${member}',
    preventFullImport: true
  },
  'lodash/fp': {
    transform: 'lodash/fp/${member}',
    preventFullImport: true
  },
  ramda: {
    transform: esModules ? 'ramda/es/${member}' : 'ramda/src/${member}',
    preventFullImport: true
  }
})

const merge = (a, b) => {
  const aEntries = Array.from(Object.entries(a))
  const bEntries = isPlainObject(b) ? Array.from(Object.entries(b)) : []
  const missingEntries = bEntries.filter(
    ([key, value]) => aEntries.find(([aKey]) => aKey === key) == null && isPlainObject(value)
  )
  const commonEntries = bEntries.filter(
    ([key, value]) => aEntries.find(([aKey]) => aKey === key) != null && isPlainObject(value)
  )

  return aEntries.concat(missingEntries).reduce((result, [key, value]) => {
    const foundEntry = commonEntries.find(([itemKey]) => itemKey === key)
    const foundValue = foundEntry ? foundEntry[1] : foundEntry
    const mergedValue =
      isPlainObject(value) && isPlainObject(foundValue) ? {...value, ...foundValue} : value

    return {
      ...result,
      [key]: mergedValue
    }
  }, {})
}

const mergeWithDefaultOptions = ({mappings, useESModules}) => {
  const defaults = defaultOptions(useESModules)
  return mappings == null ? defaults : merge(defaults, mappings)
}

const setupImportPlugin = (options) => [
  require('babel-plugin-transform-imports'),
  mergeWithDefaultOptions(options)
]

export default setupImportPlugin
