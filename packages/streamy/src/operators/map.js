export function map(fn, target) {
  function curriedMap(obj) {
    return obj
  }
  if (target == null) {
    return curriedMap
  }

  return curriedMap(target)
}
