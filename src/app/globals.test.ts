import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const css = readFileSync(new URL("./globals.css", import.meta.url), "utf8");

describe("app detail spacing contract", () => {
  it("uses a dedicated detail grid with a restrained media rail", () => {
    expect(css).toContain(".app-detail-grid");
    expect(css).toContain(
      "grid-template-columns: minmax(0, 1fr) minmax(288px, 360px);",
    );
    expect(css).toContain("gap: clamp(28px, 5vw, 56px);");
    expect(css).toContain("max-width: 340px;");
  });

  it("lets metadata values wrap instead of squeezing the card rhythm", () => {
    expect(css).toContain(".metadata-card dd");
    expect(css).toContain("overflow-wrap: anywhere;");
  });
});

describe("site-wide polish contract", () => {
  it("keeps a focus ring for keyboard navigation", () => {
    expect(css).toContain(":focus-visible");
  });

  it("offers a skip link and sticky-header-aware anchor offsets", () => {
    expect(css).toContain(".skip-link");
    expect(css).toContain("scroll-margin-top: 88px;");
  });

  it("ships print styles that strip chrome from policy pages", () => {
    expect(css).toContain("@media print");
    expect(css).toMatch(/@media print[\s\S]*\.site-header/);
    expect(css).toContain("break-inside: avoid;");
  });

  it("respects reduced motion preferences", () => {
    expect(css).toContain("@media (prefers-reduced-motion: reduce)");
  });
});

describe("premium home polish contract", () => {
  it("shows product imagery in the app directory section", () => {
    expect(css).toContain(".app-card");
    expect(css).toContain(".app-icon");
    expect(css).toContain(".app-grid");
  });

  it("keeps tactile hover motion scoped to fine pointer devices", () => {
    expect(css).toContain("@media (hover: hover) and (pointer: fine)");
    expect(css).toContain(".app-card:hover");
  });
});
