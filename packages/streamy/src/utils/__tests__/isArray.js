describe('isArray', () => {
  beforeEach(() => {
    jest.resetModules()
  })

  describe('when the builtin is unavailable', () => {
    let original
    beforeEach(() => {
      original = Array.isArray
      Array.isArray = undefined
    })

    afterEach(() => {
      Array.isArray = original
    })

    it.each`
      value          | expected
      ${true}        | ${false}
      ${[]}          | ${true}
      ${{length: 0}} | ${false}
    `('should return $expected when called with $value', async ({value, expected}) => {
      const {isArray} = await import('../isArray.js')
      expect(isArray(value)).toEqual(expected)
    })

    it('should not have use the original value it', async () => {
      const {isArray} = await import('../isArray.js')
      expect(Object.is(isArray, original)).toBeFalse()
    })
  })

  describe('when the builtin is available', () => {
    it('should use it', async () => {
      const {isArray} = await import('../isArray.js')
      expect(Object.is(isArray, Array.isArray)).toBeTrue()
    })
  })
})
