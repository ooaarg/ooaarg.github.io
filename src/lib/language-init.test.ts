import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";

// Execute the actual head bootstrap before any body or language module exists.
const site = readFileSync(new URL("../layouts/Site.astro", import.meta.url), "utf8");
const bootstrap = site.match(/<script is:inline>([\s\S]*?)<\/script>/)![1];

function start(search: string, saved: string | null, blocked = false) {
  const attributes = new Map<string, string>();
  const html = {
    lang: "en",
    setAttribute: (key: string, value: string) => attributes.set(key, value),
    hasAttribute: (key: string) => attributes.has(key),
    removeAttribute: (key: string) => attributes.delete(key),
  };
  let fallback = () => {};
  runInNewContext(bootstrap, {
    document: { documentElement: html },
    location: { search, hash: "" },
    URLSearchParams,
    localStorage: {
      getItem(key: string) {
        if (blocked) throw new Error("Storage unavailable");
        return key === "ooaarg-language" ? saved : null;
      },
    },
    window: {
      addEventListener() {},
      setTimeout(callback: () => void) {
        fallback = callback;
      },
    },
  });
  return { html, fallback: () => fallback() };
}

test("Russian preference gates the initial document; explicit English stays immediately readable", () => {
  for (const search of ["", "?lang=ru", "?lang=invalid"]) {
    const { html } = start(search, "ru");
    assert.equal(html.lang, "ru");
    assert.equal(html.hasAttribute("data-language-pending"), true);
  }
  const { html } = start("?lang=en", "ru");
  assert.equal(html.lang, "en");
  assert.equal(html.hasAttribute("data-language-pending"), false);
});

test("failed language scripts reveal English, while slow fonts preserve completed Russian translation", () => {
  const failed = start("?lang=ru", null);
  failed.fallback();
  assert.equal(failed.html.lang, "en");
  assert.equal(failed.html.hasAttribute("data-language-pending"), false);

  const translated = start("?lang=ru", null);
  translated.html.setAttribute("data-language-ready", "");
  translated.fallback();
  assert.equal(translated.html.lang, "ru");
  assert.equal(translated.html.hasAttribute("data-language-pending"), false);
});

test("blocked storage does not prevent explicit Russian links or the default English page", () => {
  assert.equal(start("?lang=ru", null, true).html.lang, "ru");
  assert.equal(start("", null, true).html.lang, "en");
});
