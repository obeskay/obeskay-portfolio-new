import Link from "next/link";
import type { Lang } from "../../lib/i18n";
import { t } from "../../lib/i18n";
import type { Writing } from "../../lib/content/writings";

function formatDate(iso: string, lang: Lang) {
  return new Date(iso).toLocaleDateString(lang === "es" ? "es-MX" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function WritingCard({
  writing,
  lang,
}: {
  writing: Writing;
  lang: Lang;
}) {
  return (
    <article className="group py-8 border-b border-border-subtle last:border-b-0">
      <Link href={`/${lang}/writing/${writing.slug}`} className="block">
        <h3 className="font-serif italic text-2xl md:text-3xl text-text-primary tracking-tight mb-2 group-hover:opacity-80 transition-opacity">
          {writing.title}
        </h3>

        <div className="flex flex-wrap items-center gap-3 text-[10px] font-mono uppercase tracking-wider text-text-muted mb-3">
          <time dateTime={writing.publishedAt}>
            {formatDate(writing.publishedAt, lang)}
          </time>
          <span aria-hidden>·</span>
          <span>
            {t(lang, "writing.reading", { minutes: writing.readingMinutes })}
          </span>
          {writing.tags.length > 0 && (
            <>
              <span aria-hidden>·</span>
              <span className="text-text-secondary">
                {writing.tags.join(" · ")}
              </span>
            </>
          )}
        </div>

        <p className="text-sm text-text-secondary leading-relaxed max-w-2xl">
          {writing.excerpt}
        </p>
      </Link>
    </article>
  );
}
