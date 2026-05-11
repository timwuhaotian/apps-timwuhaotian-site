import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import Home from "./page";
import AppPage from "./apps/[slug]/page";
import PrivacyPage from "./apps/[slug]/privacy/page";

describe("public app hub pages", () => {
  it("renders the design-system home directory contract", () => {
    const markup = renderToStaticMarkup(<Home />);

    expect(markup).toContain(
      "A curated collection of indie apps",
    );
    expect(markup).toContain("Apps by Tim Wu Haotian");
    expect(markup).toContain(
      "Stable public pages for app review, users, and support.",
    );
    expect(markup).toContain('href="/apps/duetshot/privacy"');
    expect(markup).toContain('href="https://kodda.dev"');
    expect(markup).toContain(
      'href="https://apps.apple.com/us/app/scholardaily/id6767979151"',
    );
    expect(markup).toContain(">App Store</a>");
    expect(markup).toContain(">Website</a>");
    expect(markup).toContain("directory-row");
    expect(markup).toContain("iOS-first");
    expect(markup).toContain("5 apps");
    expect(markup).toContain('type="application/ld+json"');
    expect(markup).toContain("ItemList");
  });

  it("renders an app intro with the shared policy navigation shell", async () => {
    const page = await AppPage({ params: Promise.resolve({ slug: "duetshot" }) });
    const markup = renderToStaticMarkup(page);

    expect(markup).toContain("breadcrumb");
    expect(markup).toContain("DuetShot");
    expect(markup).toContain("App metadata");
    expect(markup).toContain("Key questions");
    expect(markup).toContain("SoftwareApplication");
    expect(markup).toContain("FAQPage");
    expect(markup).toContain('href="/apps/duetshot/terms"');
    expect(markup).toContain("Simultaneous front and back camera recording.");
  });

  it("renders web app production links on intro pages", async () => {
    const page = await AppPage({ params: Promise.resolve({ slug: "kodda" }) });
    const markup = renderToStaticMarkup(page);

    expect(markup).toContain('href="https://kodda.dev"');
    expect(markup).toContain("<dt>Website</dt>");
  });

  it("renders ScholarDaily App Store links after launch", async () => {
    const page = await AppPage({
      params: Promise.resolve({ slug: "scholar-daily" }),
    });
    const markup = renderToStaticMarkup(page);

    expect(markup).toContain(
      'href="https://apps.apple.com/us/app/scholardaily/id6767979151"',
    );
    expect(markup).toContain("<dt>App Store</dt>");
    expect(markup).toContain(">Public</span>");
  });

  it("renders app detail pages with the dedicated spacing shell", async () => {
    const page = await AppPage({ params: Promise.resolve({ slug: "duetshot" }) });
    const markup = renderToStaticMarkup(page);

    expect(markup).toContain("app-detail-hero");
    expect(markup).toContain("app-detail-grid");
    expect(markup).toContain("app-detail-rail");
    expect(markup).toContain("metadata-card");
  });

  it("loads above-fold app screenshots eagerly", async () => {
    const page = await AppPage({ params: Promise.resolve({ slug: "duetshot" }) });
    const markup = renderToStaticMarkup(page);

    expect(markup).toContain("DuetShot product screenshot");
    expect(markup).toContain('loading="eager"');
  });

  it("keeps intro feature cards concise without duplicate title/body copy", async () => {
    const page = await AppPage({ params: Promise.resolve({ slug: "duetshot" }) });
    const markup = renderToStaticMarkup(page);

    expect(
      occurrences(markup, "Simultaneous front and back camera recording"),
    ).toBe(1);
  });

  it("marks the current policy page in the shared app navigation", async () => {
    const page = await PrivacyPage({
      params: Promise.resolve({ slug: "duetshot" }),
    });
    const markup = renderToStaticMarkup(page);

    expect(markup).toMatch(
      /<a aria-current="page" class="button primary" href="\/apps\/duetshot\/privacy">Privacy<\/a>/,
    );
    expect(markup).not.toMatch(
      /<a aria-current="page"[^>]*>Intro<\/a>/,
    );
  });
});

function occurrences(markup: string, text: string) {
  return markup.split(text).length - 1;
}
