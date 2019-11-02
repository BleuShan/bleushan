import {isNumeric} from '../isNumeric.js'
import {typeOf} from '../typeOf.js'

export function hasValidArrayLength(value) {
  const length = value?.length
  if (length == null) return false
  return (
    isNumeric(length) &&
    (typeOf(length) === 'bigint' || Number.isSafeInteger(length)) &&
    length >= 0
  )
}
