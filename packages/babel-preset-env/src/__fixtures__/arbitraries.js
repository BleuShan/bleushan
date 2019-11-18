import {record, oneof, constant, bool, nestring, pair, elements} from 'jsverify'

const nil = oneof([constant(undefined), constant(null)])
export const nodeEnv = oneof([constant('development'), constant('production'), constant('test')])

export const mockApiContext = record({
  env: nodeEnv,
  caller: oneof([
    nil,
    record({
      name: nestring,
      supportsStaticESM: oneof([nil, bool])
    })
  ])
})

const minifySpec = {
  keepFnName: oneof([bool, nil]),
  keepClassName: oneof([bool, nil]),
  tdz: oneof([bool, nil])
}

const minifyEnv = pair(nodeEnv, record(minifySpec)).smap(
  ([env, config]) => ({
    [env]: config
  }),
  Object.entries
)

const minifyRootSpec = {
  keepFnName: oneof([bool, nil]),
  keepClassName: oneof([bool, nil]),
  tdz: oneof([bool, nil]),
  useDefaults: oneof([bool, nil]),
  env: oneof([nil, minifyEnv])
}

export const options = record({
  targets: oneof([record({esmodules: bool}), nil, constant({node: 'current'})]),
  modules: oneof([constant('auto'), constant(false), nil]),
  decorators: oneof([constant('legacy'), constant(false), nil]),
  decoratorsBeforeExport: oneof([bool, nil]),
  minify: oneof([constant(false), nil, record(minifyRootSpec)]),
  imports: oneof([nil, record({useESModules: oneof([nil, bool])})]),
  runtime: oneof([nil, bool, record({corejs: oneof([elements([false, 2, 3]), nil])})])
})
