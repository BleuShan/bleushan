const _hasOwnProperty = Object.prototype.hasOwnProperty

export function hasOwnProperty(target, propertyKey) {
  return _hasOwnProperty.call(target, propertyKey)
}
