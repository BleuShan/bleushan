import match from '../match.js'

describe('calling match', () => {
  describe('using a switchPath style route config', () => {
    describe('with a default case', () => {
      const usersRoute = jest.fn(() => usersRoute).mockName('usersRoute')
      const postsRoute = jest.fn(() => postsRoute).mockName('postsRoute')
      const typedRoute = jest.fn(() => typedRoute).mockName('typedRoute')
      const routes = {
        '/': 1,
        '/home': 456,
        '/users/:id': usersRoute,
        '/posts/{id}/:slug': postsRoute,
        '/typed/{id:number}/{name:string}': typedRoute,
        '*': 'Not Found'
      }

      beforeEach(() => {
        jest.clearAllMocks()
      })

      it.each`
        path           | expected
        ${'/'}         | ${{ path: '/', value: 1 }}
        ${'/hi'}       | ${{ path: '/hi', value: 'Not Found' }}
        ${'/home/foo'} | ${{ path: '/home', value: 456 }}
      `(
        'when called with the $path should return with $expected',
        ({ path, expected }) => {
          expect(match(path, routes)).toEqual(expected)
        }
      )

      it.each`
        inputPath                | expected                                                            | args
        ${'/users/25'}           | ${{ path: '/users/25', value: usersRoute.getMockName() }}           | ${{ id: 25 }}
        ${'/users/'}             | ${{ path: '/users/', value: usersRoute.getMockName() }}             | ${{}}
        ${'/posts/25/test-slug'} | ${{ path: '/posts/25/test-slug', value: postsRoute.getMockName() }} | ${{ id: 25, slug: 'test-slug' }}
        ${'/typed/25/1'}         | ${{ path: '/typed/25/1', value: typedRoute.getMockName() }}         | ${{ id: 25, name: '1' }}
      `(
        'when called with the $inputPath should return with $expected and call the value with $args',
        ({ inputPath, expected, args }) => {
          const { path, value } = match(inputPath, routes)
          expect({ path, value: value.getMockName() }).toEqual(expected)
          expect(value).toHaveBeenCalledWith(args)
        }
      )
    })
  })
})
