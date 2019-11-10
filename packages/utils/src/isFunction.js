import typeTag from './typeTag.js'
export default function isFunction(value) {
  const tag = typeTag(value)
  return (
    tag === 'Function' ||
    tag === 'GeneratorFunction' ||
    tag === 'AsyncGeneratorFunction' ||
    tag === 'AsyncFunction'
  )
}
