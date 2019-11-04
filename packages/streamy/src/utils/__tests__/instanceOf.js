import {instanceOf} from '../instanceOf.js'

describe('instanceOf', () => {
  class SomeClass {}
  class SomeDerivedClass extends SomeClass {}

  describe.each`
    value
    ${new SomeClass()}
    ${new SomeDerivedClass()}
    ${undefined}
  `('when checking $value', ({value}) => {
    describe.each`
      type
      ${SomeClass}
      ${SomeDerivedClass}
    `(`is instanceOf $type`, ({type}) => {
      const expected = value instanceof type
      describe('using the direct interface', () => {
        it('should be equivalent to the instanceof operator', () => {
          expect(instanceOf(type, value)).toEqual(expected)
        })
      })

      describe('using the curried interface', () => {
        const isInstanceOf = instanceOf(type)
        it('should be equivalent to the instanceof operator', () => {
          expect(isInstanceOf(value)).toEqual(expected)
        })
      })
    })
  })
})
