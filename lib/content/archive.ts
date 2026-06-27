export type ArchivedSlug = "carti" | "stickycovers";

export type ArchivedStatus = "frozen" | "maintenance";

export type ArchivedProduct = {
  slug: ArchivedSlug;
  name: string;
  status: ArchivedStatus;
  url?: string;
  reason: string;
  period: string;
};

export const archivedProducts: ArchivedProduct[] = [
  {
    slug: "carti",
    name: "carti",
    status: "frozen",
    reason:
      "Personal finance assistant over WhatsApp. Lived through Fastify + Baileys + Ollama + fal.ai.",
    period: "2024 — 2025",
  },
  {
    slug: "stickycovers",
    name: "stickycovers",
    status: "maintenance",
    url: "https://stickycovers.cloud.obeskay.com",
    reason:
      "E-commerce de stickers personalizados para tarjetas en CDMX. Payload + Next.js + MercadoPago. Funciona; ya no lo opero.",
    period: "2021 — 2024",
  },
];
