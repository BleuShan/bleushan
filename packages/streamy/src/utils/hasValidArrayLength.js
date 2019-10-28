import {isNumber} from './isNumber.js'

export function hasValidArrayLength(value) {
  if (value == null) return false
  const {length} = value
  return isNumber(length) && Number.isSafeInteger(length) && length >= 0
}
