import type { MetadataRoute } from "next";

const baseUrl = "https://obeskay.com";

const ROUTES = ["/"] as const;
const LANGS = ["es", "en"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    // Locale-prefixed routes (the canonical surface).
    ...LANGS.flatMap((lang) =>
      ROUTES.map((route) => ({
        url: `${baseUrl}/${lang}${route === "/" ? "" : route}`,
        lastModified,
        changeFrequency: "weekly" as const,
        priority: 1,
        alternates: {
          languages: {
            es: `${baseUrl}/es${route === "/" ? "" : route}`,
            en: `${baseUrl}/en${route === "/" ? "" : route}`,
          },
        },
      })),
    ),
    // Root URL — points to the locale default; the middleware decides which
    // locale a given visitor actually lands on.
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
