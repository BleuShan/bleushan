import isFunction from '../isFunction.js'

describe('isFunction', () => {
  describe.each`
    value                                | expected
    ${(a) => a}                          | ${true}
    ${function noop() {}}                | ${true}
    ${async function asyncNoop() {}}     | ${true}
    ${function* genNoop() {}}            | ${true}
    ${async function* asyncGenNoop() {}} | ${true}
    ${null}                              | ${false}
    ${undefined}                         | ${false}
    ${new (class Dummy {})()}            | ${false}
  `('when called on $value', ({value, expected}) => {
    it(`should return with ${expected}`, () => {
      expect(isFunction(value)).toEqual(expected)
    })
  })
})
