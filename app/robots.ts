import type { MetadataRoute } from "next";
import { site } from "@/config/site";

// Tells search engine crawlers which pages to index.
// Switch to index:true when the site goes live.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow:     "/",
    },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
