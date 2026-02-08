import Script from 'next/script';

export default function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Obed Vargas",
    "jobTitle": "Senior Software Engineer",
    "url": "https://obeskay.com",
    "sameAs": [
      "https://github.com/obeskay",
      "https://linkedin.com/in/obeskay",
      "https://twitter.com/obeskay",
    ],
    "worksFor": {
      "@type": "Organization",
      "name": "WOOW Todo Bien",
      "url": "https://woowtodobien.com",
    },
    "knowsAbout": [
      "TypeScript",
      "Next.js",
      "React",
      "Node.js",
      "AI",
      "Conversational AI",
      "Tailwind CSS",
      "Framer Motion",
    ],
    "description": "Senior Software Engineer specializing in TypeScript, Next.js, and conversational AI. Building AI products that solve real problems.",
    "image": "https://portfolio.cloud.obeskay.com/img/nobanana.jpg",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "MX",
      "addressRegion": "Mexico City",
    },
  };

  return (
    <Script
      id="json-ld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
