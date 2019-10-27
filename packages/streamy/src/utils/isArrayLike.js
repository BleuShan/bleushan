import {isString} from './isString.js'
import {hasValidArrayLength} from './hasValidArrayLength.js'

export function isArrayLike(value) {
  return (
    value != null &&
    !isString(value) &&
    (Array.isArray(value) ||
      typeof value[Symbol.iterator] === 'function' ||
      hasValidArrayLength(value))
  )
}
