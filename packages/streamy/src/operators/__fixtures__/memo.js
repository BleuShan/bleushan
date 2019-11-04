export class EchoIterable {
  [Symbol.iterator]() {
    return this
  }

  next(...value) {
    return !value.length
      ? {
          done: true
        }
      : {
          value,
          done: false
        }
  }
}

export {AsyncIterable} from './of.js'
