import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { buildApa, buildBibtex, type CitablePublication } from "./bibtex";

const paper: CitablePublication = {
  id: "pub-01",
  title: "A useful result",
  authors: ["Alex Morgan", "Jordan Ellis"],
  date: new Date("2025-01-01T00:00:00Z"),
  venue: "Example Conference",
  type: "paper",
  tag: "Paper",
};

describe("publication citations", () => {
  it("uses the appropriate entry and venue fields for papers", () => {
    const conference = buildBibtex(paper);
    assert.match(conference, /^@inproceedings\{/);
    assert.match(conference, /booktitle\s+= \{Example Conference\}/);
    const journal = buildBibtex({ ...paper, tag: "Journal", venue: "Example Journal" });
    assert.match(journal, /^@article\{/);
    assert.match(journal, /journal\s+= \{Example Journal\}/);
    assert.doesNotMatch(journal, /booktitle/);
  });

  it("does not treat preprints, software, or talks as proceedings", () => {
    for (const type of ["preprint", "code", "talk"] as const) {
      const citation = buildBibtex({ ...paper, type });
      assert.match(citation, /^@misc\{/);
      assert.doesNotMatch(citation, /booktitle|journal\s+=/);
    }
    assert.match(buildBibtex({ ...paper, tag: "Preprint" }), /^@misc\{/);
  });

  it("retains the full slug, digits, case, and encoded punctuation in distinct keys", () => {
    const ids = ["pub-01", "pub-02", "pub-1", "pub/01", "pub_2f_01", "Pub-01"];
    const keys = ids.map((id) => buildBibtex({ ...paper, id }).split(",\n")[0]);
    assert.equal(new Set(keys).size, ids.length);
    assert.match(keys[0], /2025-pub-01$/);
  });

  it("escapes plain text TeX characters without escaping generated author separators", () => {
    const citation = buildBibtex({
      ...paper,
      title: "A&B {50%}: $x_1$ #2 \\ ~ ^",
      authors: ["A & B", "C_One"],
    });
    assert.ok(
      citation.includes(
        String.raw`A\&B \{50\%\}: \$x\_1\$ \#2 \textbackslash{} \textasciitilde{} \textasciicircum{}`,
      ),
    );
    assert.ok(citation.includes(String.raw`A \& B and C\_One`));
  });

  it("preserves DOI and arXiv identifiers, prefers DOI in APA, and falls back to arXiv", () => {
    const pub = { ...paper, doi: "10.1234/a_b", arxiv: "2501.12345" };
    const bibtex = buildBibtex(pub);
    assert.match(bibtex, /doi\s+= \{10\.1234\/a_b\}/);
    assert.match(bibtex, /eprint\s+= \{2501\.12345\}/);
    assert.match(bibtex, /archivePrefix\s+= \{arXiv\}/);
    assert.ok(bibtex.includes("https://arxiv.org/abs/2501.12345"));
    assert.ok(buildApa(pub).endsWith("https://doi.org/10.1234/a_b"));
    assert.ok(buildApa({ ...pub, doi: undefined }).endsWith("https://arxiv.org/abs/2501.12345"));
  });

  it("uses a metadata-limited APA-style fallback without invented names or issue numbers", () => {
    assert.equal(
      buildApa(paper),
      "Alex Morgan, & Jordan Ellis (2025). A useful result. In Example Conference.",
    );
    assert.equal(
      buildApa({ ...paper, tag: "Journal", venue: "Example Journal" }),
      "Alex Morgan, & Jordan Ellis (2025). A useful result. Example Journal.",
    );
    assert.match(
      buildApa({ ...paper, type: "preprint" }),
      /A useful result \[Preprint\]\. Example Conference\./,
    );
    assert.match(buildApa({ ...paper, type: "code" }), /\[Software\]/);
    assert.match(buildApa({ ...paper, type: "talk" }), /\[Presentation\]/);
  });
});
