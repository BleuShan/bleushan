import isObjectLike from '../isObjectLike.js'

describe('isObjectLike', () => {
  describe.each`
    value                          | expected
    ${{}}                          | ${true}
    ${Object.create(null)}         | ${true}
    ${[]}                          | ${true}
    ${new (class DummyClass {})()} | ${true}
    ${null}                        | ${false}
    ${() => {}}                    | ${false}
    ${'string'}                    | ${false}
  `('when called on $value', ({value, expected}) => {
    it(`should return with ${expected}`, () => {
      expect(isObjectLike(value)).toEqual(expected)
    })
  })
})
