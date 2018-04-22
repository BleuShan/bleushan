import convert from 'koa-connect'
import httpProxy from 'http-proxy-middleware'
import {identity} from 'ramda'
import app from '../__fixtures__/app'
import proxy from '../proxy'

jest.mock('http-proxy-middleware')
jest.mock('koa-connect')

describe('proxy', () => {
  beforeAll(() => {
    convert.mockImplementation(identity)
    httpProxy.mockImplementation((...args) => args)
  })

  afterEach(() => {
    convert.mockClear()
    httpProxy.mockClear()
  })

  afterAll(() => {
    convert.mockReset()
    httpProxy.mockReset()
  })

  describe('when called with options', () => {
    const options = {
      target: 'http://localhost:4000',
      changeOrigin: true,
      ws: true
    }
    const add = proxy(options)

    it('should setup everything appropriately', () => {
      add(app)
      expect(httpProxy).toHaveBeenCalledWith(options)
      expect(convert).toHaveBeenCalledWith([options])
      expect(app.use).toHaveBeenCalledWith([options])
    })
  })

  describe('when called with path and options', () => {
    const path = '/hello'
    const options = {
      target: 'http://localhost:4000',
      changeOrigin: true,
      ws: true
    }
    const add = proxy(path, options)

    it('should setup everything appropriately', () => {
      add(app)
      expect(httpProxy).toHaveBeenCalledWith(path, options)
      expect(convert).toHaveBeenCalledWith([path, options])
      expect(app.use).toHaveBeenCalledWith([path, options])
    })
  })
})
