import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import Home from "./page";
import AppPage from "./apps/[slug]/page";

describe("public app hub pages", () => {
  it("renders the design-system home directory contract", () => {
    const markup = renderToStaticMarkup(<Home />);

    expect(markup).toContain("Quiet product directory");
    expect(markup).toContain("Apps by Tim Wu Haotian");
    expect(markup).toContain("stable intro, privacy, terms, and support pages");
    expect(markup).toContain('href="/apps/duetshot/privacy"');
    expect(markup).toContain("directory-row");
    expect(markup).toContain("iOS-first");
    expect(markup).toContain("4 apps");
  });

  it("renders an app intro with the shared policy navigation shell", async () => {
    const page = await AppPage({ params: Promise.resolve({ slug: "duetshot" }) });
    const markup = renderToStaticMarkup(page);

    expect(markup).toContain("breadcrumb");
    expect(markup).toContain("DuetShot");
    expect(markup).toContain("App metadata");
    expect(markup).toContain('href="/apps/duetshot/terms"');
    expect(markup).toContain("Simultaneous front and back camera recording.");
  });
});
