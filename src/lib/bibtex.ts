// Build BibTeX + APA citation strings from a publication entry.
// Single source of truth used by CiteModal.

export interface CitablePublication {
  id: string;
  title: string;
  authors: string[];
  date: Date;
  venue: string;
  arxiv?: string;
  doi?: string;
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

  const fields: Array<[string, string]> = [
    ["title", pub.title],
    ["author", pub.authors.join(" and ")],
    ["booktitle", pub.venue],
    ["year", String(year)],
  ];
  if (pub.doi) fields.push(["doi", pub.doi]);
  if (pub.arxiv) fields.push(["url", `https://arxiv.org/abs/${pub.arxiv}`]);

  const body = fields.map(([k, v]) => `  ${k.padEnd(9)} = {${v}}`).join(",\n");
  return `@inproceedings{${key},\n${body}\n}`;
}

export function buildApa(pub: CitablePublication): string {
  const year = pub.date.getFullYear();
  const base = `${pub.authors.join(", ")} (${year}). ${pub.title}. In ${pub.venue}.`;
  return pub.doi ? `${base} https://doi.org/${pub.doi}` : base;
}
