import {isFunction} from './isFunction.js'
import {typeOf} from './typeOf.js'

export function invariant({condition, message, errorType = Error, args = []} = {}) {
  if (!isFunction(errorType)) {
    throw new TypeError(`errorContructor is not a function`)
  }

  const msgType = typeOf(message)
  if (msgType !== 'string') {
    throw new TypeError(`expected message to be a string, received: ${message}`)
  }

  const conditionResult = isFunction(condition) ? condition() : condition

  const condType = typeOf(conditionResult)
  if (condType !== 'boolean') {
    throw new TypeError(
      `expected condition be able to be evaluated to a boolean, received: ${conditionResult}`
    )
  }

  if (!conditionResult) {
    throw Reflect.construct(errorType, [message, ...args])
  }
}
