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

  it("adds search priority, update cadence, and app image discovery hints", () => {
    const entries = sitemap();
    const home = entries.find(
      (entry) => entry.url === "https://apps-timwuhaotian-site.vercel.app",
    );
    const duetshot = entries.find((entry) =>
      entry.url.endsWith("/apps/duetshot"),
    );

    expect(home).toMatchObject({
      changeFrequency: "weekly",
      priority: 1,
    });
    expect(duetshot).toMatchObject({
      changeFrequency: "monthly",
      priority: 0.8,
    });
    expect(duetshot?.images).toContain(
      "https://apps-timwuhaotian-site.vercel.app/apps/duetshot/icon.png",
    );
  });
});
