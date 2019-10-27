import {Stream} from '../Stream.js'

export function from(source) {
  return new Stream(source)
}
