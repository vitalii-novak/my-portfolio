import type { MetadataRoute } from "next";
import { site } from "@/config/site";

// Generates /sitemap.xml — helps Google discover and index all pages.
export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;

  return [
    {
      url:              base,
      lastModified:     new Date(),
      changeFrequency:  "monthly",
      priority:         1,
    },
    {
      url:              `${base}/contact`,
      lastModified:     new Date(),
      changeFrequency:  "yearly",
      priority:         0.8,
    },
    {
      url:              `${base}/projects`,
      lastModified:     new Date(),
      changeFrequency:  "monthly",
      priority:         0.9,
    },
  ];
}
