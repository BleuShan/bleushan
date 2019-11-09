import preset from '../index'
import {buildExpectedConfiguration} from '../__fixtures__/preset'
import {transformSync} from '@babel/core'
import {useMockEnv, resetMock} from '@babel/helper-plugin-utils'

jest.mock('@babel/helper-plugin-utils')

describe('using the preset', () => {
  describe.each`
    env
    ${'development'}
    ${'production'}
    ${'test'}
  `('in a $env environment', ({env}) => {
    describe.each`
      targets
      ${{esmodules: true}}
      ${{esmodules: false}}
      ${{node: 'current'}}
      ${undefined}
    `('using the following "targets" configuration: $targets', ({targets}) => {
      describe.each`
        modules
        ${'auto'}
        ${false}
      `('with "modules" set to $modules', ({modules}) => {
        describe.each`
          decorators
          ${false}
          ${'legacy'}
          ${undefined}
        `('with "decorators" set to $decorators', ({decorators}) => {
          describe.each([
            [undefined],
            [false],
            [
              {
                keepFnName: true,
                keepClassName: true,
                tdz: false
              }
            ],
            [
              {
                env: {
                  web: {
                    keepClassName: false
                  }
                }
              }
            ],
            [
              {
                useDefaults: true,
                env: {
                  web: {
                    keepClassName: false
                  }
                }
              }
            ],
            [
              {
                env: {
                  [env]: {
                    keepClassName: false
                  }
                }
              }
            ],
            [
              {
                env: {
                  [env]: false
                }
              }
            ]
          ])('with "minify" set to %j', (minify) => {
            let options
            let expectedOptions
            let configuration

            beforeEach(() => {
              useMockEnv(env)
              options = {
                targets,
                modules,
                decorators,
                minify
              }

              expectedOptions = {
                targets,
                modules,
                decorators,
                get minify() {
                  if (minify && minify.env) {
                    const match = minify.env[env]
                    return match || minify.useDefaults ? match : false
                  }

                  return minify
                }
              }

              configuration = preset({}, options)
            })

            afterEach(() => {
              resetMock()
            })

            it('should have the expected configuration', () => {
              expect(configuration).toEqual(buildExpectedConfiguration(env, expectedOptions))
            })

            it('should not throw when compiling', () => {
              expect(() => {
                transformSync(
                  `
                  function test() {
                    
                  }
                `,
                  {
                    babelrc: false,
                    ...configuration
                  }
                )
              }).not.toThrow()
            })
          })
        })
      })
    })
  })
})
