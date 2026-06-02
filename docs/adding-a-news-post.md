# Adding a news post

News posts (e.g. _"Three OOAARG papers accepted at NeurIPS 2026"_) appear on `/blog` mixed with publications, sorted by date, and get a dedicated detail page at `/blog/<slug>`. They are **excluded from `/publications`** — that page is publications-only.

Each news post is one MDX file in `src/content/news/`. Filename — without the extension — becomes the URL slug.

```
src/content/news/neurips-2026-accepted.mdx   →   /blog/neurips-2026-accepted
```

## 1. Create the file

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

## 2. Field reference

| Field      | Required | Type                                   | Notes                                                                                                                                                                                                                                               |
| ---------- | :------: | -------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `title`    |    ✓     | string                                 |                                                                                                                                                                                                                                                     |
| `date`     |    ✓     | ISO date (`2026-12-01`)                | Used to sort the blog feed and to derive the year for the year-filter pill.                                                                                                                                                                         |
| `summary`  |    ✓     | string ≤ 320 chars                     | Bento copy + detail-page lede.                                                                                                                                                                                                                      |
| `image`    |          | path                                   | **Co-located** in `src/content/news/`, referenced relative to the entry (`'./neurips-2026.svg'`). Processed by Astro's `image()` schema helper and emitted via `<Image />` — don't put it under `public/`. Omit for a text-only tile + detail page. |
| `imageAlt` |          | string (default `''`)                  | Alt text for the image. Required if the image is content-bearing rather than decorative.                                                                                                                                                            |
| `span`     |          | `2` \| `3` \| `4` \| `6` (default `3`) | How many of 6 grid columns the bento tile takes. The grid auto-expands the last tile of any short row, so you mostly don't need to think about this.                                                                                                |
| `href`     |          | URL                                    | Optional outbound link — renders a "Read more →" button on the tile and a "Visit link →" button on the detail page (e.g. the NeurIPS accepted-papers page).                                                                                         |

## 3. Body conventions

The body is rendered into `/blog/<slug>`. Plain Markdown is fine; MDX gives you JSX components if you ever need them. Math is not enabled on news pages by default (KaTeX CSS is only imported on `/publications/<id>` to keep other routes lean) — ask before adding it if a news post needs math.

A minimal entry can be just frontmatter — the body is optional.

## 4. Preview locally

```bash
bun dev
```

Open `http://localhost:4321/blog` to confirm the news tile renders, then click into it to confirm the detail page at `/blog/<slug>`.

If you renamed an existing `.md` to `.mdx` (or vice versa) and the dev server stops seeing the entry, clear Astro's content cache:

```bash
rm -rf .astro node_modules/.astro && bun dev
```
