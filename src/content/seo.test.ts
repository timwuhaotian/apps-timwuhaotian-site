import { describe, expect, it } from "vitest";
import fs from "fs";
import path from "path";
import { generateMetadata as generateAppMetadata } from "@/app/apps/[slug]/page";
import {
  buildAppJsonLd,
  buildHomeJsonLd,
  siteDescription,
  siteName,
} from "@/content/seo";

describe("seo and geo metadata", () => {
  it("allows Mediapartners-Google and AdsBot-Google full access for AdMob", () => {
    const robotsPath = path.join(process.cwd(), "public", "robots.txt");
    const content = fs.readFileSync(robotsPath, "utf-8");
    const lines = content.split("\n");

    let inMediapartnersBlock = false;
    let inAdsBotBlock = false;
    let mediapartnersAllowFound = false;
    let adsBotAllowFound = false;

    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith("User-Agent: Mediapartners-Google")) {
        inMediapartnersBlock = true;
        inAdsBotBlock = false;
      } else if (trimmed.startsWith("User-Agent: AdsBot-Google")) {
        inAdsBotBlock = true;
        inMediapartnersBlock = false;
      } else if (trimmed.startsWith("User-Agent:")) {
        inMediapartnersBlock = false;
        inAdsBotBlock = false;
      } else if (inMediapartnersBlock && trimmed === "Allow: /") {
        mediapartnersAllowFound = true;
      } else if (inAdsBotBlock && trimmed === "Allow: /") {
        adsBotAllowFound = true;
      }
    }

    expect(mediapartnersAllowFound).toBe(true);
    expect(adsBotAllowFound).toBe(true);
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
