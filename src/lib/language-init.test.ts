import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";

const site = readFileSync(new URL("../layouts/Site.astro", import.meta.url), "utf8");
const bootstrap = site.match(/<script is:inline>([\s\S]*?)<\/script>/)![1];

function start(href: string, blocked = false, notFound = false, previousUrl?: string) {
  const url = new URL(href);
  let redirected: string | undefined;
  const attributes = new Map<string, string>();
  const events = new Map<string, (event: unknown) => void>();
  runInNewContext(bootstrap, {
    document: {
      querySelector: () => (notFound ? {} : null),
      documentElement: {
        setAttribute: (key: string, value: string) => attributes.set(key, value),
        hasAttribute: (key: string) => attributes.has(key),
        removeAttribute: (key: string) => attributes.delete(key),
      },
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
    window: {
      navigation: previousUrl ? { activation: { from: { url: previousUrl } } } : undefined,
      addEventListener: (name: string, handler: (event: unknown) => void) => events.set(name, handler),
    },
  });
  return { redirected, attributes, events };
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

test("generic 404 documents recover in the language of the missing URL without redirect loops", () => {
  assert.equal(start("https://example.com/ru/missing", false, true).redirected, "/ru/404/");
  assert.equal(start("https://example.com/en/missing", false, true).redirected, "/en/404/");
  assert.equal(start("https://example.com/missing?lang=ru", false, true).redirected, "/ru/404/");
  assert.equal(start("https://example.com/404.html", false, true).redirected, "/en/404/");
  for (const path of ["/ru/404/", "/en/404/"]) {
    assert.equal(start("https://example.com" + path, true, true).redirected, undefined);
  }
});

test("fragment navigation skips both snapshots while ordinary page transitions remain enabled", () => {
  let skipped = 0;
  const viewTransition = { skipTransition: () => skipped++ };
  const source = start("https://example.com/ru/about");
  source.events.get("pageswap")!({
    viewTransition,
    activation: { entry: { url: "https://example.com/ru/#join" } },
  });
  assert.equal(skipped, 1);
  start("https://example.com/ru/#join").events.get("pagereveal")!({ viewTransition });
  assert.equal(skipped, 2);
  source.events.get("pageswap")!({
    viewTransition,
    activation: { entry: { url: "https://example.com/ru/" } },
  });
  source.events.get("pagereveal")!({ viewTransition });
  source.events.get("pageswap")!({});
  source.events.get("pagereveal")!({});
  assert.equal(skipped, 2);
});

test("language changes suppress geometry animation while retaining the transition for search restoration", () => {
  let skipped = 0;
  const viewTransition = { skipTransition: () => skipped++ };
  const source = start("https://example.com/en/publications?sort=oldest");
  source.events.get("pageswap")!({
    viewTransition,
    activation: { entry: { url: "https://example.com/ru/publications?sort=oldest" } },
  });
  assert.equal(source.attributes.has("data-language-switch"), true);
  const destination = start(
    "https://example.com/ru/publications?sort=oldest",
    false,
    false,
    "https://example.com/en/publications?sort=oldest",
  );
  destination.events.get("pagereveal")!({ viewTransition });
  assert.equal(destination.attributes.has("data-language-switch"), true);
  assert.equal(skipped, 0);
  source.events.get("pageswap")!({
    viewTransition,
    activation: { entry: { url: "https://example.com/en/blog" } },
  });
  assert.equal(source.attributes.has("data-language-switch"), false);
});
