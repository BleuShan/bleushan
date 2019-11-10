import Stream from '../Stream.js'
import {instanceOf} from '@bleushan/utils'

export default function of(...sources) {
  if (sources.length === 1) {
    const [source] = sources

    if (source != null && instanceOf(Stream, source)) {
      return source
    }
  }

  return new Stream(...sources)
}
