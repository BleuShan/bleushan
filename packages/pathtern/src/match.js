const PATH_MATCH_REGEX = /\/(\w+|{\w+}|:\w+)*/g
const PATH_ARG_REGEX = /({\w+}|:\w+)/g
const PARAMS_KEY_SANITIZE_REGEX = /[/{}:]/g

function choosePath(routedPath, path) {
  return PATH_MATCH_REGEX.test(routedPath) &&
    !PATH_ARG_REGEX.test(routedPath) &&
    routedPath.length <= path.length
    ? routedPath
    : path
}

function deserializeParamValue(value) {
  const number = Number.parseFloat(value)
  return Number.isNaN(number) ? value : number
}

function extractParams(routedPath, path) {
  const pathComponents = path.split('/')
  return routedPath.split('/').reduce((result, routedPathComponent, index) => {
    const value = pathComponents[index]
    const key = routedPathComponent.replace(PARAMS_KEY_SANITIZE_REGEX, '')
    return key === value
      ? result
      : {
          ...result,
          [key]: deserializeParamValue(value)
        }
  }, {})
}

function getValue(routedPath, path, routedValue) {
  return typeof routedValue === 'function'
    ? routedValue(extractParams(routedPath, path))
    : routedValue
}

export default function match(path, routes) {
  const entries = Object.entries(routes)
  const pathComponents = path.match(PATH_MATCH_REGEX)
  const [routedPath, routedValue] = entries.find(([routePath]) => {
    const routePathComponents = routePath.match(PATH_MATCH_REGEX)
    return (
      routePath === path ||
      routePathComponents == null ||
      (routePathComponents.length <= pathComponents.length &&
        pathComponents.some(
          (value, index) => value && value === routePathComponents[index]
        ))
    )
  })

  return {
    path: choosePath(routedPath, path),
    value: getValue(routedPath, path, routedValue)
  }
}
