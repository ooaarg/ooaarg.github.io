import { useEffect, useState } from "preact/hooks";
import { translate, type Locale } from "./i18n";

export function useLocale() {
  // Match the English static HTML during hydration.
  const [locale, setLocale] = useState<Locale>("en");
  useEffect(() => {
    const update = () => setLocale(document.documentElement.lang === "ru" ? "ru" : "en");
    update();
    window.addEventListener("ooaarg:language", update);
    return () => window.removeEventListener("ooaarg:language", update);
  }, []);
  return { locale, t: (text: string) => translate(text, locale) };
}
