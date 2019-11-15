/* eslint-disable no-template-curly-in-string */

export const buildExpectedOptions = (esModules, options = {}) => {
  const {'lodash/fp': lfp = {}, lodash = {}, ramda = {}, '@bleushan/utils': blu, ...rest} = options
  return [
    [
      require('babel-plugin-transform-imports'),
      {
        lodash: {
          ...{
            transform: 'lodash/${member}',
            preventFullImport: true
          },
          ...lodash
        },
        'lodash/fp': {
          ...{
            transform: 'lodash/fp/${member}',
            preventFullImport: true
          },
          ...lfp
        },
        ramda: {
          transform: esModules ? 'ramda/es/${member}' : 'ramda/src/${member}',
          preventFullImport: true,
          ...ramda
        },
        ...rest
      }
    ]
  ]
}

export const buildDefaultImportPluginSettings = (esModules) => buildExpectedOptions(esModules)
