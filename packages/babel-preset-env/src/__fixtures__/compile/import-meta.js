import {dirname} from 'path'
import {fileURLToPath} from 'url'

const path = fileURLToPath(import.meta.url)
export const __dirname = dirname(path)
