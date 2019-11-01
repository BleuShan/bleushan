import {invariant} from '../utils/invariant.js'
import {hasValidArrayLength} from '../utils/hasValidArrayLength.js'

export class IndexIterator {
  #index = 0
  #source

  constructor(source) {
    invariant({
      condition: hasValidArrayLength(source),
      message: 'expected source to have valid length property',
      errorType: TypeError
    })
    this.#source = source
  }

  [Symbol.iterator]() {
    return this
  }

  next() {
    const result = {
      done: this.#index > this.#source.length - 1
    }
    if (!result.done) {
      result.value = this.#source[this.#index]
      this.#index += 1
    }

    return result
  }
}
