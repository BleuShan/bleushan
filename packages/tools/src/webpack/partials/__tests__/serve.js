import serve from '../serve'

describe('serve', () => {
  describe('with an empty config', () => {
    const config = {}

    it('should add the serve key properly', () => {
      const expectedConfig = {
        serve: {
          content: [
            __dirname
          ]
        }
      }

      expect(serve(expectedConfig.serve, config)).toEqual(expectedConfig)
    })
  })

  describe('with an existing config', () => {
    const config = {
      serve: {
        content: [
          __dirname
        ]
      }
    }

    it('should merge serve key properly', () => {
      const add = () => 'hey'
      const options = {
        content: [
          'bob'
        ],
        add
      }

      const expectedConfig = {
        serve: {
          content: [
            __dirname
          ],
          add
        }
      }

      expect(serve(options, config)).toEqual(expectedConfig)
    })
  })
})
