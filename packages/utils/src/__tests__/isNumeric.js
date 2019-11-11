import isNumeric from '../isNumeric.js'

describe('isSafeInteger', () => {
  describe.each([
    [1, true],
    [-1, true],
    [Number.MAX_SAFE_INTEGER, true],
    [Number.MIN_SAFE_INTEGER, true],
    [BigInt(Number.MAX_VALUE), true],
    [BigInt(-Number.MAX_VALUE), true],
    [Number.MAX_VALUE, true],
    [Number.MIN_VALUE, true],
    [Number.POSITIVE_INFINITY, true],
    [Number.NEGATIVE_INFINITY, true],
    [1.5, true],
    [NaN, false],
    [null, false]
  ])('when called with %o', (value, expected) => {
    it(`should return with ${expected}`, () => {
      expect(isNumeric(value)).toEqual(expected)
    })
  })
})
