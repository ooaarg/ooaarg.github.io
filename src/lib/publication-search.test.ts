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
