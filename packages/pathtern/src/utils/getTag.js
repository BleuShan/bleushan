const objectProtoToString = Object.prototype.toString
const {isNaN} = Number
export default function getTag(value) {
  return value == null
    ? value === undefined
      ? '[object Undefined]'
      : '[object Null]'
    : isNaN(value)
    ? '[object NaN]'
    : objectProtoToString.call(value)
}
