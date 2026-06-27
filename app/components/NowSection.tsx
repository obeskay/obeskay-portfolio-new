import { t, type Lang } from "../../lib/i18n";

export default function NowSection({ lang }: { lang: Lang }) {
  return (
    <section className="py-12 px-6 lg:px-12 border-t border-border-subtle">
      <div className="container mx-auto max-w-5xl">
        <span className="badge badge-blue mb-4">{t(lang, "section.now")}</span>
        <p className="font-serif italic text-xl md:text-2xl text-text-primary leading-snug max-w-2xl">
          {t(lang, "now.placeholder")}
        </p>
      </div>
    </section>
  );
}
