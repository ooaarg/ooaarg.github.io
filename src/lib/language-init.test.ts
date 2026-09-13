import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";

const site = readFileSync(new URL("../layouts/Site.astro", import.meta.url), "utf8");
const bootstrap = site.match(/<script is:inline>([\s\S]*?)<\/script>/)![1];

function start(href: string, blocked = false) {
  const url = new URL(href);
  let redirected: string | undefined;
  const attributes = new Map<string, string>();
  runInNewContext(bootstrap, {
    document: {
      documentElement: { setAttribute: (key: string, value: string) => attributes.set(key, value) },
    },
    location: {
      href,
      search: url.search,
      pathname: url.pathname,
      hash: url.hash,
      replace: (value: string) => {
        redirected = value;
      },
    },
    URL,
    URLSearchParams,
    localStorage: {
      getItem() {
        if (blocked) throw new Error("Storage unavailable");
        return "dark";
      },
    },
    window: { addEventListener() {} },
  });
  return { redirected, attributes };
}

test("legacy shared URLs redirect to static pages preserving filters and fragments", () => {
  assert.equal(
    start("https://example.com/publications?year=2025&year=2026&lang=ru#results").redirected,
    "https://example.com/ru/publications?year=2025&year=2026#results",
  );
  assert.equal(start("https://example.com/ru/about?lang=en").redirected, "https://example.com/en/about");
});

test("ordinary static language pages render immediately without redirects or storage", () => {
  for (const path of ["/en/", "/ru/", "/ru/about", "/en/?lang=invalid"]) {
    const result = start("https://example.com" + path, true);
    assert.equal(result.redirected, undefined);
    assert.equal(result.attributes.get("data-theme"), "dark");
    assert.equal(result.attributes.has("data-language-pending"), false);
  }
  assert.ok(!site.includes("visibility: hidden"));
  assert.ok(!site.includes("document.fonts.ready"));
});

test("old unprefixed URLs redirect to English with query and hash preserved", () => {
  assert.equal(start("https://example.com/").redirected, "https://example.com/en/");
  assert.equal(
    start("https://example.com/about?x=1#main").redirected,
    "https://example.com/en/about?x=1#main",
  );
  assert.equal(start("https://example.com/en/about?lang=ru").redirected, "https://example.com/ru/about");
  assert.equal(start("https://example.com/404.html").redirected, undefined);
});
