/* eslint-disable fp/no-nil */
/* eslint-disable better/explicit-return */
/* eslint-disable fp/no-mutation */
/* eslint-disable better/no-ifs */
/* eslint-disable fp/no-throw */
export default function invariant(
  condition,
  message,
  name = 'Invariant Violation'
) {
  if (condition) {
    const error = Reflect.construct(Error, [message])
    error.name = name
    throw error
  }
}
