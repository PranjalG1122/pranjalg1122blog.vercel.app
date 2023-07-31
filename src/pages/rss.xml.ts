import rss, { pagesGlobToRssItems } from "@astrojs/rss";
import type { APIContext } from "astro";

export async function get(context: APIContext) {
  return rss({
    title: "Pranjal's Blog",
    description:
      "My personal blog about web development, programming and machine learning.",
    site: context.site!.toString(),
    items: await pagesGlobToRssItems(import.meta.glob("./blogs/*mdx")),
    customData: `<language>en-us</language>`,
  });
}
