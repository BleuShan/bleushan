import configure from '../configure'
import entry from '../entry'
import loader from '../loader'

describe('configure', () => {
  describe('without configuring any partials', () => {
    const preset = configure([])

    describe('with an empty config', () => {
      const expectedConfig = {
        mode: 'development',
        devtool: 'cheap-module-eval-source-map'
      }

      it('should return the config', () => {
        expect(preset({})).toEqual(expectedConfig)
      })
    })

    describe('with a config with modeEnvKey', () => {
      const expectedConfig = {
        mode: 'development',
        devtool: 'cheap-module-eval-source-map'
      }

      it('should return the config', () => {
        expect(preset({modeEnvKey: 'NODE_ENV'})).toEqual(expectedConfig)
      })
      it('should return the config even when the key is absent', () => {
        expect(preset({modeEnvKey: 'ALAKAZAHAM'})).toEqual(expectedConfig)
      })
    })

    describe('with a config in production mode', () => {
      const expectedConfig = {
        mode: 'production',
        devtool: false
      }

      it('should return the config', () => {
        expect(preset({mode: 'production'})).toEqual(expectedConfig)
      })
    })

    describe('with a config in with a mode and a devtool', () => {
      const expectedConfig = {
        mode: 'development',
        devtool: 'eval'
      }

      it('should return the config', () => {
        expect(preset({mode: 'development', devtool: 'eval'})).toEqual(expectedConfig)
      })
    })
  })

  describe('with partials', () => {
    const babel = loader(/\.(js|jsx)$/, 'babel-loader')
    const entries = entry([])

    describe('with a single partial', () => {
      const preset = configure([
        babel
      ])

      describe('with an empty config', () => {
        const expectedConfig = {
          mode: 'development',
          devtool: 'cheap-module-eval-source-map',
          module: {
            rules: [
              {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader'
              }
            ]
          }
        }

        it('should return the config', () => {
          expect(preset({})).toEqual(expectedConfig)
        })
      })
    })

    describe('with multiple partials', () => {
      const preset = configure([
        entries({
          main: ['./main'],
          vendor: [
            'react'
          ]
        }),
        babel
      ])

      describe('with an empty config', () => {
        const expectedConfig = {
          mode: 'development',
          devtool: 'cheap-module-eval-source-map',
          entry: {
            main: ['./main'],
            vendor: [
              'react'
            ]
          },
          module: {
            rules: [
              {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader'
              }
            ]
          }
        }

        it('should return the config', () => {
          expect(preset({})).toEqual(expectedConfig)
        })
      })
    })
  })
})
