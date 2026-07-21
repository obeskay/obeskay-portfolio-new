import { ImageResponse } from "next/og";

export const runtime = "edge";

const PROJECT_OG_DATA: Record<string, {
  title: string;
  subtitle: string;
  category: "Product" | "Lab" | "Open Source";
  status?: string;
  tagline: string;
  tech: string[];
}> = {
  chateala: {
    title: "Chatea.la",
    subtitle: "WhatsApp AI & Lead Capture SaaS",
    category: "Product",
    tagline: "Converts unstructured audio & text into synced CRM records and calendar bookings.",
    tech: ["TypeScript", "WhatsApp AI", "Multi-Agent"],
  },
  carti: {
    title: "Carti.app",
    subtitle: "WhatsApp Finance Bookkeeping Agent",
    category: "Product",
    status: "Private Beta",
    tagline: "Parses spontaneous voice notes into instant expense entries and budget ledgers.",
    tech: ["Next.js", "LLM Parser", "WhatsApp"],
  },
  sello: {
    title: "Sello",
    subtitle: "Digital Loyalty Rail for Local Merchants",
    category: "Lab",
    status: "Live Pilot",
    tagline: "Replaces paper stamp cards with instant WhatsApp QR check-ins.",
    tech: ["QR Engine", "WhatsApp", "Neobrutalism"],
  },
  freela: {
    title: "Freela",
    subtitle: "AI Project Scoping & Match Engine",
    category: "Lab",
    status: "Prototype",
    tagline: "Synthesizes client briefs into precise scope-of-work sheets and timelines.",
    tech: ["LLM Scoper", "React", "TypeScript"],
  },
  stickycovers: {
    title: "StickyCovers",
    subtitle: "Custom Card Skin Canvas & E-Commerce",
    category: "Product",
    tagline: "Interactive card sticker canvas with MercadoPago checkout and automated hooks.",
    tech: ["Canvas API", "MercadoPago", "Resend"],
  },
  qrapidito: {
    title: "QRapidito",
    subtitle: "Instant AI Menu Ingestion for Restaurants",
    category: "Product",
    tagline: "Parses messy restaurant menus into clean, customer-facing digital menus.",
    tech: ["OCR / Vision", "Next.js", "Tailwind"],
  },
  "lottie-skill": {
    title: "Lottie Animator",
    subtitle: "SVG-to-Lottie Motion Agent Skill",
    category: "Open Source",
    status: "3★ GitHub",
    tagline: "Agent skill generating production-ready Lottie animations directly from SVG vectors.",
    tech: ["Node.js", "Lottie-web", "Bodymovin"],
  },
  "swarm-ville": {
    title: "SwarmVille",
    subtitle: "Autonomous Agent Collaboration Simulator",
    category: "Open Source",
    tagline: "2D real-time canvas visualization of multi-agent problem-solving.",
    tech: ["Canvas 2D", "Multi-Agent", "WebSockets"],
  },
  "one-shot": {
    title: "One-Shot",
    subtitle: "Desktop LLM Context Builder",
    category: "Open Source",
    tagline: "Drag, drop, and ship context for LLMs. High-performance desktop utility.",
    tech: ["Wails", "Go", "React"],
  },
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug") || "";
  
  const projectInfo = PROJECT_OG_DATA[slug];

  const title = projectInfo?.title || searchParams.get("title") || "Obed Vargas";
  const subtitle = projectInfo?.subtitle || searchParams.get("subtitle") || "AI Products & Developer Tools";
  const tagline = projectInfo?.tagline || searchParams.get("tagline") || "Building resilient multi-agent platforms and developer utilities in Mexico City.";
  const category = projectInfo?.category || (searchParams.get("category") as any) || "Systems";
  const status = projectInfo?.status || searchParams.get("status") || null;
  const tech = projectInfo?.tech || ["TypeScript", "Next.js", "AI Agents"];

  // Category badge colors
  const badgeColors = {
    Product: { bg: "#0d2623", text: "#02c39a", border: "#164e43" },
    Lab: { bg: "#0d211c", text: "#2fd6a8", border: "#14473b" },
    "Open Source": { bg: "#23200e", text: "#f0d873", border: "#47401a" },
    Systems: { bg: "#0d2623", text: "#02c39a", border: "#164e43" },
  }[category] || { bg: "#0d2623", text: "#02c39a", border: "#164e43" };

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          justifyContent: "space-between",
          backgroundColor: "#071315",
          backgroundImage: "radial-gradient(circle at 85% 15%, rgba(2, 195, 154, 0.12) 0%, rgba(7, 19, 21, 0) 60%), radial-gradient(circle at 15% 85%, rgba(0, 134, 152, 0.08) 0%, rgba(7, 19, 21, 0) 50%)",
          padding: "56px 64px",
          color: "#e6fbf6",
          fontFamily: "system-ui, -apple-system, sans-serif",
          boxSizing: "border-box",
          position: "relative",
        }}
      >
        {/* Subtle top grid accent line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(90deg, #008698 0%, #02c39a 50%, #00a896 100%)",
          }}
        />

        {/* Top Bar: Brand Monogram + Badges */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          {/* Brand Monogram */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <span
              style={{
                fontSize: "24px",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                color: "#ffffff",
                fontFamily: "Georgia, serif",
                fontStyle: "italic",
              }}
            >
              obeskay<span style={{ color: "#02c39a", fontStyle: "normal" }}>.</span>
            </span>
          </div>

          {/* Badges Container */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span
              style={{
                fontSize: "13px",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                padding: "6px 14px",
                borderRadius: "9999px",
                backgroundColor: badgeColors.bg,
                color: badgeColors.text,
                border: `1px solid ${badgeColors.border}`,
              }}
            >
              {category.toLowerCase()}
            </span>

            {status && (
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  padding: "6px 14px",
                  borderRadius: "9999px",
                  backgroundColor: "#2a1311",
                  color: "#ff9b97",
                  border: "1px solid #4a1f1b",
                }}
              >
                {status.toLowerCase()}
              </span>
            )}
          </div>
        </div>

        {/* Middle Main Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            gap: "16px",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          <h1
            style={{
              fontSize: "64px",
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              margin: 0,
            }}
          >
            {title}
          </h1>

          <p
            style={{
              fontSize: "26px",
              fontWeight: 600,
              color: "#02c39a",
              margin: 0,
              letterSpacing: "-0.01em",
            }}
          >
            {subtitle}
          </p>

          <p
            style={{
              fontSize: "18px",
              fontWeight: 400,
              color: "#9cc7c2",
              maxWidth: "880px",
              lineHeight: 1.5,
              margin: 0,
            }}
          >
            {tagline}
          </p>
        </div>

        {/* Footer Bar: Tech Pills + Availability Dot */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            paddingTop: "24px",
            borderTop: "1px solid rgba(153, 246, 228, 0.08)",
          }}
        >
          {/* Tech Stack Pills */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {tech.map((item) => (
              <span
                key={item}
                style={{
                  fontSize: "12px",
                  fontFamily: "monospace",
                  fontWeight: 600,
                  color: "#6a8f8b",
                  backgroundColor: "rgba(153, 246, 228, 0.04)",
                  border: "1px solid rgba(153, 246, 228, 0.08)",
                  padding: "4px 10px",
                  borderRadius: "6px",
                }}
              >
                {item}
              </span>
            ))}
          </div>

          {/* Availability / Site Badge */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: "#00a896",
              }}
            />
            <span
              style={{
                fontSize: "14px",
                fontFamily: "monospace",
                fontWeight: 600,
                color: "#6a8f8b",
                letterSpacing: "0.05em",
              }}
            >
              obeskay.com
            </span>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
