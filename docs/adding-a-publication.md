# Adding a publication

Create a Markdown or MDX file in `src/content/publications/`. Its filename determines the URL: `example-paper.mdx` becomes `/publications/example-paper`. Keep a slug stable once published; it is also used in citation keys and figure lookup.

## Entry template

The values below are examples to replace with the actual paper metadata. The body is optional.

```mdx
---
title: "Example publication"
authors: ["Example Researcher"]
date: 2026-05-02
venue: "Example Conference"
tag: "Paper"
type: "paper"
area: "bandits"
summary: "A short description of the paper's result and why it matters."
tags: ["Regret", "Online learning"]

# Optional tile presentation
featured: true
span: 4
---

A short introduction to the result.

## Main result

Inline math uses $O(d \log T)$. Display math uses:

$$
R_T \le \frac{d}{\alpha} \log(1 + T).
$$
```

Authors link to `/about/<id>` when their names exactly match a person entry's `name`. Do not add an `id` field to frontmatter.

## Fields

[src/content.config.ts](../src/content.config.ts) defines the schema.

| Field | Required | Meaning |
| --- | :---: | --- |
| `title` | Yes | Publication title. |
| `authors` | Yes | Nonempty array of names, in citation order. |
| `date` | Yes | ISO date, used for ordering and year filters. |
| `venue` | Yes | Conference, journal, or other publication venue. |
| `tag` | Yes | Display badge: `Oral`, `Spotlight`, `Paper`, `Preprint`, `Journal`, `Code`, or `Talk`. |
| `type` | Yes | Search category: `paper`, `preprint`, `code`, or `talk`. |
| `area` | Yes | `bandits`, `autobidding`, `dbms`, `optimization`, or `misc`. |
| `summary` | Yes | At most 320 characters. Used by search, RSS, featured blog tiles, and as the home carousel's fallback copy. |
| `heroSummary` | | At most 500 characters. Overrides `summary` in the home carousel only. |
| `featured` | | Defaults to `false`. Emphasizes the blog tile and shows its summary; does not select the home carousel. |
| `featuredOrder` | | Legacy integer metadata, accepted but unused. Omit for new entries. |
| `span` | | Base width in a six-column blog grid: `2`, `3`, `4`, or `6`; defaults to `2`. The packer may expand it to complete a row. |
| `tags` | | Array of keywords for search and detail-page links. |
| `arxiv` | | Quoted arXiv ID, e.g. `"2605.01184"`. |
| `doi` | | Bare DOI, without the `https://doi.org/` prefix. Used for the Paper link and citations. |
| `github`, `pdf` | | Optional URLs for code and the PDF. |
| `links` | | Array of `{label, url}` objects for other resources. |
| `cited_by` | | Nonnegative integer accepted by the schema; currently not displayed. |
| `funding` | | Funding text shown in the detail-page aside. |

To add a research area, update the schema, `src/data/areas.ts`, `AREA_LABEL` in `src/pages/publications/[id].astro`, and `FACETS.area` in `SearchIndex.tsx`. The existing `misc` area is excluded from the home research-area grid.

## Links and citations

Link handling is shared in [src/lib/pubs.ts](../src/lib/pubs.ts). A bare `doi` or a `links` entry labelled `DOI` produces the primary **Paper** link. Without a DOI, a `links` entry labelled `Paper` supplies that link. The blog tile then falls back to arXiv, then the first remaining extra link. Promoted DOI/Paper entries are omitted from the extra-link list.

The detail page shows Paper, arXiv, PDF, GitHub, and remaining extra links when supplied. BibTeX and APA citations are built in [src/lib/bibtex.ts](../src/lib/bibtex.ts) and include a DOI when available.

## Body and figure

The body renders on the publication detail page. Use `##` headings for sections, and `$inline$` or `$$display$$` for math. Choose sections that explain the actual work; no fixed section sequence is required.

An optional figure is a Preact component at `src/components/publications/detail/figures/<area>/<slug>.tsx`, with a default export. Existing components use React-compatible imports. The basename must match the publication slug; `PaperFigure.tsx` registers it automatically. It renders on blog and detail pages, and in the home/search islands when that publication is shown. No frontmatter figure field or separate hydration directive is needed for a static SVG.

## Preview and validation

```bash
bun dev
```

Check the tile on `/blog`, the detail page at `/publications/<slug>`, and the result on `/publications`. Entries also feed `/rss.xml` and the home page's latest-publications list.

The home carousel shows the five newest entries with `type: paper` and a `tag` other than `Preprint`. Setting `featured: true` does not affect eligibility or order.

```bash
bun run typecheck
bun run build
```

Quote numeric-looking arXiv IDs, keep summaries within their length limit, and use the schema's exact enum values. If the dev server misses a renamed entry, restart it; the build script clears the content cache before rebuilding.
