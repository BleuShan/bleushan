import {
  plainObject,
  createdPlainObject,
  emptyArray,
  arrowFunction,
  neString,
  DummyClass
} from '../../__fixtures__/constants.js'

describe('isPlainObject', () => {
  beforeEach(() => {
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
      value                 | expected
      ${plainObject}        | ${true}
      ${createdPlainObject} | ${true}
      ${emptyArray}         | ${false}
      ${new DummyClass()}   | ${false}
      ${null}               | ${false}
      ${undefined}          | ${false}
      ${arrowFunction}      | ${false}
      ${neString}           | ${false}
    `('when called $value', ({value, expected}) => {
      it(`should return with ${expected}`, async () => {
        const isPlainObject = await import('../isPlainObject').then((mod) => mod.default)
        expect(isPlainObject(value)).toEqual(expected)
      })
    })
  })

  describe('using reflect', () => {
    describe.each`
      value                 | expected
      ${plainObject}        | ${true}
      ${createdPlainObject} | ${true}
      ${emptyArray}         | ${false}
      ${new DummyClass()}   | ${false}
      ${null}               | ${false}
      ${undefined}          | ${false}
      ${arrowFunction}      | ${false}
      ${neString}           | ${false}
    `('when called $value', ({value, expected}) => {
      it(`should return with ${expected}`, async () => {
        const isPlainObject = await import('../isPlainObject').then((mod) => mod.default)
        expect(isPlainObject(value)).toEqual(expected)
      })
    })
  })
})
