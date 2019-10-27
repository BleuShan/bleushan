import {typeOf} from './typeOf.js'
import {typeTag} from './typeTag.js'

export function isString(target) {
  return typeOf(target) === 'string' || typeTag(target) === 'String'
}
