import {pipe} from 'ramda'
import loader from '../loader'

describe('loader', () => {
  describe('when given an empty config object', () => {
    it('should map a string loader to the loader property', () => {
      const expectedConfig = {
        module: {
          rules: [
            {
              test: /\.(js|jsx)$/,
              loader: 'babel-loader'
            }
          ]
        }
      }
      const config = loader(/\.(js|jsx)$/, 'babel-loader')({})
      expect(config).toEqual(expectedConfig)
    })

    it('should map string array', () => {
      const expectedConfig = {
        module: {
          rules: [
            {
              test: /\.(js|jsx)$/,
              loader: 'babel-loader'
            }
          ]
        }
      }
      const config = loader(/\.(js|jsx)$/, ['babel-loader'])({})
      expect(config).toEqual(expectedConfig)
    })

    it('should map a tuple string and options to loader and options props', () => {
      const expectedConfig = {
        module: {
          rules: [
            {
              test: /\.(js|jsx)$/,
              loader: 'babel-loader',
              options: {debug: true}
            }
          ]
        }
      }
      const config = loader(/\.(js|jsx)$/, ['babel-loader', {options: {debug: true}}])({})
      expect(config).toEqual(expectedConfig)
    })
    it('should map an array of loader and options to the use props', () => {
      const loaders = [{loader: 'eslint-loader'}, {loader: 'babel-loader', options: {debug: true}}]
      const expectedConfig = {
        module: {
          rules: [
            {
              test: /\.(js|jsx)$/,
              use: loaders
            }
          ]
        }
      }
      const config = loader(/\.(js|jsx)$/, loaders)({})
      expect(config).toEqual(expectedConfig)
    })

    it('should be composable and curryable', () => {
      const expectedConfig = {
        module: {
          rules: [
            {
              test: /\.(js|jsx)$/,
              loader: 'babel-loader',
              options: {
                babelrc: false
              }
            }
          ]
        }
      }
      const js = loader(/\.(js|jsx)$/)
      const config = pipe(
        js('babel-loader'),
        js({options: {babelrc: false}})
      )({})
      expect(config).toEqual(expectedConfig)
    })
  })

  describe('when given a non-empty config', () => {
    const nonEmptyConfig = {
      module: {
        rules: [
          {
            test: /\.(tsx?)$/,
            loader: 'ts-loader'
          }
        ]
      }
    }

    const nonEmptyConfigWithAUseKey = {
      module: {
        rules: [
          {
            test: /\.(tsx?)$/,
            use: [{loader: 'ts-loader'}]
          }
        ]
      }
    }

    it('should append new loader rules if the test keys are different', () => {
      const expectedConfig = {
        module: {
          rules: [
            {
              test: /\.(tsx?)$/,
              loader: 'ts-loader'
            },
            {
              test: /\.(jsx?)$/,
              loader: 'babel-loader'
            }
          ]
        }
      }

      const babel = loader(/\.(jsx?)$/, 'babel-loader')
      const config = babel(nonEmptyConfig)
      expect(config).toEqual(expectedConfig)
    })

    it('should merge new loader rules if the test keys the same', () => {
      const expectedConfig = {
        module: {
          rules: [
            {
              test: /\.(tsx?)$/,
              use: [{loader: 'ts-loader'}, {loader: 'babel-loader'}]
            }
          ]
        }
      }

      const babel = loader(/\.(tsx?)$/, 'babel-loader')
      const config = babel(nonEmptyConfig)
      expect(config).toEqual(expectedConfig)
    })

    it('should append new loader rules if the test keys the same', () => {
      const expectedConfig = {
        module: {
          rules: [
            {
              test: /\.(tsx?)$/,
              use: [{loader: 'ts-loader'}, {loader: 'babel-loader'}]
            }
          ]
        }
      }

      const babel = loader(/\.(tsx?)$/, 'babel-loader')
      const config = babel(nonEmptyConfigWithAUseKey)
      expect(config).toEqual(expectedConfig)
    })

    it('should not merge new loader rules if loader is the same', () => {
      const tsLoader = loader(/\.(tsx?)$/, 'ts-loader')
      const config = tsLoader(nonEmptyConfig)
      expect(config).toEqual(nonEmptyConfig)
    })
  })
})
