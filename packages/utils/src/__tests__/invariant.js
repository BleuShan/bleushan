import invariantWhenInvokedWith from '../__fixtures__/invariant.js'

describe('invariant', () => {
  describe('when invoked', () => {
    describe.each([
      [{message: 1}],
      [{message: 'string', condition: () => 'ste'}],
      [{message: 'string', condition: ''}],
      [{message: 'string', condition: false, errorType: 'stes'}],
      [{message: 'string', condition: true, errorType: 'stes'}]
    ])('with an invalid configuration, like %o,', (configuration) => {
      it('should throw with the appropriate error', () => {
        expect(invariantWhenInvokedWith(configuration)).toThrowErrorMatchingSnapshot()
      })
    })
  })
})
