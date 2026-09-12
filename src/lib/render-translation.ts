import config from "../../astro.config.mjs";

// Use the site's existing unified pipeline, including math, for both languages.
const renderer = config.markdown!.processor!.createRenderer({});

export async function renderTranslation(markdown: string): Promise<string> {
  return (await (await renderer).render(markdown)).code;
}
