import Link from "next/link";
import { getFernandaContent, type FernandaLang } from "../../lib/content/fernanda";

export default function Footer({ lang }: { lang: FernandaLang }) {
  const copy = getFernandaContent(lang);
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/70 bg-surface/25">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 border-t border-dashed border-text-primary/20 pt-6 lg:grid-cols-[1.1fr_0.9fr_0.9fr]">
          <div className="space-y-2">
            <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-text-muted">
              {copy.siteName}
            </p>
            <p className="max-w-sm text-sm leading-6 text-text-secondary">
              {copy.contact.description}
            </p>
            <p className="text-sm leading-6 text-text-secondary">
              © {year} {copy.siteName}
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-text-muted">
              Contacto
            </p>
            <div className="space-y-1 text-sm text-text-secondary">
              <a
                href={copy.social.email}
                className="block transition-colors hover:text-text-primary"
              >
                {copy.contact.email}
              </a>
              <a
                href={`tel:${copy.contact.phone.replace(/\s+/g, "")}`}
                className="block transition-colors hover:text-text-primary"
              >
                {copy.contact.phone}
              </a>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-text-muted">
              Social
            </p>
            <div className="space-y-1 text-sm text-text-secondary">
              <a
                href={copy.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="block transition-colors hover:text-text-primary"
              >
                {copy.contact.instagram}
              </a>
              <a
                href={copy.social.threads}
                target="_blank"
                rel="noopener noreferrer"
                className="block transition-colors hover:text-text-primary"
              >
                {copy.contact.threads}
              </a>
            </div>
            <Link
              href={`/${lang}#hero`}
              className="inline-flex text-sm font-medium text-text-primary transition-colors hover:opacity-70"
            >
              {lang === "en" ? "Back to top" : "Volver arriba"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
