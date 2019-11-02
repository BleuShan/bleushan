import {typeOf} from './typeOf.js'
import {typeTag} from './typeTag.js'

const getPrototypeOf = Reflect?.getPrototypeOf || Object.getPrototypeOf

function getRootProtoypeOf(value) {
  const proto = getPrototypeOf(value)
  return proto != null ? getRootProtoypeOf(proto) : value
}

export function isPlainObject(value) {
  return (
    !!value &&
    typeOf(value) === 'object' &&
    typeTag(value) === 'Object' &&
    (getPrototypeOf(value) == null || getRootProtoypeOf(value) === getPrototypeOf(value))
  )
}
