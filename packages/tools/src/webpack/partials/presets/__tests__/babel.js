import configure from '../../configure'
import babel from '../babel'

describe('babel', () => {
  describe('with no options', () => {
    const preset = configure([babel(undefined)])

    describe('with empty config', () => {
      const config = {}

      it('should add the babel loader', () => {
        const expectedConfig = {
          mode: 'development',
          devtool: 'cheap-module-eval-source-map',
          module: {
            rules: [
              {
                test: /\.jsx?$/i,
                loader: 'babel-loader'
              }
            ]
          }
        }

        expect(preset(config)).toEqual(expectedConfig)
      })
    })
  })
  describe('with some options', () => {
    const preset = configure([babel({babelrc: false})])

    describe('with empty config', () => {
      const config = {}

      it('should add the babel loader', () => {
        const expectedConfig = {
          mode: 'development',
          devtool: 'cheap-module-eval-source-map',
          module: {
            rules: [
              {
                test: /\.jsx?$/i,
                loader: 'babel-loader',
                options: {babelrc: false}
              }
            ]
          }
        }

        expect(preset(config)).toEqual(expectedConfig)
      })
    })
  })
})
