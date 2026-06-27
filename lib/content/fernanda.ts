export type FernandaLang = "es" | "en";

export type GalleryItem = {
  title: string;
  category: string;
  year: string;
  image: string;
  alt: string;
  caption: string;
  featured?: boolean;
};

export type ContentBlock = {
  title: string;
  body: string;
};

export type WorkshopCard = {
  title: string;
  description: string;
  duration: string;
};

export type RelatedProject = {
  eyebrow: string;
  title: string;
  description: string;
  label: string;
  href: string;
  metric: string;
  cta: string;
};

export type FernandaContent = {
  siteName: string;
  metaTitle: string;
  metaDescription: string;
  hero: {
    eyebrow: string;
    title: string;
    kicker: string;
    description: string;
    introNote: string;
    ctas: Array<{ label: string; href: string; variant: "primary" | "secondary" }>;
    tags: string[];
    image: string;
    imageAlt: string;
  };
  gallery: {
    eyebrow: string;
    title: string;
    description: string;
    filterLabels: string[];
    items: GalleryItem[];
  };
  profile: {
    eyebrow: string;
    title: string;
    description: string;
    services: ContentBlock[];
    experience: ContentBlock[];
    education: ContentBlock[];
    awardTitle: string;
    awardBody: string;
    quote: string;
    toolsTitle: string;
    tools: string[];
  };
  workshops: {
    eyebrow: string;
    title: string;
    description: string;
    cards: WorkshopCard[];
    formats: string[];
    note: string;
  };
  related: RelatedProject;
  contact: {
    eyebrow: string;
    title: string;
    description: string;
    email: string;
    phone: string;
    instagram: string;
    threads: string;
    location: string;
    cta: string;
    portrait: string;
    portraitAlt: string;
  };
  social: {
    instagram: string;
    threads: string;
    email: string;
  };
};

const galleryAssets = {
  editorial: "/fernanda/work-01-portrait-editorial.jpg",
  rooftop: "/fernanda/work-02-rooftop-angel.jpg",
  duo: "/fernanda/work-03-concept-duo.jpg",
  neon: "/fernanda/work-04-neon-portrait.jpg",
  nocturne: "/fernanda/work-05-blue-nocturne.jpg",
  collage: "/fernanda/work-06-collage-ai.jpg",
  gown: "/fernanda/work-07-blue-gown.jpg",
} as const;

const es: FernandaContent = {
  siteName: "Fernanda Escalante Rodríguez",
  metaTitle: "Fernanda Escalante Rodríguez | Fotografía, Photoshop e IA",
  metaDescription:
    "Portafolio editorial de Fernanda Escalante Rodríguez. Fotografía conceptual, edición en Photoshop e imagen asistida por IA para marcas, universidades y proyectos creativos.",
  hero: {
    eyebrow: "Portafolio",
    title: "Fernanda Escalante Rodríguez",
    kicker: "Fotografía + Photoshop + IA",
    description:
      "Artista visual y fotógrafa conceptual. Combino la toma, la edición y la inteligencia artificial para construir imágenes con narrativa, atmósfera y presencia.",
    introNote:
      "Lista para workshops universitarios, conferencias, residencias creativas y proyectos editoriales.",
    ctas: [
      { label: "Ver trabajos", href: "#trabajos", variant: "primary" },
      { label: "Solicitar workshop", href: "#workshops", variant: "secondary" },
    ],
    tags: ["Fotografía", "Photoshop", "IA", "CDMX"],
    image: galleryAssets.gown,
    imageAlt:
      "Fotografía etérea en tonos azules con una figura central y telas translúcidas.",
  },
  gallery: {
    eyebrow: "Trabajos",
    title: "Selección de obras",
    description:
      "Una edición breve de retratos, composiciones y postproducción. La intención es mostrar rango: fotografía, Photoshop e IA dentro de un mismo lenguaje.",
    filterLabels: ["Todo", "Fotografía", "Photoshop + IA"],
    items: [
      {
        title: "Retrato editorial",
        category: "Fotografía",
        year: "2026",
        image: galleryAssets.editorial,
        alt: "Retrato editorial con luz magenta, contraste fuerte y composición dramática.",
        caption: "Retrato editorial y dirección de arte.",
        featured: true,
      },
      {
        title: "Retrato ambiental",
        category: "Fotografía",
        year: "2026",
        image: galleryAssets.rooftop,
        alt: "Retrato sobre azotea con cielo azul y una composición de moda contemporánea.",
        caption: "Sesión con luz natural y atmósfera urbana.",
      },
      {
        title: "Fotografía conceptual",
        category: "Fotografía",
        year: "2026",
        image: galleryAssets.duo,
        alt: "Dos figuras en una escena de bajo contraste con iluminación azul y espejo.",
        caption: "Narrativa visual y puesta en escena.",
      },
      {
        title: "Postproducción creativa",
        category: "Photoshop",
        year: "2026",
        image: galleryAssets.neon,
        alt: "Figura con iluminación roja y azul, composición intensa y carácter experimental.",
        caption: "Retoque y composición en Photoshop.",
      },
      {
        title: "Nocturno",
        category: "Fotografía",
        year: "2026",
        image: galleryAssets.nocturne,
        alt: "Escena nocturna en tonos azules con dos personas y una atmósfera cinematográfica.",
        caption: "Fotografía de ambiente y contraste.",
      },
      {
        title: "Composición AI",
        category: "IA",
        year: "2026",
        image: galleryAssets.collage,
        alt: "Collage visual con iconografía y composición digital sobre fondo negro.",
        caption: "Exploración asistida por IA.",
      },
      {
        title: "Serie etérea",
        category: "Fotografía",
        year: "2026",
        image: galleryAssets.gown,
        alt: "Figura central en vestido azul rodeada de telas translúcidas y luz suave.",
        caption: "Imagen final con tono poético y editorial.",
      },
    ],
  },
  profile: {
    eyebrow: "Perfil",
    title: "Fotografía con intención, edición con criterio",
    description:
      "Soy una artista visual que mezcla fotografía y técnicas digitales para construir personajes, atmósferas y escenas que expresan una emoción, una metáfora o una situación personal. Me interesa que la imagen sostenga una idea clara y que el resultado se vea tan cuidado como convincente.",
    services: [
      {
        title: "Fotografía",
        body: "Sesiones conceptuales, editoriales y para marca con dirección visual cuidada.",
      },
      {
        title: "Photoshop",
        body: "Retoque, composición, limpieza de color y acabado final con criterio editorial.",
      },
      {
        title: "IA",
        body: "Exploración asistida para expandir ideas, prototipar escenas y abrir nuevas rutas visuales.",
      },
    ],
    experience: [
      {
        title: 'Fotógrafa para eventos sociales en "El salón Foresta", Lomas Altas.',
        body: "Cobertura con enfoque en retrato, ambiente y momentos clave.",
      },
      {
        title: 'Sesión fotográfica promocional para el restaurante "Sugar partner".',
        body: "Producción de imágenes para comunicación y difusión.",
      },
      {
        title: 'Sesión fotográfica para la marca "Alma bohemia".',
        body: "Dirección de arte, composición y estilo visual para marca.",
      },
    ],
    education: [
      {
        title: "Curso de fotografía conceptual con Krishna Váldez.",
        body: "Base narrativa y construcción de imagen con intención.",
      },
      {
        title: "Curso de Photoshop con Fabián Moncada.",
        body: "Herramientas de edición, retoque y composición avanzada.",
      },
      {
        title: "Curso de autorretrato conceptual con Cristina Otero.",
        body: "Uso del cuerpo, el símbolo y la puesta en escena.",
      },
      {
        title: "Curso de fotografía fine art con Amina Donskaya.",
        body: "Postproducción, lenguaje autoral y atmósferas visuales.",
      },
      {
        title: "Curso de composición y creación fotográfica con Alter Imago.",
        body: "Orden visual, lectura de imagen y construcción de piezas.",
      },
    ],
    awardTitle: "Primer lugar",
    awardBody:
      'Concurso "Krishna with Wacom". El premio fue una tableta gráfica Intuos Pro L.',
    quote:
      "Busco que cada imagen diga lo que las palabras no alcanzan.",
    toolsTitle: "Herramientas y proceso",
    tools: ["Canon", "Photoshop", "Lightroom", "Wacom", "IA generativa"],
  },
  workshops: {
    eyebrow: "Workshops",
    title: "Lista para dar talleres en universidades",
    description:
      "Diseño sesiones para grupos pequeños, clases magistrales, residencias breves y workshops abiertos. El enfoque combina técnica, lectura visual y práctica guiada.",
    cards: [
      {
        title: "Fotografía conceptual",
        description:
          "De la idea al moodboard, la luz, la composición y la imagen final.",
        duration: "90 min · 3 h",
      },
      {
        title: "Photoshop narrativo",
        description:
          "Retoque, composición y acabado editorial con criterio visual.",
        duration: "3 h · 1 día",
      },
      {
        title: "IA para imagen",
        description:
          "Uso responsable de IA para prototipar, expandir y comentar una imagen.",
        duration: "90 min · 3 h",
      },
    ],
    formats: [
      "Conferencia",
      "Taller práctico",
      "Clínica de portafolio",
      "Residencia breve",
    ],
    note:
      "Puedo adaptar el contenido a facultades, escuelas creativas, festivales o programas de formación continua.",
  },
  related: {
    eyebrow: "Relacionado",
    title: "Freela",
    description:
      "Un proyecto paralelo del mismo ecosistema: matching con IA para trabajos freelance, pensado con foco en producto y una ejecución clara.",
    label: "AI product",
    href: "https://freela.cloud.obeskay.com",
    metric: "Matching con IA · despliegue propio · claridad operativa",
    cta: "Ver Freela",
  },
  contact: {
    eyebrow: "Contacto",
    title: "Hagamos la siguiente imagen",
    description:
      "Abierta a proyectos, colaboraciones, comisiones y talleres con universidades. Si la idea necesita fotografía, edición o IA, lo podemos construir.",
    email: "fer.esc1509@gmail.com",
    phone: "+52 55 2319 1080",
    instagram: "@fernanda.esr",
    threads: "@fernanda.esr",
    location: "CDMX, México",
    cta: "Trabajemos juntos",
    portrait: galleryAssets.editorial,
    portraitAlt:
      "Retrato editorial en tonos magenta y violeta con una composición frontal intensa.",
  },
  social: {
    instagram: "https://www.instagram.com/fernanda.esr/",
    threads: "https://www.threads.com/@fernanda.esr",
    email: "mailto:fer.esc1509@gmail.com",
  },
};

const en: FernandaContent = {
  siteName: "Fernanda Escalante Rodríguez",
  metaTitle: "Fernanda Escalante Rodríguez | Photography, Photoshop & AI",
  metaDescription:
    "Editorial portfolio by Fernanda Escalante Rodríguez. Conceptual photography, Photoshop editing, and AI-assisted imagery for brands, universities, and creative projects.",
  hero: {
    eyebrow: "Portfolio",
    title: "Fernanda Escalante Rodríguez",
    kicker: "Photography + Photoshop + AI",
    description:
      "Visual artist and conceptual photographer. I blend shooting, editing, and AI tools to build images with narrative, atmosphere, and presence.",
    introNote:
      "Available for university workshops, talks, creative residencies, and editorial commissions.",
    ctas: [
      { label: "View work", href: "#trabajos", variant: "primary" },
      { label: "Book a workshop", href: "#workshops", variant: "secondary" },
    ],
    tags: ["Photography", "Photoshop", "AI", "CDMX"],
    image: galleryAssets.gown,
    imageAlt:
      "An ethereal blue-toned photograph with a central figure and translucent fabrics.",
  },
  gallery: {
    eyebrow: "Selected work",
    title: "Curated pieces",
    description:
      "A concise edit of portraits, composites, and post-production work. The goal is to show range: photography, Photoshop, and AI in one visual language.",
    filterLabels: ["All", "Photography", "Photoshop + AI"],
    items: [
      {
        title: "Editorial portrait",
        category: "Photography",
        year: "2026",
        image: galleryAssets.editorial,
        alt: "Editorial portrait with magenta light, strong contrast, and dramatic composition.",
        caption: "Editorial portrait and art direction.",
        featured: true,
      },
      {
        title: "Environmental portrait",
        category: "Photography",
        year: "2026",
        image: galleryAssets.rooftop,
        alt: "Rooftop portrait under a blue sky with a contemporary fashion composition.",
        caption: "Natural light with an urban atmosphere.",
      },
      {
        title: "Conceptual photography",
        category: "Photography",
        year: "2026",
        image: galleryAssets.duo,
        alt: "Two figures in a low-contrast scene with blue lighting and a mirror.",
        caption: "Visual narrative and staging.",
      },
      {
        title: "Creative retouching",
        category: "Photoshop",
        year: "2026",
        image: galleryAssets.neon,
        alt: "Figure with red and blue lighting, intense composition, and experimental character.",
        caption: "Retouching and compositing in Photoshop.",
      },
      {
        title: "Nocturne",
        category: "Photography",
        year: "2026",
        image: galleryAssets.nocturne,
        alt: "Night scene in blue tones with two people and a cinematic atmosphere.",
        caption: "Atmospheric photography and contrast.",
      },
      {
        title: "AI composition",
        category: "AI",
        year: "2026",
        image: galleryAssets.collage,
        alt: "Visual collage with iconography and digital composition on a black background.",
        caption: "AI-assisted exploration.",
      },
      {
        title: "Ethereal series",
        category: "Photography",
        year: "2026",
        image: galleryAssets.gown,
        alt: "Central figure in a blue dress surrounded by translucent fabrics and soft light.",
        caption: "Poetic editorial final frame.",
      },
    ],
  },
  profile: {
    eyebrow: "Profile",
    title: "Photography with intention, editing with taste",
    description:
      "I am a visual artist who mixes photography and digital techniques to build characters, atmospheres, and scenes that express an emotion, a metaphor, or a personal situation. I care that the image carries a clear idea and that the result feels as considered as it is convincing.",
    services: [
      {
        title: "Photography",
        body: "Conceptual, editorial, and brand sessions with careful visual direction.",
      },
      {
        title: "Photoshop",
        body: "Retouching, compositing, color clean-up, and editorial finishing.",
      },
      {
        title: "AI",
        body: "Assisted exploration to expand ideas, prototype scenes, and open new visual routes.",
      },
    ],
    experience: [
      {
        title: 'Social event photography for "El salón Foresta", Lomas Altas.',
        body: "Coverage focused on portraits, atmosphere, and key moments.",
      },
      {
        title: 'Promotional photo session for the restaurant "Sugar partner".',
        body: "Image production for communication and promotion.",
      },
      {
        title: 'Photo session for the brand "Alma bohemia".',
        body: "Art direction, composition, and visual style for brand work.",
      },
    ],
    education: [
      {
        title: "Conceptual photography course with Krishna Váldez.",
        body: "Narrative basics and image construction with intent.",
      },
      {
        title: "Photoshop course with Fabián Moncada.",
        body: "Editing, retouching, and advanced compositing tools.",
      },
      {
        title: "Conceptual self-portrait course with Cristina Otero.",
        body: "Using body, symbol, and staging as visual language.",
      },
      {
        title: "Fine art photography course with Amina Donskaya.",
        body: "Post-production, authorial language, and visual atmosphere.",
      },
      {
        title: "Composition and photographic creation course with Alter Imago.",
        body: "Visual order, image reading, and piece construction.",
      },
    ],
    awardTitle: "First place",
    awardBody:
      'Contest "Krishna with Wacom". The prize was an Intuos Pro L graphic tablet.',
    quote:
      "I want each image to say what words cannot reach.",
    toolsTitle: "Tools and process",
    tools: ["Canon", "Photoshop", "Lightroom", "Wacom", "Generative AI"],
  },
  workshops: {
    eyebrow: "Workshops",
    title: "Ready for university workshops",
    description:
      "I design sessions for small groups, keynote classes, short residencies, and open workshops. The focus combines technique, visual reading, and guided practice.",
    cards: [
      {
        title: "Conceptual photography",
        description:
          "From idea to moodboard, light, composition, and the final frame.",
        duration: "90 min · 3 h",
      },
      {
        title: "Narrative Photoshop",
        description:
          "Retouching, compositing, and editorial finishing with visual criteria.",
        duration: "3 h · 1 day",
      },
      {
        title: "AI for imagery",
        description:
          "Responsible use of AI to prototype, expand, and comment on an image.",
        duration: "90 min · 3 h",
      },
    ],
    formats: [
      "Lecture",
      "Hands-on workshop",
      "Portfolio clinic",
      "Short residency",
    ],
    note:
      "I can adapt the content to faculties, creative schools, festivals, or continuing education programs.",
  },
  related: {
    eyebrow: "Related",
    title: "Freela",
    description:
      "A parallel project from the same ecosystem: AI-native matching for freelance work, shaped with product clarity and a simple execution model.",
    label: "AI product",
    href: "https://freela.cloud.obeskay.com",
    metric: "AI matching · self-hosted deployment · operational clarity",
    cta: "Visit Freela",
  },
  contact: {
    eyebrow: "Contact",
    title: "Let's make the next image",
    description:
      "Open to projects, collaborations, commissions, and university workshops. If the idea needs photography, editing, or AI, we can build it.",
    email: "fer.esc1509@gmail.com",
    phone: "+52 55 2319 1080",
    instagram: "@fernanda.esr",
    threads: "@fernanda.esr",
    location: "CDMX, Mexico",
    cta: "Work with me",
    portrait: galleryAssets.editorial,
    portraitAlt:
      "Editorial portrait in magenta and violet tones with an intense frontal composition.",
  },
  social: {
    instagram: "https://www.instagram.com/fernanda.esr/",
    threads: "https://www.threads.com/@fernanda.esr",
    email: "mailto:fer.esc1509@gmail.com",
  },
};

export function getFernandaContent(lang: FernandaLang): FernandaContent {
  return lang === "en" ? en : es;
}

export const fernandaGalleryAssets = galleryAssets;
