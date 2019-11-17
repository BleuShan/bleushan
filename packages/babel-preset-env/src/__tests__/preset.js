/* eslint-disable jest/no-standalone-expect */
import {property} from 'jsverify'
import {mockApi, options} from '../__fixtures__/arbitraries'
import {buildExpectedConfiguration} from '../__fixtures__/preset'
import preset from '../index'

jest.mock('@babel/helper-plugin-utils')

describe('the preset', () => {
  property(
    'for all babel api and option combination should build the expected options',
    mockApi,
    options,
    (api, options) => {
      const result = preset(api, options)
      expect(api.assertVersion).toHaveBeenCalledWith(7)
      expect(result).toEqual(
        buildExpectedConfiguration(
          {
            env: api.env(),
            caller: api.caller((caller) => caller)
          },
          options
        )
      )
      return true
    }
  )
})
