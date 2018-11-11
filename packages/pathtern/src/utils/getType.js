const { isArray } = Array
const { isNaN } = Number

export default function getType(value) {
  return isArray(value)
    ? 'array'
    : value instanceof RegExp
    ? 'object'
    : value === null
    ? 'null'
    : isNaN(value)
    ? 'NaN'
    : typeof value
}
