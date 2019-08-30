export const isPlainObject = (object) =>
  !!object &&
  typeof object === 'object' &&
  Object.prototype.toString.call(object) === '[object Object]'
