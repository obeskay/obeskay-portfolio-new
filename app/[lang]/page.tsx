import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin, Sparkles } from "lucide-react";
import {
  getFernandaContent,
  type ContentBlock,
  type FernandaLang,
  type GalleryItem,
  type RelatedProject,
  type WorkshopCard,
} from "../../lib/content/fernanda";
import { isLang, type Lang } from "../../lib/i18n";

export default async function FernandaHome({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang: Lang = isLang(rawLang) ? rawLang : "es";
  const copy = getFernandaContent(lang as FernandaLang);
  const [featuredWork, ...secondaryWorks] = copy.gallery.items;
  const heroLinks = [
    { label: copy.hero.ctas[0].label, href: copy.hero.ctas[0].href },
    { label: copy.hero.ctas[1].label, href: copy.hero.ctas[1].href },
  ];

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-28 right-[-6rem] h-[24rem] w-[24rem] rounded-full bg-white/50 blur-[120px]" />
        <div className="absolute top-[22rem] left-[-8rem] h-[18rem] w-[18rem] rounded-full bg-text-primary/5 blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.38)_0%,rgba(255,255,255,0.16)_24%,rgba(255,255,255,0)_56%,rgba(255,255,255,0.18)_100%)]" />
      </div>

      <section id="hero" className="relative scroll-mt-24 px-4 pb-12 pt-8 sm:px-6 sm:pb-16 lg:px-8 lg:pt-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-wrap gap-2">
            <MetaChip>{copy.hero.eyebrow}</MetaChip>
            <MetaChip>{copy.hero.kicker}</MetaChip>
            <MetaChip>{copy.contact.location}</MetaChip>
          </div>

          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-surface/75 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.34em] text-text-secondary backdrop-blur-sm">
                <Sparkles className="h-3.5 w-3.5 shrink-0" />
                {lang === "en" ? "University workshops ready" : "Lista para workshops universitarios"}
              </div>

              <h1 className="mt-6 max-w-4xl text-[clamp(3.8rem,10.2vw,8.3rem)] font-bold tracking-[-0.08em] leading-[0.88] text-text-primary text-balance">
                {copy.hero.title}
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-text-secondary text-balance sm:text-xl">
                {copy.hero.description}
              </p>

              <p className="mt-5 max-w-2xl text-sm uppercase tracking-[0.32em] text-text-primary/80">
                {copy.hero.introNote}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={heroLinks[0].href} className="btn-primary">
                  {heroLinks[0].label}
                  <ArrowUpRight className="h-3.5 w-3.5 shrink-0" />
                </Link>
                <Link href={heroLinks[1].href} className="btn-secondary">
                  {heroLinks[1].label}
                </Link>
                <a href={copy.social.email} className="inline-flex items-center gap-2 text-sm font-medium text-text-primary underline decoration-text-primary/25 underline-offset-4 transition-opacity hover:opacity-70">
                  {lang === "en" ? "Direct email" : "Email directo"}
                  <ArrowUpRight className="h-3.5 w-3.5 shrink-0" />
                </a>
              </div>

              <div className="mt-10 grid gap-3 sm:grid-cols-3">
                {copy.hero.tags.map((tag) => (
                  <div key={tag} className="rounded-[1.5rem] border border-border/70 bg-surface/70 px-4 py-4 shadow-[0_12px_30px_rgba(24,56,59,0.05)] backdrop-blur-sm">
                    <p className="text-[10px] uppercase tracking-[0.34em] text-text-muted">
                      {lang === "en" && tag === "Fotografía" ? "Photography" : tag}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <figure className="group relative overflow-hidden rounded-[2.5rem] border border-border/80 bg-surface/70 shadow-[0_30px_80px_rgba(24,56,59,0.12)]">
                <div className="relative aspect-[4/5] min-h-[32rem]">
                  <Image
                    src={copy.hero.image}
                    alt={copy.hero.imageAlt}
                    fill
                    priority
                    sizes="(min-width: 1024px) 42vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0)_48%,rgba(0,0,0,0.58)_100%)]" />
                </div>

                <figcaption className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <div className="rounded-[1.5rem] border border-white/20 bg-[rgba(16,16,16,0.26)] px-4 py-4 text-white backdrop-blur-md">
                    <div className="flex flex-wrap items-center justify-between gap-3 text-[10px] uppercase tracking-[0.36em] text-white/70">
                      <span>{copy.contact.location}</span>
                      <span>{copy.gallery.filterLabels[1]}</span>
                    </div>
                    <p className="mt-3 max-w-sm text-sm leading-6 text-white/86">
                      {copy.workshops.note}
                    </p>
                  </div>
                </figcaption>
              </figure>

              <div className="pointer-events-none absolute -left-4 -top-4 hidden max-w-[13rem] rounded-[1.5rem] border border-border/70 bg-surface/85 p-4 shadow-[0_18px_50px_rgba(24,56,59,0.1)] backdrop-blur-md lg:block">
                <p className="text-[10px] uppercase tracking-[0.34em] text-text-muted">
                  {copy.profile.toolsTitle}
                </p>
                <p className="mt-2 text-sm leading-6 text-text-secondary">
                  {copy.profile.tools.slice(0, 3).join(" · ")}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-dashed border-text-primary/20" />
        </div>
      </section>

      <section id="trabajos" className="relative scroll-mt-24 px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <SectionLabel>{copy.gallery.eyebrow}</SectionLabel>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.06em] leading-[0.96] text-text-primary text-balance sm:text-4xl lg:text-5xl">
                {copy.gallery.title}
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-text-secondary sm:text-base">
              {copy.gallery.description}
            </p>
          </div>

          <div className="mb-6 flex flex-wrap gap-2">
            {copy.gallery.filterLabels.map((label) => (
              <MetaChip key={label}>{label}</MetaChip>
            ))}
          </div>

          <div className="grid gap-4 lg:grid-cols-[0.98fr_1.02fr]">
            <GalleryCard item={featuredWork} featured />

            <div className="grid gap-4 sm:grid-cols-2">
              {secondaryWorks.map((item, index) => (
                <GalleryCard
                  key={item.title}
                  item={item}
                  featured={index === 0}
                  className={index === 0 ? "sm:col-span-2" : ""}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="perfil" className="relative scroll-mt-24 px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="space-y-6">
              <SectionLabel>{copy.profile.eyebrow}</SectionLabel>
              <h2 className="max-w-2xl text-3xl font-semibold tracking-[-0.06em] leading-[0.95] text-text-primary text-balance sm:text-4xl lg:text-5xl">
                {copy.profile.title}
              </h2>

              <p className="max-w-2xl text-base leading-8 text-text-secondary text-balance sm:text-lg">
                {copy.profile.description}
              </p>

              <blockquote className="rounded-[1.75rem] border border-border/80 bg-surface/70 p-6 shadow-[0_16px_45px_rgba(24,56,59,0.08)] backdrop-blur-sm">
                <p className="text-[10px] uppercase tracking-[0.34em] text-text-muted">
                  {lang === "en" ? "Statement" : "Declaración"}
                </p>
                <p className="mt-4 max-w-xl text-2xl leading-[1.22] text-text-primary sm:text-3xl">
                  {copy.profile.quote}
                </p>
              </blockquote>

              <div className="rounded-[1.75rem] border border-border/80 bg-surface/70 p-6 shadow-[0_16px_45px_rgba(24,56,59,0.08)] backdrop-blur-sm">
                <p className="text-[10px] uppercase tracking-[0.34em] text-text-muted">
                  {copy.profile.toolsTitle}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {copy.profile.tools.map((tool) => (
                    <MetaChip key={tool}>{tool}</MetaChip>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-4 xl:grid-cols-3">
              <ContentPanel title={lang === "en" ? "Services" : "Servicios"} items={copy.profile.services} />
              <ContentPanel title={lang === "en" ? "Experience" : "Experiencia"} items={copy.profile.experience} />
              <ContentPanel title={lang === "en" ? "Education" : "Educación"} items={copy.profile.education} />

              <div className="xl:col-span-3 grid gap-4 lg:grid-cols-[1.02fr_0.98fr]">
                <div className="rounded-[1.75rem] border border-border/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.62)_0%,rgba(255,255,255,0.42)_100%)] p-6 shadow-[0_18px_45px_rgba(24,56,59,0.08)] backdrop-blur-sm">
                  <p className="text-[10px] uppercase tracking-[0.34em] text-text-muted">
                    {lang === "en" ? "Recognition" : "Reconocimiento"}
                  </p>
                  <h3 className="mt-4 text-3xl font-semibold tracking-[-0.06em] leading-[0.96] text-text-primary">
                    {copy.profile.awardTitle}
                  </h3>
                  <p className="mt-3 max-w-xl text-base leading-7 text-text-secondary">
                    {copy.profile.awardBody}
                  </p>
                </div>

                <div className="rounded-[1.75rem] border border-border/80 bg-surface/70 p-6 shadow-[0_18px_45px_rgba(24,56,59,0.08)] backdrop-blur-sm">
                  <p className="text-[10px] uppercase tracking-[0.34em] text-text-muted">
                    {lang === "en" ? "Approach" : "Enfoque"}
                  </p>
                  <p className="mt-4 max-w-md text-2xl leading-[1.22] text-text-primary sm:text-3xl">
                    {lang === "en"
                      ? "Narrative, editing, and AI as one visual language."
                      : "Narrativa, edición e IA como un solo lenguaje visual."}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {copy.gallery.filterLabels.slice(1).map((label) => (
                      <MetaChip key={label}>{label}</MetaChip>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="workshops" className="relative scroll-mt-24 px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="space-y-6">
              <SectionLabel>{copy.workshops.eyebrow}</SectionLabel>
              <h2 className="max-w-2xl text-3xl font-semibold tracking-[-0.06em] leading-[0.95] text-text-primary text-balance sm:text-4xl lg:text-5xl">
                {copy.workshops.title}
              </h2>
              <p className="max-w-2xl text-base leading-8 text-text-secondary text-balance sm:text-lg">
                {copy.workshops.description}
              </p>

              <div className="rounded-[1.75rem] border border-border/80 bg-surface/70 p-6 shadow-[0_16px_45px_rgba(24,56,59,0.08)] backdrop-blur-sm">
                <p className="text-[10px] uppercase tracking-[0.34em] text-text-muted">
                  {lang === "en" ? "Formats" : "Formatos"}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {copy.workshops.formats.map((format) => (
                    <MetaChip key={format}>{format}</MetaChip>
                  ))}
                </div>
                <p className="mt-4 max-w-md text-sm leading-7 text-text-secondary">
                  {copy.workshops.note}
                </p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {copy.workshops.cards.map((card) => (
                <WorkshopPanel key={card.title} card={card} lang={lang as FernandaLang} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="freela" className="relative scroll-mt-24 px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="space-y-6">
              <SectionLabel>{copy.related.eyebrow}</SectionLabel>
              <h2 className="max-w-2xl text-3xl font-semibold tracking-[-0.06em] leading-[0.95] text-text-primary text-balance sm:text-4xl lg:text-5xl">
                {copy.related.title}
              </h2>
              <p className="max-w-2xl text-base leading-8 text-text-secondary text-balance sm:text-lg">
                {copy.related.description}
              </p>
              <div className="flex flex-wrap gap-2">
                <MetaChip>{copy.related.label}</MetaChip>
                <MetaChip>{lang === "en" ? "Adjacent product" : "Proyecto afín"}</MetaChip>
              </div>
            </div>

            <RelatedProjectPanel project={copy.related} />
          </div>
        </div>
      </section>

      <section id="contacto" className="relative scroll-mt-24 px-4 py-12 pb-20 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-[1.02fr_0.98fr]">
            <div className="rounded-[2rem] border border-border/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.68)_0%,rgba(255,255,255,0.45)_100%)] p-6 shadow-[0_24px_60px_rgba(24,56,59,0.1)] backdrop-blur-sm sm:p-8">
              <SectionLabel>{copy.contact.eyebrow}</SectionLabel>
              <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-[-0.06em] leading-[0.95] text-text-primary text-balance sm:text-4xl lg:text-5xl">
                {copy.contact.title}
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-text-secondary text-balance sm:text-lg">
                {copy.contact.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a href={copy.social.email} className="btn-primary">
                  {copy.contact.cta}
                  <ArrowUpRight className="h-3.5 w-3.5 shrink-0" />
                </a>
                <a
                  href={copy.social.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary"
                >
                  {copy.contact.instagram}
                </a>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <ContactRow label={lang === "en" ? "Email" : "Correo"} value={copy.contact.email} href={copy.social.email} />
                <ContactRow label={lang === "en" ? "Phone" : "Teléfono"} value={copy.contact.phone} href={`tel:${copy.contact.phone.replace(/\s+/g, "")}`} />
                <ContactRow label={lang === "en" ? "Instagram" : "Instagram"} value={copy.contact.instagram} href={copy.social.instagram} external />
                <ContactRow label="Threads" value={copy.contact.threads} href={copy.social.threads} external />
              </div>

              <div className="mt-8 rounded-[1.5rem] border border-dashed border-text-primary/15 bg-background/55 p-4">
                <p className="text-[10px] uppercase tracking-[0.34em] text-text-muted">
                  {lang === "en" ? "Best for" : "Ideal para"}
                </p>
                <p className="mt-2 max-w-2xl text-sm leading-7 text-text-secondary">
                  {lang === "en"
                    ? "University workshops, artist talks, editorial commissions, brand storytelling, and concept-driven image series."
                    : "Workshops universitarios, charlas, comisiones editoriales, narrativa de marca y series fotográficas con concepto."}
                </p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-[2rem] border border-border/80 bg-surface/70 shadow-[0_24px_60px_rgba(24,56,59,0.1)]">
              <div className="relative aspect-[4/5] min-h-[32rem]">
                <Image
                  src={copy.contact.portrait}
                  alt={copy.contact.portraitAlt}
                  fill
                  sizes="(min-width: 1024px) 38vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0)_48%,rgba(0,0,0,0.58)_100%)]" />
              </div>

              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                <div className="rounded-[1.5rem] border border-white/20 bg-[rgba(16,16,16,0.25)] px-4 py-4 text-white backdrop-blur-md">
                  <p className="text-[10px] uppercase tracking-[0.34em] text-white/70">
                    {copy.contact.location}
                  </p>
                  <p className="mt-3 text-2xl leading-[1.2] text-white sm:text-3xl">
                    {lang === "en" ? "Ready to teach and collaborate." : "Lista para enseñar y colaborar."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-medium uppercase tracking-[0.42em] text-text-muted">
      {children}
    </p>
  );
}

function MetaChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border/80 bg-surface/75 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.3em] text-text-secondary backdrop-blur-sm">
      {children}
    </span>
  );
}

function GalleryCard({
  item,
  featured = false,
  className = "",
}: {
  item: GalleryItem;
  featured?: boolean;
  className?: string;
}) {
  return (
    <figure
      className={[
        "group relative overflow-hidden rounded-[2rem] border border-border/80 bg-surface/70 shadow-[0_22px_60px_rgba(24,56,59,0.1)]",
        featured ? "min-h-[34rem]" : "min-h-[18rem]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="absolute inset-0">
        <Image
          src={item.image}
          alt={item.alt}
          fill
          sizes={
            featured
              ? "(min-width: 1024px) 40vw, 100vw"
              : "(min-width: 1024px) 24vw, 100vw"
          }
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0)_42%,rgba(0,0,0,0.66)_100%)]" />
      </div>

      <figcaption className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
        <div className="rounded-[1.35rem] border border-white/15 bg-[rgba(16,16,16,0.22)] px-4 py-4 text-white backdrop-blur-md">
          <div className="flex items-center justify-between gap-4 text-[10px] uppercase tracking-[0.36em] text-white/70">
            <span>{item.category}</span>
            <span>{item.year}</span>
          </div>
          <h3 className={[
            "mt-3 text-white",
            featured ? "text-2xl sm:text-3xl" : "text-lg sm:text-xl",
          ].join(" ")}>
            {item.title}
          </h3>
          <p className="mt-2 max-w-md text-sm leading-6 text-white/82">
            {item.caption}
          </p>
        </div>
      </figcaption>
    </figure>
  );
}

function ContentPanel({
  title,
  items,
}: {
  title: string;
  items: ContentBlock[];
}) {
  return (
    <div className="rounded-[1.75rem] border border-border/80 bg-surface/70 p-6 shadow-[0_18px_45px_rgba(24,56,59,0.08)] backdrop-blur-sm">
      <p className="text-[10px] uppercase tracking-[0.34em] text-text-muted">
        {title}
      </p>
      <div className="mt-4 space-y-4">
        {items.map((item) => (
          <article
            key={item.title}
            className="border-t border-dashed border-text-primary/10 pt-4 first:border-t-0 first:pt-0"
          >
            <h3 className="text-sm font-semibold leading-6 text-text-primary text-balance">
              {item.title}
            </h3>
            <p className="mt-1 text-sm leading-6 text-text-secondary">
              {item.body}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}

function WorkshopPanel({
  card,
  lang,
}: {
  card: WorkshopCard;
  lang: FernandaLang;
}) {
  return (
    <article className="rounded-[1.75rem] border border-border/80 bg-surface/70 p-6 shadow-[0_18px_45px_rgba(24,56,59,0.08)] backdrop-blur-sm">
      <p className="text-[10px] uppercase tracking-[0.34em] text-text-muted">
        {card.duration}
      </p>
      <h3 className="mt-4 text-xl font-semibold leading-[1.08] tracking-[-0.05em] text-text-primary">
        {card.title}
      </h3>
      <p className="mt-3 text-sm leading-7 text-text-secondary">
        {card.description}
      </p>
      <p className="mt-6 text-[10px] uppercase tracking-[0.34em] text-text-muted">
        {lang === "en" ? "Workshop module" : "Módulo de taller"}
      </p>
    </article>
  );
}

function RelatedProjectPanel({ project }: { project: RelatedProject }) {
  return (
    <Link
      href={project.href}
      target="_blank"
      rel="noreferrer"
      className="group block rounded-[2rem] border border-border/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.78)_0%,rgba(255,255,255,0.52)_100%)] p-6 shadow-[0_24px_60px_rgba(24,56,59,0.1)] backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1"
    >
      <div className="flex items-center justify-between gap-4">
        <p className="text-[10px] uppercase tracking-[0.34em] text-text-muted">
          {project.label}
        </p>
        <ArrowUpRight className="h-4 w-4 shrink-0 text-text-primary/70 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </div>

      <h3 className="mt-6 text-3xl font-semibold tracking-[-0.06em] leading-[0.95] text-text-primary sm:text-4xl">
        {project.title}
      </h3>

      <p className="mt-4 max-w-xl text-base leading-8 text-text-secondary">
        {project.description}
      </p>

      <div className="mt-6 rounded-[1.5rem] border border-dashed border-text-primary/15 bg-background/55 px-4 py-4">
        <p className="text-[10px] uppercase tracking-[0.34em] text-text-muted">
          {project.metric}
        </p>
      </div>

      <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-border/80 bg-surface/75 px-4 py-2 text-sm font-medium text-text-primary transition-colors duration-300 group-hover:bg-background">
        {project.cta}
        <ArrowUpRight className="h-3.5 w-3.5 shrink-0" />
      </div>
    </Link>
  );
}

function ContactRow({
  label,
  value,
  href,
  external = false,
}: {
  label: string;
  value: string;
  href: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="group rounded-[1.35rem] border border-border/80 bg-background/55 px-4 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-text-primary/20 hover:bg-background/80"
    >
      <p className="text-[10px] uppercase tracking-[0.34em] text-text-muted">
        {label}
      </p>
      <p className="mt-2 flex items-center justify-between gap-4 text-sm font-medium text-text-primary">
        <span>{value}</span>
        <ArrowUpRight className="h-3.5 w-3.5 shrink-0 opacity-60 transition-opacity group-hover:opacity-100" />
      </p>
    </a>
  );
}
