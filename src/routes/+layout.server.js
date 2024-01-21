import {
  defaultLocale,
  loadTranslations,
  locales,
  translations,
} from '$lib/translations'

export const load = async ({ url, cookies, request }) => {
  const { pathname } = url

  // Try to get the locale from cookie
  let locale = (cookies.get('lang') || '').toLowerCase()

  // Get user preferred locale
  if (!locale) {
    locale = `${`${request.headers.get('accept-language')}`.match(
      /[a-zA-Z]+?(?=-|_|,|;)/
    )}`.toLowerCase()
  }

  const supportedLocales = locales.get().map((l) => l.toLowerCase())

  if (!supportedLocales.includes(locale)) {
    locale = defaultLocale
  }

  await loadTranslations(locale, pathname)

  return {
    i18n: { locale, route: pathname },
    translations: translations.get(),
  }
}
