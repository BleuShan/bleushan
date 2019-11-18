export const isPlainObject = (object) =>
  !!object &&
  typeof object === 'object' &&
  Object.prototype.toString.call(object) === '[object Object]'

export function omitNils(obj) {
  if (isPlainObject(obj)) {
    const result = {}
    for (const [key, value] of Object.entries(obj)) {
      if (value == null) continue
      result[key] = omitNils(value)
    }
    return result
  }

  return obj
}
