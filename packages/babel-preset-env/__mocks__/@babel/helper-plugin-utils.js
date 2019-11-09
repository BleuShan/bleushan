let mockEnv

export function useMockEnv(env) {
  mockEnv = env
}

export function resetMock() {
  mockEnv = undefined
}

function mockApiObject(api) {
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

  const mockProto = mockEnv
    ? {
        env() {
          return mockEnv
        }
      }
    : null
  return Object.assign({}, proto, api, mockProto)
}

export function declare(builder) {
  return (api, options, dirname) => {
    api = mockApiObject(api)
    return builder(api, options || {}, dirname)
  }
}
