import {isFunction} from '../utils/isFunction.js'
import {invariant} from '../utils/invariant.js'

export class StreamIterator {
  #source
  #onComplete
  constructor(source, onComplete) {
    invariant({
      condition: isFunction(source[Symbol.iterator]),
      message: 'expected source to be iterable',
      errorType: TypeError
    })

    this.#source = source[Symbol.iterator]()
    this.#onComplete = onComplete
  }

  next(...args) {
    const result = this.#source.next(...args)
    if (result.done && result.value == null && this.#onComplete) {
      this.#onComplete()
    }

    return result
  }
}
