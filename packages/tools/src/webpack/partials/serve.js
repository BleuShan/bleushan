import {modify, valueOr} from 'partial.lenses'
import {curry, mergeDeepRight} from 'ramda'

const serve =
curry((options, config) =>
  modify(['serve', valueOr({})], mergeDeepRight(options), config))

export default serve
