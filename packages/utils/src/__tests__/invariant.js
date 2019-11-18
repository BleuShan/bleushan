import invariantWhenInvokedWith from '../__fixtures__/invariant.js'

describe('invariant', () => {
  describe('when invoked', () => {
    describe.each([
      [undefined],
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

    describe('with a valid configuration', () => {
      let configuration
      const conditionMock = jest.fn()

      class CustomError extends Error {
        constructor(message) {
          super(`CustomError: ${message}`)
          Reflect.setPrototypeOf(this, new.target.prototype)
        }
      }

      class CustomErrorWithArgs extends Error {
        constructor(message, ...args) {
          super(message + args.join(','))
          Reflect.setPrototypeOf(this, new.target.prototype)
        }
      }

      describe.each`
        message            | errorType              | args
        ${'default error'} | ${undefined}           | ${undefined}
        ${'some message'}  | ${CustomError}         | ${[]}
        ${'Counting:'}     | ${CustomErrorWithArgs} | ${[1, 2, 3]}
      `('with message: $message and errorType: $errorType', ({message, errorType, args}) => {
        beforeEach(() => {
          configuration = {message, errorType, args}
        })

        describe.each`
          description   | accessType
          ${'a getter'} | ${'get'}
          ${'a method'} | ${undefined}
        `('when the condition is evaluated via $description', ({accessType}) => {
          beforeEach(() => {
            Reflect.defineProperty(configuration, 'condition', {
              configurable: true,
              ...(accessType ? {get: conditionMock} : {value: conditionMock})
            })
          })

          describe.each([[true], [false]])('and it evaluates to %o', (value) => {
            beforeEach(() => {
              conditionMock.mockReturnValue(value)
            })

            if (value) {
              it('should not throw', () => {
                expect(invariantWhenInvokedWith(configuration)).not.toThrow()
              })
            } else {
              it('should throw with the appropriate error', () => {
                expect(invariantWhenInvokedWith(configuration)).toThrowErrorMatchingSnapshot()
              })
            }
          })
        })
      })
    })
  })
})
