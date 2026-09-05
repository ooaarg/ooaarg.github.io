import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { buildBibtex } from "../../lib/bibtex";
import { doiOf } from "../../lib/pubs";

export async function getStaticPaths() {
  return (await getCollection("publications")).map((pub) => ({
    params: { id: pub.id },
    props: { pub },
  }));
}

export const GET: APIRoute = ({ props }) => {
  const { pub } = props;
  return new Response(`${buildBibtex({ id: pub.id, ...pub.data, doi: doiOf(pub.data) })}\n`, {
    headers: { "Content-Type": "application/x-bibtex; charset=utf-8" },
  });
};
