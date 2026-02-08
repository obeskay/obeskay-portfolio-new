import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navigation from "./components/Navigation";
import PageTransition from "./components/PageTransition";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Obed Vargas | AI & Web Developer",
  description: "Senior Software Engineer specializing in TypeScript, Next.js, and AI agents. Building intelligent web experiences at the intersection of UX and AI.",
  keywords: ["TypeScript", "Next.js", "AI", "Conversational AI", "Web Developer", "Mexico City", "CDMX"],
  authors: [{ name: "Obed Vargas" }],
  openGraph: {
    title: "Obed Vargas | AI & Web Developer",
    description: "Building intelligent web experiences at the intersection of UX and AI.",
    url: "https://obeskay.com",
    siteName: "Obed Vargas Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Obed Vargas | AI & Web Developer",
    description: "Building intelligent web experiences at the intersection of UX and AI.",
    creator: "@obeskay",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} font-sans antialiased bg-background text-foreground`}>
        <Navigation />
        <PageTransition>
          {children}
        </PageTransition>
      </body>
    </html>
  );
}
