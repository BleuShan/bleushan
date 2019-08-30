import getType from '../getType'
import {
  regexp,
  plainObject,
  createdPlainObject,
  numberArray,
  neString,
  fn
} from '../../__fixtures__/constants'

describe('getType', () => {
  describe.each`
    value                 | result
    ${regexp}             | ${'object'}
    ${plainObject}        | ${'object'}
    ${createdPlainObject} | ${'object'}
    ${null}               | ${'null'}
    ${undefined}          | ${'undefined'}
    ${NaN}                | ${'NaN'}
    ${numberArray}        | ${'array'}
    ${fn}                 | ${typeof fn}
    ${neString}           | ${typeof neString}
  `(`when called with $value`, ({value, result}) => {
    it(`should yield ${result}`, () => {
      expect(getType(value)).toEqual(result)
    })
  })
})
