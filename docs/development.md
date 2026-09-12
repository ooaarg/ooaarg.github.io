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

## Interface languages

The header offers English (default) and Russian. The visitor's choice is saved in
`ooaarg-language` and used for every page. Opening a URL with `?lang=en` or
`?lang=ru` sets the language for a visitor who has not chosen one; an explicit
choice takes precedence over the URL. Loading a page or switching language updates
the current URL without adding a history entry, preserving filters and fragments.
Back/Forward keeps the saved choice. Without JavaScript the site stays in English
and the selector is disabled.

Translations live in [src/lib/i18n.ts](../src/lib/i18n.ts). Mark static text-only
elements with `data-i18n="English source text"`; use a child span when an element
also contains icons or other markup. Accessible labels use
`data-i18n-aria-label` or `data-i18n-title`. Preact components use
[useLocale](../src/lib/use-locale.ts) and `t("English source text")` so updates
remain part of their normal rendering. Unknown strings fall back to the original.

Content entries accept optional Russian fields as described in
[English and Russian content](./translations.md). Display text and browser page
metadata use provided translations, with English fallback. Search matches both
languages. Citations and scholarly metadata retain the originals. The same routes serve both languages, selected with the `lang` query parameter.

Displayed dates use [formatDate](../src/lib/dates.ts) with `en-GB` or `ru-RU`
and UTC, including search results, news, detail pages, research summaries, and the
footer. Static pages use [LocalizedDate](../src/components/LocalizedDate.astro);
search results carry a separate ISO date for formatting. Month-only summaries
stay month-only. Machine-readable dates and citation output are unchanged.
