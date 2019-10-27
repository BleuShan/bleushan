import {toStringTag} from './internal/toStringTag.js'

const extractor = /\[object (\w+)\]/

export function typeTag(target) {
  return toStringTag(target).replace(extractor, '$1')
}
