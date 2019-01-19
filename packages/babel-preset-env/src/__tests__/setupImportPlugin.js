/* eslint-disable no-template-curly-in-string */
import {
  buildDefaultImportPluginSettings,
  buildExpectedOptions,
  buildExpectedOptionsWithOverrides
} from '../__fixtures__/setupImportPlugin'
import setupImportPlugin from '../setupImportPlugin'

describe('setupImportPlugin', () => {
  describe('with no options', () => {
    const options = undefined
    describe('with esmodule', () => {
      const esmodule = true
      it('should use create the default options', () => {
        expect(setupImportPlugin(options, esmodule)).toEqual(
          buildDefaultImportPluginSettings(esmodule)
        )
      })
    })

    describe('without esmodule', () => {
      const esmodule = false
      it('should use create the default options', () => {
        expect(setupImportPlugin(options, esmodule)).toEqual(
          buildDefaultImportPluginSettings(esmodule)
        )
      })
    })
  })

  describe('with an option', () => {
    const options = {
      testLib: {
        transform: 'testLib/lib/${member}',
        preventFullImport: true
      }
    }

    describe('with esmodule', () => {
      const esmodule = true
      it('should use create the default options', () => {
        expect(setupImportPlugin(options, esmodule)).toEqual(
          buildExpectedOptions(options, esmodule)
        )
      })
    })

    describe('without esmodule', () => {
      const esmodule = false
      it('should use create the default options', () => {
        expect(setupImportPlugin(options, esmodule)).toEqual(
          buildExpectedOptions(options, esmodule)
        )
      })
    })
  })

  describe('with invalid option', () => {
    const options = {
      libraryName: 'testLib',
      libraryDirectory: 'lib',
      camel2DashComponentName: false
    }

    describe('with esmodule', () => {
      const esmodule = true
      it('should use create the default options', () => {
        expect(setupImportPlugin(options, esmodule)).toEqual(
          buildDefaultImportPluginSettings(esmodule)
        )
      })
    })

    describe('without esmodule', () => {
      const esmodule = false
      it('should use create the default options', () => {
        expect(setupImportPlugin(options, esmodule)).toEqual(
          buildDefaultImportPluginSettings(esmodule)
        )
      })
    })
  })

  describe('with invalid options', () => {
    const options = [
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
    ]

    describe('with esmodule', () => {
      const esmodule = true
      it('should use create the default options', () => {
        expect(setupImportPlugin(options, esmodule)).toEqual(
          buildDefaultImportPluginSettings(esmodule)
        )
      })
    })

    describe('without esmodule', () => {
      const esmodule = false
      it('should use create the default options', () => {
        expect(setupImportPlugin(options, esmodule)).toEqual(
          buildDefaultImportPluginSettings(esmodule)
        )
      })
    })
  })

  describe('with some overrides', () => {
    const options = {
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
    }

    describe('with esmodule', () => {
      const esmodule = true
      it('should use create the default options', () => {
        expect(setupImportPlugin(options, esmodule)).toEqual(
          buildExpectedOptionsWithOverrides(options, esmodule)
        )
      })
    })

    describe('without esmodule', () => {
      const esmodule = false
      it('should use create the default options', () => {
        expect(setupImportPlugin(options, esmodule)).toEqual(
          buildExpectedOptionsWithOverrides(options, esmodule)
        )
      })
    })
  })
})
