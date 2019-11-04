import {asyncGenerator, AsyncIterable, generator} from '../__fixtures__/of.js'
import {of} from '../of.js'
import {Stream} from '../../Stream.js'
import {typeTag} from '../../utils/typeTag.js'

describe('of', () => {
  describe.each([
    [[1, 2, 3], true],
    [{0: 1, length: 1}, true],
    ['sast', true],
    [new Set(['s']), true],
    [generator, true],
    [asyncGenerator, true],
    [new AsyncIterable(), true],
    [of([1, 2, 3]), true],
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

      call = () => (isGenerator ? of(source()) : of(source))
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

      if (source instanceof Stream) {
        it('should be a return the source directly when it is a Stream', () => {
          const source = of(1, 2, 3)
          const derived = of(source)
          expect(derived).toBe(source)
        })
      }
    } else {
      it('should throw', () => {
        expect(call).toThrowErrorMatchingSnapshot()
      })
    }
  })

  // eslint-disable-next-line jest/no-disabled-tests
  describe.skip('when called on async iterable', () => {
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
      stream = of(source)
    })

    afterEach(() => {
      jest.restoreAllMocks()
      source.reset()
    })

    it('should not allow synchronous calls if has not completed yet', () => {
      const result = []
      expect(iterateSync(result)).toThrowErrorMatchingSnapshot()
    })

    it('should not allow synchronous calls if has completed', async () => {
      const expected = await iterateAsync()
      const result = []

      jest.spyOn(source, 'next')
      expect(stream.completed).toEqual(true)

      expect(iterateSync(result)).toThrowErrorMatchingSnapshot()
      expect(source.next).not.toHaveBeenCalled()
      expect(result).not.toEqual(expected)
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
})
