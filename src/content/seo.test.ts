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
  it("keeps AI discovery crawlers explicitly allowed", () => {
    const rules = Array.isArray(robots().rules)
      ? robots().rules
      : [robots().rules];
    const userAgents = rules.flatMap((rule) => rule.userAgent ?? []);

    for (const bot of aiCrawlerUserAgents) {
      expect(userAgents).toContain(bot);
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
