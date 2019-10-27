import {isNumber} from './isNumber.js'

export function hasValidArrayLength(value) {
  const {length} = value
  return isNumber(length) && Number.isSafeInteger(length) && length >= 0
}
