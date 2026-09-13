import { useLayoutEffect, useState } from "preact/hooks";
import { translate, type Locale } from "./i18n";

export function useLocale() {
  // Match the English static HTML during hydration.
  const [locale, setLocale] = useState<Locale>("en");
  // Hydrate against the English HTML, then synchronize before the browser paints.
  useLayoutEffect(() => {
    const update = () => setLocale(document.documentElement.lang === "ru" ? "ru" : "en");
    update();
    window.addEventListener("ooaarg:language", update);
    return () => window.removeEventListener("ooaarg:language", update);
  }, []);
  return { locale, t: (text: string) => translate(text, locale) };
}
