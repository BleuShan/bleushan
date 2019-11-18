/* eslint-disable no-template-curly-in-string */
import {
  buildDefaultImportPluginSettings,
  buildExpectedOptions
} from '../__fixtures__/setupImportPlugin'
import setupImportPlugin from '../setupImportPlugin'

describe('setupImportPlugin', () => {
  describe.each`
    useESModules
    ${true}
    ${false}
  `('with useESModules set to $useESModules', ({useESModules}) => {
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
        buildExpectedOptions
      ]
    ])('when called mappings: %o', (mappings, expectedOptionsFactory) => {
      it('should return the expected options', () => {
        expect(setupImportPlugin({mappings, useESModules})).toEqual(
          expectedOptionsFactory({useESModules, mappings})
        )
      })
    })
  })
})
