import { dev } from '$app/environment'
import fs from 'fs'
import yaml from 'js-yaml'
import i18n from 'sveltekit-i18n'

export const defaultLocale = 'en'

async function load_yaml(name) {
  const path = `./src/lib/translations/${name}.yml`
  try {
    const text = fs.readFileSync(path, 'utf8')
    const data = yaml.load(text)

    return data
  } catch (err) {
    if (typeof window === 'undefined') {
      // import resolve from 'path'
      const { resolve } = await import('path')

      // get absolute path to file
      const abs_path = resolve(path)
      console.log(`Error loading ${abs_path}: ${err}`)
      throw err
    }
  }
}

async function get_lang() {
  const lang = await load_yaml('lang')
  return lang
}

export const config = {
  log: {
    level: dev ? 'warn' : 'error',
  },
  translations: {
    en: (await get_lang()).en,
  },
  loaders: [
    {
      locale: 'en',
      key: 'menu',
      loader: async () => await load_yaml('en/menu'),
    },
    {
      locale: 'en',
      key: 'common',
      loader: async () => await load_yaml('en/common'),
    },
  ],
}

console.log('config', config)

export const {
  t,
  loading,
  locales,
  locale,
  translations,
  loadTranslations,
  addTranslations,
  setLocale,
  setRoute,
} = new i18n(config)

loading.subscribe(
  ($loading) => $loading && console.log('Loading translations...')
)
