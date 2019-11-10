/* eslint-disable no-template-curly-in-string */
export const buildDefaultImportPluginSettings = (esModules) => [
  [
    require('babel-plugin-transform-imports'),
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
      '@bleushan/utils': {
        transform: esModules ? '@bleushan/utils/src/${member}' : '@bleushan/utils/lib/${member}',
        preventFullImport: true
      }
    }
  ]
]

export const buildExpectedOptions = (esModules, options) => [
  [
    require('babel-plugin-transform-imports'),
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
      '@bleushan/utils': {
        transform: esModules ? '@bleushan/utils/src/${member}' : '@bleushan/utils/lib/${member}',
        preventFullImport: true
      },
      ...options
    }
  ]
]

export const buildExpectedOptionsWithOverrides = (esModules, options) => {
  const {
    'lodash/fp': lfp = {},
    lodash = {},
    ramda = {},
    '@bleushan/utils': bu = {},
    ...rest
  } = options
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
        '@bleushan/utils': {
          transform: esModules ? '@bleushan/utils/src/${member}' : '@bleushan/utils/lib/${member}',
          preventFullImport: true,
          ...bu
        },
        ...rest
      }
    ]
  ]
}
