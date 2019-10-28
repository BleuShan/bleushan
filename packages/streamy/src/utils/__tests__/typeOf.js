import {typeOf} from '../typeOf.js'

describe('typeOf', () => {
  it.each([[/s/, 'object'], [[], 'array'], [NaN, 'NaN']])(
    'when called with %p should return %p',
    (value, expected) => {
      expect(typeOf(value)).toEqual(expected)
    }
  )
})
