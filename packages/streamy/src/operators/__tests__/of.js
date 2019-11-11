import {typeTag, isArrayLike, isString, isFunction, instanceOf} from '@bleushan/utils/lib/cjs'
import {asyncGenerator, AsyncIterable, generator} from '../__fixtures__/of.js'
import {toArray, toArrayAsync} from '../__fixtures__/common.js'
import of from '../of.js'
import Stream from '../../Stream.js'

describe('the "of" operator', () => {
  describe('when invoked with', () => {
    let invoke
    let expectedResult
    let source
    let stream

    describe('a single', () => {
      beforeEach(async () => {
        const isGenerator =
          typeTag(source) === 'GeneratorFunction' || typeTag(source) === 'AsyncGeneratorFunction'

        if (isArrayLike(source) || isString(source) || isGenerator) {
          const iter = isGenerator ? source() : source
          if (isFunction(iter[Symbol.asyncIterator])) {
            expectedResult = await toArrayAsync(iter)
          } else {
            expectedResult = toArray(iter)
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
      ])('valid value, like %o,', (value) => {
        beforeAll(() => {
          source = value
        })

        it('should not throw any error', () => {
          expect(invoke).not.toThrow()
        })

        describe('from which the result', () => {
          it('should be an instance of Stream', () => {
            expect(stream).toBeInstanceOf(Stream)
          })

          it('should yield the expected iteration result ', async () => {
            const result = await toArrayAsync(stream)
            expect(stream.completed).toEqual(true)
            expect(result).toEqual(expectedResult)
          })

          if (
            (isFunction(value[Symbol.asyncIterator]) ||
              isFunction(value.then) ||
              typeTag(value) === 'AsyncGeneratorFunction') &&
            !instanceOf(Stream, value)
          ) {
            it('should not allow synchronous traversal if the stream is completed', () => {
              expect(() => toArray(stream)).toThrowErrorMatchingSnapshot()
            })

            it('should not allow synchronous traversal if the stream is not completed', () => {
              expect(() => toArray(invoke())).toThrowErrorMatchingSnapshot()
            })
          }

          if (instanceOf(Stream, value)) {
            it('should be a noop if the value is a Stream', () => {
              expect(stream).toBe(value)
            })
          }
        })
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
      ])('invalid value, like %o,', (value) => {
        beforeAll(() => {
          source = value
        })

        it('should throw the appropriate error', () => {
          expect(invoke).toThrowErrorMatchingSnapshot()
        })
      })
    })

    describe('multiple', () => {
      beforeEach(() => {
        expectedResult = toArray(source)

        invoke = () => {
          stream = of(...source)

          return stream
        }
      })

      describe.each([
        [1, 2, 3],
        [
          {0: 1, length: 1},
          {0: 2, length: 1},
          {0: 3, length: 1}
        ],
        ['a', 'b', 'c'],
        [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)],
        [NaN, null, undefined]
      ])('values, like %o, %o and %o,', (...values) => {
        beforeAll(() => {
          source = values
        })

        it('should not throw any error', () => {
          expect(invoke).not.toThrow()
        })

        describe('from which the result', () => {
          it('should be an instance of Stream', () => {
            expect(stream).toBeInstanceOf(Stream)
          })

          it('should yield the expected iteration result ', () => {
            const result = toArray(stream)
            expect(result).toEqual(expectedResult)
          })
        })
      })
    })
  })
})
