import preset from '../'
import {buildDefaultImportPluginSettings} from '../__fixtures__/setupImportPlugin'

jest.mock('@babel/helper-plugin-utils')

describe('preset', () => {
  const expectedResult = (env, {import: _import, minify, decorators, ...presetOptions}) => {
    const {modules, targets} = presetOptions
    const esModuleTarget = targets ? !!targets.esmodules : false
    const esModules = modules === false || esModuleTarget
    const importPlugins = buildDefaultImportPluginSettings(esModules)
    const decoratorsPlugins =
      decorators === 'legacy'
        ? [
            [require('@babel/plugin-proposal-decorators'), {legacy: true}],
            [require('@babel/plugin-proposal-class-properties'), {loose: true}],
            [require('@babel/plugin-proposal-private-methods'), {loose: true}]
          ]
        : decorators === false
        ? [
            require('@babel/plugin-proposal-class-properties'),
            require('@babel/plugin-proposal-private-methods')
          ]
        : [
            [require('@babel/plugin-proposal-decorators'), {decoratorsBeforeExport: true}],
            require('@babel/plugin-proposal-class-properties'),
            require('@babel/plugin-proposal-private-methods')
          ]
    const plugins = [
      ...decoratorsPlugins,
      require('@babel/plugin-proposal-optional-chaining'),
      require('@babel/plugin-syntax-import-meta'),
      require('@babel/plugin-proposal-export-default-from'),
      require('@babel/plugin-proposal-export-namespace-from'),
      ...importPlugins
    ]

    const minifyPreset =
      env === 'test' || minify === false
        ? []
        : [
            [
              'minify',
              {
                keepFnName: true,
                keepClassName: true,
                ...(minify != null ? minify : {})
              }
            ]
          ]

    const presets = [
      ...minifyPreset,
      [
        require('@babel/preset-env'),
        {
          useBuiltIns: 'usage',
          corejs: {
            version: 3,
            proposals: true
          },
          spec: true,
          shippedProposals: true,
          ...presetOptions
        }
      ]
    ]
    return {
      presets,
      plugins
    }
  }

  describe('in a development environment', () => {
    const env = 'development'
    describe('with an esmodules target', () => {
      const options = {
        targets: {
          esmodules: true
        }
      }
      it('should build the right plugin set', () => {
        expect(preset(env, options)).toEqual(expectedResult(env, options))
      })
    })

    describe('with modules set to false', () => {
      const options = {
        modules: false
      }
      it('should build the right plugin set', () => {
        expect(preset(env, options)).toEqual(expectedResult(env, options))
      })
    })

    describe.each`
      decorators
      ${false}
      ${'legacy'}
    `('with decorators set to $options', ({decorators}) => {
      it('should build the right plugin set', () => {
        expect(preset(env, {decorators})).toEqual(expectedResult(env, {decorators}))
      })
    })

    describe('minify', () => {
      describe('with minify set to false', () => {
        const options = {
          minify: false
        }
        it('should build the right plugin set', () => {
          expect(preset(env, options)).toEqual(expectedResult(env, options))
        })
      })

      describe('with minify with some options', () => {
        const options = {
          minify: {
            keepFnName: true,
            keepClassName: true,
            tdz: false
          }
        }
        it('should build the right plugin set', () => {
          const result = preset(env, options)
          expect(result).toEqual(expectedResult(env, options))
          expect(result.presets[0][1].tdz).toEqual(false)
        })
      })

      describe('with a minify env setup', () => {
        describe('when the env does not match the setup', () => {
          describe('and there is no root options', () => {
            const options = {
              minify: {
                env: {
                  production: {
                    keepClassName: false
                  }
                }
              }
            }
            it('should desactivate minifcation', () => {
              const result = preset(env, options)
              expect(result).toEqual(expectedResult(env, {minify: false}))
            })
          })

          describe('and there is options', () => {
            const options = {
              minify: {
                useDefaults: true,
                env: {
                  production: {
                    keepClassName: false
                  }
                }
              }
            }
            it('should desactivate minifcation', () => {
              const result = preset(env, options)
              expect(result).toEqual(expectedResult(env, {minify: {}}))
            })
          })
        })

        describe('when the env match the setup', () => {
          describe('when there is some stuff defined  ', () => {
            const options = {
              minify: {
                env: {
                  [env]: {
                    keepFnName: true,
                    keepClassName: false
                  }
                }
              }
            }
            it('should use the matching setting', () => {
              const result = preset(env, options)
              expect(result).toEqual(expectedResult(env, {minify: {keepClassName: false}}))
            })
          })

          describe('when there a false set  ', () => {
            const options = {
              minify: {
                env: {
                  [env]: false
                }
              }
            }
            it('should use the matching setting', () => {
              const result = preset(env, options)
              expect(result).toEqual(expectedResult(env, {minify: false}))
            })
          })
        })
      })
    })
  })

  describe('in a test environment', () => {
    const env = 'test'
    const options = {
      targets: {
        esmodules: false
      }
    }
    it('should build the right plugin set', () => {
      expect(preset(env, options)).toEqual(expectedResult(env, options))
    })
  })
})
