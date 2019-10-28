import {isArray} from './isArray.js'
const {isNaN} = Number

export function typeOf(value) {
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
