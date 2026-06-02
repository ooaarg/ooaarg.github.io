import type { CollectionEntry } from "astro:content";

export type Pub = CollectionEntry<"publications">;

export const sortByDateDesc = (a: Pub, b: Pub) => b.data.date.getTime() - a.data.date.getTime();

/** Bare DOI for the entry — the `doi` field, or a `links[]` entry labelled
 *  "DOI" with its doi.org URL stripped. Feeds the BibTeX/APA citation. */
export function doiOf(data: Pub["data"]): string | undefined {
  if (data.doi) return data.doi;
  const link = data.links.find((l) => /^doi$/i.test(l.label));
  return link?.url.replace(/^https?:\/\/(dx\.)?doi\.org\//i, "");
}

/** URL of the published/accepted version (DOI → publisher page), or null for
 *  arXiv-only / unpublished entries. Rendered as the primary "Paper" link —
 *  it takes the accent ahead of arXiv. Sourced from the `doi` field or a
 *  `links[]` "DOI" entry. */
export function paperUrl(data: Pub["data"]): string | null {
  const doi = doiOf(data);
  return doi ? `https://doi.org/${doi}` : null;
}

/** `links[]` minus any "DOI" entry, which is promoted to the primary "Paper"
 *  button by {@link paperUrl} and so shouldn't render a second time. */
export function extraLinks(data: Pub["data"]): Pub["data"]["links"] {
  return data.links.filter((l) => !/^doi$/i.test(l.label));
}

export function latestN(pubs: Pub[], n: number): Pub[] {
  return [...pubs].sort(sortByDateDesc).slice(0, n);
}

/** Slides for the home hero carousel: featured-flagged entries first (ranked by
 *  `featuredOrder`, then natural collection order), then top-up with the latest
 *  published papers (excluding preprints, code, and talks), de-duplicated,
 *  capped. */
export function featuredCarousel(pubs: Pub[], cap = 5): Pub[] {
  const featured = pubs
    .filter((p) => p.data.featured)
    .sort((a, b) => (a.data.featuredOrder ?? Infinity) - (b.data.featuredOrder ?? Infinity));
  const published = pubs
    .filter((p) => p.data.type === "paper" && p.data.tag !== "Preprint")
    .sort(sortByDateDesc);
  const seen = new Set(featured.map((p) => p.id));
  const filler = published.filter((p) => !seen.has(p.id));
  return [...featured, ...filler].slice(0, cap);
}

export function years(pubs: Pub[]): number[] {
  const set = new Set(pubs.map((p) => p.data.date.getFullYear()));
  return [...set].sort((a, b) => b - a);
}

/** Pack tiles into rows of 6 columns. If a row would be left short (e.g. one
 *  span-2 tile alone, or two span-2 tiles summing to 4), the last tile in the
 *  row absorbs the leftover columns so the bento has no trailing empty space. */
export type TileSpan = 2 | 3 | 4 | 6;
export function computeBentoSpans(pubs: Pub[]): Array<{ pub: Pub; span: TileSpan }> {
  return packBento(pubs, (p) => (p.data.span ?? 2) as TileSpan).map(({ item, span }) => ({
    pub: item,
    span,
  }));
}

/** Generic version of {@link computeBentoSpans} — accepts any tile that can
 *  declare a base span. Used to mix publications + news on the blog page. */
export function packBento<T>(items: T[], spanOf: (t: T) => TileSpan): Array<{ item: T; span: TileSpan }> {
  const out: Array<{ item: T; span: TileSpan }> = [];
  let row: Array<{ item: T; span: TileSpan }> = [];
  let fill = 0;
  const flush = () => {
    if (row.length > 0) {
      const total = row.reduce((s, r) => s + r.span, 0);
      if (total < 6) {
        const last = row[row.length - 1];
        last.span = (last.span + (6 - total)) as TileSpan;
      }
      out.push(...row);
    }
    row = [];
    fill = 0;
  };
  for (const item of items) {
    const s = spanOf(item);
    if (fill + s > 6) flush();
    row.push({ item, span: s });
    fill += s;
    if (fill >= 6) flush();
  }
  flush();
  return out;
}
