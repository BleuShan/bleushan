import output from '../output'
import path from 'path'

describe('output', () => {
  describe('when the path is set', () => {
    const outputConfig = {
      path: '../priv/static',
      publicPath: '/',
      filename: 'js/[name]-[hash].bundle.js',
      chunkFilename: 'js/[id]-[hash].chunk.js',
      crossOriginLoading: 'use-credentials'
    }

    const expectedOutputConfig = {
      ...outputConfig,
      path: path.resolve(process.cwd(), outputConfig.path)
    }

    describe('with an empty config', () => {
      it('should add the output key', () => {
        const expectedConfig = {
          output: expectedOutputConfig
        }

        const config = output(process.cwd(), outputConfig)({})
        expect(config).toEqual(expectedConfig)
      })
    })

    describe('with an existing config', () => {
      const inputConfig = {
        entry: './main'
      }

      it('should add the output key', () => {
        const expectedConfig = {
          entry: './main',
          output: expectedOutputConfig
        }

        const config = output(process.cwd(), outputConfig)(inputConfig)
        expect(config).toEqual(expectedConfig)
      })

      describe('when the existing config has an existing output value', () => {
        const inputConfigWithOutputValue = {
          entry: './main',
          output: {
            path: path.resolve(process.cwd(), 'test')
          }
        }
        it('should merge the output key', () => {
          const expectedConfig = {
            entry: './main',
            output: {
              ...expectedOutputConfig,
              ...inputConfigWithOutputValue.output
            }
          }

          const config = output(process.cwd(), outputConfig)(inputConfigWithOutputValue)
          expect(config).toEqual(expectedConfig)
        })
      })
    })
  })

  describe('when the path is not set', () => {
    const outputConfig = {
      publicPath: '/',
      filename: 'js/[name]-[hash].bundle.js',
      chunkFilename: 'js/[id]-[hash].chunk.js',
      crossOriginLoading: 'use-credentials'
    }

    const expectedOutputConfig = {
      ...outputConfig,
      path: path.resolve(process.cwd(), '')
    }

    describe('with an empty config', () => {
      it('should add the output key', () => {
        const expectedConfig = {
          output: expectedOutputConfig
        }

        const config = output(process.cwd(), outputConfig)({})
        expect(config).toEqual(expectedConfig)
      })
    })

    describe('with an existing config', () => {
      const inputConfig = {
        entry: './main'
      }
      it('should add the output key', () => {
        const expectedConfig = {
          entry: './main',
          output: expectedOutputConfig
        }

        const config = output(process.cwd(), outputConfig)(inputConfig)
        expect(config).toEqual(expectedConfig)
      })
    })
  })
})
