import {isArrayLike} from '../isArrayLike.js'

describe('isArrayLike', () => {
  it.each([
    [[1, 2, 3], true],
    [{0: 1, length: 1}, true],
    [{0: 1, length: -1}, false],
    [{0: 1, length: 1.5}, false],
    ['sast', false],
    [new Set(['s']), true],
    [{test: 's'}, false],
    [null, false],
    [undefined, false],
    [NaN, false]
  ])('when called on %p should return %p', (value, expected) => {
    expect(isArrayLike(value)).toEqual(expected)
  })
})
