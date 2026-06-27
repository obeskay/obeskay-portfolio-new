import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { isLang, t, type Lang } from "../../../lib/i18n";
import { products } from "../../../lib/content/work";
import ProjectCard from "../../components/ProjectCard";

export default async function WorkIndex({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang: Lang = isLang(rawLang) ? rawLang : "es";

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[5%] right-[10%] w-[500px] h-[500px] rounded-full bg-accent-bg/10 blur-[100px]" />
        <div className="absolute bottom-[20%] left-[5%] w-[400px] h-[400px] rounded-full bg-pastel-red-bg/8 blur-[90px]" />
      </div>

      <section className="relative z-10 pt-24 pb-12 px-6 lg:px-12">
        <div className="container mx-auto max-w-5xl">
          <div className="max-w-3xl mb-16">
            <span className="badge badge-blue mb-4">{t(lang, "section.work")}</span>
            <h1 className="text-5xl sm:text-6xl font-serif text-text-primary tracking-tight leading-tight lowercase">
              {t(lang, "section.work.lead")}
            </h1>

            <div className="mt-6">
              <Link
                href={`/${lang}/archive`}
                className="inline-flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-text-secondary hover:text-text-primary transition-colors"
              >
                {t(lang, "archive.title")}
                <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
              </Link>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {products.map((product) => (
              <ProjectCard key={product.slug} product={product} lang={lang} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
