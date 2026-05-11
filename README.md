# OOAARG website

Source for [ooaarg.org](https://ooaarg.org) — the public site for the Online Optimization And Applications Research Group. Astro 6 + React islands + MDX content collections, deployed as a static site.

This README is for **adding content** (publications, people, news). For architecture and dev guidance see [`AGENTS.md`](./AGENTS.md).

## Setup

```bash
bun install
bun dev      # http://localhost:4321
```

We use [Bun](https://bun.sh) — not npm or yarn. The lockfile is `bun.lock`.

---

## Adding a publication

Each publication is one Markdown (or MDX, if you want math/HTML in the body) file in `src/content/publications/`. The filename — without the extension — becomes the URL slug.

```
src/content/publications/optimistic-newton.mdx   →   /publications/optimistic-newton
```

### 1. Pick a slug

Lowercase, kebab-case, stable forever. The slug shows up in the URL and in BibTeX keys, so don't rename it later.

### 2. Create the file

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
figure: "regret"
tags: ["Second-order", "Regret", "Convex"]
arxiv: "2605.01184"
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

### 3. Field reference

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
| `featured` |          | boolean (default `false`)                                                       | Featured tiles get a figure and bigger typography in the bento.                                                                                                                                          |
| `span`     |          | `2` \| `3` \| `4` \| `6` (default `2`)                                          | How many of 6 grid columns the tile takes. The grid auto-expands the last tile of any short row, so you mostly don't need to think about this. Featured tiles usually use `4`; ordinary ones `2` or `3`. |
| `figure`   |          | `regret` \| `grid` \| `none` (default `none`)                                   | Only renders on featured tiles. Use `regret` for a log-curve figure, `grid` for a heatmap.                                                                                                               |
| `tags`     |          | string array                                                                    | Free-form keywords. Power the `/publications` search-page "Tag" facet and the sidebar pills.                                                                                                             |
| `arxiv`    |          | string (e.g. `2605.01184`)                                                      | Renders an arXiv button + link.                                                                                                                                                                          |
| `github`   |          | URL                                                                             | GitHub button.                                                                                                                                                                                           |
| `pdf`      |          | URL                                                                             | PDF button.                                                                                                                                                                                              |
| `links`    |          | array of `{label, url}`                                                         | Arbitrary external links — IEEE, ACM, ResearchGate PDF, Springer, etc. Each renders as a button on the detail page. If the paper has no `arxiv`, the first entry also surfaces on the bento tile.        |
| `cited_by` |          | non-negative int                                                                | Shows the "Cited by (N)" sidebar block on the detail page.                                                                                                                                               |
| `funding`  |          | string                                                                          | Free-form funding line shown in the detail-page aside. Hidden if absent.                                                                                                                                 |

### 4. Body conventions

The body is rendered into the publication detail page (`/publications/<slug>`). Conventions used by existing entries:

- Open with a one-paragraph **bold lead** summarizing the result. The lead is what most readers will read.
- Use `## Why this matters`, `## Main result`, `## Code & reproducibility` (in that order) when relevant. They aren't required — only for featured papers.
- Write math with `$inline$` and `$$display$$` ([KaTeX](https://katex.org/docs/supported.html)).
- Link to arXiv / GitHub / data in prose, not just in the action buttons.

A minimal non-featured entry can be just frontmatter — the body is optional.

### 5. Preview locally

```bash
bun dev
```

Open `http://localhost:4321/blog` to confirm the bento tile renders, then click into it to confirm the detail page at `/publications/<slug>`. The search index (`/publications`), the home page's "Latest publications" list, the home `FeaturedHero` carousel (if you set `featured: true`), and the RSS feed (`/rss.xml`) all pick up the new entry automatically — no extra wiring. (News posts are different — they appear on `/blog` but **not** on `/publications`. See [Adding a news post](#adding-a-news-post).)

If the dev server says _"The collection 'publications' does not exist or is empty"_, restart it; Astro caches the collection on first boot.

### 6. Validate before pushing

```bash
bun run astro check    # type-checks the frontmatter against the Zod schema
bun run build          # full static build
```

Common errors:

- **`Expected string, received number` on `arxiv`** — quote the ID: `arxiv: '2605.01184'`, not `arxiv: 2605.01184`.
- **`Required` on `summary`** — every publication needs one, even talks.
- **`Invalid enum value` on `tag`/`type`/`area`** — only the values listed in the table are accepted. To add a new one, edit `src/content.config.ts`.

---

## Adding a news post

News posts (e.g. _"Three OOAARG papers accepted at NeurIPS 2026"_) appear on `/blog` mixed with publications, sorted by date, and get a dedicated detail page at `/blog/<slug>`. They are **excluded from `/publications`** — that page is publications-only.

Each news post is one MDX file in `src/content/news/`. Filename — without the extension — becomes the URL slug.

```
src/content/news/neurips-2026-accepted.mdx   →   /blog/neurips-2026-accepted
```

### 1. Create the file

```mdx
---
title: "Three OOAARG papers accepted at NeurIPS 2026"
date: 2026-12-01
summary: "Optimistic Online Newton, price-adaptive autobidding, and learned plan repair were all accepted to NeurIPS 2026 — two as Spotlights and one as a Main Track paper."

# Optional
image: "./neurips-2026.svg"
imageAlt: "NeurIPS 2026 — three OOAARG papers accepted"
span: 4
href: "https://neurips.cc/"
---

The body is MDX. Whatever you write here renders as the article on
`/blog/<slug>`. The `summary` above is what shows on the bento tile
and as the lede on the detail page.
```

### 2. Field reference

| Field      | Required | Type                                   | Notes                                                                                                                                                                                                                                               |
| ---------- | :------: | -------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `title`    |    ✓     | string                                 |                                                                                                                                                                                                                                                     |
| `date`     |    ✓     | ISO date (`2026-12-01`)                | Used to sort the blog feed and to derive the year for the year-filter pill.                                                                                                                                                                         |
| `summary`  |    ✓     | string ≤ 320 chars                     | Bento copy + detail-page lede.                                                                                                                                                                                                                      |
| `image`    |          | path                                   | **Co-located** in `src/content/news/`, referenced relative to the entry (`'./neurips-2026.svg'`). Processed by Astro's `image()` schema helper and emitted via `<Image />` — don't put it under `public/`. Omit for a text-only tile + detail page. |
| `imageAlt` |          | string (default `''`)                  | Alt text for the image. Required if the image is content-bearing rather than decorative.                                                                                                                                                            |
| `span`     |          | `2` \| `3` \| `4` \| `6` (default `3`) | How many of 6 grid columns the bento tile takes. The grid auto-expands the last tile of any short row, so you mostly don't need to think about this.                                                                                                |
| `href`     |          | URL                                    | Optional outbound link — renders a "Read more →" button on the tile and a "Visit link →" button on the detail page (e.g. the NeurIPS accepted-papers page).                                                                                         |

### 3. Body conventions

The body is rendered into `/blog/<slug>`. Plain Markdown is fine; MDX gives you JSX components if you ever need them. Math is not enabled on news pages by default (KaTeX CSS is only imported on `/publications/<id>` to keep other routes lean) — ask before adding it if a news post needs math.

A minimal entry can be just frontmatter — the body is optional.

### 4. Preview locally

```bash
bun dev
```

Open `http://localhost:4321/blog` to confirm the news tile renders, then click into it to confirm the detail page at `/blog/<slug>`.

If you renamed an existing `.md` to `.mdx` (or vice versa) and the dev server stops seeing the entry, clear Astro's content cache:

```bash
rm -rf .astro node_modules/.astro && bun dev
```

---

## Other content

- **Subgroup tabs** on the home page (Bandits / DBMS, with KPIs and keywords): `src/data/subgroups.ts`. Plain TypeScript, edit directly. The `id` here should match a publication `area` value if you want the cross-links to feel coherent.
- **Footer links and contact info**: `src/components/Footer.astro`.
- **Site description / OG meta**: `src/components/SeoHead.astro` and per-page `description` props.
- **OG social card**: `public/og-image.png`. Regenerate with `bun run build:og` after editing the SVG inside `scripts/build-og.mjs`.

---

## Conventions when contributing

- **Don't rename slugs** once published — they're the canonical URL.
- **Don't include `id` in frontmatter** — it's derived from the filename.
- **Use the `summary` field for the bento copy**, not a body paragraph. The body is for the detail page only.
- **Featured tiles cost real estate** — only mark `featured: true` for headline results. Two or three featured at a time is plenty.
- **Run `bun run astro check` before pushing** — it catches frontmatter typos that won't otherwise surface until build time.

---

## Commands

| Command                    | What it does                                                                                                                   |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `bun install`              | Install dependencies.                                                                                                          |
| `bun dev`                  | Dev server with hot reload at `http://localhost:4321`.                                                                         |
| `bun run astro check`      | Type-check Astro components, React islands, and content schemas.                                                               |
| `bun run build`            | Static build into `dist/`.                                                                                                     |
| `bun run preview`          | Serve `dist/` locally.                                                                                                         |
| `bun run build:og`         | Regenerate `public/og-image.png` from the inline SVG.                                                                          |
| `bun run build:standalone` | Build `dist/` then bundle `dist/index.html` into a single self-contained `dist/OOAARG-standalone.html` (CSS/JS/fonts inlined). |

For deeper docs on the architecture (theme system, view transitions, kinetic logo, bento packing, etc.), see [`CLAUDE.md`](./CLAUDE.md).
