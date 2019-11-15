import {instanceOf} from '@bleushan/utils'
import Stream from '../Stream.js'

const isStream = instanceOf(Stream)

export default function of(...sources) {
  if (sources.length === 1) {
    const [source] = sources

    if (source != null && isStream(source)) {
      return source
    }
  }

  return new Stream(...sources)
}
