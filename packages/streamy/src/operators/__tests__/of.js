import {
  asyncGenerator,
  AsyncIterable,
  generator,
  iterateAsync,
  iterateSync
} from '../__fixtures__/of.js'
import {of} from '../of.js'
import {Stream} from '../../Stream.js'
import {typeTag} from '../../utils/typeTag.js'
import {isArrayLike} from '../../utils/isArrayLike.js'
import {isString} from '../../utils/isString.js'
import {isFunction} from '../../utils/isFunction.js'
import {instanceOf} from '../../utils/instanceOf'

describe('the "of" operator', () => {
  describe('when invoked with a single', () => {
    let invoke
    let expectedResult
    let source
    let stream

    beforeEach(async () => {
      const isGenerator =
        typeTag(source) === 'GeneratorFunction' || typeTag(source) === 'AsyncGeneratorFunction'

      if (isArrayLike(source) || isString(source) || isGenerator) {
        const iter = isGenerator ? source() : source
        if (isFunction(iter[Symbol.asyncIterator])) {
          expectedResult = await iterateAsync(iter)
        } else {
          expectedResult = Array.from(iter)
        }
      } else if (isFunction(source?.then)) {
        const value = await source
        expectedResult = [value]
      }

      invoke = () => {
        stream = isGenerator ? of(source()) : of(source)

        return stream
      }
    })

    describe.each([
      [[1, 2, 3]],
      [{0: 1, length: 1}],
      ['sast'],
      [new Set(['s'])],
      [generator],
      [asyncGenerator],
      [new AsyncIterable()],
      [Promise.resolve(1)],
      [of([1, 2, 3])]
    ])('valid value, like "%o",', (value) => {
      beforeAll(() => {
        source = value
      })

      it('should not throw any error', () => {
        expect(invoke).not.toThrow()
      })

      it('should return with a Stream instance', () => {
        expect(stream).toBeInstanceOf(Stream)
      })

      it('should yield the expected iteration result ', async () => {
        const result = await iterateAsync(stream)
        expect(result).toEqual(expectedResult)
      })

      if (
        (isFunction(value[Symbol.asyncIterator]) || isFunction(value.then)) &&
        !instanceOf(Stream, value)
      ) {
        it('should not allow synchronous traversal if the stream is not completed', () => {
          expect(() => iterateSync(invoke())).toThrowErrorMatchingSnapshot()
        })

        it('should not allow synchronous traversal if the stream is completed', async () => {
          await iterateAsync(stream)
          expect(stream.completed).toEqual(true)
          expect(() => iterateSync(stream)).toThrowErrorMatchingSnapshot()
        })
      }

      if (instanceOf(Stream, value)) {
        it('should be a noop if the value is a Stream', () => {
          expect(stream).toBe(value)
        })
      }
    })

    describe.each([
      [
        {
          test: 's'
        }
      ],
      [null],
      [undefined],
      [NaN],
      [1],
      [BigInt(1)]
    ])('invalid value, like "%o",', (value) => {
      beforeAll(() => {
        source = value
      })

      it('should throw the appropriate error', () => {
        expect(invoke).toThrowErrorMatchingSnapshot()
      })
    })
  })

  describe('when invoked with multiple values', () => {
    it('should work', () => {
      const args = [1, 2, 3]
      const stream = of(...args)

      expect(iterateSync(stream)).toEqual(args)
    })
  })
})
