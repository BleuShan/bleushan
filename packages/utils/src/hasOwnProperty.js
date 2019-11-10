const _hasOwnProperty = Object.prototype.hasOwnProperty

export default function hasOwnProperty(target, propertyKey) {
  return _hasOwnProperty.call(target, propertyKey)
}
