import { ImageResponse } from "next/og";

export const socialImageAlt =
  "Eduria — edukacyjna przygoda łącząca książkę, zeszyt ćwiczeń i aplikację";

export const socialImageSize = {
  width: 1200,
  height: 630,
};

export const socialImageContentType = "image/png";

export function renderSocialImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          color: "#24352d",
          background:
            "linear-gradient(135deg, #f7f2e8 0%, #e8f0eb 48%, #dce7f2 100%)",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 560,
            height: 560,
            borderRadius: 999,
            border: "2px solid rgba(58, 138, 98, 0.35)",
            right: -90,
            top: 35,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 420,
            height: 420,
            borderRadius: 999,
            border: "2px solid rgba(200, 150, 60, 0.42)",
            right: -20,
            top: 105,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 280,
            height: 280,
            borderRadius: 999,
            background:
              "radial-gradient(circle, rgba(255,255,255,0.92) 0%, rgba(114,196,154,0.30) 55%, rgba(58,138,98,0.08) 100%)",
            boxShadow: "0 0 90px rgba(58, 138, 98, 0.24)",
            right: 50,
            top: 175,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 54,
              height: 54,
              borderRadius: 999,
              border: "3px solid rgba(58, 138, 98, 0.55)",
              background: "rgba(255, 255, 255, 0.72)",
              display: "flex",
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: 760,
            padding: "72px 0 72px 84px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontFamily: "sans-serif",
              fontSize: 18,
              letterSpacing: 8,
              textTransform: "uppercase",
              color: "#3a8a62",
              marginBottom: 28,
            }}
          >
            Harvoria &amp; Beyond
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 108,
              lineHeight: 1,
              letterSpacing: -3,
              marginBottom: 30,
            }}
          >
            Eduria
          </div>
          <div
            style={{
              display: "flex",
              maxWidth: 580,
              fontFamily: "sans-serif",
              fontSize: 31,
              lineHeight: 1.35,
              color: "#51645b",
            }}
          >
            Książka · zeszyt ćwiczeń · aplikacja · wspólna przygoda
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: "monospace",
              fontSize: 20,
              color: "#7a6850",
              marginTop: 44,
            }}
          >
            eduria.io
          </div>
        </div>
      </div>
    ),
    socialImageSize,
  );
}
