import of from './of.js'

export function memo(source) {
  const stream = of(source)

  return stream
}
