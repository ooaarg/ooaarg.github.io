# Local development

Use Bun for dependencies and scripts. [package.json](../package.json) specifies the Bun version in `packageManager` and the runtime requirements in `engines`.

```bash
bun install --frozen-lockfile
bun dev
```

Open `http://localhost:4321`.

## Commands

| Command | Purpose |
| --- | --- |
| `bun dev` | Start the development server. |
| `bun run typecheck` | Check Astro, Preact, TypeScript, and content schemas. |
| `bun test` | Verify citations and search URL round-trips. |
| `bun run lint` | Check JS/TS with oxlint; `lint:fix` applies fixes. |
| `bun run format:check` | Check formatting with oxfmt; `format` writes changes. |
| `bun run build` | Create the static site in `dist/`. |
| `bun run preview` | Serve the built site locally. |

Run typecheck, tests, lint, format checks, and a build for code or content changes. For UI changes, check affected pages on desktop and mobile, including keyboard navigation. [AGENTS.md](../AGENTS.md#toolchain-and-verification) covers browser checks and performance targets. Documentation-only changes need link checks and `git diff --check`.

Builds preserve Astro's cache and clear `dist/`. To refresh cached content while troubleshooting, use `bun run build --force`.

## Routes

Page files live in [src/pages](../src/pages).

| Route | Content |
| --- | --- |
| `/` | Featured paper carousel, research areas, latest publications, and the join section. |
| `/blog` | Publications and news together, newest first, with a year filter. |
| `/blog/<id>` | News detail. |
| `/publications` | Publication search, with filters and sorting saved in the URL. |
| `/publications/<id>` | Publication body, links, figure when available, and citations. |
| `/publications/<id>.bib` | Downloadable BibTeX citation. |
| `/about` | Lead, staff, partners grouped by organization, and alumni. |
| `/about/<id>` | Person's bio and publications; partner pages omit the publication list. |
| `/rss.xml` | Publications feed; news is excluded. |

The build also generates the 404 page and sitemap. The [GitHub Pages workflow](../.github/workflows/deploy.yml) builds and deploys `dist/` on pushes to `main` or manual dispatch.

## Content

Publication, news, and people entries live in [src/content](../src/content). See the [authoring guides](../README.md#start-here) for fields, images, figures, and examples. [src/content.config.ts](../src/content.config.ts) defines the accepted frontmatter.
