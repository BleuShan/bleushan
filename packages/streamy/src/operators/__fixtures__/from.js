export function* generator() {
  yield 1
  yield 2
  yield 3
}

export async function* asyncGenerator() {
  for (let i = 1; i < 10; i++) {
    const result = await new Promise((resolve) => {
      resolve(i * 2)
    })
    yield result
  }
}

export class AsyncIterable {
  #count
  constructor() {
    this.#count = 0
  }

  [Symbol.asyncIterator]() {
    return this
  }

  async next() {
    const result = {
      done: this.#count >= 10
    }

    if (!result.done) {
      result.value = ++this.#count
    }

    return result
  }

  reset() {
    this.#count = 0
  }
}

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
