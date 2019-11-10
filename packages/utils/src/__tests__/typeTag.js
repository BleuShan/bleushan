import typeTag from '../typeTag.js'

const tagged = Object.create(null, {
  name: {
    value: 'tagged',
    enumerable: true
  },
  [Symbol.toStringTag]: {
    value: 'StringTagged'
  }
})

const inheritedTag = Object.create(tagged, {
  name: {
    value: 'inheritedTag',
    enumerable: true
  }
})

const writableTagged = Object.create(null, {
  name: {
    value: 'writableTagged',
    enumerable: true
  },
  [Symbol.toStringTag]: {
    value: 'StringTagged',
    writable: true
  }
})

const inheritedWritableTag = Object.create(writableTagged, {
  name: {
    value: 'inheritedWritableTag',
    enumerable: true
  }
})

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
