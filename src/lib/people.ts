import { getCollection, type CollectionEntry } from "astro:content";
import { sortByDateDesc, type Pub } from "./pubs";

export type Person = CollectionEntry<"people">;

const STAFF_GROUPS = new Set<Person["data"]["group"]>(["faculty", "postdoc", "phd"]);

/** Canonical name → profile id and supplied Russian spelling. */
export async function getAuthorMap(): Promise<Map<string, { id: string; ru?: string }>> {
  const people = await getCollection("people");
  const map = new Map<string, { id: string; ru?: string }>();
  for (const p of people) map.set(p.data.name, { id: p.id, ru: p.data.ru?.name });
  return map;
}

export async function getStaffAuthorNames(): Promise<Set<string>> {
  const people = await getCollection("people");
  return new Set(people.filter((p) => STAFF_GROUPS.has(p.data.group)).map((p) => p.data.name));
}

/** Filter publications whose authors[] includes this person's display name. */
export function getPersonPubs(person: Person, allPubs: Pub[]): Pub[] {
  return allPubs.filter((p) => p.data.authors.includes(person.data.name)).sort(sortByDateDesc);
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
  authorMap: Map<string, { id: string; ru?: string }>,
  russian?: Record<string, string>,
): Array<{ name: string; id?: string; ru?: string }> {
  return authors.map((name) => {
    const person = authorMap.get(name);
    return { name, id: person?.id, ru: russian?.[name] ?? person?.ru };
  });
}
