import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { FILTER_KEYS, readSearch, searchUrl } from "./publication-search";

describe("publication search URLs", () => {
  it("round-trips search text, every facet, multiple selections, and sorting", () => {
    const state = readSearch();
    state.q = "regret & revenue + λ";
    state.sort = "oldest";
    for (const key of FILTER_KEYS) state.filters[key] = new Set(["A & B", "C/D + λ"]);
    const url = searchUrl(new URL("https://example.test/publications"), state);
    assert.deepEqual(readSearch(url.searchParams), state);
  });

  it("preserves unrelated parameters and the fragment without mutating the original URL", () => {
    const current = new URL("https://example.test/publications?utm_source=news&q=old#results");
    const state = readSearch(new URLSearchParams("area=bandits"));
    const url = searchUrl(current, state);
    assert.equal(url.searchParams.get("utm_source"), "news");
    assert.equal(url.hash, "#results");
    assert.equal(url.searchParams.has("q"), false);
    assert.equal(current.searchParams.get("q"), "old");
  });

  it("reads existing area/type/tag links and deduplicates repeated filters", () => {
    const state = readSearch(new URLSearchParams("area=bandits&area=bandits&type=paper&tag=online+learning"));
    assert.deepEqual([...state.filters.area], ["bandits"]);
    assert.deepEqual([...state.filters.type], ["paper"]);
    assert.deepEqual([...state.filters.tag], ["online learning"]);
    assert.equal(state.q, "");
    assert.equal(state.sort, "newest");
  });

  it("ignores empty filters, defaults invalid sorting, and preserves unmatched filter values", () => {
    const state = readSearch(new URLSearchParams("area=&author=Unknown&sort=invalid"));
    assert.equal(state.filters.area.size, 0);
    assert.deepEqual([...state.filters.author], ["Unknown"]);
    assert.equal(state.sort, "newest");
  });

  it("removes cleared values and produces stable URLs independent of selection order", () => {
    const current = new URL("https://example.test/publications?q=old&year=2024&sort=oldest");
    assert.equal(searchUrl(current, readSearch()).href, "https://example.test/publications");
    const a = readSearch(new URLSearchParams("tag=z&tag=a"));
    const b = readSearch(new URLSearchParams("tag=a&tag=z"));
    assert.equal(searchUrl(current, a).href, searchUrl(current, b).href);
  });
});

const searchPage = readFileSync(new URL("../pages/publications/index.astro", import.meta.url), "utf8");
const searchBootstrap = searchPage.match(/<script slot="head" is:inline>([\s\S]*?)<\/script>/)![1];
function pendingSearch(query: string) {
  let pending = false;
  runInNewContext(searchBootstrap, {
    location: { search: query },
    URLSearchParams,
    window: { addEventListener() {} },
    document: {
      addEventListener() {},
      documentElement: {
        setAttribute: () => {
          pending = true;
        },
      },
    },
  });
  return pending;
}

it("query-dependent publication pages wait for URL restoration before showing results", () => {
  for (const query of ["?sort=oldest", "?q=regret", ...FILTER_KEYS.map((key) => `?${key}=value`)]) {
    assert.equal(pendingSearch(query), true, query);
  }
  assert.equal(pendingSearch("?tag=&tag=ranking"), true);
});

it("default publication pages and unrelated query parameters show static results immediately", () => {
  for (const query of ["", "?sort=newest", "?sort=invalid", "?q=&tag=", "?utm_source=example"]) {
    assert.equal(pendingSearch(query), false, query);
  }
});

it("keeps the outgoing snapshot until URL-dependent results have committed", () => {
  const events = new Map<string, (event?: unknown) => void>();
  let skipped = 0;
  runInNewContext(searchBootstrap, {
    location: { search: "?sort=oldest" },
    URLSearchParams,
    window: {
      addEventListener: (name: string, handler: (event?: unknown) => void) => events.set(name, handler),
    },
    document: {
      documentElement: { setAttribute() {} },
      querySelector: () => null,
      addEventListener: (name: string, handler: () => void) => events.set(name, handler),
    },
  });
  events.get("pagereveal")!({ viewTransition: { skipTransition: () => skipped++ } });
  assert.equal(skipped, 0);
  events.get("publication-search-ready")!();
  assert.equal(skipped, 1);
});
