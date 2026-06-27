import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") || "Fernanda Escalante Rodríguez";
  const subtitle = searchParams.get("subtitle") || "Fotografía + Photoshop + IA";
  const note =
    searchParams.get("note") ||
    "Disponible para workshops universitarios, dirección de arte y proyectos editoriales.";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          position: "relative",
          flexDirection: "column",
          justifyContent: "center",
          overflow: "hidden",
          backgroundColor: "#dff5f7",
          color: "#111111",
          padding: "72px",
          fontFamily:
            '"Space Grotesk", "Segoe UI", "Helvetica Neue", Arial, sans-serif',
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-120px",
            right: "-120px",
            width: "420px",
            height: "420px",
            borderRadius: "999px",
            background: "rgba(255,255,255,0.7)",
            filter: "blur(40px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-120px",
            left: "-100px",
            width: "360px",
            height: "360px",
            borderRadius: "999px",
            background: "rgba(17,17,17,0.05)",
            filter: "blur(48px)",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontSize: "14px",
            fontWeight: 700,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: "rgba(17,17,17,0.62)",
          }}
        >
          <span>Portafolio</span>
          <span>·</span>
          <span>CDMX</span>
        </div>

        <div
          style={{
            marginTop: "28px",
            maxWidth: "920px",
            fontSize: "88px",
            fontWeight: 700,
            lineHeight: 0.9,
            letterSpacing: "-0.08em",
          }}
        >
          {title}
        </div>

        <div
          style={{
            marginTop: "26px",
            width: "100%",
            borderTop: "2px dashed rgba(17,17,17,0.42)",
          }}
        />

        <div
          style={{
            marginTop: "26px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: "24px",
          }}
        >
          <div style={{ maxWidth: "560px" }}>
            <div
              style={{
                fontSize: "34px",
                lineHeight: 1.1,
                fontWeight: 500,
                letterSpacing: "-0.04em",
              }}
            >
              {subtitle}
            </div>
            <div
              style={{
                marginTop: "16px",
                maxWidth: "520px",
                fontSize: "24px",
                lineHeight: 1.25,
                color: "rgba(17,17,17,0.72)",
              }}
            >
              {note}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: "10px",
              minWidth: "260px",
            }}
          >
            <div
              style={{
                padding: "16px 18px",
                borderRadius: "22px",
                border: "1px solid rgba(17,17,17,0.16)",
                background: "rgba(255,255,255,0.55)",
                fontSize: "20px",
                fontWeight: 600,
              }}
            >
              Fotografía
            </div>
            <div
              style={{
                padding: "16px 18px",
                borderRadius: "22px",
                border: "1px solid rgba(17,17,17,0.16)",
                background: "rgba(255,255,255,0.55)",
                fontSize: "20px",
                fontWeight: 600,
              }}
            >
              Photoshop
            </div>
            <div
              style={{
                padding: "16px 18px",
                borderRadius: "22px",
                border: "1px solid rgba(17,17,17,0.16)",
                background: "rgba(255,255,255,0.55)",
                fontSize: "20px",
                fontWeight: 600,
              }}
            >
              IA
            </div>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            right: "72px",
            bottom: "72px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            fontSize: "22px",
            color: "rgba(17,17,17,0.7)",
          }}
        >
          <span
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "999px",
              background: "#111111",
            }}
          />
          <span>obeskay.com</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
