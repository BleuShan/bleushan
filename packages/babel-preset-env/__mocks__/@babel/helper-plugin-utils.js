export function declare(builder) {
  return (env, options) => {
    const api = {
      env() {
        return env
      }
    }
    return builder(api, options)
  }
}
