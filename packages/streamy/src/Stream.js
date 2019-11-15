import {invariant, instanceOf, isArrayLike, isString, isFunction} from '@bleushan/utils'
import IndexIterator from './iterators/IndexIterator.js'
import AsyncStreamIterator from './iterators/AsyncStreamIterator.js'
import StreamIterator from './iterators/StreamIterator.js'

const isAsyncStreamIterator = instanceOf(AsyncStreamIterator)

function iteratorFor(source, onComplete) {
  invariant({
    condition: isArrayLike(source) || isString(source) || isFunction(source?.then),
    message: 'source must be a string, an iterable, an ArrayLike or PromiseLike object',
    errorType: TypeError
  })

  if (isFunction(source.then) || isFunction(source[Symbol.asyncIterator])) {
    return new AsyncStreamIterator(source, onComplete)
  }

  if (isFunction(source[Symbol.iterator])) {
    return new StreamIterator(source, onComplete)
  }

  return new IndexIterator(source, onComplete)
}

export default class Stream {
  #completed
  #iterator

  #onComplete = () => {
    this.#completed = true
  }

  get completed() {
    return this.#completed
  }

  get isAsync() {
    return isAsyncStreamIterator(this.#iterator)
  }

  constructor(...sources) {
    let iterator
    switch (sources.length) {
      case 0: {
        this.#completed = true
        break
      }
      case 1: {
        const [source] = sources
        iterator = iteratorFor(source, this.#onComplete)
        break
      }
      default: {
        iterator = iteratorFor(sources, this.#onComplete)
        break
      }
    }

    this.#iterator = iterator
  }

  [Symbol.asyncIterator]() {
    return this
  }

  [Symbol.iterator]() {
    invariant({
      condition: !this.isAsync,
      message: 'Cannot traverse an asynchronous stream synchronously'
    })
    return this
  }

  next(...args) {
    if (this.completed) {
      return {
        done: true
      }
    }

    return this.#iterator.next(...args)
  }
}
