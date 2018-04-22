import historyApiFallbackMiddleware from 'koa2-history-api-fallback'
import app from '../__fixtures__/app'
import historyFallback from '../historyFallback'
jest.mock('koa2-history-api-fallback')

describe('historyFallback', () => {
  beforeAll(() => {
    historyApiFallbackMiddleware.mockImplementation(() => 'history added')
  })

  afterEach(() => {
    historyApiFallbackMiddleware.mockClear()
  })

  afterAll(() => {
    historyApiFallbackMiddleware.mockReset()
  })

  describe('when called', () => {
    const add = historyFallback()
    it('it should setup everything appropriately', () => {
      add(app)
      expect(historyApiFallbackMiddleware).toHaveBeenCalledWith()
      expect(app.use).toHaveBeenCalledWith('history added')
    })
  })
})
