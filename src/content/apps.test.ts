import { describe, expect, it } from "vitest";
import {
  apps,
  getAppBySlug,
  getAppRoutes,
  getPolicyPage,
} from "@/content/apps";

describe("apps content contract", () => {
  it("lists the five real managed apps", () => {
    expect(apps.map((app) => app.slug)).toEqual([
      "echo-vault",
      "duetshot",
      "found",
      "scholar-daily",
      "kodda",
    ]);
  });

  it("keeps every app slug unique", () => {
    const slugs = apps.map((app) => app.slug);

    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("requires app store support fields for every listed app", () => {
    for (const app of apps) {
      expect(app.slug).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
      expect(app.name.length).toBeGreaterThan(1);
      expect(app.supportEmail).toBe("gosingk@gmail.com");
      expect(app.legalOwner).toBe("WU HAOTIAN");
      expect(app.icon).toMatch(/^\/apps\/.+\/icon\.png$/);
      expect(app.policyProfile.dataUse.length).toBeGreaterThan(0);
    }
  });

  it("requires production links for web apps", () => {
    const webApps = apps.filter((app) => app.platforms.includes("Web"));

    expect(webApps.length).toBeGreaterThan(0);

    for (const app of webApps) {
      expect(app.websiteUrl).toMatch(/^https:\/\/.+/);
    }

    expect(getAppBySlug("kodda")?.websiteUrl).toBe("https://kodda.dev");
  });

  it("tracks ScholarDaily as a live App Store app", () => {
    expect(getAppBySlug("scholar-daily")).toMatchObject({
      appStoreUrl: "https://apps.apple.com/us/app/scholardaily/id6767979151",
      bundleId: "com.gosingk.scholardaily",
      status: "live",
    });
  });

  it("uses the design-system app accent tokens", () => {
    expect(
      Object.fromEntries(apps.map((app) => [app.slug, app.accentColor])),
    ).toEqual({
      "echo-vault": "#25745d",
      duetshot: "#7559c9",
      found: "#b46b20",
      "scholar-daily": "#2d65a3",
      kodda: "#0f766e",
    });
  });

  it("finds apps by slug", () => {
    const firstApp = apps[0];

    expect(firstApp).toBeDefined();
    expect(getAppBySlug(firstApp.slug)).toEqual(firstApp);
    expect(getAppBySlug("missing-app")).toBeUndefined();
  });

  it("builds stable app store support routes", () => {
    const firstApp = apps[0];

    expect(getAppRoutes(firstApp)).toEqual({
      intro: `/apps/${firstApp.slug}`,
      privacy: `/apps/${firstApp.slug}/privacy`,
      terms: `/apps/${firstApp.slug}/terms`,
    });
  });

  it("generates app-specific policy page copy", () => {
    const privacyTitles = apps.map((app) => getPolicyPage(app, "privacy").title);
    const privacyBodies = apps.map((app) =>
      getPolicyPage(app, "privacy")
        .sections.map((section) => section.body)
        .join(" "),
    );

    expect(privacyTitles).toContain("EchoVault Privacy Policy");
    expect(privacyBodies.join(" ")).toContain("voice recordings");
    expect(privacyBodies.join(" ")).toContain("camera and microphone");
    expect(privacyBodies.join(" ")).toContain("spatial asset");
    expect(privacyBodies.join(" ")).toContain("daily research briefings");
    expect(privacyBodies.join(" ")).toContain("product documentation and FAQs");
    expect(new Set(privacyBodies).size).toBe(apps.length);
  });
});
