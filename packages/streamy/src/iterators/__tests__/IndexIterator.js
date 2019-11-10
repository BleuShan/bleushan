import IndexIterator from '../IndexIterator.js'

describe('IndexIterator', () => {
  describe.each`
    name                          | source
    ${'a valid array'}            | ${[1, 2, 3]}
    ${'a valid arrayLike object'} | ${{0: 0, 1: 1, 2: 2, length: 3}}
    ${'a string'}                 | ${'test'}
  `('when called on $name', ({source}) => {
    const construct = () => new IndexIterator(source)

    it('should return an IndexIterator', () => {
      const result = construct()
      expect(result).toBeInstanceOf(IndexIterator)
    })

    it('should yield the same values as the source', () => {
      expect(Array.from(construct())).toEqual(Array.from(source))
    })
  })

  describe.each`
    name                          | source
    ${'a valid array'}            | ${[1, 2, 3]}
    ${'a valid arrayLike object'} | ${{0: 0, 1: 1, 2: 2, length: 3}}
    ${'a string'}                 | ${'test'}
  `('when called on $name with a completion callback', ({source}) => {
    const callback = jest.fn()
    const iterator = new IndexIterator(source, callback)

    it('should not have called the callback', () => {
      expect(callback).not.toHaveBeenCalled()
    })

    it('should not have called the callback while traversing', () => {
      // eslint-disable-next-line no-unused-vars
      for (const _ of iterator) {
        expect(callback).not.toHaveBeenCalled()
      }
    })

    it('should have call the callback', () => {
      expect(callback).toHaveBeenCalledTimes(1)
    })
  })

  describe.each`
    name                             | source
    ${'an invalid arrayLike object'} | ${{0: 0, 1: 1, 2: 2, length: 3.5}}
    ${'a number'}                    | ${1}
    ${'a NaN'}                       | ${NaN}
    ${'a undefined'}                 | ${undefined}
    ${'a null'}                      | ${null}
    ${'an object'}                   | ${{value: null}}
  `('when called on $name', ({source}) => {
    const construct = () => new IndexIterator(source)
    it('should throw the appropriate error', () => {
      expect(construct).toThrowErrorMatchingSnapshot()
    })
  })
})
