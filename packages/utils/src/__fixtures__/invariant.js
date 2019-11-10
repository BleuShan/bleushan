import invariant from '../invariant.js'

export default function invariantWhenInvokedWith(configuration) {
  return function invoke() {
    invariant(configuration)
  }
}
