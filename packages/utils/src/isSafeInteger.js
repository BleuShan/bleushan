export default function isSafeInteger(value) {
  switch (typeof value) {
    case 'number':
      return Number.isSafeInteger(value)
    case 'bigint':
      return true
    default:
      return false
  }
}
