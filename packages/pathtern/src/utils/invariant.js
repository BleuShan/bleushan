export default function invariant(condition, message, name = 'Invariant Violation') {
  if (condition) {
    const error = Reflect.construct(Error, [message])
    error.name = name
    throw error
  }
}
