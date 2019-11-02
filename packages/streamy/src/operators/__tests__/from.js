import {from} from '../from.js'
import {Stream} from '../../Stream.js'
import {asyncGenerator, AsyncIterable, generator, EchoIterable} from '../__fixtures__/from.js'
import {typeTag} from '../../utils/typeTag.js'

describe('from operator', () => {
  describe.each([
    [[1, 2, 3], true],
    [{0: 1, length: 1}, true],
    ['sast', true],
    [new Set(['s']), true],
    [generator, true],
    [asyncGenerator, true],
    [new AsyncIterable(), true],
    [({test: 's'}, false)],
    [null, false],
    [undefined, false],
    [NaN, false]
  ])('when called on %p', (source, valid) => {
    let call
    let expectedResult

    beforeEach(async () => {
      const isGenerator =
        typeTag(source) === 'GeneratorFunction' || typeTag(source) === 'AsyncGeneratorFunction'
      if (valid) {
        const iter = isGenerator ? source() : source
        if (iter[Symbol.asyncIterator]) {
          expectedResult = []
          for await (const value of iter) {
            expectedResult.push(value)
          }
        } else {
          expectedResult = Array.from(iter)
        }
      }

      call = () => (isGenerator ? from(source()) : from(source))
    })

    if (valid) {
      it('should not throw', () => {
        expect(call).not.toThrow()
      })

      it('should return a Stream', () => {
        expect(call()).toBeInstanceOf(Stream)
      })

      it('should yield the same values as the source', async () => {
        const result = []
        const stream = call()
        if (stream.isAsync) {
          for await (const value of stream) {
            result.push(value)
          }
        } else {
          for (const value of stream) {
            result.push(value)
          }
        }

        expect(result).toEqual(expectedResult)
      })
    } else {
      it('should throw', () => {
        expect(call).toThrowErrorMatchingSnapshot()
      })
    }
  })

  describe('when called on async iterable', () => {
    let stream
    const source = new AsyncIterable()

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

    beforeEach(() => {
      stream = from(source)
    })

    afterEach(() => {
      jest.restoreAllMocks()
      source.reset()
    })

    it('should not allow synchronous calls if has not completed yet', () => {
      const result = []
      expect(iterateSync(result)).toThrowErrorMatchingSnapshot()
    })

    it('should allow synchronous calls if has completed', async () => {
      const expected = await iterateAsync()
      const result = []

      jest.spyOn(source, 'next')
      expect(stream.hasCompleted).toEqual(true)

      expect(iterateSync(result)).not.toThrow()
      expect(source.next).not.toHaveBeenCalled()
      expect(result).toEqual(expected)
    })

    it('should allow asynchronous calls if has completed', async () => {
      const expected = await iterateAsync()

      jest.spyOn(source, 'next')
      expect(stream.hasCompleted).toEqual(true)
      const result = await iterateAsync()

      expect(source.next).not.toHaveBeenCalled()
      expect(result).toEqual(expected)
    })
  })

  describe('when called on an iterable that takes an input', () => {
    let stream
    const source = new EchoIterable()

    function send(values) {
      const result = []
      for (const value of values) {
        result.push(stream.next(value))
      }

      return result
    }

    beforeEach(() => {
      stream = from(source)
      jest.spyOn(source, 'next')
    })

    afterEach(() => {
      jest.restoreAllMocks()
    })

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
