import typeOf from './typeOf.js'
import isFunction from './isFunction.js'
import isPlainObject from './isPlainObject.js'

export default function invariant(options) {
  if (!isPlainObject(options)) {
    throw new TypeError(`Expected options to be an object, received: ${options}`)
  }
  const {condition, message, errorType = Error, args = []} = options
  if (!isFunction(errorType)) {
    throw new TypeError(`options.errorType is not a function`)
  }

  const msgType = typeOf(message)
  if (msgType !== 'string') {
    throw new TypeError(`Expected options.message to be a string, received: ${message}`)
  }

  const conditionResult = isFunction(condition) ? condition() : condition

  const condType = typeOf(conditionResult)
  if (condType !== 'boolean') {
    throw new TypeError(
      `Expected options.condition be able to be evaluated to a boolean, received: ${conditionResult}`
    )
  }

  if (!conditionResult) {
    throw Reflect.construct(errorType, [message, ...args])
  }
}
