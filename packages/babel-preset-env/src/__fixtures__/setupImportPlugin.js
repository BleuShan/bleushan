/* eslint-disable no-template-curly-in-string */
export const buildDefaultImportPluginSettings = esModules => [
  [
    'transform-imports',
    {
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
    }
  ]
]

export const buildExpectedOptions = (options, esModules) => [
  [
    'transform-imports',
    {
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
      },
      ...options
    }
  ]
]

export const buildExpectedOptionsWithOverrides = (options, esModules) => {
  const { 'lodash/fp': lfp = {}, lodash = {}, ramda = {}, ...rest } = options
  return [
    [
      'transform-imports',
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
