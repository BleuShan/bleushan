import {typeOf} from './typeOf.js'

export function isNumber(value) {
  return typeOf(value) === 'number' || typeOf(value) === 'bigint'
}
