import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { contentText, contentLanguage } from "./content-language";
import { buildBibtex, buildApa } from "./bibtex";
import { renderTranslation } from "./render-translation";

describe("content translations", () => {
  it("uses supplied translations and marks missing or blank translations as English", () => {
    assert.equal(contentText("Learning to Bid", "Обучение выбору ставок", "ru"), "Обучение выбору ставок");
    assert.equal(contentLanguage("Обучение выбору ставок", "ru"), "ru");
    for (const missing of [undefined, "", "  "]) {
      assert.equal(contentText("Original title", missing, "ru"), "Original title");
      assert.equal(contentLanguage(missing, "ru"), "en");
    }
    assert.equal(contentText("Original title", "Перевод", "en"), "Original title");
    assert.equal(contentLanguage("Перевод", "en"), "en");
  });

  it("keeps supplied translations out of both citation formats", () => {
    const original = {
      id: "example",
      title: "Original title",
      authors: ["Original Name"],
      date: new Date("2026-08-17"),
      venue: "Original Venue",
      type: "paper" as const,
      tag: "Paper" as const,
      doi: "10.1234/example",
    };
    const translated = {
      ...original,
      ru: { title: "Перевод", venue: "Перевод издания", authors: { "Original Name": "Имя" } },
    };
    contentText(original.title, translated.ru.title, "ru");
    assert.equal(buildBibtex(translated), buildBibtex(original));
    assert.equal(buildApa(translated), buildApa(original));
    assert.equal(original.title, "Original title");
  });

  it("renders translated Markdown with the existing math and link pipeline", async () => {
    const html = await renderTranslation("## Оценка\n\nФормула $x^2$ и [статья](/publications/example).");
    assert.match(html, /<h2/);
    assert.match(html, /class="katex"/);
    assert.match(html, /href="\/publications\/example"/);
  });
});
