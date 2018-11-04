import match from '../match.js'
import prettyFormat from 'pretty-format'

describe('calling match', () => {
  describe('using a switchPath style route config', () => {
    describe('with a default case', () => {
      const usersRoute = jest.fn(() => usersRoute).mockName('usersRoute')
      const postsRoute = jest.fn(() => postsRoute).mockName('postsRoute')
      const routes = {
        '/': 1,
        '/home': 456,
        '/users/:id': usersRoute,
        '/posts/{id}/:slug': postsRoute,
        '*': 'Not Found'
      }

      describe.each`
        path                | expectedResult                                   | args
        ${'/'}              | ${{ path: '/', value: 1 }}                       | ${null}
        ${'/users/25'}      | ${{ path: '/users/25', value: usersRoute }}      | ${{ id: 25 }}
        ${'/posts/25/test'} | ${{ path: '/posts/25/test', value: postsRoute }} | ${{ id: 25, slug: 'test' }}
        ${'/hi'}            | ${{ path: '/hi', value: 'Not Found' }}           | ${null}
        ${'/home/foo'}      | ${{ path: '/home', value: 456 }}                 | ${null}
      `('when called with the $path', ({ path, expectedResult, args }) => {
        const result = match(path, routes)
        it(`should return with ${prettyFormat(expectedResult, {
          plugins: [
            {
              test(value) {
                return jest.isMockFunction(value)
              },
              print(value) {
                return (
                  value.getMockName() || value.displayName || value.name
                )
              }
            }
          ]
        })}`, () => {
          expect(result).toEqual(expectedResult)
        })

        if (jest.isMockFunction(expectedResult.value)) {
          it('should have called routed function', () => {
            expect(expectedResult.value).toBeCalledWith(args)
          })
        }
      })
    })
  })
})
