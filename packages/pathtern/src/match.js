import {typeTag, typeOf, isPlainObject, invariant} from '@bleushan/utils'
import splitPath from './splitPath.js'
import {PARAM_KEY_REGEXP} from './constants.js'

const getIncompatibleRouteConfigMessage = (value) =>
  `Provided route config is incompatible. Expected ${typeTag({})} ${typeTag(value)}`

function deserializeParamValue(value, deserializerKey) {
  const number = Number.parseFloat(value)
  return Number.isNaN(number) || typeOf(value) === deserializerKey ? value : number
}

function extractParamKey(pathComponent) {
  return pathComponent?.match(PARAM_KEY_REGEXP)?.filter((v) => v && v !== pathComponent) || []
}

function getPartialMatchResult(path, candidatePath, candidateValue) {
  const pathComponents = splitPath(path)
  const candidatePathComponents = splitPath(candidatePath)
  return pathComponents?.length <= candidatePathComponents?.length
    ? pathComponents?.reduce(
        ([currentPath, candidateValue, args, count], pathComponent, index) => {
          const candidatePathComponent = candidatePathComponents[index]
          const [paramKey, deserializerKey] = extractParamKey(candidatePathComponent)
          const nextCount =
            candidatePathComponent === pathComponent || (count > 1 && paramKey != null)
              ? count + 1
              : count

          const nextArgs =
            paramKey != null
              ? {
                  ...args,
                  [paramKey]: deserializeParamValue(pathComponent, deserializerKey)
                }
              : args

          return [nextCount >= 2 ? path : currentPath, candidateValue, nextArgs, nextCount]
        },
        ['', candidateValue, {}, 0]
      )
    : [path.startsWith(candidatePath) && candidatePath !== '/' ? candidatePath : '', candidateValue]
}

function getResult(path, candidateRoute) {
  const [candidatePath, candidateValue] = candidateRoute
  const isExactMatch = candidatePath === path || candidatePath === '*'
  return isExactMatch
    ? [path, candidateValue]
    : getPartialMatchResult(path, candidatePath, candidateValue)
}

export default function match(path, routes) {
  invariant({
    condition: isPlainObject(routes),
    message: getIncompatibleRouteConfigMessage(routes)
  })
  const entries = Object.entries(routes)
  const [routedPath, routedValue, args] = entries.reduce(
    (currentResult, candidateRoute) => {
      const [reduced] = currentResult
      return reduced ? currentResult : getResult(path, candidateRoute)
    },
    ['']
  )

  return {
    path: routedPath,
    value: typeOf(routedValue) === 'function' ? routedValue(args) : routedValue
  }
}
