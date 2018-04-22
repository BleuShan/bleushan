import historyFallbackMiddleware from 'koa2-history-api-fallback'
const historyFallback = () =>
  (app, middleware, options) => {
    app.use(historyFallbackMiddleware())
  }

export default historyFallback
