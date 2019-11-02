import {typeOf} from './typeOf.js'

export function isNumeric(value) {
  return typeOf(value) === 'number' || typeOf(value) === 'bigint'
}
