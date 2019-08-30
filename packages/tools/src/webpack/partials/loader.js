import {
  cond,
  choices,
  collect,
  elems,
  find,
  get,
  modify,
  normalize,
  props,
  propsOf,
  remove,
  valueOr
} from 'partial.lenses'
import {
  always,
  append,
  addIndex,
  curry,
  compose,
  concat,
  drop,
  is,
  isEmpty,
  isNil,
  mergeDeepLeft,
  pipe,
  prepend,
  reduce,
  takeWhile,
  whereEq
} from 'ramda'

const findWhereEq = compose(
  find,
  whereEq
)

const findMatchingRule = (test) => [
  'module',
  'rules',
  valueOr([]),
  findWhereEq({test}),
  valueOr({test})
]

const normalizeLoader = normalize((value) => (is(String, value) ? {loader: value} : value))

const normalizeLoaders = pipe(
  collect(cond([Array.isArray, [elems, normalizeLoader]], [normalizeLoader])),
  addIndex(reduce)((acc, item, index, items) => {
    const {loader: currentLoader} = item
    const entry =
      isNil(currentLoader) && index === 0
        ? item
        : reduce(
            mergeDeepLeft,
            item,
            takeWhile(
              ({loader}) => loader === currentLoader || isNil(loader),
              drop(index + 1, items)
            )
          )

    const shouldAppend =
      index === 0 ||
      (!isNil(currentLoader) && isNil(get(findWhereEq({loader: currentLoader}), acc)))

    return shouldAppend ? append(entry, acc) : acc
  }, [])
)

const updateRule = pipe(
  normalizeLoaders,
  (loaderOrLoaders) => (rule) => {
    const currentLoader = get(choices('use', 'loader', props('loader', 'options')), rule)
    const [head, ...tail] = isNil(currentLoader)
      ? loaderOrLoaders
      : normalizeLoaders(
          Array.isArray(currentLoader)
            ? concat(currentLoader, loaderOrLoaders)
            : prepend(currentLoader, loaderOrLoaders)
        )
    const values = isEmpty(tail) ? head : {use: [head, ...tail]}
    const data = remove(choices('loader', props('loader', 'options')), rule)
    return modify(propsOf(values), always(values), data)
  }
)

const loader = curry((test, loaderOrLoaders, config) =>
  modify(findMatchingRule(test), updateRule(loaderOrLoaders), config)
)

export default loader
