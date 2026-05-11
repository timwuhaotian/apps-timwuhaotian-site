import type { MetadataRoute } from "next";
import { buildSitemap } from "@/content/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return buildSitemap();
}
