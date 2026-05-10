import type { MetadataRoute } from "next";
import { apps, getAppRoutes } from "@/content/apps";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://apps-timwuhaotian-site.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const appRoutes = apps.flatMap((app) => {
    const routes = getAppRoutes(app);

    return [routes.intro, routes.privacy, routes.terms].map((route) => ({
      url: `${siteUrl}${route}`,
      lastModified: now,
    }));
  });

  return [
    {
      url: siteUrl,
      lastModified: now,
    },
    ...appRoutes,
  ];
}
