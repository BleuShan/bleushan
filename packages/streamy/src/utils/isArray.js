import {typeTag} from './typeTag.js'
import {hasValidArrayLength} from './hasValidArrayLength.js'

export const isArray =
  Array.isArray ||
  function isArray(value) {
    return hasValidArrayLength(value) && typeTag(value) === 'Array'
  }
