export const tagged = Object.create(null, {
  name: {
    value: 'tagged',
    enumerable: true
  },
  [Symbol.toStringTag]: {
    value: 'StringTagged'
  }
})

export const inheritedTag = Object.create(tagged, {
  name: {
    value: 'inheritedTag',
    enumerable: true
  }
})

export const writableTagged = Object.create(null, {
  name: {
    value: 'writableTagged',
    enumerable: true
  },
  [Symbol.toStringTag]: {
    value: 'StringTagged',
    writable: true
  }
})

export const inheritedWritableTag = Object.create(writableTagged, {
  name: {
    value: 'inheritedWritableTag',
    enumerable: true
  }
})
