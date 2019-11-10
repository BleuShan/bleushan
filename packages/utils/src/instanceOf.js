export default function instanceOf(klass, target) {
  function isInstanceOf(value) {
    return value instanceof klass
  }

  if (arguments.length === 1) {
    return isInstanceOf
  }

  return isInstanceOf(target)
}
