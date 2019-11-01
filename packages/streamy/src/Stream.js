import {invariant} from './utils/invariant.js'
import {isArrayLike} from './utils/isArrayLike.js'
import {isString} from './utils/isString.js'
/* eslint-disable no-unused-vars */
import {typeOf} from './utils/typeOf.js'
import {IndexIterator} from './iterators/IndexIterator.js'
/* eslint-enable no-unused-vars */

export class Stream {
  #completed = false
  #isAsync
  #memoizedResults = []
  #processResult = ({value, done}) => {
    this.#completed = done && value == null

    if (!this.#completed) {
      this.#memoizedResults.push(value)
    } else {
      this.#sourceIterator = null
    }

    return {
      value,
      done: this.#completed
    }
  }

  #source
  #sourceIterator

  // eslint-disable-next-line no-undef
  get #iterator() {
    if (this.#sourceIterator == null) {
      if (this.#completed) {
        this.#sourceIterator = new IndexIterator(this.#memoizedResults)
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
      condition: !this.isAsync || this.#completed,
      message: 'Cannot iterate synchronously over an uncompleted asynchronous stream',
      errorType: TypeError
    })

    return this
  }

  next(input) {
    const promiseOrResult = this.#iterator.next(input)
    if (!this.#completed) {
      if (typeOf(promiseOrResult.then) === 'function') {
        return promiseOrResult.then(this.#processResult)
      } else {
        return this.#processResult(promiseOrResult)
      }
    }

    return promiseOrResult
  }
}
