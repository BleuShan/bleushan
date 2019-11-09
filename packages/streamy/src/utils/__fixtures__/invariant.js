import {invariant} from '../invariant.js'

export function invariantWhenInvokedWith(configuration) {
  return function invoke() {
    invariant(configuration)
  }
}
