import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import Home from "./page";
import NotFound from "./not-found";
import ErrorPage from "./error";
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
    expect(markup).toContain(">App Store<");
    expect(markup).toContain(">Website<");
    expect(markup).toContain("app-card");
    expect(markup).toContain("apps-section");
    expect(markup).toContain("app-icon-link");
    expect(markup).toContain("iOS-first");
    expect(markup).toContain("9 apps");
    expect(markup).toContain('type="application/ld+json"');
    expect(markup).toContain("ItemList");
  });

  it("shows app count badges from the catalog", () => {
    const markup = renderToStaticMarkup(<Home />);

    expect(markup).toContain(">9 apps<");
  });

  it("renders app cards with icons and links in the directory", () => {
    const markup = renderToStaticMarkup(<Home />);

    expect(markup).toContain("app-icon");
    expect(occurrences(markup, "app-card")).toBe(9);
    expect(markup).toContain('href="/apps/echo-vault"');
  });

  it("labels in-development apps honestly instead of as drafts", () => {
    const markup = renderToStaticMarkup(<Home />);

    expect(markup).toContain("In development");
    expect(markup).not.toContain(">Draft<");
  });

  it("opens external listings in a new tab with safe rel attributes", () => {
    const markup = renderToStaticMarkup(<Home />);

    expect(markup).toMatch(
      /<a[^>]*href="https:\/\/kodda\.dev"[^>]*target="_blank"/,
    );
    expect(markup).toMatch(
      /<a[^>]*href="https:\/\/kodda\.dev"[^>]*rel="noopener noreferrer"/,
    );
    expect(markup).toContain("(opens in a new tab)");
  });

  it("keeps redundant icon links out of the keyboard tab order", () => {
    const markup = renderToStaticMarkup(<Home />);

    expect(markup).toMatch(
      /<a aria-hidden="true"[^>]*class="app-icon-link"[^>]*tabindex="-1"/,
    );
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

  it("shares the site header and footer with app detail pages", async () => {
    const page = await AppPage({ params: Promise.resolve({ slug: "duetshot" }) });
    const markup = renderToStaticMarkup(page);

    expect(markup).toContain("site-header");
    expect(markup).toContain("site-footer");
    expect(markup).toContain('aria-label="Apps Hub home"');
    expect(markup).toContain(
      "Stable public pages for app review, users, and support.",
    );
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

  it("shows extra screenshots as a thumbnail strip", async () => {
    const page = await AppPage({ params: Promise.resolve({ slug: "duetshot" }) });
    const markup = renderToStaticMarkup(page);

    expect(markup).toContain("shot-strip");
    expect(markup).toContain("DuetShot screenshot 2");
    expect(markup).toContain("DuetShot screenshot 3");
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

  it("keeps exactly one h1 on policy pages", async () => {
    const page = await PrivacyPage({
      params: Promise.resolve({ slug: "duetshot" }),
    });
    const markup = renderToStaticMarkup(page);

    expect(occurrences(markup, "<h1")).toBe(1);
    expect(markup).toContain("DuetShot Privacy Policy");
  });

  it("keeps exactly one h1 on intro pages", async () => {
    const page = await AppPage({ params: Promise.resolve({ slug: "duetshot" }) });
    const markup = renderToStaticMarkup(page);

    expect(occurrences(markup, "<h1")).toBe(1);
  });

  it("renders a styled error page with retry and recovery paths", () => {
    const error = Object.assign(new Error("boom"), { digest: "abc123" });
    const markup = renderToStaticMarkup(
      <ErrorPage error={error} unstable_retry={() => {}} />,
    );

    expect(markup).toContain("status-card");
    expect(markup).toContain("Try again");
    expect(markup).toContain("Error reference: abc123");
    expect(markup).toContain('href="/"');
    expect(markup).toContain("gosingk@gmail.com");
  });

  it("renders a styled 404 page with paths back into the directory", () => {
    const markup = renderToStaticMarkup(<NotFound />);

    expect(markup).toContain("status-card");
    expect(markup).toContain("404 · Not found");
    expect(markup).toContain('href="/"');
    expect(markup).toContain('href="/apps/echo-vault"');
    expect(markup).toContain("site-header");
    expect(markup).toContain("site-footer");
  });
});

function occurrences(markup: string, text: string) {
  return markup.split(text).length - 1;
}
