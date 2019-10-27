export function typeOf(value) {
  if (Array.isArray(value)) return 'array'
  if (value instanceof RegExp) return 'object'
  if (value === null) return 'null'
  if (Number.isNaN(value)) return 'NaN'
  return typeof value
}
