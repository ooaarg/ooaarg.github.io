import type { Pub } from "./pubs";

// Citation metadata is deliberately limited to fields present in the content.
export interface CitablePublication {
  id: string;
  title: string;
  authors: string[];
  date: Date;
  venue: string;
  type: Pub["data"]["type"];
  tag: Pub["data"]["tag"];
  arxiv?: string;
  doi?: string;
}

function citationKind(pub: CitablePublication) {
  if (pub.type !== "paper" || pub.tag === "Preprint") return "misc";
  return pub.tag === "Journal" ? "article" : "inproceedings";
}

// Frontmatter values are plain text, not trusted TeX commands.
function escapeTex(value: string): string {
  const escapes: Record<string, string> = {
    "\\": "\\textbackslash{}",
    "{": "\\{",
    "}": "\\}",
    "&": "\\&",
    "%": "\\%",
    $: "\\$",
    "#": "\\#",
    _: "\\_",
    "~": "\\textasciitilde{}",
    "^": "\\textasciicircum{}",
  };
  return value.replace(/[\\{}&%$#_~^]/g, (char) => escapes[char]);
}

export function buildBibtex(pub: CitablePublication): string {
  const year = pub.date.getUTCFullYear();
  const lastName = pub.authors[0]?.trim().split(/\s+/).pop() ?? "anon";
  // Preserve the entire case-sensitive slug, including digits; encode unsafe
  // characters instead of dropping them and creating new key collisions.
  const slug = Array.from(pub.id, (char) =>
    /^[A-Za-z0-9-]$/.test(char) ? char : `_${char.codePointAt(0)!.toString(16)}_`,
  ).join("");
  const key = `${lastName.toLowerCase().replace(/[^a-z]/g, "") || "anon"}${year}-${slug}`;
  const kind = citationKind(pub);
  const fields: Array<[string, string]> = [
    ["title", escapeTex(pub.title)],
    ["author", pub.authors.map(escapeTex).join(" and ")],
    ["year", String(year)],
  ];
  if (pub.venue) {
    const venueField =
      kind === "article" ? "journal" : kind === "inproceedings" ? "booktitle" : "howpublished";
    fields.push([venueField, escapeTex(pub.venue)]);
  }
  if (kind === "misc") {
    const description = pub.type === "code" ? "Software" : pub.type === "talk" ? "Presentation" : "Preprint";
    fields.push(["note", description]);
  }
  // Identifier fields remain literal so reference managers can resolve them.
  if (pub.doi) fields.push(["doi", pub.doi]);
  if (pub.arxiv) {
    fields.push(
      ["eprint", pub.arxiv],
      ["archivePrefix", "arXiv"],
      ["url", `https://arxiv.org/abs/${pub.arxiv}`],
    );
  }

  const body = fields.map(([k, v]) => `  ${k.padEnd(9)} = {${v}}`).join(",\n");
  return `@${kind}{${key},\n${body}\n}`;
}

export function buildApa(pub: CitablePublication): string {
  const year = pub.date.getUTCFullYear();
  // Retain supplied author names: splitting display names would guess surnames.
  const authors =
    pub.authors.length < 2
      ? pub.authors.join("")
      : `${pub.authors.slice(0, -1).join(", ")}, & ${pub.authors.at(-1)}`;
  const kind = citationKind(pub);
  const description =
    kind !== "misc"
      ? ""
      : pub.type === "code"
        ? " [Software]"
        : pub.type === "talk"
          ? " [Presentation]"
          : " [Preprint]";
  const title = `${pub.title}${description}`;
  const titleEnd = /[.!?]$/.test(title) ? "" : ".";
  const venue = pub.venue ? ` ${kind === "inproceedings" ? "In " : ""}${pub.venue.replace(/\.$/, "")}.` : "";
  const url = pub.doi ? `https://doi.org/${pub.doi}` : pub.arxiv ? `https://arxiv.org/abs/${pub.arxiv}` : "";
  return `${authors} (${year}). ${title}${titleEnd}${venue}${url ? ` ${url}` : ""}`;
}
