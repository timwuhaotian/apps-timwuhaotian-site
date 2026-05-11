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
