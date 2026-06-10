import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { getAppBySlug } from "@/content/apps";

export const alt =
  "App overview card showing the app icon, name, tagline, platforms, and release status";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const app = getAppBySlug((await params).slug);

  if (!app) {
    notFound();
  }

  const iconData = await readFile(
    join(process.cwd(), "public", app.icon),
    { encoding: "base64" },
  );
  const iconSrc = `data:image/png;base64,${iconData}`;
  const statusLabel =
    app.status === "live"
      ? "Public"
      : app.status === "beta"
        ? "Beta"
        : "In development";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          background: `linear-gradient(120deg, ${app.accentColor}22, rgba(247,247,242,0) 44%), #f7f7f2`,
          padding: 80,
        }}
      >
        <img
          alt=""
          height={240}
          src={iconSrc}
          style={{
            borderRadius: 56,
            boxShadow: "0 24px 64px rgba(15,15,15,0.18)",
            flexShrink: 0,
          }}
          width={240}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            marginLeft: 64,
            flexGrow: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 80,
              fontWeight: 700,
              letterSpacing: -2,
              lineHeight: 1.05,
              color: "#0f0f0f",
            }}
          >
            {app.name}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 22,
              maxWidth: 700,
              fontSize: 32,
              lineHeight: 1.4,
              color: "#2a2a28",
            }}
          >
            {app.tagline}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              marginTop: 40,
            }}
          >
            {app.platforms.map((platform) => (
              <div
                key={platform}
                style={{
                  display: "flex",
                  border: "1px solid #c8c8bb",
                  borderRadius: 999,
                  background: "#ffffff",
                  padding: "10px 22px",
                  fontSize: 24,
                  fontWeight: 600,
                  color: "#65655d",
                }}
              >
                {platform}
              </div>
            ))}
            <div
              style={{
                display: "flex",
                borderRadius: 999,
                background: app.accentColor,
                padding: "11px 23px",
                fontSize: 24,
                fontWeight: 600,
                color: "#ffffff",
              }}
            >
              {statusLabel}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 44,
              fontSize: 24,
              fontWeight: 600,
              color: "#6e6e64",
            }}
          >
            apps.timwuhaotian.dev · Intro · Privacy · Terms
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
