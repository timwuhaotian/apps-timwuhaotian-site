import { readFile } from "node:fs/promises";
import { join } from "node:path";
import type { AppContent } from "./apps";

/**
 * Read an app's icon as a data URI suitable for <img src>. If the icon file
 * does not exist yet (e.g. an in-development app whose artwork has not been
 * added), fall back to a generated letter tile on the app's accent color so
 * OG image generation never breaks the build.
 */
export async function appIconDataUri(app: AppContent): Promise<string> {
  const abs = join(process.cwd(), "public", app.icon);
  try {
    const data = await readFile(abs, { encoding: "base64" });
    return `data:image/png;base64,${data}`;
  } catch {
    const letter = (app.name.trim()[0] ?? "A").toUpperCase();
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240"><rect width="240" height="240" rx="56" fill="${app.accentColor}"/><text x="50%" y="50%" dy=".35em" text-anchor="middle" font-family="system-ui, -apple-system, Helvetica, Arial, sans-serif" font-size="120" font-weight="700" fill="#ffffff">${letter}</text></svg>`;
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  }
}
