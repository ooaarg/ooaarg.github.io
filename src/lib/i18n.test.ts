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

test("shared language overrides storage; missing or invalid language uses storage", async () => {
  const { readLocale } = await import("./i18n");
  const previousWindow = Object.getOwnPropertyDescriptor(globalThis, "window");
  const previousStorage = Object.getOwnPropertyDescriptor(globalThis, "localStorage");
  let href = "https://example.com/?lang=ru";
  let saved = "en";
  Object.defineProperty(globalThis, "window", {
    configurable: true,
    value: {
      location: {
        get href() {
          return href;
        },
      },
    },
  });
  Object.defineProperty(globalThis, "localStorage", { configurable: true, value: { getItem: () => saved } });
  try {
    assert.equal(readLocale(), "ru");
    saved = "ru";
    href = "https://example.com/?lang=en";
    assert.equal(readLocale(), "en");
    href = "https://example.com/";
    assert.equal(readLocale(), "ru");
    href = "https://example.com/?lang=invalid";
    assert.equal(readLocale(), "ru");
    Object.defineProperty(globalThis, "localStorage", {
      configurable: true,
      get() {
        throw new Error("Storage blocked");
      },
    });
    assert.equal(readLocale(), "en");
    href = "https://example.com/?lang=ru";
    assert.equal(readLocale(), "ru");
  } finally {
    if (previousWindow) Object.defineProperty(globalThis, "window", previousWindow);
    else Reflect.deleteProperty(globalThis, "window");
    if (previousStorage) Object.defineProperty(globalThis, "localStorage", previousStorage);
    else Reflect.deleteProperty(globalThis, "localStorage");
  }
});
