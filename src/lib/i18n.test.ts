import { test } from "node:test";
import assert from "node:assert/strict";
import { languageUrl, localeFromUrl, localizedHref, translate } from "./i18n";

test("the path determines the rendered locale, independently of legacy queries", () => {
  for (const path of ["/ru", "/ru/", "/ru/publications/pub-25?lang=en"]) {
    assert.equal(localeFromUrl(new URL(path, "https://example.com")), "ru");
  }
  for (const path of ["/", "/russian", "/publications?lang=ru"]) {
    assert.equal(localeFromUrl(new URL(path, "https://example.com")), "en");
  }
});

test("language navigation preserves repeated filters and fragments without duplicate prefixes", () => {
  const original = new URL(
    "https://example.com/publications?area=bandits&year=2025&year=2026&lang=en#results",
  );
  const next = languageUrl(original, "ru");
  assert.equal(next.pathname, "/ru/publications");
  assert.deepEqual(next.searchParams.getAll("year"), ["2025", "2026"]);
  assert.equal(next.searchParams.get("area"), "bandits");
  assert.equal(next.hash, "#results");
  assert.equal(next.searchParams.has("lang"), false);
  assert.equal(original.searchParams.get("lang"), "en");
  assert.equal(languageUrl(next, "ru").href, next.href);
  assert.equal(languageUrl(next, "en").pathname, "/en/publications");
  assert.equal(languageUrl(new URL("https://example.com/ru/"), "en").pathname, "/en/");
});

test("only page links are localized; downloads and external destinations remain intact", () => {
  assert.equal(localizedHref("/about/person-01", "ru"), "/ru/about/person-01");
  assert.equal(localizedHref("/#join", "ru"), "/ru/#join");
  for (const href of [
    "/publications/pub-25.bib",
    "/rss.xml",
    "/favicon.svg",
    "https://example.com",
    "//example.com/path",
    "mailto:placeholder@example.com",
    "#section",
  ]) {
    assert.equal(localizedHref(href, "ru"), href);
  }
  assert.equal(translate("OOAARG", "ru"), "OOAARG");
});

test("the language switch resolves both localized 404 pages", () => {
  assert.equal(languageUrl(new URL("https://example.com/ru/404/"), "en").pathname, "/en/404/");
  assert.equal(languageUrl(new URL("https://example.com/404.html"), "ru").pathname, "/ru/404/");
});

test("English prefixes are replaced rather than nested", () => {
  assert.equal(
    languageUrl(new URL("https://example.com/en/about?year=2026#main"), "ru").href,
    "https://example.com/ru/about?year=2026#main",
  );
  assert.equal(localizedHref("/en/about", "en"), "/en/about");
  assert.equal(localizedHref("/", "en"), "/en/");
});
