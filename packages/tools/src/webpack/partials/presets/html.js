import {resolve} from 'path'
import {choose, get, propsOf, valueOr} from 'partial.lenses'
import {curry, equals, is, isNil, keys, not, omit} from 'ramda'
import plugin from '../plugin'

const DEFAULTS = {
  template: resolve(__dirname, 'assets', 'index.ejs'),
  favicon: resolve(__dirname, 'assets', 'favicon.ico'),
  templateParameters: {
    title: '',
    root: 'root'
  }
}

const TABOO_SETTINGS_MERGE_KEYS = [
  'template',
  'favicon',
  'templateParameters',
  ...keys(DEFAULTS.templateParameters)
]

const isDefault = curry((key, value) => isNil(value) || equals(DEFAULTS[key], value))
const isDefaultTemplate = isDefault('template')

const getTemplateParameters = get(
  choose(({template, templateParameters}) =>
    isNil(templateParameters) && isDefaultTemplate(template)
      ? propsOf(DEFAULTS.templateParameters)
      : ['templateParameters']
  )
)

const valueOrDefault = curry((key, data) => get([key, valueOr(DEFAULTS[key])], data))
const getTemplate = valueOrDefault('template')
const getFavicon = valueOrDefault('favicon')

const mergeWithDefaults = (settings) => {
  const settingsTemplateParameters = getTemplateParameters(settings)
  const template = getTemplate(settings)
  const favicon = getFavicon(settings)
  const templateParameters =
    isDefaultTemplate(settings.template) && not(is(Function, settingsTemplateParameters))
      ? {...DEFAULTS.templateParameters, ...settingsTemplateParameters}
      : settingsTemplateParameters
  return {
    template,
    favicon,
    templateParameters,
    ...omit(TABOO_SETTINGS_MERGE_KEYS, settings)
  }
}

const html = curry((settings, config) =>
  plugin('html-webpack-plugin', mergeWithDefaults(settings), config)
)

export default html
