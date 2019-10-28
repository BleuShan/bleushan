import {isString} from './isString.js'
import {hasValidArrayLength} from './hasValidArrayLength.js'
import {isArray} from './isArray.js'

export function isArrayLike(value) {
  return (
    value != null &&
    !isString(value) &&
    (isArray(value) || typeof value[Symbol.iterator] === 'function' || hasValidArrayLength(value))
  )
}
