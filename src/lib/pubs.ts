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

/** URL of the published version (DOI → publisher page, or an explicit
 *  `links[]` entry labelled "Paper"), or null for arXiv-only entries. Rendered
 *  as the accent "Paper" button, ahead of arXiv. */
export function paperUrl(data: Pub["data"]): string | null {
  const doi = doiOf(data);
  if (doi) return `https://doi.org/${doi}`;
  return data.links.find((l) => /^paper$/i.test(l.label))?.url ?? null;
}

/** `links[]` minus entries promoted to the primary "Paper" button by
 *  {@link paperUrl}, so they don't render a second time. */
export function extraLinks(data: Pub["data"]): Pub["data"]["links"] {
  return data.links.filter((l) => !/^(doi|paper)$/i.test(l.label));
}

export function latestN(pubs: Pub[], n: number): Pub[] {
  return [...pubs].sort(sortByDateDesc).slice(0, n);
}

/** Latest published papers for the home hero carousel, newest first and capped. */
export function featuredCarousel(pubs: Pub[], cap = 5): Pub[] {
  const published = pubs.filter((p) => p.data.type === "paper" && p.data.tag !== "Preprint");
  return latestN(published, cap);
}

export type TileSpan = 2 | 3 | 4 | 6;

/** Pack tiles into rows of 6 columns. If a row would be left short (e.g. one
 *  span-2 tile alone, or two span-2 tiles summing to 4), the last tile in the
 *  row absorbs the leftover columns so the bento has no trailing empty space. */
export function packBento<T>(items: T[], spanOf: (t: T) => TileSpan): Array<{ item: T; span: TileSpan }> {
  const out: Array<{ item: T; span: TileSpan }> = [];
  let fill = 0;
  const flush = () => {
    if (fill > 0) {
      const last = out[out.length - 1];
      last.span = (last.span + 6 - fill) as TileSpan;
    }
    fill = 0;
  };
  for (const item of items) {
    const s = spanOf(item);
    if (fill + s > 6) flush();
    out.push({ item, span: s });
    fill += s;
    if (fill >= 6) flush();
  }
  flush();
  return out;
}
