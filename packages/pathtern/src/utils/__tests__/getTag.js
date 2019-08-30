import getTag from '../getTag.js'
import {
  plainObject,
  createdPlainObject,
  regexp,
  fn,
  numberArray,
  neString
} from '../../__fixtures__/constants.js'

describe('getTag', () => {
  describe.each`
    value                 | result
    ${regexp}             | ${'[object RegExp]'}
    ${plainObject}        | ${'[object Object]'}
    ${createdPlainObject} | ${'[object Object]'}
    ${null}               | ${'[object Null]'}
    ${undefined}          | ${'[object Undefined]'}
    ${NaN}                | ${'[object NaN]'}
    ${numberArray}        | ${'[object Array]'}
    ${fn}                 | ${'[object Function]'}
    ${neString}           | ${'[object String]'}
  `(`when called with $value`, ({value, result}) => {
    it(`should yield ${result}`, () => {
      expect(getTag(value)).toEqual(result)
    })
  })
})
