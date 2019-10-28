import {invariant} from '../utils/invariant.js'
import {hasValidArrayLength} from '../utils/hasValidArrayLength.js'

export class IndexIterator {
  #index = -1
  #source

  constructor(source) {
    invariant({
      condition: hasValidArrayLength(source),
      message: 'expected source to have valid length property',
      errorType: TypeError
    })
    this.#source = source
  }

  get done() {
    return this.#index > this.#source.length - 1
  }

  get value() {
    return this.#source[this.#index]
  }

  [Symbol.iterator]() {
    return this
  }

  next() {
    if (!this.done) {
      this.#index += 1
    }

    return this
  }
}
