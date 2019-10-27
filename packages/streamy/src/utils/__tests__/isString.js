import {isString} from '../isString.js'

describe('isString', () => {
  it.each([
    [[1, 2, 3], false],
    [{0: 1, length: 1}, false],
    ['sast', true],
    [new Set(['s']), false],
    [{test: 's'}, false],
    [null, false],
    [undefined, false],
    [NaN, false],
    [1, false]
  ])('when called on %p should return %p', (value, expected) => {
    expect(isString(value)).toEqual(expected)
  })
})
