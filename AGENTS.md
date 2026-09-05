# Agent guidance

This is the OOAARG website repository. Read [README.md](./README.md) for setup, routes, content guides, and deployment configuration.

## Working approach

- Prefer deleting unused code and simplifying existing components over adding abstractions, dependencies, or automation.
- Use the checked-in components and `src/styles/` as the baseline for design changes. There is no required external prototype bundle or design skill.
- Keep the site focused on finding research, reading about people, citing work, and contacting the group.
- Preserve unrelated working-tree changes. Keep changes local unless publishing or pushing is requested.
- Treat documentation as guidance about the implementation, not evidence that every page already meets it.

## Toolchain and verification

Use **Bun**, never npm, yarn, or pnpm. `package.json` pins the Bun version; CI reads that value via `bun-version-file`. Keep `bun.lock` as the lockfile. Node 24 LTS is the CI runtime. Commands are listed in the README.

For code or content changes, run `bun run typecheck`, `bun test`, `bun run lint`, `bun run format:check`, and `bun run build`. Report pre-existing failures separately. Documentation-only changes need link/path checks and `git diff --check`, not a browser or performance run.

Linting and formatting use oxlint and oxfmt, configured in `.oxlintrc.json` and `.oxfmtrc.json`. `.astro` files are checked by Astro, not these tools. `.prettierignore` is read by oxfmt and excludes Markdown prose. Do not add ESLint or Prettier to perform routine checks.

For UI changes, check affected routes at desktop and phone widths, keyboard navigation, and navigation between pages. Run Lighthouse mobile when adding islands, dependencies, or changes that could affect loading or layout. Use a production build served by `bun run preview`:

```bash
CHROME_PATH=/usr/bin/chromium bunx lighthouse http://localhost:4321/ \
  --form-factor=mobile --screenEmulation.mobile=true --throttling-method=simulate \
  --quiet --chrome-flags="--headless --no-sandbox --disable-gpu" \
  --output=json --output-path=/tmp/ooaarg-lighthouse.json
```

Targets: Performance ≥90; Accessibility, Best Practices, and SEO ≥95; LCP ≤2.5s; CLS = 0; route JavaScript ≤100KB gzip (≤50KB preferred). Measure affected routes rather than treating past scores as current results.

## Implementation constraints

- Astro 7 builds a static site. Use `.astro` components for static rendering and Preact islands where interaction requires them.
- Import hooks from `preact/hooks` and types from `preact`. Use `onInput` for text fields and DOM SVG attributes such as `stroke-width`; there is no React compatibility layer. DOM event handlers should read `e.currentTarget.value`, not `e.target.value`.
- Keep the unified Markdown processor in `astro.config.mjs`: it runs `remark-math` and `rehype-katex`. Removing it breaks the configured math pipeline. KaTeX CSS is currently imported only by the publication detail route.
- Content entries are `.md` files; figures live in page components. Keep TypeScript on 6 while `@astrojs/check` requires it, and KaTeX on 0.16 while `rehype-katex` renders with that version. Import Zod from `astro/zod` and use `z.url()` / `z.email()` for string formats.
- Fonts are self-hosted Inter and JetBrains Mono. Use the existing font imports and CSS tokens.
- `DetailLayout.astro` shares publication/news detail structure; `Site.astro` owns global chrome. Header `active` values are `home`, `blog`, `pubs`, and `about`.

### Navigation, theme, and logo

Navigation uses ordinary links and full browser page loads. `base.css` opts into native cross-document view transitions where supported and disables them for reduced motion. Bundled Astro scripts run once per document.

- The inline theme initialization must run before paint on every page and refresh on `pageshow` when Back/Forward restores a cached document. `ThemeToggle.astro` binds its button directly and stores the preference in localStorage.
- Keep ordinary anchors for navigation, including search results, so keyboard navigation, opening new tabs, and links without JavaScript work naturally.
- Prefetch only marked links on hover or focus; primary navigation uses `data-astro-prefetch`. Shared styles use Astro's default `auto` delivery rather than forcing them into every HTML page.
- The kinetic wordmark rests still, animates on hover/focus, and finishes its current cycle on leave. Preserve reduced-motion support and the matching markup in `MobileNav.tsx`.
- The mobile menu uses a native modal dialog in the browser's top layer, so the header's backdrop filter cannot constrain it.

### Publications and filtering

- `/blog` mixes news and publications. `/publications` and `/rss.xml` contain publications only.
- `featuredCarousel()` in `src/lib/pubs.ts` selects the newest five entries with `type: paper` and `tag` other than `Preprint`. `heroSummary` falls back to `summary`. `featured` controls blog-tile emphasis; `featuredOrder` is accepted but unused.
- `packBento()` expands the last tile of short rows to fill six columns. `YearFilter` hides tiles with the `hidden` attribute and counts visible tiles in the same pass. Filtering may leave gaps because packing happens at build time.
- The search page passes publications sorted newest-first. `SearchIndex` preserves this order while filtering and reverses results for oldest-first; its `date` field is a display label.
- `paperUrl()`, `doiOf()`, and `extraLinks()` in `src/lib/pubs.ts` own publication link handling. A DOI or explicit `Paper` link takes precedence over arXiv; promoted links are omitted from the extra-link list.
- `src/lib/bibtex.ts` builds both citation formats using publication type/tag, with full slugs in citation keys and escaped plain text. `CiteButton` converts the serialized date before passing it to `CiteModal`. Keep citation generation shared. The APA-style fallback uses the available metadata without guessing surname structure or missing volume/page data.

### Content and assets

Use `src/content.config.ts` and the [content guides](./README.md#content-and-contributions) for field definitions instead of duplicating schemas here.

- IDs come from filenames. Publication author strings must exactly match a person's `name` to resolve profile links.
- Research area values are repeated in the content schema, `src/data/areas.ts`, `AREA_LABEL` in `src/pages/publications/[id].astro`, and `FACETS.area` in `SearchIndex.tsx`. Update all four when adding an area. `misc` is searchable but excluded from the home grid via `showOnHome: false`.
- Paper figures live in `src/components/publications/detail/figures/<area>/<id>.tsx`. `PaperFigure.tsx` registers them by basename. They render statically in Astro pages and within the home/search islands; a figure is not automatically a separate island.
- People photos live in `src/assets/people/<id>.{jpg,jpeg,png,webp,avif}` and fall back to initials. News images are co-located with their entry and referenced using its `image` field. Both use Astro's image processing.

### Accessibility and responsive behavior

Use semantic heading order: page title `h1`, sections `h2`, and card/list titles `h3`. Use classes such as `.kicker`, `.foot-label`, and `.aside-label` for visual treatment. Do not choose a heading level just for its size.

The main breakpoints are 900px and 640px. Check the navigation sheet, facet sheet, citations, and tile layouts at phone width. Keep the `!important` display rules on `.mobile-only` and `.desktop-only`; they override later button styles.

Citation and mobile navigation use native `<dialog>` elements opened with `showModal()` for focus containment. Preserve Escape, close controls, initial focus, return focus, and restoration of the previous body scroll state. Check keyboard behavior directly when working on dialogs.
