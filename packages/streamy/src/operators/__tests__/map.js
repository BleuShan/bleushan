import {map} from '../map.js'
import {of} from '../of.js'

describe.skip('map', () => {
  describe.each`
    values                | transform
    ${[1, 2, 3, 4, 5]}    | ${(v) => v * 2}
    ${'Hello World!'}     | ${(v) => v.toUpperCase()}
    ${new Set([1, 2, 3])} | ${(v) => v - 1}
  `(`using the associated transform on $values`, ({values, transform}) => {
    let expected
    beforeEach(() => {
      expected = []
      for (const value of values) {
        expected.push(transform(value))
      }
    })

    describe.each`
      description                     | source
      ${'passed in through a stream'} | ${of(values)}
      ${'passed in directly'}         | ${values}
    `('when $description', ({source}) => {
      describe.each`
        interfaceName    | call
        ${'direct call'} | ${(input) => map(transform, input)}
        ${'curried'}     | ${map(transform)}
      `('through the $interfaceName interface', ({call}) => {
        let stream
        beforeEach(() => {
          stream = call(source)
        })

        it('should yield the expected result', () => {
          const result = []
          for (const value of stream) {
            result.push(value)
          }

          expect(result).toEqual(expected)
        })
      })
    })
  })
})
