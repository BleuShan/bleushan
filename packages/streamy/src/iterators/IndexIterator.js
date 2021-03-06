import {invariant, isValidArrayLike} from '@bleushan/utils'

export default class IndexIterator {
  #index = 0
  #source
  #onComplete

  constructor(source, onComplete) {
    invariant({
      condition: isValidArrayLike(source),
      message: 'expected source to be a valid ArrayLike object',
      errorType: TypeError
    })
    this.#source = source
    this.#onComplete = onComplete
  }

  [Symbol.iterator]() {
    return this
  }

  next() {
    const result = {
      done: this.#index > this.#source.length - 1
    }

    if (result.done && this.#onComplete != null) {
      this.#onComplete()
    }

    if (!result.done) {
      result.value = this.#source[this.#index]
      this.#index += 1
    }

    return result
  }
}
