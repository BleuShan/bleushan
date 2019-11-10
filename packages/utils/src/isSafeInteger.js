import typeOf from './typeOf.js'

export default function isSafeInteger(value) {
  switch (typeOf(value)) {
    case 'number':
      return Number.isSafeInteger(value)
    case 'bigint':
      return true
    default:
      return false
  }
}
