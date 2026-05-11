import { getCollection, type CollectionEntry } from "astro:content";
import { sortByDateDesc, type Pub } from "./pubs";

export type Person = CollectionEntry<"people">;

/** name → person id, for resolving publication author strings to /about/<id>. */
export async function getAuthorMap(): Promise<Map<string, string>> {
  const people = await getCollection("people");
  const map = new Map<string, string>();
  for (const p of people) map.set(p.data.name, p.id);
  return map;
}

/** Filter publications whose authors[] includes this person's display name. */
export function getPersonPubs(person: Person, allPubs: Pub[]): Pub[] {
  return allPubs
    .filter((p) => p.data.authors.includes(person.data.name))
    .sort(sortByDateDesc);
}

/** Group already-sorted pubs into [year, pubs] tuples, year-desc. */
export function groupPubsByYear(pubs: Pub[]): Array<[number, Pub[]]> {
  const buckets = new Map<number, Pub[]>();
  for (const p of pubs) {
    const y = p.data.date.getFullYear();
    const arr = buckets.get(y) ?? [];
    arr.push(p);
    buckets.set(y, arr);
  }
  return [...buckets.entries()].sort((a, b) => b[0] - a[0]);
}

/** Resolve each author string to { name, id? } for link-aware rendering. */
export function resolveAuthors(
  authors: string[],
  authorMap: Map<string, string>,
): Array<{ name: string; id?: string }> {
  return authors.map((name) => {
    const id = authorMap.get(name);
    return id ? { name, id } : { name };
  });
}
