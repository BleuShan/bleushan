import {isValidArrayLike} from '../isValidArrayLike.js'

describe('isValidArrayLike', () => {
  it.each`
    value                                       | expected
    ${[]}                                       | ${true}
    ${[1]}                                      | ${true}
    ${new Uint32Array()}                        | ${true}
    ${new BigInt64Array()}                      | ${true}
    ${new BigUint64Array()}                     | ${true}
    ${{length: 0}}                              | ${true}
    ${{0: 1, length: 1}}                        | ${true}
    ${{[BigInt(0)]: 1, length: BigInt(1)}}      | ${true}
    ${new Set([1])}                             | ${false}
    ${{0: 1, length: 0}}                        | ${false}
    ${{0: 1, length: 2}}                        | ${false}
    ${{0: 1, someMethod: () => {}, length: 2}}  | ${false}
    ${{0: 1, length: Number.POSITIVE_INFINITY}} | ${false}
    ${{[-1]: 1, length: 0}}                     | ${false}
    ${{0: 1, length: -1}}                       | ${false}
    ${{[-1]: 1, length: 1}}                     | ${false}
    ${{test: 3, length: 1}}                     | ${false}
    ${null}                                     | ${false}
    ${undefined}                                | ${false}
  `('when called on $value it should return $expected', ({value, expected}) => {
    expect(isValidArrayLike(value)).toEqual(expected)
  })
})
