import { translate, type Locale } from "./i18n";

// The serialized page locale is identical during prerendering and hydration.
export function useLocale(locale: Locale) {
  return { locale, t: (text: string) => translate(text, locale) };
}
