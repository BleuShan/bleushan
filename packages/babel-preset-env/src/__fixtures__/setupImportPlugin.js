export const buildDefaultImportPluginSet = esModules => [
  ['import', {
    libraryName: 'recompose',
    libraryDirectory: '',
    camel2DashComponentName: false
  }, 'recompose'],
  ['import', {
    libraryName: 'lodash',
    libraryDirectory: '',
    camel2DashComponentName: false
  }, 'lodash'],
  ['import', {
    libraryName: 'lodash/fp',
    libraryDirectory: '',
    camel2DashComponentName: false
  }, 'lodash/fp'],
  ['import', {
    libraryName: 'ramda',
    libraryDirectory: esModules ? 'es' : 'src',
    camel2DashComponentName: false
  }, 'ramda']
]

export const buildImportPluginEntryFromOptions = options => ['import', options, options.libraryName]
