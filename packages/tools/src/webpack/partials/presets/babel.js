import {curry, either, isEmpty, isNil} from 'ramda'
import loader from '../loader'

const babel =
curry((options, config) =>
  loader(/\.jsx?$/i, ['babel-loader', either(isNil, isEmpty)(options) ? {} : {options}], config))

export default babel
