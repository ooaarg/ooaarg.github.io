import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { sortByDateDesc } from "../lib/pubs";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  const all = (await getCollection("publications")).sort(sortByDateDesc);
  return rss({
    title: "OOAARG — Publications",
    description:
      "Papers, preprints, code, and talks from the OOAARG research group.",
    site: context.site ?? "https://ooaarg.github.io",
    items: all.map((p) => ({
      title: p.data.title,
      pubDate: p.data.date,
      description: p.data.summary,
      author: p.data.authors.join(", "),
      link: `/publications/${p.id}/`,
      categories: [p.data.tag, p.data.area, ...p.data.tags],
    })),
    customData: "<language>en-us</language>",
  });
}
