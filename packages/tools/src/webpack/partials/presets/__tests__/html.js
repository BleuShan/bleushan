import html from '../html'
import {resolve} from 'path'
import HtmlPlugin from 'html-webpack-plugin'
import {omit} from 'ramda'
jest.mock('html-webpack-plugin')

const defaults = {
  template: resolve(__dirname, '../', 'assets', 'index.ejs'),
  favicon: resolve(__dirname, '../', 'assets', 'favicon.ico'),
  templateParameters: {
    title: '',
    root: 'root'
  }
}

describe('html', () => {
  describe('with default options', () => {
    const plugin = html({})
    describe('with an empty config', () => {
      const config = {}

      it('should add the htmlPlugin to the plugins', () => {
        const result = plugin(config)
        expect(result.plugins).toBeDefined()
        expect(HtmlPlugin).toHaveBeenCalledWith(defaults)
      })
    })
    describe('with an with an existing config', () => {
      const config = {
        plugins: [
          {
            test: true
          }
        ]
      }

      it('should add the htmlPlugin to the plugins', () => {
        const result = plugin(config)
        expect(result.plugins).toEqual(expect.arrayContaining(config.plugins))
        expect(HtmlPlugin).toHaveBeenCalledWith(defaults)
      })
    })
  })

  describe('with some options', () => {
    describe('with an empty config', () => {
      const config = {}
      describe('with a title', () => {
        const settings = {
          title: 'test'
        }
        const expectedSettings = {
          template: resolve(__dirname, '../', 'assets', 'index.ejs'),
          favicon: resolve(__dirname, '../', 'assets', 'favicon.ico'),
          templateParameters: {
            title: 'test',
            root: 'root'
          }
        }
        const plugin = html(settings)

        it('should add the htmlPlugin to the plugins', () => {
          const result = plugin(config)

          expect(result.plugins).toBeDefined()
          expect(HtmlPlugin).toHaveBeenCalledWith(expectedSettings)
        })
      })

      describe('with a title and a root', () => {
        const settings = {
          title: 'test',
          root: 'app'
        }
        const expectedSettings = {
          template: resolve(__dirname, '../', 'assets', 'index.ejs'),
          favicon: resolve(__dirname, '../', 'assets', 'favicon.ico'),
          templateParameters: settings
        }
        const plugin = html(settings)

        it('should add the htmlPlugin to the plugins', () => {
          const result = plugin(config)
          expect(result.plugins).toBeDefined()
          expect(HtmlPlugin).toHaveBeenCalledWith(expectedSettings)
        })
      })

      describe('with a title and a root and the default template', () => {
        const settings = {
          template: resolve(__dirname, '../', 'assets', 'index.ejs'),
          title: 'test',
          root: 'app'
        }
        const expectedSettings = {
          template: resolve(__dirname, '../', 'assets', 'index.ejs'),
          favicon: resolve(__dirname, '../', 'assets', 'favicon.ico'),
          templateParameters: omit(['template'], settings)
        }
        const plugin = html(settings)

        it('should add the htmlPlugin to the plugins', () => {
          const result = plugin(config)
          expect(result.plugins).toBeDefined()
          expect(HtmlPlugin).toHaveBeenCalledWith(expectedSettings)
        })
      })

      describe('with a templateParameters and the default template', () => {
        const settings = {
          template: resolve(__dirname, '../', 'assets', 'index.ejs'),
          templateParameters: {
            title: 'test',
            root: 'app'
          }
        }
        const expectedSettings = {
          template: resolve(__dirname, '../', 'assets', 'index.ejs'),
          favicon: resolve(__dirname, '../', 'assets', 'favicon.ico'),
          templateParameters: settings.templateParameters
        }
        const plugin = html(settings)

        it('should add the htmlPlugin to the plugins', () => {
          const result = plugin(config)
          expect(result.plugins).toBeDefined()
          expect(HtmlPlugin).toHaveBeenCalledWith(expectedSettings)
        })
      })

      describe('with a function templateParameters', () => {
        const settings = {
          templateParameters: () => {}
        }
        const expectedSettings = {
          template: resolve(__dirname, '../', 'assets', 'index.ejs'),
          favicon: resolve(__dirname, '../', 'assets', 'favicon.ico'),
          templateParameters: settings.templateParameters
        }
        const plugin = html(settings)

        it('should add the htmlPlugin to the plugins', () => {
          const result = plugin(config)
          expect(result.plugins).toBeDefined()
          expect(HtmlPlugin).toHaveBeenCalledWith(expectedSettings)
        })
      })

      describe('with a templateParameters and a non default template', () => {
        const settings = {
          template: 'index.ejs',
          templateParameters: {
            title: 'test',
            root: 'app'
          }
        }
        const expectedSettings = {
          template: 'index.ejs',
          favicon: resolve(__dirname, '../', 'assets', 'favicon.ico'),
          templateParameters: settings.templateParameters
        }
        const plugin = html(settings)

        it('should add the htmlPlugin to the plugins', () => {
          const result = plugin(config)
          expect(result.plugins).toBeDefined()
          expect(HtmlPlugin).toHaveBeenCalledWith(expectedSettings)
        })
      })

      describe('with a plugin options and the default template', () => {
        const settings = {
          cache: false
        }
        const expectedSettings = {
          ...defaults,
          ...settings
        }
        const plugin = html(settings)

        it('should add the htmlPlugin to the plugins', () => {
          const result = plugin(config)
          expect(result.plugins).toBeDefined()
          expect(HtmlPlugin).toHaveBeenCalledWith(expectedSettings)
        })
      })
    })
  })
})
