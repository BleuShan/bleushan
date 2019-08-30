export const emptyString = ''
export const neString = 'test'
export const plainObject = {}
export const createdPlainObject = Object.create(null)
export class DummyClass {
  a = 1
  get [Symbol.toStringTag]() {
    return this.name
  }
}
export const arrowFunction = (i) => i
export function fn(i) {
  return i
}
export const regexp = /.*/
export const emptyArray = []
export const numberArray = [1, 2, 3]
