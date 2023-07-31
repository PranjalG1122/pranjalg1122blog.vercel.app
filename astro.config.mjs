import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeToc from "@jsdevtools/rehype-toc";
import rehypeSlug from "rehype-slug";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  site: "https://localhost:3000",
  integrations: [svelte(), tailwind(), mdx()],
  markdown: {
    shikiConfig: {
      theme: "css-variables",
    },
    extendMarkdownConfig: false,
    rehypePlugins: [
      rehypeSlug,
      rehypeAutolinkHeadings,
      [
        rehypeToc,
        {
          customizeTOC: (toc) => {
            toc.children = [
              {
                type: "element",
                tagName: "h3",
                properties: {},
                children: [
                  {
                    type: "text",
                    value: "Table of Contents",
                  },
                ],
              },
              ...toc.children,
            ];
            return toc;
          },
        },
      ],
      rehypeKatex,
    ],
    remarkPlugins: [remarkMath],
  },
  output: "server",
  adapter: vercel(),
});
