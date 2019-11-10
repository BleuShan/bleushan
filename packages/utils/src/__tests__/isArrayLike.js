import isArrayLike from '../isArrayLike.js'

describe('isArrayLike', () => {
  it.each([
    [[1, 2, 3], true],
    [new Uint8Array(10), true],
    [new Uint8ClampedArray(10), true],
    [new Uint16Array(10), true],
    [new Uint32Array(10), true],
    [new BigInt64Array(10), true],
    [new BigUint64Array(10), true],
    [{0: 1, length: 1}, true],
    [{0: 1, length: BigInt(1)}, true],
    [{[BigInt(0)]: 1, [BigInt(1)]: 1, length: BigInt(2)}, true],
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
  ])('when called on %p should return %p', (value, expected) => {
    expect(isArrayLike(value)).toEqual(expected)
  })
})
