import invariant from '../invariant'

describe('invariant', () => {
  it('should throw when the condition is truthy', () => {
    expect(() => invariant(true, 'thrown')).toThrowError('thrown')
  })

  it('should not throw when the condition is falsy', () => {
    expect(() => invariant(false, 'thrown')).not.toThrowError('thrown')
  })
})