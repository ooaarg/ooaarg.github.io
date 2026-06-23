// @ts-check
import { defineConfig } from "astro/config";
import preact from "@astrojs/preact";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { unified } from "@astrojs/markdown-remark";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

export default defineConfig({
  site: "https://ooaarg.github.io",
  integrations: [preact({ compat: true }), mdx(), sitemap()],
  build: { inlineStylesheets: "always" },
  markdown: {
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex],
    }),
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "viewport",
  },
  vite: {
    define: {
      "import.meta.env.BUILD_TIME": JSON.stringify(new Date().toISOString()),
    },
    server: {
      allowedHosts: [".trycloudflare.com"],
    },
  },
});
