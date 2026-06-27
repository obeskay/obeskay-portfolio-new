import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { getFernandaContent, type FernandaLang } from "../../lib/content/fernanda";

const navLabels = {
  es: ["Trabajos", "Perfil", "Workshops", "Contacto"],
  en: ["Work", "Profile", "Workshops", "Contact"],
} as const;

const navTargets = ["#trabajos", "#perfil", "#workshops", "#contacto"] as const;

export default function Navigation({ lang = "es" }: { lang?: FernandaLang }) {
  const copy = getFernandaContent(lang);
  const labels = navLabels[lang];

  return (
    <header className="sticky top-0 z-40">
      <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
        <div className="rounded-full border border-border/70 bg-surface/80 backdrop-blur-xl shadow-[0_18px_50px_rgba(20,20,20,0.08)]">
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-5">
            <Link
              href={`/${lang}#hero`}
              className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.4em] text-text-primary transition-opacity hover:opacity-70"
            >
              <span>{lang === "en" ? "Portfolio" : "Portafolio"}</span>
              <Sparkles className="h-3.5 w-3.5 shrink-0" />
            </Link>

            <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[10px] font-medium uppercase tracking-[0.32em] text-text-secondary">
              {labels.map((label, index) => (
                <Link
                  key={label}
                  href={`/${lang}${navTargets[index]}`}
                  className="transition-colors hover:text-text-primary"
                >
                  {label}
                </Link>
              ))}
            </nav>

            <a
              href={`/${lang}#contacto`}
              className="inline-flex items-center gap-2 rounded-full border border-text-primary/15 bg-text-primary px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-background transition-transform duration-200 hover:scale-[0.98]"
            >
              {copy.contact.cta}
              <ArrowUpRight className="h-3.5 w-3.5 shrink-0" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
