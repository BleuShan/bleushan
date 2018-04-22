const defaultOptions = esModules => [
  {
    libraryName: 'recompose',
    libraryDirectory: '',
    camel2DashComponentName: false
  },
  {
    libraryName: 'lodash',
    libraryDirectory: '',
    camel2DashComponentName: false
  },
  {
    libraryName: 'lodash/fp',
    libraryDirectory: '',
    camel2DashComponentName: false
  },
  {
    libraryName: 'ramda',
    libraryDirectory: esModules ? 'es' : 'src',
    camel2DashComponentName: false
  }
]

export const hasLibraryName = target => target != null && 'libraryName' in target
const isArrayOrDefault = (target, value) => Array.isArray(target) ? target : value
const targetOrDefault = (target, value) => hasLibraryName(target) ? target.libraryName : value
const match = (target, a) => ({libraryName: b}) => a === targetOrDefault(target, b)

const isMissingIn =
  target =>
    ({libraryName: a}, index, source) =>
      isArrayOrDefault(target, source).find(match(target, a)) == null

const filterDefaultOptions = (options, esModules) =>
  defaultOptions(esModules)
    .filter(isMissingIn(options))

const makeConcatenable = target => Array.isArray(target) ? target : [target]
const concat = (a, b) => makeConcatenable(a).concat(makeConcatenable(b))

const mergeWithDefaultOptions = (options, esModules) =>
  options == null ? defaultOptions(esModules)
    : concat(filterDefaultOptions(options, esModules), options)

const setupImportPlugin = (options, esModules) =>
  mergeWithDefaultOptions(options, esModules).map(option => ['import', option, option.libraryName])

export default setupImportPlugin
