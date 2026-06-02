# OOAARG website

Source for [ooaarg.github.io](https://ooaarg.github.io): the public site for the Online Optimization And Applications Research Group.

This README covers setup and content editing. Step-by-step guides for each content type live in [`docs/`](./docs).

## Setup

```bash
bun install
bun dev      # http://localhost:4321
```

---

## Adding content

Each content type has its own guide:

- [Adding a publication](./docs/adding-a-publication.md) — papers, preprints, code, and talks (`src/content/publications/`).
- [Adding a news post](./docs/adding-a-news-post.md) — blog/news tiles (`src/content/news/`).
- [Adding a person](./docs/adding-a-person.md) — people on `/about` (`src/content/people/`).

---

## Conventions when contributing

- **Don't rename slugs** once published — they're the canonical URL.
- **Don't include `id` in frontmatter** — it's derived from the filename.
- **Use the `summary` field for the bento copy**, not a body paragraph. The body is for the detail page only.
- **Featured tiles cost real estate** — only mark `featured: true` for headline results. Two or three featured at a time is plenty.
- **Run `bun run typecheck` before pushing** — it catches frontmatter typos that won't otherwise surface until build time. Run `bun run format` and `bun run lint` too if you touched code.

---

## Commands

| Command                | What it does                                                     |
| ---------------------- | ---------------------------------------------------------------- |
| `bun install`          | Install dependencies.                                            |
| `bun dev`              | Dev server with hot reload at `http://localhost:4321`.           |
| `bun run typecheck`    | Type-check Astro components, React islands, and content schemas (`astro check`). |
| `bun run lint`         | Lint JS/TS with [oxlint](https://oxc.rs/docs/guide/usage/linter). `lint:fix` autofixes. |
| `bun run format`       | Format JS/TS/CSS with [oxfmt](https://oxc.rs/docs/guide/usage/formatter). `format:check` verifies without writing. |
| `bun run build`        | Static build into `dist/`.                                       |
| `bun run preview`      | Serve `dist/` locally.                                           |
