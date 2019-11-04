import {EchoIterable, AsyncIterable} from '../__fixtures__/memo.js'
import {memo} from '../memo.js'

describe.skip('memo', () => {
  let stream
  let source

  beforeEach(() => {
    stream = memo(source)
    jest.spyOn(source, 'next')
  })

  describe('when called on async iterable', () => {
    beforeAll(() => {
      source = new AsyncIterable()
    })

    beforeEach(() => {
      jest.restoreAllMocks()
      source.reset()
    })

    async function iterateAsync() {
      const result = []
      for await (const value of stream) {
        result.push(value)
      }
      return result
    }

    function iterateSync(result) {
      return function iterate() {
        for (const value of stream) {
          result.push(value)
        }
        return result
      }
    }

    it('should not allow synchronous calls if has not completed yet', () => {
      const result = []
      expect(iterateSync(result)).toThrowErrorMatchingSnapshot()
    })

    it('should allow synchronous calls if has completed', async () => {
      const expected = await iterateAsync()
      const result = []

      jest.spyOn(source, 'next')
      expect(stream.completed).toEqual(true)

      expect(iterateSync(result)).not.toThrow()
      expect(source.next).not.toHaveBeenCalled()
      expect(result).toEqual(expected)
    })

    it('should allow asynchronous calls if has completed', async () => {
      const expected = await iterateAsync()

      jest.spyOn(source, 'next')
      expect(stream.completed).toEqual(true)
      const result = await iterateAsync()

      expect(source.next).not.toHaveBeenCalled()
      expect(result).toEqual(expected)
    })
  })

  describe('when called on an iterable that takes an input', () => {
    beforeAll(() => {
      source = new EchoIterable()
    })

    afterEach(() => {
      jest.restoreAllMocks()
    })

    function send(values) {
      const result = []
      for (const value of values) {
        result.push(stream.next(value))
      }

      return result
    }

    describe('when it has memoized the result', () => {
      describe.each([
        [[1, 2, 3]],
        [[{result: 's'}, {test: 2}, undefined]],
        [['string', 'stri', 'hello']],
        [[null, undefined, 0]]
      ])('when it was sent the following: %p', (values) => {
        let expected
        beforeEach(() => {
          expected = send(values)
        })

        it('should not call into the source', () => {
          const result = send(values)
          expect(result).toEqual(expected)
          expect(source.next).toHaveBeenCalledTimes(values.length)
        })
      })
    })
  })
})
