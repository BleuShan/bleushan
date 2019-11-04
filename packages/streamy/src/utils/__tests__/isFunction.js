import {isFunction} from '../isFunction.js'

describe('isFunction', () => {
  it.each`
    value                                | expected
    ${(a) => a}                          | ${true}
    ${function noop() {}}                | ${true}
    ${async function asyncNoop() {}}     | ${true}
    ${function* genNoop() {}}            | ${true}
    ${async function* asyncGenNoop() {}} | ${true}
  `('should return $expected when called on $value', ({value, expected}) => {
    expect(isFunction(value)).toEqual(expected)
  })
})
