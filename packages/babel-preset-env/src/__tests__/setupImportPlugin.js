import {
  buildDefaultImportPluginSet,
  buildImportPluginEntryFromOptions
} from '../__fixtures__/setupImportPlugin'
import setupImportPlugin from '../setupImportPlugin'

describe('setupImportPlugin', () => {
  describe('with no options', () => {
    const options = undefined
    describe('with esmodule', () => {
      const esmodule = true
      it('should use create the default options', () => {
        expect(setupImportPlugin(options, esmodule)).toEqual(buildDefaultImportPluginSet(esmodule))
      })
    })

    describe('without esmodule', () => {
      const esmodule = false
      it('should use create the default options', () => {
        expect(setupImportPlugin(options, esmodule)).toEqual(buildDefaultImportPluginSet(esmodule))
      })
    })
  })

  describe('with an option', () => {
    const options = {
      libraryName: 'testLib',
      libraryDirectory: 'lib',
      camel2DashComponentName: false
    }

    const expectedOptions = esmodule => buildDefaultImportPluginSet(esmodule).concat([
      buildImportPluginEntryFromOptions(options)
    ])

    describe('with esmodule', () => {
      const esmodule = true
      it('should use create the default options', () => {
        expect(setupImportPlugin(options, esmodule)).toEqual(expectedOptions(esmodule))
      })
    })

    describe('without esmodule', () => {
      const esmodule = false
      it('should use create the default options', () => {
        expect(setupImportPlugin(options, esmodule)).toEqual(expectedOptions(esmodule))
      })
    })
  })

  describe('with some options', () => {
    const options = [
      {
        libraryName: 'testLib',
        libraryDirectory: 'lib',
        camel2DashComponentName: false
      },
      {
        libraryName: 'testLib2',
        libraryDirectory: 'src',
        camel2DashComponentName: false
      }
    ]

    const expectedOptions =
      esmodule => buildDefaultImportPluginSet(esmodule)
        .concat(options.map(buildImportPluginEntryFromOptions))

    describe('with esmodule', () => {
      const esmodule = true
      it('should use create the default options', () => {
        expect(setupImportPlugin(options, esmodule)).toEqual(expectedOptions(esmodule))
      })
    })

    describe('without esmodule', () => {
      const esmodule = false
      it('should use create the default options', () => {
        expect(setupImportPlugin(options, esmodule)).toEqual(expectedOptions(esmodule))
      })
    })
  })
})
