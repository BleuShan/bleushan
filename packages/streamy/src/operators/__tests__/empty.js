import {toArray, toArrayAsync} from '../__fixtures__/common.js'
import {empty} from '../empty.js'
import {Stream} from '../../Stream.js'

describe('the result of the "empty" operator', () => {
  let stream

  beforeEach(() => {
    stream = empty()
  })

  it('should be an instance Stream', () => {
    expect(stream).toBeInstanceOf(Stream)
  })

  describe.each`
    mode                 | traversal
    ${'a synchronous'}   | ${toArray}
    ${'an asynchronous'} | ${toArrayAsync}
  `('when using $mode traversal', ({traversal}) => {
    it('should yield no values', async () => {
      let result = traversal(stream)
      if (result.then) {
        result = await result
      }

      expect(result).toBeEmpty()
    })
  })
})
