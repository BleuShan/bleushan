import isSafeInteger from '../isSafeInteger.js'

export default function hasValidArrayLength(value) {
  const length = value?.length
  if (length == null) return false
  return isSafeInteger(length) && length >= 0
}
