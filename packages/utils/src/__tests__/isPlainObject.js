describe('isPlainObject', () => {
  afterEach(() => {
    jest.resetModules()
  })

  describe('using Object', () => {
    let reflect
    beforeEach(() => {
      reflect = globalThis.Reflect
      globalThis.Reflect = undefined
    })

    afterEach(() => {
      globalThis.Reflect = reflect
    })

    describe.each`
      value                          | expected
      ${{}}                          | ${true}
      ${Object.create(null)}         | ${true}
      ${[]}                          | ${false}
      ${new (class DummyClass {})()} | ${false}
      ${null}                        | ${false}
      ${() => {}}                    | ${false}
      ${'string'}                    | ${false}
    `('when called on $value', ({value, expected}) => {
      it(`should return with ${expected}`, async () => {
        const {default: isPlainObject} = await import('../isPlainObject.js')
        expect(isPlainObject(value)).toEqual(expected)
      })
    })
  })

  describe('using reflect', () => {
    describe.each`
      value                          | expected
      ${{}}                          | ${true}
      ${Object.create(null)}         | ${true}
      ${[]}                          | ${false}
      ${new (class DummyClass {})()} | ${false}
      ${null}                        | ${false}
      ${() => {}}                    | ${false}
      ${'string'}                    | ${false}
    `('when called on $value', ({value, expected}) => {
      it(`should return with ${expected}`, async () => {
        const {default: isPlainObject} = await import('../isPlainObject.js')
        expect(isPlainObject(value)).toEqual(expected)
      })
    })
  })
})
