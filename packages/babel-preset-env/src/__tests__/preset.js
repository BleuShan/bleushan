import preset from '../'
import { buildDefaultImportPluginSettings } from '../__fixtures__/setupImportPlugin'

jest.mock('@babel/helper-plugin-utils')

describe('preset', () => {
  const expectedResult = (
    env,
    { import: _import, minify, decorators, ...presetOptions }
  ) => {
    const { modules, targets } = presetOptions
    const esModuleTarget = targets ? !!targets.esModules : false
    const esModules = modules === false || esModuleTarget
    const importPlugins = buildDefaultImportPluginSettings(esModules)
    const testEnvPlugins =
      env === 'test'
        ? [
            'babel-plugin-dynamic-import-node',
            '@babel/plugin-transform-modules-commonjs'
          ]
        : []
    const decoratorsPlugins =
      decorators === 'legacy'
        ? [
            ['@babel/plugin-proposal-decorators', { legacy: true }],
            ['@babel/plugin-proposal-class-properties', { loose: true }],
            ['@babel/plugin-proposal-private-methods', { loose: true }]
          ]
        : decorators === false
        ? [
            '@babel/plugin-proposal-class-properties',
            '@babel/plugin-proposal-private-methods'
          ]
        : [
            [
              '@babel/plugin-proposal-decorators',
              { decoratorsBeforeExport: true }
            ],
            '@babel/plugin-proposal-class-properties',
            '@babel/plugin-proposal-private-methods'
          ]
    const plugins = [
      ...decoratorsPlugins,
      '@babel/plugin-proposal-optional-chaining',
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-proposal-export-default-from',
      '@babel/plugin-proposal-export-namespace-from',
      ...importPlugins,
      ...testEnvPlugins
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
        '@babel/preset-env',
        {
          useBuiltIns: 'usage',
          corejs: 3,
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
    describe('with an esModules target', () => {
      const options = {
        targets: {
          esModules: true
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
    `('with decorators set to $options', ({ decorators }) => {
      it('should build the right plugin set', () => {
        expect(preset(env, { decorators })).toEqual(
          expectedResult(env, { decorators })
        )
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
              expect(result).toEqual(expectedResult(env, { minify: false }))
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
              expect(result).toEqual(expectedResult(env, { minify: {} }))
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
              expect(result).toEqual(
                expectedResult(env, { minify: { keepClassName: false } })
              )
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
              expect(result).toEqual(expectedResult(env, { minify: false }))
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
        esModules: false
      }
    }
    it('should build the right plugin set', () => {
      expect(preset(env, options)).toEqual(expectedResult(env, options))
    })
  })
})
