// Build BibTeX + APA citation strings from a publication entry.
// Single source of truth used by CiteModal.

export interface CitablePublication {
  id: string;
  title: string;
  authors: string[];
  date: Date;
  venue: string;
  arxiv?: string;
}

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z]/g, "");

export function buildBibtex(pub: CitablePublication): string {
  const year = pub.date.getFullYear();
  const lastName =
    pub.authors[0]
      .split(/\s+/)
      .pop()
      ?.replace(/[^A-Za-z]/g, "") ?? "anon";
  const stub = pub.id.split("-")[0];
  const key = `${slugify(lastName)}${year}${stub}`;
  const url = pub.arxiv ? `https://arxiv.org/abs/${pub.arxiv}` : "";

  const lines = [
    `@inproceedings{${key},`,
    `  title     = {${pub.title}},`,
    `  author    = {${pub.authors.join(" and ")}},`,
    `  booktitle = {${pub.venue}},`,
    `  year      = {${year}}${url ? "," : ""}`,
  ];
  if (url) lines.push(`  url       = {${url}}`);
  lines.push(`}`);
  return lines.join("\n");
}

export function buildApa(pub: CitablePublication): string {
  const year = pub.date.getFullYear();
  return `${pub.authors.join(", ")} (${year}). ${pub.title}. In ${pub.venue}.`;
}
