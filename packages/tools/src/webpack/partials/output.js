import {choose, modify, props, valueOr} from 'partial.lenses'
import {always, compose, curry, isEmpty, keys, omit} from 'ramda'
import {resolve} from 'path'

const ensureAbsolutePath = (basePath) =>
  modify(['path', valueOr('')], (value) => resolve(basePath, value))

const output = curry((basePath, value, config) =>
  modify(
    [
      'output',
      valueOr({}),
      choose((currentValue) =>
        isEmpty(currentValue)
          ? props(...keys(value), 'path')
          : props(...keys(omit(keys(currentValue), value)))
      )
    ],
    compose(
      ensureAbsolutePath(basePath),
      always(value)
    ),
    config
  )
)

export default output
