import {isString} from './isString.js'
import {hasValidArrayLength} from './internal/hasValidArrayLength.js'
import {isArray} from './isArray.js'
import {isFunction} from './isFunction.js'

export function isArrayLike(value) {
  return (
    value != null &&
    !isString(value) &&
    !isFunction(value) &&
    (isArray(value) ||
      isFunction(value[Symbol.iterator]) ||
      isFunction(value[Symbol.asyncIterator]) ||
      hasValidArrayLength(value))
  )
}
