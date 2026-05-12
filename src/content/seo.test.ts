import { describe, expect, it } from "vitest";
import robots from "@/app/robots";
import { generateMetadata as generateAppMetadata } from "@/app/apps/[slug]/page";
import {
  aiCrawlerUserAgents,
  buildAppJsonLd,
  buildHomeJsonLd,
  siteDescription,
  siteName,
} from "@/content/seo";

describe("seo and geo metadata", () => {
  it("blocks AI discovery crawlers from all routes including /api/", () => {
    const rules = Array.isArray(robots().rules)
      ? robots().rules
      : [robots().rules];
    const aiBotRules = rules.filter((rule) => {
      const agents = Array.isArray(rule.userAgent)
        ? rule.userAgent
        : [rule.userAgent].filter(Boolean);
      return agents.some((agent) => aiCrawlerUserAgents.includes(agent as typeof aiCrawlerUserAgents[number]));
    });

    expect(aiBotRules.length).toBeGreaterThan(0);
    for (const rule of aiBotRules) {
      const disallow = Array.isArray(rule.disallow)
        ? rule.disallow
        : [rule.disallow].filter(Boolean);
      expect(disallow).toContain("/api/");
    }
  });

  it("generates canonical app metadata with social previews", async () => {
    const metadata = await generateAppMetadata({
      params: Promise.resolve({ slug: "kodda" }),
    });

    expect(metadata.title).toBe("Kodda");
    expect(metadata.alternates).toMatchObject({
      canonical: "/apps/kodda",
    });
    expect(metadata.openGraph).toMatchObject({
      title: "Kodda",
      siteName,
      url: "/apps/kodda",
    });
    expect(metadata.twitter).toMatchObject({
      card: "summary",
      title: "Kodda",
    });
  });

  it("builds home structured data for organization, website, and app list", () => {
    const jsonLd = buildHomeJsonLd();
    const graph = jsonLd["@graph"];

    expect(jsonLd["@context"]).toBe("https://schema.org");
    expect(graph.map((entry) => entry["@type"])).toEqual([
      "Organization",
      "WebSite",
      "ItemList",
    ]);
    expect(JSON.stringify(jsonLd)).toContain(siteDescription);
  });

  it("builds app structured data with matching FAQ answers", () => {
    const jsonLd = buildAppJsonLd("duetshot");
    const graph = jsonLd["@graph"];
    const faq = graph.find((entry) => entry["@type"] === "FAQPage");

    expect(graph.map((entry) => entry["@type"])).toContain(
      "SoftwareApplication",
    );
    expect(faq?.mainEntity).toHaveLength(3);
    expect(JSON.stringify(faq)).toContain("front and back camera recording");
  });
});
