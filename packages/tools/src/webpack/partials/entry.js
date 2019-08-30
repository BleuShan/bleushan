import {choose, modify, propsOf, valueOr} from 'partial.lenses'
import {always, append, both, concat, cond, curry, is, isEmpty, T} from 'ramda'

const setValue = (value) =>
  cond([
    [always(is(String, value)), append(value)],
    [always(Array.isArray(value)), concat(value)],
    [T, always(value)]
  ])

const entry = curry((keyPath, value, config) =>
  modify(
    [
      'entry',
      choose(
        cond([
          [both(always(isEmpty(keyPath)), always(Array.isArray(value))), always(valueOr([]))],
          [
            both(always(is(String, keyPath)), always(Array.isArray(value))),
            always([keyPath, valueOr([])])
          ],
          [
            both(always(Array.isArray(keyPath), always(Array.isArray(value)))),
            always([...keyPath, valueOr([])])
          ],
          [T, always(propsOf(value))]
        ])
      )
    ],
    setValue(value),
    config
  )
)

export default entry
