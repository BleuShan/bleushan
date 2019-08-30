import isObjectLike from '../isObjectLike.js'
import {
  plainObject,
  createdPlainObject,
  emptyArray,
  arrowFunction,
  neString,
  DummyClass
} from '../../__fixtures__/constants.js'

describe('isObjectLike', () => {
  describe.each`
    value                 | expected
    ${plainObject}        | ${true}
    ${createdPlainObject} | ${true}
    ${emptyArray}         | ${true}
    ${new DummyClass()}   | ${true}
    ${null}               | ${false}
    ${arrowFunction}      | ${false}
    ${neString}           | ${false}
  `('when called $value', ({value, expected}) => {
    it(`should return with ${expected}`, () => {
      expect(isObjectLike(value)).toEqual(expected)
    })
  })
})
