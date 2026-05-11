import type { MetadataRoute } from "next";
import { buildRobots } from "@/content/seo";

export default function robots(): MetadataRoute.Robots {
  return buildRobots();
}
