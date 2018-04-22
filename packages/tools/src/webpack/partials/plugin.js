import {
  append,
  set
} from 'partial.lenses'

import {
  curry,
  is,
  isEmpty,
  isNil,
  pipe
} from 'ramda'

const plugin =
  curry(pipe(
    (pathOrPlugin, argsOrOptions, config) => {
      const pluginModule = is(String, pathOrPlugin) ? require(pathOrPlugin) : pathOrPlugin
      const target = 'default' in pluginModule ? pluginModule.default : pluginModule
      const args = Array.isArray(argsOrOptions)
        ? argsOrOptions
        : isNil(argsOrOptions)
          ? [] : [argsOrOptions]
      return [isEmpty(args) ? target : Reflect.construct(target, args), config]
    },
    ([pluginInstance, config]) => set(['plugins', append], pluginInstance, config)))

export default plugin
