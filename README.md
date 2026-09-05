# OOAARG website

Source for [ooaarg.github.io](https://ooaarg.github.io): the public site for the Online Optimization And Applications Research Group. The site helps readers understand the group's research, find and cite publications, learn about its people, and get in touch.

## Development

Use **Bun 1.4.2** for dependencies and scripts, as pinned in `package.json`. Node.js **24 or newer** is required; CI uses Node 24 LTS.

```bash
bun install --frozen-lockfile
bun dev
```

Open `http://localhost:4321`. The site uses Astro 7 with static output, native Preact islands, and Markdown content collections with KaTeX math. Navigation uses normal browser page loads with native view transitions where supported. Fonts are self-hosted, and shared styles are served as cacheable CSS files.

TypeScript stays on version 6 to match Astro's checker, and KaTeX stays on 0.16 to match `rehype-katex`. Upgrade these together with their consumers when compatible releases are available.

| Command | Purpose |
| --- | --- |
| `bun dev` | Start the development server. |
| `bun run typecheck` | Check Astro, Preact, TypeScript, and content schemas. |
| `bun test` | Verify citation types, unique keys, escaping, and identifiers. |
| `bun run lint` | Check JS/TS with oxlint; `lint:fix` applies fixes. |
| `bun run format:check` | Check formatting with oxfmt; `format` writes changes. |
| `bun run build` | Create the static site in `dist/`. |
| `bun run preview` | Serve the built site locally. |

Builds preserve Astro's cache and let Astro clear `dist/`. To refresh cached content while troubleshooting, use `bun run build --force`.

Run typecheck, tests, lint, format checks, and a build for code or content changes. For UI changes, also check affected pages on desktop and mobile; see [AGENTS.md](./AGENTS.md) for browser checks and performance targets.

## Pages

| Route | Content |
| --- | --- |
| `/` | Recent published papers, research areas, latest publications, and the join section. |
| `/blog` | Publications and news together, newest first, with a year filter. |
| `/blog/<id>` | News detail. |
| `/publications` | Search and filters over publications only. |
| `/publications/<id>` | Publication body, links, figure when available, and citations. |
| `/about` | Lead, staff, partners grouped by organization, and alumni. |
| `/about/<id>` | Person's bio and publications; partner pages omit the publication list. |
| `/rss.xml` | Publications feed; news is excluded. |

Astro also builds the 404 page and sitemap.

## Content and contributions

- [Add a publication](./docs/adding-a-publication.md).
- [Add a news post](./docs/adding-a-news-post.md).
- [Add a person or photo](./docs/adding-a-person.md).
- [Agent and implementation guidance](./AGENTS.md).

Schemas in [src/content.config.ts](./src/content.config.ts) define accepted frontmatter. Filenames determine IDs and URLs; keep published slugs stable. Publication authors link to people by exact display-name match.

`featured: true` emphasizes a publication's blog tile. The home carousel independently selects the five newest published papers; `featured` does not control that selection.

Keep the interface focused on research, readable, and quick to navigate. Use the existing components and styles when extending it.

## Deployment configuration

[The GitHub Pages workflow](./.github/workflows/deploy.yml) builds with Bun and uploads `dist/`. It currently runs on pushes to `main` or manual dispatch. Configure the intended repository, deployment branch, and Pages source (GitHub Actions) when setting up this new repo for hosting.

Keep the public URL in [astro.config.mjs](./astro.config.mjs), [SeoHead.astro](./src/components/SeoHead.astro), [rss.xml.ts](./src/pages/rss.xml.ts), and [robots.txt](./public/robots.txt) consistent. A custom domain also needs `public/CNAME`; hosting below a repository subpath needs a review of root-relative links and Astro's `base` setting.
