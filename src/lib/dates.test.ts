import { describe, it as test } from "node:test";
import assert from "node:assert/strict";
import { formatDate } from "./dates";

describe("display dates", () => {
  test("formats English and Russian without parsing display labels", () => {
    assert.equal(formatDate("2026-08-17", "en"), "17 Aug 2026");
    assert.equal(formatDate("2026-08-17", "ru"), "17 авг. 2026 г.");
  });

  test("keeps date-only content stable across viewer time zones", () => {
    assert.equal(formatDate("2026-01-01T00:00:00Z", "en"), "1 Jan 2026");
    assert.equal(formatDate("2025-12-31T23:30:00-02:00", "ru"), "1 янв. 2026 г.");
  });

  test("preserves month precision in research area summaries", () => {
    assert.equal(formatDate(new Date("2026-08-17T00:00:00Z"), "en", "month"), "Aug 2026");
    assert.equal(formatDate("2026-08-17", "ru", "month"), "авг. 2026 г.");
  });
});
