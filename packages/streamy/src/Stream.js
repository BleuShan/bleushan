import {invariant} from './utils/invariant.js'
import {isArrayLike} from './utils/isArrayLike.js'
import {isString} from './utils/isString.js'
// eslint-disable-next-line no-unused-vars
import {typeOf} from './utils/typeOf.js'
// eslint-disable-next-line no-unused-vars
import {IndexIterator} from './iterators/IndexIterator.js'

export class Stream {
  #result = {
    done: true
  }

  #source
  #inner

  get done() {
    return this.#result.done
  }

  get value() {
    return this.#result.value
  }

  // eslint-disable-next-line no-undef
  get #iterator() {
    if (this.#inner == null || this.done) {
      if (typeOf(this.#source[Symbol.iterator]) !== 'function') {
        this.#inner = new IndexIterator(this.#source)
      } else {
        this.#inner = this.#source[Symbol.iterator]()
      }
    }

    return this.#inner
  }

  constructor(source) {
    invariant({
      condition: isArrayLike(source) || isString(source),
      message: 'source must be a string or an ArrayLike object',
      errorType: TypeError
    })

    this.#source = source
  }

  [Symbol.iterator]() {
    return this
  }

  next(value) {
    this.#result = this.#iterator.next(value)
    return this
  }
}
