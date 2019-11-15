describe('isArray', () => {
  describe('when the builtin is unavailable', () => {
    beforeAll(() => {
      jest.resetModules().mock('@babel/runtime-corejs3/core-js/array/is-array', () => undefined)
    })

    afterAll(() => {
      jest.resetModules().unmock('@babel/runtime-corejs3/core-js/array/is-array')
    })

    it.each`
      value
      ${[]}
      ${true}
      ${null}
      ${undefined}
      ${{length: 0}}
    `('should return $expected when called with $value', async ({value}) => {
      const {default: isArray} = await import('../isArray.js')
      expect(isArray(value)).toEqual(Array.isArray(value))
    })

    it('should not have use the original value it', async () => {
      const {default: isArray} = await import('../isArray.js')
      expect(Object.is(isArray, Array.isArray)).toBeFalse()
    })
  })

  describe('when the builtin is available', () => {
    it('should use it', async () => {
      const {default: isArray} = await import('../isArray.js')
      expect(Object.is(isArray, Array.isArray)).toBeTrue()
    })
  })
})
