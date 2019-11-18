/* eslint-disable no-template-curly-in-string */

export const buildExpectedOptions = ({useESModules, mappings = {}}) => {
  const {'lodash/fp': lfp = {}, lodash = {}, ramda = {}, '@bleushan/utils': blu, ...rest} = mappings
  return [
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
        transform: useESModules ? 'ramda/es/${member}' : 'ramda/src/${member}',
        preventFullImport: true,
        ...ramda
      },
      ...rest
    }
  ]
}

export const buildDefaultImportPluginSettings = ({useESModules}) =>
  buildExpectedOptions({useESModules})
