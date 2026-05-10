import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import { apps, getAppRoutes } from "@/content/apps";

describe("sitemap", () => {
  it("indexes home plus every app support route", () => {
    const urls = sitemap().map((entry) => entry.url);
    const expectedRoutes = apps.flatMap((app) => {
      const routes = getAppRoutes(app);

      return [routes.intro, routes.privacy, routes.terms];
    });

    expect(urls).toHaveLength(1 + expectedRoutes.length);

    for (const route of expectedRoutes) {
      expect(urls).toContain(
        `https://apps-timwuhaotian-site.vercel.app${route}`,
      );
    }
  });
});
