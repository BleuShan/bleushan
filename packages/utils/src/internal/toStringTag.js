/* eslint-disable no-useless-call */
import hasOwnProperty from '../hasOwnProperty.js'

const _toStringTag = Object.prototype.toString
const nullResult = _toStringTag.call(null)
const undefinedResult = _toStringTag.call(undefined)

export default function toStringTag(obj) {
  if (obj == null) {
    return obj === undefined ? undefinedResult : nullResult
  }

  if (Number.isNaN(obj)) {
    return '[object NaN]'
  }

  const hasOwn = hasOwnProperty(obj, Symbol.toStringTag)
  const tag = obj[Symbol.toStringTag]
  let unmasked = false
  try {
    obj[Symbol.toStringTag] = undefined
    unmasked = true
  } catch (e) {
    // noop
  }
  const result = _toStringTag.call(obj)
  if (unmasked) {
    if (hasOwn) {
      obj[Symbol.toStringTag] = tag
    } else {
      delete obj[Symbol.toStringTag]
    }
  }

  return result
}
