describe('isPlainObject', () => {
  afterEach(() => {
    jest.resetModules()
  })

  describe('when Reflect is missing', () => {
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

  describe('when Reflect is missing required method', () => {
    let Reflect$getPrototypeOf
    beforeEach(() => {
      Reflect$getPrototypeOf = Reflect.getPrototypeOf
      Reflect.getPrototypeOf = undefined
    })

    afterEach(() => {
      Reflect.getPrototypeOf = Reflect$getPrototypeOf
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

  describe('when Reflect is present', () => {
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
