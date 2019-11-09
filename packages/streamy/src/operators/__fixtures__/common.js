export function toArray(iterable) {
  if (Array.isArray(iterable)) {
    return iterable
  }

  if (iterable.length != null) {
    return Array.from(iterable)
  }

  const result = []
  for (const value of iterable) {
    result.push(value)
  }
  return result
}

export async function toArrayAsync(iterable) {
  if (Array.isArray(iterable)) {
    return iterable
  }

  if (iterable.length != null) {
    return Array.from(iterable)
  }

  const result = []
  for await (const value of iterable) {
    result.push(value)
  }
  return result
}
