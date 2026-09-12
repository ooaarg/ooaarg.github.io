import type { Locale } from "./i18n";

export function contentText(original: string, russian: string | undefined, locale: Locale): string {
  return locale === "ru" && russian?.trim() ? russian : original;
}

export function contentLanguage(russian: string | undefined, locale: Locale): Locale {
  return locale === "ru" && russian?.trim() ? "ru" : "en";
}
