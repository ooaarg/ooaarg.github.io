# Adding a publication

Each publication is one Markdown (or MDX, if you want math/HTML in the body) file in `src/content/publications/`. The filename — without the extension — becomes the URL slug.

```
src/content/publications/optimistic-newton.mdx   →   /publications/optimistic-newton
```

## 1. Pick a slug

Lowercase, kebab-case, stable forever. The slug shows up in the URL and in BibTeX keys, so don't rename it later.

## 2. Create the file

Drop in this template and fill it out:

```mdx
---
title: "Optimistic Online Newton with Sublinear Regret"
authors: ["AuthorName AuthurSurname"]
date: 2026-05-02
venue: "ICML 2026"
tag: "Oral"
type: "paper"
area: "bandits"
summary: "A second-order online learner that matches the regret of the best Newton step in hindsight, while remaining one-pass with O(d²) memory."

# Optional
featured: true
span: 4
tags: ["Second-order", "Regret", "Convex"]
arxiv: "2605.01184"
doi: "10.1145/3696410.3714657"
github: "https://github.com/ooaarg/oon"
pdf: "https://example.org/oon.pdf"
links:
  - { label: "IEEE", url: "https://ieeexplore.ieee.org/document/12345" }
  - {
      label: "ResearchGate PDF",
      url: "https://www.researchgate.net/publication/...",
    }
---

The body is MDX. Whatever you write here is rendered as the article on the
publication detail page. Use `##` headings for sections.

## Why this matters

Inline math like $O(d \log T)$ and display math:

$$
R_T \;\le\; \frac{d}{\alpha} \cdot \log\!\left(1 + \frac{T}{\lambda}\right) + O(1).
$$

Standard Markdown formatting works: **bold**, _italic_, `code`,
[links](https://arxiv.org/abs/2605.01184), bullet lists, etc.
```

## 3. Field reference

| Field      | Required | Type                                                                            | Notes                                                                                                                                                                                                    |
| ---------- | :------: | ------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `title`    |    ✓     | string                                                                          |                                                                                                                                                                                                          |
| `authors`  |    ✓     | string array (≥ 1)                                                              | Order matters — first author shows up in BibTeX keys and "Aydın et al." crumbs.                                                                                                                          |
| `date`     |    ✓     | ISO date (`2026-05-02`)                                                         | Used to sort the list and to derive the year.                                                                                                                                                            |
| `venue`    |    ✓     | string                                                                          | E.g. `ICML 2026`, `arXiv`, `JMLR 27(81)`, `GitHub`.                                                                                                                                                      |
| `tag`      |    ✓     | `Oral` \| `Spotlight` \| `Paper` \| `Preprint` \| `Journal` \| `Code` \| `Talk` | The pill shown on the tile.                                                                                                                                                                              |
| `type`     |    ✓     | `paper` \| `preprint` \| `code` \| `talk`                                       | The Publications search-page facet bucket.                                                                                                                                                               |
| `area`     |    ✓     | `bandits` \| `autobidding` \| `dbms` \| `optimization`                          | Research area. To add a new value, edit the `area` enum in `src/content.config.ts` and the `AREA_LABEL` map in `src/pages/publications/[id].astro`.                                                      |
| `summary`  |    ✓     | string ≤ 320 chars                                                              | Shown on tiles and in the RSS feed. One sentence works best.                                                                                                                                             |
| `featured` |          | boolean (default `false`)                                                       | Bigger typography and prominence in the bento. (The figure, if any, comes from a matching `.tsx` component — see below — not from `featured`.)                                                            |
| `span`     |          | `2` \| `3` \| `4` \| `6` (default `2`)                                          | How many of 6 grid columns the tile takes. The grid auto-expands the last tile of any short row, so you mostly don't need to think about this. Featured tiles usually use `4`; ordinary ones `2` or `3`. |
| `tags`     |          | string array                                                                    | Free-form keywords. Power the `/publications` search-page "Tag" facet and the sidebar pills.                                                                                                             |
| `arxiv`    |          | string (e.g. `2605.01184`)                                                      | Renders an arXiv button + link.                                                                                                                                                                          |
| `doi`      |          | string (e.g. `10.1145/3696410.3714657`)                                         | DOI of the published/accepted version. Resolves to the publisher page (ACM, IEEE, Springer, …) and renders as the **primary "Paper" button**, ahead of `arxiv`. Also included in the BibTeX/APA citation. Don't include `https://doi.org/`.        |
| `github`   |          | URL                                                                             | GitHub button.                                                                                                                                                                                           |
| `pdf`      |          | URL                                                                             | PDF button.                                                                                                                                                                                              |
| `links`    |          | array of `{label, url}`                                                         | Arbitrary external links — Springer, Zenodo, HuggingFace, dataset pages, etc. Each renders as a button on the detail page. A `{ label: "DOI", … }` entry is treated like the `doi` field: promoted to the primary **"Paper"** button (and picked up for the citation), not shown as a plain link. The first non-DOI entry surfaces on the bento tile only when there's no `doi`/`arxiv` (see primary-link order below).        |
| `cited_by` |          | non-negative int                                                                | Shows the "Cited by (N)" sidebar block on the detail page.                                                                                                                                               |
| `funding`  |          | string                                                                          | Free-form funding line shown in the detail-page aside. Hidden if absent.                                                                                                                                 |

**Primary link.** The accented button (and the single link on the bento tile) follows this order: DOI (the `doi` field _or_ a `links[]` "DOI" entry) → `arxiv` → first remaining `links[]` entry. So a published paper leads with an accented **"Paper"** button and arXiv drops to a secondary button; an arXiv-only preprint leads with **"arXiv"**.

## 4. Body conventions

The body is rendered into the publication detail page (`/publications/<slug>`). Conventions used by existing entries:

- Open with a one-paragraph **bold lead** summarizing the result. The lead is what most readers will read.
- Use `## Why this matters`, `## Main result`, `## Code & reproducibility` (in that order) when relevant. They aren't required — only for featured papers.
- Write math with `$inline$` and `$$display$$` ([KaTeX](https://katex.org/docs/supported.html)).
- Link to arXiv / GitHub / data in prose, not just in the action buttons.

A minimal non-featured entry can be just frontmatter — the body is optional.

## Adding a figure (optional)

A paper figure is a React component at `src/components/publication/figures/<area>/<slug>.tsx` exporting a default component (usually an inline SVG). The filename must match the publication slug — the loader (`src/components/publication/PaperFigure.tsx`) globs `figures/**` and maps each file to its slug by basename, so the `<area>` subdirectory is just organization. Drop the file in and it renders on the bento tile and detail page, no wiring needed. See the existing figures for examples.

## 5. Preview locally

```bash
bun dev
```

Open `http://localhost:4321/blog` to confirm the bento tile renders, then click into it to confirm the detail page at `/publications/<slug>`. The search index (`/publications`), the home page's "Latest publications" list, the home `FeaturedHero` carousel (if you set `featured: true`), and the RSS feed (`/rss.xml`) all pick up the new entry automatically — no extra wiring. (News posts are different — they appear on `/blog` but **not** on `/publications`. See [Adding a news post](./adding-a-news-post.md).)

If the dev server says _"The collection 'publications' does not exist or is empty"_, restart it; Astro caches the collection on first boot.

## 6. Validate before pushing

```bash
bun run typecheck      # type-checks the frontmatter against the Zod schema (astro check)
bun run build          # full static build
```

Common errors:

- **`Expected string, received number` on `arxiv`** — quote the ID: `arxiv: '2605.01184'`, not `arxiv: 2605.01184`.
- **`Required` on `summary`** — every publication needs one, even talks.
- **`Invalid enum value` on `tag`/`type`/`area`** — only the values listed in the table are accepted. To add a new one, edit `src/content.config.ts`.
