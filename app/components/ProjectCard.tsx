import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { t, type Lang } from "../../lib/i18n";
import type { Product, ProductStatus } from "../../lib/content/work";

const statusLabelKey: Record<ProductStatus, string> = {
  live: "work.status.live",
  pilot: "work.status.pilot",
  frozen: "work.status.frozen",
  maintenance: "work.status.maintenance",
};

const statusClass: Record<ProductStatus, string> = {
  live: "badge-green",
  pilot: "badge-yellow",
  frozen: "badge-red",
  maintenance: "badge-blue",
};

export default function ProjectCard({
  product,
  lang,
}: {
  product: Product;
  lang: Lang;
}) {
  return (
    <article className="group flex flex-col h-full bg-surface border border-border rounded-lg p-5 shadow-xs hover:border-text-secondary hover:shadow-sm transition-all duration-300">
      <div className="flex items-center justify-between gap-2 mb-3">
        <span className={`badge ${statusClass[product.status]}`}>
          {t(lang, statusLabelKey[product.status])}
        </span>
      </div>

      <h3 className="text-lg font-semibold text-text-primary tracking-tight">
        {product.name}
      </h3>

      <p className="mt-1 text-[10px] font-mono font-semibold uppercase tracking-wider text-text-muted">
        {product.role}
      </p>

      <p className="mt-4 font-serif italic text-base text-text-primary leading-snug">
        &ldquo;{product.learned}&rdquo;
      </p>

      <p className="mt-3 font-mono text-[10px] uppercase tracking-wider text-text-muted">
        {product.metric}
      </p>

      <div className="mt-auto pt-5">
        <Link
          href={`/${lang}/work/${product.slug}`}
          className="inline-flex items-center gap-1.5 text-[10px] font-mono font-semibold uppercase tracking-wider text-text-primary"
        >
          <span>case study</span>
          <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
        </Link>
      </div>
    </article>
  );
}
