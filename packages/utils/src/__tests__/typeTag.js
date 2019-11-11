import {
  tagged,
  writableTagged,
  inheritedTag,
  inheritedWritableTag
} from '../__fixtures__/typeTag.js'

import typeTag from '../typeTag.js'

describe.each([
  [null, 'Null'],
  [undefined, 'Undefined'],
  [NaN, 'NaN'],
  ['string', 'String'],
  [{}, 'Object'],
  [1, 'Number'],
  [function fn() {}, 'Function'],
  [() => {}, 'Function'],
  [/s/, 'RegExp'],
  // eslint-disable-next-line symbol-description
  [Symbol(), 'Symbol'],
  [Symbol('Test'), 'Symbol'],
  [tagged, 'StringTagged'],
  [inheritedTag, 'StringTagged'],
  [Symbol('Test'), 'Symbol'],
  [writableTagged, 'Object'],
  [inheritedWritableTag, 'Object']
])('typeTag when called with %p', (value, expected) => {
  it(`should return ${expected}`, () => {
    expect(typeTag(value)).toEqual(expected)
  })
})
