import { ImageResponse } from "next/og";

// Shared by the [lang] and work/[slug] opengraph-image routes: the Console look at 1200 x 630.
export const ogSize = { width: 1200, height: 630 };

// Hex equivalents of the DESIGN.md tokens (Satori has no oklch).
const c = { paper: "#0d1013", ink: "#eceff2", ink2: "#c3c8cc", muted: "#9da2a8", rule: "#2d3135", accent: "#f7b83d" };

// Google Fonts subsets to the characters asked for; the Turkish letters ride along so a copy edit can't drop them.
async function fetchFont(family: string, text: string): Promise<ArrayBuffer | null> {
  try {
    const url = `https://fonts.googleapis.com/css2?family=${family}&text=${encodeURIComponent(text + "ışğçöüİ")}`;
    const css = await (
      await fetch(url, {
        // An old UA makes Google Fonts answer with TTF (Satori can't read woff2).
        headers: { "User-Agent": "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36" },
        cache: "force-cache",
      })
    ).text();
    const match = css.match(/src:\s*url\((https?:\/\/[^)]+)\)\s*format\(['"]?(truetype|woff)['"]?\)/);
    if (!match) return null;
    return await (await fetch(match[1], { cache: "force-cache" })).arrayBuffer();
  } catch {
    return null;
  }
}

export async function ogCard({ top, title, lines, foot }: { top: string; title: string; lines: string[]; foot: string }) {
  const sans = [title, ...lines, foot].join("");
  const monoText = `${top}umutk.me`;
  const [grotesk, mono] = await Promise.all([
    fetchFont("Host+Grotesk:wght@500", sans),
    fetchFont("Atkinson+Hyperlegible+Mono:wght@400", monoText),
  ]);
  // A missing font falls back to Satori's built-in sans rather than failing the build.
  const fonts = [
    grotesk && { name: "Host Grotesk", data: grotesk, weight: 500 as const, style: "normal" as const },
    mono && { name: "Atkinson Hyperlegible Mono", data: mono, weight: 400 as const, style: "normal" as const },
  ].filter((f) => !!f);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "72px 80px",
          background: c.paper,
          color: c.ink,
          fontFamily: "Host Grotesk",
        }}
      >
        <div style={{ display: "flex", fontFamily: "Atkinson Hyperlegible Mono", fontSize: 26, color: c.muted }}>{top}</div>
        <div style={{ display: "flex", marginTop: "auto", fontSize: 104, lineHeight: 1.05, letterSpacing: -2 }}>{title}</div>
        {lines.map((l, i) => (
          <div key={l} style={{ display: "flex", marginTop: i ? 12 : 28, fontSize: i ? 30 : 40, lineHeight: 1.3, color: i ? c.muted : c.ink2 }}>
            {l}
          </div>
        ))}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 56,
            paddingTop: 28,
            borderTop: `2px solid ${c.rule}`,
            fontSize: 26,
            color: c.ink2,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16, fontFamily: "Atkinson Hyperlegible Mono" }}>
            <div style={{ display: "flex", width: 18, height: 18, borderRadius: 4, background: c.accent }} />
            umutk.me
          </div>
          <div style={{ display: "flex" }}>{foot}</div>
        </div>
      </div>
    ),
    { ...ogSize, fonts }
  );
}
