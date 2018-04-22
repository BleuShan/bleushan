import {identity} from 'ramda'
import plugin from '../plugin'
import FakePlugin from '../__fixtures__/fakePlugin'
jest.mock('../__fixtures__/fakePlugin')

describe('plugin', () => {
  afterEach(() => {
    FakePlugin.mockClear()
  })

  const configWithFakePlugin = {
    plugins: [
      Reflect.construct(FakePlugin, {test: true})
    ]
  }

  describe('with an empty config', () => {
    describe('when a string is used as a plugin', () => {
      it('should add the plugin', () => {
        const config = plugin('./__fixtures__/fakePlugin', {test: true}, {})
        expect(config).toEqual(configWithFakePlugin)
        expect(FakePlugin).toHaveBeenCalledWith({test: true})
      })
    })

    describe('when an object is used as a plugin', () => {
      describe('when arguments are passed in', () => {
        it('should add the plugin', () => {
          const config = plugin(FakePlugin, {test: true})({})
          expect(config).toEqual(configWithFakePlugin)
        })
      })

      describe('when no arguments are passed in', () => {
        it('should add the plugin', () => {
          const expectedConfig = {
            plugins: [
              {test: true}
            ]
          }
          const config = plugin(identity({test: true}), [])({})
          expect(config).toEqual(expectedConfig)
        })
      })
    })
  })
  describe('with an existing config', () => {
    it('should add plugin the', () => {
      const expectedConfig = {
        plugins: [
          Reflect.construct(FakePlugin, {test: true}),
          {test: true}
        ]
      }

      const config = plugin(identity({test: true}), undefined)(configWithFakePlugin)
      expect(config).toEqual(expectedConfig)
    })
  })
})
