import {empty} from '../empty.js'
import {Stream} from '../../Stream.js'

describe('empty', () => {
  let stream
  beforeEach(() => {
    stream = empty()
  })
  it('should return a stream', () => {
    expect(stream).toBeInstanceOf(Stream)
  })

  it('should yield no values when traversed synchronously', () => {
    const result = []
    for (const value of stream) {
      result.push(value)
    }

    expect(result).toBeEmpty()
  })

  it('should yield no values when traversed asynchronously', async () => {
    const result = []
    for await (const value of stream) {
      result.push(value)
    }

    expect(result).toBeEmpty()
  })
})
