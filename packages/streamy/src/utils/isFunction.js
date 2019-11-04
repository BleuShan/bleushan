import {typeTag} from './typeTag.js'
export function isFunction(value) {
  const tag = typeTag(value)
  return (
    tag === 'Function' ||
    tag === 'GeneratorFunction' ||
    tag === 'AsyncGeneratorFunction' ||
    tag === 'AsyncFunction'
  )
}
