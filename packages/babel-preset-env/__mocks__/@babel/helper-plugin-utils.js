function copyApiObject(api) {
  let proto = null
  if (typeof api.version === 'string' && /^7\./.test(api.version)) {
    proto = Reflect.getPrototypeOf(api)
    if (
      proto &&
      (!Reflect.has(proto, 'version') ||
        !Reflect.has(proto, 'transform') ||
        !Reflect.has(proto, 'template') ||
        !Reflect.has(proto, 'types'))
    ) {
      proto = null
    }
  }

  return Object.assign({}, proto, api)
}

export function declare(builder) {
  return (api, options, dirname) => {
    api = copyApiObject(api)
    return builder(api, options || {}, dirname)
  }
}
