import type { Lang } from "../i18n";

export type WritingTag =
  | "postmortem"
  | "decision"
  | "operator"
  | "pricing"
  | "architecture";

export type Writing = {
  slug: string;
  lang: Lang;
  title: string;
  publishedAt: string;
  readingMinutes: number;
  excerpt: string;
  body: string;
  tags: WritingTag[];
};

/**
 * Seed writings. Intentionally empty — Obed will populate this in a
 * separate writing pass. The empty list keeps the /writing index rendering
 * the honest "coming soon" copy defined in lib/i18n.
 */
export const writings: Writing[] = [];

export function getWritingBySlug(slug: string): Writing | undefined {
  return writings.find((w) => w.slug === slug);
}
