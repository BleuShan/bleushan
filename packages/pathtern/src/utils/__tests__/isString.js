import isString from '../isString.js'
import {
  plainObject,
  emptyArray,
  arrowFunction,
  neString,
  emptyString
} from '../../__fixtures__/constants.js'

describe('isString', () => {
  describe.each`
    value            | expected
    ${emptyArray}    | ${false}
    ${plainObject}   | ${false}
    ${null}          | ${false}
    ${arrowFunction} | ${false}
    ${neString}      | ${true}
    ${emptyString}   | ${true}
  `('when called $value', ({value, expected}) => {
    it(`should return with ${expected}`, () => {
      expect(isString(value)).toEqual(expected)
    })
  })
})
