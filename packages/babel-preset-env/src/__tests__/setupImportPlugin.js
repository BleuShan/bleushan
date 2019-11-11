/* eslint-disable no-template-curly-in-string */
import {
  buildDefaultImportPluginSettings,
  buildExpectedOptions,
  buildExpectedOptionsWithOverrides
} from '../__fixtures__/setupImportPlugin'
import setupImportPlugin from '../setupImportPlugin'

describe('setupImportPlugin', () => {
  describe.each`
    esmodule
    ${true}
    ${false}
  `('with esmodule set to $esmodule', ({esmodule}) => {
    describe.each([
      [undefined, buildDefaultImportPluginSettings],
      [
        {
          testLib: {
            transform: 'testLib/lib/${member}',
            preventFullImport: true
          }
        },
        buildExpectedOptions
      ],
      [
        {
          libraryName: 'testLib',
          libraryDirectory: 'lib',
          camel2DashComponentName: false
        },
        buildDefaultImportPluginSettings
      ],
      [
        [
          {
            libraryName: 'testLib',
            libraryDirectory: 'lib',
            camel2DashComponentName: false
          },
          {
            libraryName: 'testLib2',
            libraryDirectory: 'lib',
            camel2DashComponentName: false
          }
        ],
        buildDefaultImportPluginSettings
      ],
      [
        {
          lodash: {
            preventFullImport: false
          },
          'lodash/fp': {
            transform: 'lodash-es/fp/${member}'
          },
          testLib: {
            transform: 'testLib/lib/${member}',
            preventFullImport: true
          }
        },
        buildExpectedOptionsWithOverrides
      ]
    ])('when called options: %o', (options, expectedOptionsFactory) => {
      it('should return the expected options', () => {
        expect(setupImportPlugin(options, esmodule)).toEqual(
          expectedOptionsFactory(esmodule, options)
        )
      })
    })
  })
})
