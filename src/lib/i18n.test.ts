import { test } from "node:test";
import assert from "node:assert/strict";
import { languageUrl, localeFromUrl } from "./i18n";

test("shared language URLs accept only supported explicit locales", () => {
  assert.equal(localeFromUrl(new URL("https://example.com/?lang=ru")), "ru");
  assert.equal(localeFromUrl(new URL("https://example.com/?lang=en")), "en");
  assert.equal(localeFromUrl(new URL("https://example.com/?lang=fr")), undefined);
  assert.equal(localeFromUrl(new URL("https://example.com/")), undefined);
});

test("changing language preserves the route, repeated filters, and fragment", () => {
  const original = new URL(
    "https://example.com/publications?area=bandits&year=2025&year=2026&lang=en#results",
  );
  const next = languageUrl(original, "ru");
  assert.equal(next.pathname, "/publications");
  assert.deepEqual(next.searchParams.getAll("year"), ["2025", "2026"]);
  assert.equal(next.searchParams.get("area"), "bandits");
  assert.equal(next.hash, "#results");
  assert.deepEqual(next.searchParams.getAll("lang"), ["ru"]);
  assert.equal(original.searchParams.get("lang"), "en");
});
