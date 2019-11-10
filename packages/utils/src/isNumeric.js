import typeOf from './typeOf.js'

export default function isNumeric(value) {
  return typeOf(value) === 'number' || typeOf(value) === 'bigint'
}
