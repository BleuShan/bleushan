import typeOf from './typeOf.js'
import isArray from './isArray.js'
import isString from './isString.js'
import hasValidArrayLength from './internal/hasValidArrayLength.js'

const isSafeInteger = Number.isSafeInteger

export default function isValidArrayLike(obj) {
  if (isArray(obj) || isString(obj)) return true

  if (hasValidArrayLength(obj)) {
    let isValid = true
    let count = 0
    const {length} = obj
    const keys = Reflect.ownKeys(obj)
    for (const key of keys) {
      if (!isValid) break
      const numericKey = Number(key)
      if (isSafeInteger(numericKey)) {
        isValid = numericKey < length && numericKey > -1
        count += 1
      }
    }

    if (isValid) {
      isValid = typeOf(length) === 'bigint' ? BigInt(count) === length : count === length
    }

    return isValid
  }

  return false
}
