import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { apps } from "@/content/apps";

export const alt =
  "Apps by Tim Wu Haotian — indie iOS and web app directory";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

async function iconDataUri(iconPath: string) {
  const data = await readFile(join(process.cwd(), "public", iconPath), {
    encoding: "base64",
  });
  return `data:image/png;base64,${data}`;
}

export default async function Image() {
  const icons = await Promise.all(apps.map((app) => iconDataUri(app.icon)));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          background:
            "linear-gradient(120deg, rgba(26,77,58,0.08), rgba(247,247,242,0) 38%), linear-gradient(240deg, rgba(45,101,163,0.07), rgba(247,247,242,0) 42%), #f7f7f2",
          padding: 72,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flexGrow: 1,
            maxWidth: 640,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 18,
            }}
          >
            <div
              style={{
                width: 64,
                height: 64,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 18,
                background: "linear-gradient(135deg, #1a4d3a, #2d65a3)",
                color: "#ffffff",
                fontSize: 36,
                fontWeight: 700,
              }}
            >
              A
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 22,
                fontWeight: 600,
                letterSpacing: 4,
                color: "#6e6e64",
              }}
            >
              INDIE APPS DIRECTORY
            </div>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 34,
              fontSize: 76,
              fontWeight: 700,
              letterSpacing: -2,
              lineHeight: 1.02,
              color: "#0f0f0f",
            }}
          >
            Apps by Tim Wu Haotian
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 26,
              fontSize: 28,
              lineHeight: 1.45,
              color: "#2a2a28",
            }}
          >
            Product intros, privacy policies, and terms for every app — built
            for iOS and the web.
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 36,
              alignSelf: "flex-start",
              border: "1px solid #c8c8bb",
              borderRadius: 999,
              background: "#ffffff",
              padding: "12px 26px",
              fontSize: 24,
              fontWeight: 600,
              color: "#1a4d3a",
            }}
          >
            apps.timwuhaotian.dev
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "flex-end",
            alignContent: "center",
            gap: 24,
            width: 340,
            flexShrink: 0,
          }}
        >
          {icons.map((src, index) => (
            <img
              alt=""
              height={132}
              key={index}
              src={src}
              style={{
                borderRadius: 32,
                boxShadow: "0 18px 40px rgba(15,15,15,0.16)",
                transform: index % 2 === 0 ? "rotate(-3deg)" : "rotate(3deg)",
              }}
              width={132}
            />
          ))}
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
