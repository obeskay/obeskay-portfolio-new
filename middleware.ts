import { NextRequest, NextResponse } from "next/server";

/**
 * i18n middleware — no library, no next-intl.
 *
 * Rules:
 *  - If the path already starts with /es, /en, /api, /_next, or has a file
 *    extension (asset), or matches /robots.txt or /sitemap.xml, let it through.
 *  - Otherwise read Accept-Language and redirect to /es or /en.
 *  - If we don't recognize the locale in the header, default to /es.
 *
 * The matcher excludes API, _next, static files, and the sitemap/robots
 * routes so middleware never runs on them.
 */

const SUPPORTED = ["es", "en"] as const;
type Supported = (typeof SUPPORTED)[number];

const STATIC_FILE_RE = /\.[a-zA-Z0-9]+$/;

function pickLocale(acceptLanguage: string | null): Supported {
  if (!acceptLanguage) return "es";
  // Parse q-weighted list. We only need the first supported tag.
  const tags = acceptLanguage
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const qMatch = params
        .map((p) => p.trim())
        .find((p) => p.startsWith("q="));
      const q = qMatch ? Number(qMatch.slice(2)) : 1;
      return { tag: tag.toLowerCase(), q: Number.isFinite(q) ? q : 1 };
    })
    .sort((a, b) => b.q - a.q);

  for (const { tag } of tags) {
    const base = tag.split("-")[0];
    if ((SUPPORTED as readonly string[]).includes(base)) {
      return base as Supported;
    }
  }
  return "es";
}

// Routes that existed in the previous version of the site but were removed
// in the i18n / maestro-docente refactor. Visitors who still have them as
// bookmarks or follow old links should land on the home of their language
// instead of a 404.
const RETIRED_TOP_LEVEL = ["/journey", "/contact"] as const;

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Pass through anything that already has a locale prefix, an API path,
  // an internal Next path, a static file, or a known metadata file.
  if (
    pathname.startsWith("/es") ||
    pathname.startsWith("/en") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    STATIC_FILE_RE.test(pathname)
  ) {
    return NextResponse.next();
  }

  // Retired top-level routes: redirect to the localized home rather than
  // bouncing through /es/404. Old bookmarks shouldn't dead-end.
  if ((RETIRED_TOP_LEVEL as readonly string[]).includes(pathname)) {
    const locale = pickLocale(req.headers.get("accept-language"));
    const url = req.nextUrl.clone();
    url.pathname = `/${locale}`;
    return NextResponse.redirect(url);
  }

  const locale = pickLocale(req.headers.get("accept-language"));
  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     *  - /api/*
     *  - /_next/*
     *  - /favicon.ico, /robots.txt, /sitemap.xml
     *  - any file with an extension (images, fonts, etc.)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.[a-zA-Z0-9]+$).*)",
  ],
};
