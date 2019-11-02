import {isString} from './isString.js'
import {hasValidArrayLength} from './internal/hasValidArrayLength.js'
import {isArray} from './isArray.js'
import {typeOf} from './typeOf.js'

export function isArrayLike(value) {
  return (
    value != null &&
    !isString(value) &&
    (isArray(value) ||
      typeOf(value[Symbol.iterator]) === 'function' ||
      typeOf(value[Symbol.asyncIterator]) === 'function' ||
      hasValidArrayLength(value))
  )
}
