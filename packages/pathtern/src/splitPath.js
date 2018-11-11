import isString from './utils/isString.js'
import {
  SINGLE_PATH_COMPONENT_REGEXP,
  PATH_COMPONENT_MATCH_REGEXP
} from './constants.js'

export default function splitPath(path) {
  return !!path && isString(path)
    ? SINGLE_PATH_COMPONENT_REGEXP.test(path)
      ? [path]
      : (path.startsWith('/') ? ['/'] : []).concat(
          path.match(PATH_COMPONENT_MATCH_REGEXP)
        )
    : []
}
