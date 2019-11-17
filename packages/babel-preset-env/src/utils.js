export const isPlainObject = (object) =>
  !!object &&
  typeof object === 'object' &&
  Object.prototype.toString.call(object) === '[object Object]'

export function assignNonNil(...values) {
  return values.reduce((result, current) => {
    if (isPlainObject(current)) {
      for (const [key, value] of Object.entries(current)) {
        if (value == null) continue
        result[key] = value
      }
    }

    return result
  }, {})
}
