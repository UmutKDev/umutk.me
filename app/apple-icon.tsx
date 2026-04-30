import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

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
          background:
            "radial-gradient(120% 80% at 50% -10%, rgba(216,133,106,0.32), transparent 60%), #0a0907",
          color: "#ece7d9",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
            display: "flex",
          }}
        />
        <div
          style={{
            fontSize: 110,
            lineHeight: 1,
            fontWeight: 700,
            color: "#d8856a",
            letterSpacing: -4,
            display: "flex",
          }}
        >
          u
        </div>
        <div
          style={{
            marginTop: 4,
            fontSize: 14,
            letterSpacing: 4,
            color: "#a8a097",
            textTransform: "uppercase",
            display: "flex",
          }}
        >
          umutk.me
        </div>
      </div>
    ),
    { ...size }
  );
}
