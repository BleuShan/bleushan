import {typeOf} from './typeOf.js'

export function invariant({condition, message, errorConstructor = Error, args = []} = {}) {
  if (typeOf(errorConstructor) !== 'function') {
    throw new TypeError(`errorContructor is not a function`)
  }

  const msgType = typeOf(message)
  if (msgType !== 'string') {
    throw new TypeError(`expected message to be a string, received: ${message}`)
  }

  const conditionResult = typeOf(condition) === 'function' ? condition() : condition

  const condType = typeOf(conditionResult)
  if (condType !== 'boolean') {
    throw new TypeError(
      `expected condition be able to be evaluated to a boolean, received: ${conditionResult}`
    )
  }

  if (!conditionResult) {
    throw Reflect.construct(errorConstructor, [message, ...args])
  }
}
