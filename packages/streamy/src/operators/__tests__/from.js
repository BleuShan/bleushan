import {from} from '../from.js'
import {Stream} from '../../Stream.js'

describe('from operator', () => {
  describe.each([
    [[1, 2, 3], true],
    [{0: 1, length: 1}, true],
    ['sast', true],
    [new Set(['s']), true],
    [{test: 's'}, false],
    [null, false],
    [undefined, false],
    [NaN, false]
  ])('when called on %p', (source, valid) => {
    let call

    beforeEach(() => {
      call = () => from(source)
    })

    if (valid) {
      it('should not throw', () => {
        expect(call).not.toThrow()
      })

      it('should return a Stream', () => {
        expect(call()).toBeInstanceOf(Stream)
      })

      it('should yield the same values as the source', () => {
        expect(Array.from(call())).toEqual(Array.from(source))
      })
    } else {
      it('should throw', () => {
        expect(call).toThrowErrorMatchingSnapshot()
      })
    }
  })
})
