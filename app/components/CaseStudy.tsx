import { ArrowUpRight } from "lucide-react";
import { t, type Lang } from "../../lib/i18n";
import type { Product } from "../../lib/content/work";

const statusLabelKey: Record<Product["status"], string> = {
  live: "work.status.live",
  pilot: "work.status.pilot",
  frozen: "work.status.frozen",
  maintenance: "work.status.maintenance",
};

const statusClass: Record<Product["status"], string> = {
  live: "badge-green",
  pilot: "badge-yellow",
  frozen: "badge-red",
  maintenance: "badge-blue",
};

function formatPeriod(startedAt: string, endAt?: string) {
  const start = new Date(startedAt).getUTCFullYear();
  const end = endAt ? new Date(endAt).getUTCFullYear() : "Present";
  return `${start} — ${end}`;
}

export default function CaseStudy({
  product,
  lang,
}: {
  product: Product;
  lang: Lang;
}) {
  return (
    <article className="bg-surface border border-border rounded-lg p-6 md:p-8 shadow-xs">
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <span className={`badge ${statusClass[product.status]}`}>
          {t(lang, statusLabelKey[product.status])}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
          {formatPeriod(product.startedAt, product.endAt)}
        </span>
      </div>

      <h1 className="text-3xl md:text-4xl font-serif tracking-tight text-text-primary lowercase mb-2">
        {product.name}
      </h1>
      <p className="font-mono text-xs text-text-muted uppercase tracking-wider mb-8">
        {product.role}
      </p>

      <dl className="grid gap-6">
        <Field label={t(lang, "work.role")} value={product.roleNote} />
        <Field label={t(lang, "work.problem")} value={product.problem} />
        <Field
          label={t(lang, "work.decision")}
          value={product.decision}
          accent
        />
        <Field
          label={t(lang, "work.metric")}
          value={product.metric}
          mono
        />
        <Field
          label={t(lang, "work.learned")}
          value={product.learned}
          italic
        />
      </dl>

      <div className="mt-8">
        <a
          href={product.url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary inline-flex items-center gap-2"
        >
          {t(lang, "work.visit")}
          <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
        </a>
      </div>
    </article>
  );
}

function Field({
  label,
  value,
  mono,
  italic,
  accent,
}: {
  label: string;
  value: string;
  mono?: boolean;
  italic?: boolean;
  accent?: boolean;
}) {
  return (
    <div>
      <dt className="text-[10px] font-mono font-semibold uppercase tracking-wider text-text-muted mb-1.5">
        {label}
      </dt>
      <dd
        className={[
          "text-sm leading-relaxed",
          mono ? "font-mono text-text-primary" : "text-text-secondary",
          italic ? "font-serif italic text-text-primary text-base" : "",
          accent ? "text-text-primary" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {value}
      </dd>
    </div>
  );
}
