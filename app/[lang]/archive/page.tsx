import { isLang, t, type Lang } from "../../../lib/i18n";
import { archivedProducts } from "../../../lib/content/archive";

const statusLabelKey = {
  frozen: "work.status.frozen",
  maintenance: "work.status.maintenance",
} as const;

const statusClass = {
  frozen: "badge-red",
  maintenance: "badge-blue",
} as const;

export default async function Archive({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang: Lang = isLang(rawLang) ? rawLang : "es";

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <section className="relative z-10 pt-24 pb-20 px-6 lg:px-12">
        <div className="container mx-auto max-w-3xl">
          <span className="badge badge-red mb-4">{t(lang, "archive.title")}</span>
          <h1 className="text-4xl md:text-5xl font-serif text-text-primary tracking-tight leading-tight lowercase mb-3">
            {t(lang, "archive.title")}
          </h1>
          <p className="text-text-secondary leading-relaxed text-sm max-w-xl mb-12">
            {t(lang, "archive.lead")}
          </p>

          <ul className="space-y-6">
            {archivedProducts.map((item) => (
              <li
                key={item.slug}
                className="bg-surface border border-border rounded-lg p-5"
              >
                <div className="flex items-center justify-between gap-3 mb-2">
                  <h2 className="text-lg font-semibold text-text-primary lowercase">
                    {item.name}
                  </h2>
                  <span className={`badge ${statusClass[item.status]}`}>
                    {t(lang, statusLabelKey[item.status])}
                  </span>
                </div>
                <p className="font-mono text-[10px] uppercase tracking-wider text-text-muted mb-2">
                  {item.period}
                </p>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {item.reason}
                </p>
                {item.url && (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block text-[10px] font-mono font-semibold uppercase tracking-wider text-text-primary hover:opacity-80 transition-opacity"
                  >
                    {item.url}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
