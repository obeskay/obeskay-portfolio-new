import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Space_Grotesk } from "next/font/google";
import "../globals.css";
import Footer from "../components/Footer";
import JsonLd from "../components/JsonLd";
import Navigation from "../components/Navigation";
import { getFernandaContent, type FernandaLang } from "../../lib/content/fernanda";
import { isLang, type Lang } from "../../lib/i18n";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const siteConfig = {
  name: "Fernanda Escalante Rodríguez",
  url: "https://obeskay.com",
} as const;

export async function generateStaticParams() {
  return [{ lang: "es" }, { lang: "en" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang: Lang = isLang(rawLang) ? rawLang : "es";
  const copy = getFernandaContent(lang as FernandaLang);
  const ogLocale = lang === "es" ? "es_MX" : "en_US";
  const ogImage = `/api/og?title=${encodeURIComponent(copy.hero.title)}&subtitle=${encodeURIComponent(copy.hero.kicker)}`;

  return {
    metadataBase: new URL(siteConfig.url),
    title: copy.metaTitle,
    description: copy.metaDescription,
    keywords:
      lang === "es"
        ? [
            "Fotografía conceptual",
            "Photoshop",
            "IA",
            "Dirección de arte",
            "Workshops universitarios",
            "CDMX",
          ]
        : [
            "Conceptual photography",
            "Photoshop",
            "AI",
            "Art direction",
            "University workshops",
            "CDMX",
          ],
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    alternates: {
      canonical: `${siteConfig.url}/${lang}`,
      languages: {
        es: `${siteConfig.url}/es`,
        en: `${siteConfig.url}/en`,
      },
    },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      locale: ogLocale,
      url: `${siteConfig.url}/${lang}`,
      title: copy.metaTitle,
      description: copy.metaDescription,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: copy.metaTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: copy.metaTitle,
      description: copy.metaDescription,
      images: [ogImage],
    },
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
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#dff5f7",
  colorScheme: "light",
};

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang: Lang = isLang(rawLang) ? rawLang : "es";

  return (
    <html
      lang={lang}
      className={`${spaceGrotesk.variable} ${instrumentSerif.variable}`}
    >
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" sizes="192x192" href="/icon-192x192.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="min-h-dvh bg-background font-sans text-text-primary antialiased selection:bg-text-primary selection:text-background">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-text-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-background"
        >
          {lang === "en" ? "Skip to content" : "Saltar al contenido"}
        </a>
        <Navigation lang={lang} />
        <JsonLd lang={lang as FernandaLang} />
        <main id="content">{children}</main>
        <Footer lang={lang as FernandaLang} />
      </body>
    </html>
  );
}
