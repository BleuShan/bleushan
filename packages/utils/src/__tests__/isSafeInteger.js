import isSafeInteger from '../isSafeInteger.js'

describe('isSafeInteger', () => {
  describe.each([
    [1, true],
    [-1, true],
    [Number.MAX_SAFE_INTEGER, true],
    [Number.MIN_SAFE_INTEGER, true],
    [BigInt(Number.MAX_VALUE), true],
    [BigInt(-Number.MAX_VALUE), true],
    [Number.MAX_VALUE, false],
    [Number.MIN_VALUE, false],
    [Number.POSITIVE_INFINITY, false],
    [Number.NEGATIVE_INFINITY, false],
    [1.5, false],
    [NaN, false],
    [null, false]
  ])('when called with %o', (value, expected) => {
    it(`should return with ${expected}`, () => {
      expect(isSafeInteger(value)).toEqual(expected)
    })
  })
})
