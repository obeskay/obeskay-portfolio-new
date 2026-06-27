import Script from "next/script";
import { getFernandaContent, type FernandaLang } from "../../lib/content/fernanda";

const siteUrl = "https://obeskay.com";

export default function JsonLd({ lang }: { lang: FernandaLang }) {
  const copy = getFernandaContent(lang);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: copy.siteName,
    jobTitle:
      lang === "en"
        ? "Photographer, visual artist, and workshop facilitator"
        : "Fotógrafa, artista visual y tallerista",
    url: siteUrl,
    image: `${siteUrl}${copy.contact.portrait}`,
    description: copy.metaDescription,
    sameAs: [copy.social.instagram, copy.social.threads],
    knowsAbout:
      lang === "en"
        ? ["Photography", "Photoshop", "Generative AI", "Art direction", "Editorial imaging"]
        : ["Fotografía", "Photoshop", "IA generativa", "Dirección de arte", "Imagen editorial"],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ciudad de México",
      addressCountry: "MX",
    },
    email: copy.contact.email,
    telephone: copy.contact.phone.replace(/\s+/g, ""),
  };

  return (
    <Script
      id="json-ld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
