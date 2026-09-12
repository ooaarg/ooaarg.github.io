import type { Locale } from "./i18n";

export function formatDate(date: Date | string, locale: Locale, precision: "day" | "month" = "day"): string {
  return new Intl.DateTimeFormat(locale === "ru" ? "ru-RU" : "en-GB", {
    ...(precision === "day" ? { day: "numeric" as const } : {}),
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(typeof date === "string" ? new Date(date) : date);
}
