import isPlainObject from '../isPlainObject'
import {
  plainObject,
  createdPlainObject,
  emptyArray,
  arrowFunction,
  neString,
  DummyClass
} from '../../__fixtures__/constants.js'

describe('isPlainObject', () => {
  describe.each`
    value                 | expected
    ${plainObject}        | ${true}
    ${createdPlainObject} | ${true}
    ${emptyArray}         | ${false}
    ${new DummyClass()}   | ${false}
    ${null}               | ${false}
    ${undefined}          | ${false}
    ${arrowFunction}      | ${false}
    ${neString}           | ${false}
  `('when called $value', ({value, expected}) => {
    it(`should return with ${expected}`, () => {
      expect(isPlainObject(value)).toEqual(expected)
    })
  })
})
