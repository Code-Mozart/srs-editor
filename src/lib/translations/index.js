import { dev } from '$app/environment'
import i18n from 'sveltekit-i18n'
import lang from './lang.json'

export const defaultLocale = 'en'

export const config = {
  log: {
    level: dev ? 'warn' : 'error',
  },
  translations: {
    en: { lang },
  },
  loaders: [
    {
      locale: 'en',
      key: 'menu',
      loader: async () => (await import('./en/menu.json')).default,
    },
    {
      locale: 'en',
      key: 'common',
      loader: async () => (await import('./en/common.json')).default,
    },
  ],
}

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
