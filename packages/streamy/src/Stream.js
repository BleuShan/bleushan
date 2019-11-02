import {invariant} from './utils/invariant.js'
import {isArrayLike} from './utils/isArrayLike.js'
import {isString} from './utils/isString.js'
/* eslint-disable no-unused-vars */
import {typeOf} from './utils/typeOf.js'
import {IndexIterator} from './iterators/IndexIterator.js'
/* eslint-enable no-unused-vars */

export class Stream {
  #currentMemoizeResultId = -1
  #hasCompleted = false
  #isAsync
  #memoizedResults = new Map()
  #source
  #sourceIterator

  // eslint-disable-next-line no-undef
  get #iterator() {
    if (this.#sourceIterator == null) {
      if (this.#hasCompleted) {
        this.#sourceIterator = this.#memoizedResults.values()
      } else if (this.isAsync) {
        this.#sourceIterator = this.#source[Symbol.asyncIterator]()
      } else if (typeOf(this.#source[Symbol.iterator]) === 'function') {
        this.#sourceIterator = this.#source[Symbol.iterator]()
      } else {
        this.#sourceIterator = new IndexIterator(this.#source)
      }
    }

    return this.#sourceIterator
  }

  get isAsync() {
    return this.#isAsync
  }

  get hasCompleted() {
    return this.#hasCompleted
  }

  constructor(source) {
    invariant({
      condition: isArrayLike(source) || isString(source),
      message: 'source must be a string, an ArrayLike object or an iterable',
      errorType: TypeError
    })

    this.#source = source
    this.#isAsync = typeOf(this.#source[Symbol.asyncIterator]) === 'function'
  }

  [Symbol.asyncIterator]() {
    return this
  }

  [Symbol.iterator]() {
    invariant({
      condition: !this.isAsync || this.#hasCompleted,
      message: 'Cannot iterate synchronously over an uncompleted asynchronous stream',
      errorType: TypeError
    })

    return this
  }

  next(...input) {
    let promiseOrResult
    if (input.length) {
      promiseOrResult = this.#memoizedResultFor(...input)
    }

    if (promiseOrResult == null) {
      promiseOrResult = this.#iterator.next(...input)

      if (!this.#hasCompleted) {
        if (typeOf(promiseOrResult.then) === 'function') {
          return promiseOrResult.then((result) => this.#memoize(result, ...input))
        } else {
          return this.#memoize(promiseOrResult, ...input)
        }
      }
    }

    return promiseOrResult
  }

  // eslint-disable-next-line no-undef
  #memoize({value, done}, ...input) {
    this.#hasCompleted = done && value === undefined

    if (!this.#hasCompleted) {
      this.#memoizedResults.set(this.#memoizedResultKeyFrom(...input), value)
    } else {
      this.#sourceIterator = null
    }

    return {
      value,
      done: this.#hasCompleted
    }
  }

  // eslint-disable-next-line no-undef
  #memoizedResultFor(...input) {
    const key = this.#memoizedResultKeyFor(input)
    if (this.#memoizedResults.has(key)) {
      const value = this.#memoizedResults.get(key)

      return {
        value,
        done: false
      }
    }
  }

  // eslint-disable-next-line no-undef
  #memoizedResultKeyFor(input) {
    return JSON.stringify(input, (key, value) => (value === undefined ? 'undefined' : value))
  }

  // eslint-disable-next-line no-undef
  #memoizedResultKeyFrom(...input) {
    return input.length ? this.#memoizedResultKeyFor(input) : ++this.#currentMemoizeResultId
  }
}
