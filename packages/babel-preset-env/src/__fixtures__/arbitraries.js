import {record, oneof, constant, bool, nestring, pair} from 'jsverify'

function createMockApi(options) {
  const {env, caller} = options
  return {
    assertVersion: jest.fn(),
    caller: jest.fn((callback) => callback(caller)),
    env: jest.fn().mockReturnValue(env)
  }
}

const nil = oneof([constant(undefined), constant(null)])
const apiEnv = oneof([constant('development'), constant('production'), constant('test')])

export const mockApi = record({
  env: apiEnv,
  caller: oneof([
    nil,
    record({
      name: nestring,
      supportsStaticESM: oneof([nil, bool])
    })
  ])
}).smap(
  (opts) => createMockApi(opts),
  (api) => ({
    env: api.env(),
    caller: api.caller((caller) => caller)
  })
)

const minifySpec = {
  keepFnName: oneof([bool, nil]),
  keepClassName: oneof([bool, nil]),
  tdz: oneof([bool, nil])
}

const minifyEnv = pair(apiEnv, record(minifySpec)).smap(
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
  minify: oneof([constant(false), nil, record(minifyRootSpec)])
})
