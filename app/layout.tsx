import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navigation from "./components/Navigation";
import JsonLd from "./components/JsonLd";
import GitHubCTA from "./components/GitHubCTA";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

const siteConfig = {
  name: "Obed Vargas",
  title: "Obed Vargas — AI Agents, Developer Tools & TypeScript",
  description: "Building AI agents and developer tools that solve real problems. Senior Software Engineer specializing in TypeScript, multi-agent systems, Vercel AI SDK, and productivity automation. Based in Mexico City.",
  url: "https://obeskay.com",
  ogImage: "/api/og?title=Obed%20Vargas&subtitle=AI%20Agents%20%26%20Developer%20Tools",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "AI Agents",
    "Multi-Agent Systems",
    "Developer Tools",
    "TypeScript",
    "Next.js",
    "Vercel AI SDK",
    "LangChain",
    "Conversational AI",
    "WhatsApp Automation",
    "Software Engineer",
    "Mexico City",
    "SaaS",
    "Open Source",
    "React",
    "Node.js",
    "Go",
    "Wails",
    "Framer Motion",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  
  // Open Graph
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.title,
      },
    ],
  },
  
  // Twitter Card
  twitter: {
    card: "summary_large_image",
    site: "@obeskay",
    creator: "@obeskay",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  
  // Verification & SEO
  verification: {
    google: "your-google-verification-code", // Add your code
    yandex: "your-yandex-verification-code", // Add your code
  },
  
  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  
  // Alternates
  alternates: {
    canonical: siteConfig.url,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#6750A4",
  colorScheme: "light dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon-192x192.png" type="image/png" sizes="192x192" />
        <link rel="icon" href="/icon-512x512.png" type="image/png" sizes="512x512" />
        <link rel="apple-touch-icon" sizes="192x192" href="/icon-192x192.png" />
        <link rel="apple-touch-icon" sizes="512x512" href="/icon-512x512.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="font-sans antialiased">
        <Navigation />
        <JsonLd />
        <main>{children}</main>
        <GitHubCTA />
      </body>
    </html>
  );
}
