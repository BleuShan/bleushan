import isArrayLike from '../isArrayLike.js'

describe('isArrayLike', () => {
  describe.each([
    [[1, 2, 3], true],
    [new Uint8Array(10), true],
    [new Uint8ClampedArray(10), true],
    [new Uint16Array(10), true],
    [new Uint32Array(10), true],
    [new BigInt64Array(10), true],
    [new BigUint64Array(10), true],
    [{0: 1, length: 1}, true],
    [{0: 1, length: 1n}, true],
    [{[0n]: 1, [1n]: 1, length: 2n}, true],
    [{0: 1, length: -1}, false],
    [{0: 1, length: 1.5}, false],
    [{0: 1, length: null}, false],
    [{0: 1, length: undefined}, false],
    [{0: 1, length: NaN}, false],
    [{0: 1, length: '1'}, false],
    ['sast', false],
    [new Set(['s']), true],
    [{test: 's'}, false],
    [null, false],
    [undefined, false],
    [NaN, false],
    [(a) => a, false]
  ])('when called on %p', (value, expected) => {
    it(`should return with ${expected}`, () => {
      expect(isArrayLike(value)).toEqual(expected)
    })
  })
})
