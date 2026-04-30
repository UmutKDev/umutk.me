import { ImageResponse } from "next/og";
import { siteConfig } from "./lib/data";

export const alt = `${siteConfig.name} — ${siteConfig.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// All characters that appear anywhere in the OG image.
const SUBSET_TEXT = [
  "Umut Kızıloğlu Full-Stack Developer",
  "Osmangazi, Bursa — TR",
  "v.2026 build 04",
  "/// FULL-STACK DEVELOPER",
  "building the web in production.",
  "next.js · typescript · nestjs · postgres · ssr",
  "umutk.me 0123456789",
].join(" ");

async function fetchFont(cssQuery: string): Promise<ArrayBuffer | null> {
  try {
    const url = `https://fonts.googleapis.com/css2?family=${cssQuery}&text=${encodeURIComponent(
      SUBSET_TEXT
    )}&display=swap`;
    const css = await (
      await fetch(url, {
        // Older UA forces Google Fonts to return TTF (Satori/ImageResponse can't read woff2).
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36",
        },
        // Cache font CSS for a day to dodge transient Google Fonts blips and cold-start cost.
        next: { revalidate: 86400 },
      })
    ).text();
    // Satori accepts ttf and woff.
    const match = css.match(
      /src:\s*url\((https?:\/\/[^)]+)\)\s*format\(['"]?(truetype|woff)['"]?\)/
    );
    if (!match) return null;
    return await (
      await fetch(match[1], { next: { revalidate: 86400 } })
    ).arrayBuffer();
  } catch {
    return null;
  }
}

export default async function OpengraphImage() {
  const [serif, serifItalic, geist, geistMono] = await Promise.all([
    fetchFont("DM+Serif+Display:wght@400"),
    fetchFont("DM+Serif+Display:ital@1"),
    fetchFont("Inter:wght@500"),
    fetchFont("JetBrains+Mono:wght@500"),
  ]);

  // If any font is missing, render a graceful sans-only fallback rather than 500ing.
  if (!serif || !serifItalic || !geist || !geistMono) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "72px 80px",
            background:
              "radial-gradient(120% 80% at 50% -10%, rgba(216,133,106,0.32), transparent 60%), #0a0907",
            color: "#ece7d9",
            fontFamily: geist ? "Inter" : "sans-serif",
          }}
        >
          <div style={{ fontSize: 28, color: "#a8a097", letterSpacing: 4 }}>
            {siteConfig.role.toUpperCase()}
          </div>
          <div
            style={{
              marginTop: 16,
              fontSize: 128,
              lineHeight: 1,
              letterSpacing: -3,
            }}
          >
            {siteConfig.name}.
          </div>
          <div
            style={{
              marginTop: 32,
              fontSize: 36,
              color: "#d8856a",
            }}
          >
            umutk.me
          </div>
        </div>
      ),
      {
        ...size,
        fonts: geist
          ? [{ name: "Inter", data: geist, weight: 500, style: "normal" }]
          : undefined,
      }
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "72px 80px",
          background:
            "radial-gradient(120% 80% at 50% -10%, rgba(216,133,106,0.32), transparent 60%), radial-gradient(80% 60% at 92% 100%, rgba(201,100,66,0.22), transparent 60%), #0a0907",
          color: "#ece7d9",
          fontFamily: "Inter",
          position: "relative",
        }}
      >
        {/* grid overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            maskImage:
              "radial-gradient(ellipse at center, black 30%, transparent 90%)",
            display: "flex",
          }}
        />

        {/* meta line */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontFamily: "JetBrains Mono",
            fontSize: 18,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: "#a8a097",
          }}
        >
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              background: "#d8856a",
              display: "flex",
            }}
          />
          <span>{siteConfig.location}</span>
          <span
            style={{
              width: 60,
              height: 1,
              background: "rgba(255,255,255,0.22)",
              display: "flex",
            }}
          />
          <span>v.2026</span>
        </div>

        {/* role */}
        <div
          style={{
            marginTop: 70,
            fontFamily: "JetBrains Mono",
            fontSize: 18,
            letterSpacing: 5,
            textTransform: "uppercase",
            color: "#a8a097",
            display: "flex",
          }}
        >
          /// {siteConfig.role}
        </div>

        {/* big name */}
        <div
          style={{
            marginTop: 18,
            display: "flex",
            flexWrap: "wrap",
            fontFamily: "DM Serif Display",
            fontSize: 168,
            lineHeight: 0.95,
            letterSpacing: -3,
            color: "#ece7d9",
          }}
        >
          <span>Umut</span>
          <span
            style={{
              fontStyle: "italic",
              marginLeft: 24,
              color: "rgba(236,231,217,0.9)",
            }}
          >
            Kızıloğlu.
          </span>
        </div>

        {/* tagline */}
        <div
          style={{
            marginTop: 24,
            fontFamily: "DM Serif Display",
            fontSize: 64,
            lineHeight: 1,
            color: "#a8a097",
            display: "flex",
          }}
        >
          <span style={{ fontStyle: "italic" }}>building</span>
          <span style={{ marginLeft: 16 }}>the</span>
          <span
            style={{
              marginLeft: 16,
              color: "#d8856a",
              borderBottom: "2px solid rgba(216,133,106,0.55)",
            }}
          >
            web
          </span>
          <span
            style={{
              marginLeft: 16,
              fontStyle: "italic",
            }}
          >
            in production.
          </span>
        </div>

        {/* footer */}
        <div
          style={{
            marginTop: "auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontFamily: "JetBrains Mono",
            fontSize: 22,
            color: "#a8a097",
          }}
        >
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              background: "#d8856a",
              display: "flex",
            }}
          />
            <span>umutk.me</span>
          </div>
          <div style={{ display: "flex", gap: 24 }}>
            <span>next.js</span>
            <span>·</span>
            <span>typescript</span>
            <span>·</span>
            <span>nestjs</span>
            <span>·</span>
            <span>postgres</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "DM Serif Display", data: serif, weight: 400, style: "normal" },
        {
          name: "DM Serif Display",
          data: serifItalic,
          weight: 400,
          style: "italic",
        },
        { name: "Inter", data: geist, weight: 500, style: "normal" },
        {
          name: "JetBrains Mono",
          data: geistMono,
          weight: 500,
          style: "normal",
        },
      ],
    }
  );
}
