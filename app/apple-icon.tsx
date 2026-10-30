import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Hex equivalents of --color-paper / --color-accent / --color-muted (Satori has no oklch).
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0d1013",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 110,
            lineHeight: 1,
            fontWeight: 700,
            color: "#f7b83d",
            letterSpacing: -4,
            display: "flex",
          }}
        >
          u
        </div>
        <div style={{ marginTop: 4, fontSize: 14, color: "#9da2a8", display: "flex" }}>
          umutk.me
        </div>
      </div>
    ),
    { ...size }
  );
}
