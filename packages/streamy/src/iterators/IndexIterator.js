import {invariant} from '../utils/invariant.js'
import {isValidArrayLike} from '../utils/isValidArrayLike.js'

export class IndexIterator {
  #index = 0
  #source

  constructor(source) {
    invariant({
      condition: isValidArrayLike(source),
      message: 'expected source have a valid ArrayLike object',
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
