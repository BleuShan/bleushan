/* eslint-disable jest/no-standalone-expect */
import {property} from 'jsverify'
import {mockApiContext, options, nodeEnv} from '../__fixtures__/arbitraries'
import {
  buildExpectedConfiguration,
  createMockApi,
  resolveCompileTestCasesFilePaths,
  transformFileWithPreset
} from '../__fixtures__/preset'
import preset from '../preset'

jest.mock('@babel/helper-plugin-utils')

describe('the preset', () => {
  describe('with any babel api and options combinations', () => {
    property(
      'should create the expected configuration',
      mockApiContext,
      options,
      (context, configuration) => {
        const api = createMockApi(context)
        const result = preset(api, configuration)
        expect(api.assertVersion).toHaveBeenCalledWith(7)
        expect(result).toEqual(buildExpectedConfiguration(context, configuration))
        return true
      }
    )
  })

  describe('with any files env and options combination', () => {
    let compileTestCasesFilePaths
    beforeAll(async () => {
      compileTestCasesFilePaths = await resolveCompileTestCasesFilePaths()
    })

    property(
      'should compile the file without errors',
      nodeEnv,
      options,
      async (env, configuration) => {
        for (const filepath of compileTestCasesFilePaths) {
          await transformFileWithPreset(filepath, env, configuration)
        }
        return true
      }
    )
  })
})
