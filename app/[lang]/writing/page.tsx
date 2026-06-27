import { isLang, t, type Lang } from "../../../lib/i18n";
import { writings } from "../../../lib/content/writings";
import WritingCard from "../../components/WritingCard";

export default async function WritingIndex({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang: Lang = isLang(rawLang) ? rawLang : "es";
  const filtered = writings.filter((w) => w.lang === lang);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <section className="relative z-10 pt-24 pb-20 px-6 lg:px-12">
        <div className="container mx-auto max-w-3xl">
          <span className="badge badge-yellow mb-4">{t(lang, "nav.writing")}</span>
          <h1 className="text-4xl md:text-5xl font-serif text-text-primary tracking-tight leading-tight lowercase mb-12">
            {t(lang, "section.writing.lead")}
          </h1>

          {filtered.length === 0 ? (
            <p className="font-serif italic text-text-secondary text-lg">
              {t(lang, "writing.empty")}
            </p>
          ) : (
            <div>
              {filtered.map((w) => (
                <WritingCard key={w.slug} writing={w} lang={lang} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
