# Fernanda Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rework the existing Next.js portfolio into a public-facing editorial portfolio for Fernanda Escalante Rodríguez focused on photography, Photoshop, and AI, with university workshop positioning and a clean deployable build.

**Architecture:** Keep the current App Router and deploy pipeline, but replace the Obed-centric content model with Fernanda-specific content and imagery. Build one strong scrolling home page plus route pages that reuse the same visual system, with bilingual metadata and direct contact/CTA paths.

**Tech Stack:** Next.js App Router, React 19, Tailwind CSS v4, Framer Motion, Lucide React, GitHub + Coolify deployment.

---

### Task 1: Replace the content model with Fernanda-specific portfolio data

**Files:**
- Create: `lib/content/fernanda.ts`
- Modify: `lib/i18n/es.json`
- Modify: `lib/i18n/en.json`

- [ ] **Step 1: Define the portfolio content shape**

```ts
export type FernandaWork = {
  title: string;
  category: "Fotografía" | "Photoshop" | "AI";
  year: string;
  image: string;
  alt: string;
  caption: string;
};

export const fernandaWorks: FernandaWork[] = [
  {
    title: "Retrato editorial",
    category: "Fotografía",
    year: "2026",
    image: "/fernanda/work-01.jpg",
    alt: "Retrato editorial con luz magenta y composición dramática",
    caption: "Retrato editorial y dirección de arte.",
  },
];
```

- [ ] **Step 2: Replace the Spanish and English copy keys**

```json
{
  "nav.home": "Inicio",
  "nav.work": "Trabajos",
  "nav.workshops": "Workshops",
  "nav.about": "Perfil",
  "nav.contact": "Contacto"
}
```

- [ ] **Step 3: Run a quick type-check mentally against the existing callers**

Expected: the new content file gives the home page, gallery, and workshop sections a single source of truth.

### Task 2: Rebuild the homepage into a scrolling editorial portfolio

**Files:**
- Modify: `app/[lang]/page.tsx`
- Modify: `app/globals.css`
- Modify: `app/[lang]/layout.tsx`

- [ ] **Step 1: Replace the current product/writing layout with portfolio sections**

```tsx
// Hero, selected works, profile, workshops, contact
// Keep the page clean, spacious, and readable on a small laptop.
```

- [ ] **Step 2: Add the editorial visual system in global CSS**

```css
:root {
  --background: #dff5f6;
  --surface: rgba(255, 255, 255, 0.32);
  --ink: #171717;
  --border: rgba(23, 23, 23, 0.18);
}
```

- [ ] **Step 3: Swap the font stack to a more characterful pairing**

```tsx
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});
```

Expected: the first screen matches the supplied visual direction and stays readable at laptop width.

### Task 3: Update navigation, footer, and structured data for Fernanda

**Files:**
- Modify: `app/components/Navigation.tsx`
- Modify: `app/components/Footer.tsx`
- Modify: `app/components/JsonLd.tsx`

- [ ] **Step 1: Convert the top nav to portfolio sections**

```tsx
const navLinks = [
  { href: `/${lang}#trabajos`, label: "Trabajos" },
  { href: `/${lang}#perfil`, label: "Perfil" },
  { href: `/${lang}#workshops`, label: "Workshops" },
  { href: `/${lang}#contacto`, label: "Contacto" },
];
```

- [ ] **Step 2: Rewrite the footer into a compact contact band**

```tsx
<a href="https://instagram.com/fernanda.esr" target="_blank" rel="noreferrer">
  @fernanda.esr
</a>
```

- [ ] **Step 3: Update JSON-LD to describe Fernanda as a visual artist / photographer**

```ts
{
  "@type": "Person",
  "name": "Fernanda Escalante Rodríguez",
  "jobTitle": "Fotógrafa, artista visual y tallerista",
  "knowsAbout": ["Fotografía", "Photoshop", "IA generativa", "Dirección de arte"]
}
```

Expected: all metadata and social previews reflect the new identity.

### Task 4: Add assets, workshop proof, and responsive polish

**Files:**
- Create: `public/fernanda/`
- Modify: `app/[lang]/work/page.tsx`
- Modify: `app/[lang]/about/page.tsx`
- Modify: `app/[lang]/uses/page.tsx`
- Modify: `app/[lang]/archive/page.tsx`

- [ ] **Step 1: Copy a curated set of Instagram images into `public/fernanda/`**

```bash
cp /var/folders/.../fernanda-work-01.jpg public/fernanda/work-01.jpg
```

- [ ] **Step 2: Reuse the same visual system in the secondary routes**

```tsx
// /work: selected works grid
// /about: profile + education + awards
// /uses: tools and workshop workflow
```

- [ ] **Step 3: Verify the layout collapses cleanly on mobile**

Expected: no overflow, readable type, and no broken sections under 768px.

### Task 5: Validate, build, and deploy

**Files:**
- Modify: none

- [ ] **Step 1: Run the production build**

```bash
npm run build
```

- [ ] **Step 2: Inspect the generated site locally if needed**

```bash
npm run dev
```

- [ ] **Step 3: Push the changes and trigger the existing deployment flow**

```bash
git add .
git commit -m "feat: redesign fernanda portfolio"
git push origin main
./deploy.sh --skip-git
```

Expected: the site deploys with the Fernanda portfolio identity, updated meta tags, and curated imagery.
