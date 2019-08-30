import getType from './getType'
import getTag from './getTag'

export default function isString(value) {
  return value != null && (getType(value) === 'string' || getTag(value) === '[object String]')
}
