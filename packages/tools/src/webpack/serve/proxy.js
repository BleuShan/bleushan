import convert from 'koa-connect'
import httpProxy from 'http-proxy-middleware'

const proxyMiddleware = (...args) => convert(httpProxy(...args))

const proxy = (...args) => (app, middleware, options) => {
  app.use(proxyMiddleware(...args))
}

export default proxy
