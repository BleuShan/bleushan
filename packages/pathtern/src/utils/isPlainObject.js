import getType from './getType'
import getTag from './getTag'

const getPrototypeOf = Reflect?.getPrototypeOf || Object.getPrototypeOf

function getRootProtoypeOf(value) {
  const proto = getPrototypeOf(value)
  return proto != null ? getRootProtoypeOf(proto) : value
}

export default function isPlainObject(value) {
  return (
    !!value &&
    getType(value) === 'object' &&
    getTag(value) === '[object Object]' &&
    (getPrototypeOf(value) == null || getRootProtoypeOf(value) === getPrototypeOf(value))
  )
}
