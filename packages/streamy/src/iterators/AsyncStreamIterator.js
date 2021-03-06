import {isFunction, invariant} from '@bleushan/utils'

export default class AsyncStreamIterator {
  #source
  #onComplete
  constructor(source, onComplete) {
    this.#onComplete = onComplete
    invariant({
      message: 'expected source to be a promise or an async iterable',
      condition: isFunction(source.then) || isFunction(source[Symbol.asyncIterator]),
      errorType: TypeError
    })

    if (isFunction(source.then)) {
      this.#source = source
    } else {
      this.#source = source[Symbol.asyncIterator]()
    }
  }

  async next(...args) {
    if (isFunction(this.#source.then)) {
      const value = await this.#source
      this.#onComplete()
      return {
        value,
        done: false
      }
    }

    const result = await this.#source.next(...args)
    if (result.done && result.value == null && this.#onComplete) {
      this.#onComplete()
    }

    return result
  }
}
