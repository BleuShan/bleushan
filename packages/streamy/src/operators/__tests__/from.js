import {from} from '../from.js'
import {Stream} from '../../Stream.js'
import {asyncGenerator, AsyncIterable, generator} from '../__fixtures__/from.js'
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

  describe('when it returns an async stream', () => {
    let stream
    const iter = new AsyncIterable()
    let result

    const iterate = () => {
      for (const value of stream) {
        if (result == null) {
          result = []
        }
        result.push(value)
      }
    }

    beforeEach(() => {
      stream = from(iter)
    })

    afterEach(() => {
      result = null
      jest.restoreAllMocks()
      iter.reset()
    })

    it('should not allow synchronous calls if has not completed yet', () => {
      expect(iterate).toThrowErrorMatchingSnapshot()
      expect(result).toBeNil()
    })

    it('should allow synchronous calls if has completed', async () => {
      const expected = []
      for await (const value of stream) {
        expected.push(value)
      }

      jest.spyOn(iter, 'next')

      expect(iterate).not.toThrow()
      expect(iter.next).not.toHaveBeenCalled()
      expect(result).toEqual(expected)
    })
  })
})
