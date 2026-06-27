export type ProductSlug = "sello" | "chatea-la" | "qrapidito" | "freela";

export type ProductStatus = "live" | "pilot" | "frozen" | "maintenance";

export type ProductTag = "product" | "lab" | "open source";

export type Product = {
  slug: ProductSlug;
  name: string;
  role: string;
  roleNote: string;
  status: ProductStatus;
  url: string;
  problem: string;
  decision: string;
  metric: string;
  learned: string;
  tags: ProductTag[];
  startedAt: string;
  endAt?: string;
};

export const products: Product[] = [
  {
    slug: "chatea-la",
    name: "chatea.la",
    role: "Co-founder · Engineering",
    roleNote: "I run the platform and the WhatsApp core.",
    status: "live",
    url: "https://chatea.la",
    problem:
      "WhatsApp automation platform for MX SMBs. Co-founded; I run engineering.",
    decision:
      "Decoupled admin from product, bet everything on Evolution API as shared Baileys core across the ecosystem.",
    metric: "2,500+ active businesses · 1.2M chats/month",
    learned:
      "Sharing the WhatsApp core between 4 products is leverage — and a single point of failure (the QR bug taught me).",
    tags: ["product"],
    startedAt: "2024-08-01",
  },
  {
    slug: "sello",
    name: "sello",
    role: "Co-founder · Product",
    roleNote: "Repositioned Sello from a feature list to a counter tool.",
    status: "pilot",
    url: "https://sello.cloud.obeskay.com",
    problem:
      "Loyalty programs over WhatsApp already saturated the market with feature lists.",
    decision:
      "Repositioned Sello as a counter tool, not a loyalty platform. Removed 'campaign', 'members', 'loyalty', 'wallet', 'push', 'API', 'CRM', 'dashboard', 'platform' from merchant-facing UI.",
    metric:
      "Landing→QR < 90s · first stamped customer same day · Pro $299 MXN/month manual billing",
    learned:
      "A freemium with teeth beats a freemium with limits. The words you don't use are the product.",
    tags: ["product"],
    startedAt: "2025-11-01",
  },
  {
    slug: "qrapidito",
    name: "qrapidito",
    role: "Co-founder · Engineering",
    roleNote: "Menu + ordering, no commissions.",
    status: "live",
    url: "https://qrapidito.com",
    problem:
      "Restaurants in MX needed digital menus that actually convert, not PDF generators.",
    decision:
      "WhatsApp-native menu + ordering. Zero commissions. Reviewed and iterated with real restaurant owners before building features.",
    metric: "4.9/5 over 500+ restaurants · 0% commission",
    learned:
      "When you remove the platform tax, restaurants tell their friends.",
    tags: ["product"],
    startedAt: "2025-04-01",
  },
  {
    slug: "freela",
    name: "freela",
    role: "Solo founder",
    roleNote: "Lab for self-hosting the data layer.",
    status: "live",
    url: "https://freela.cloud.obeskay.com",
    problem:
      "AI-native matching for freelance projects. Adjacent to chatea.la but with its own product DNA.",
    decision:
      "Self-hosted Convex (saving RAM by skipping the dashboard) + Vite SPA. Validated that the lab could ship without Coolify defaults.",
    metric: "Self-hosted Convex on Hetzner · SPA on nginx",
    learned:
      "Self-hosting the data layer forced me to learn the protocol — that knowledge compounds.",
    tags: ["lab"],
    startedAt: "2025-09-01",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
