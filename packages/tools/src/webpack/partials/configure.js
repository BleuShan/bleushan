import {modify, props, valueOr} from 'partial.lenses'

import {
  cond,
  complement,
  curry,
  either,
  equals,
  identity,
  isEmpty,
  isNil,
  reduce,
  T,
  test,
  where
} from 'ramda'

const applyPartials = reduce((memo, fn) => fn(memo))

const isNilOrEmpty = either(isNil, isEmpty)

const env = curry((defaultValue, propName) => process.env[propName] || defaultValue)

const modeFromEnv = (key) =>
  test(/^prod.*/i, env('development', key)) ? 'production' : 'development'

const mode = modify(
  [props('mode', 'modeEnvKey'), valueOr({})],
  cond([
    [
      where({mode: isNilOrEmpty, modeEnvKey: isNilOrEmpty}),
      (value) => ({...value, mode: modeFromEnv('NODE_ENV')})
    ],
    [
      where({modeEnvKey: complement(isEmpty), mode: isNilOrEmpty}),
      ({modeEnvKey, ...rest}) => ({...rest, mode: modeFromEnv(modeEnvKey)})
    ],
    [T, identity]
  ])
)

const devtool = modify(
  [props('devtool', 'mode'), valueOr({})],
  cond([
    [
      where({mode: equals('production'), devtool: isNilOrEmpty}),
      (value) => ({...value, devtool: false})
    ],
    [
      where({devtool: isNilOrEmpty}),
      (value) => ({...value, devtool: 'cheap-module-eval-source-map'})
    ],
    [T, identity]
  ])
)

const fromConfigureOptions = (opts) => applyPartials(opts, [mode, devtool])

const configure = curry((partials, options) =>
  applyPartials(options, [fromConfigureOptions].concat(partials))
)

export default configure
