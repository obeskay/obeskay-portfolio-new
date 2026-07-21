"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import ProjectCard, { Project } from "../components/ProjectCard";

const projects: Project[] = [
  {
    id: "chateala",
    title: "Chatea.la",
    description: "WhatsApp AI & lead capture SaaS. Converts unstructured audio/text into synced calendar bookings and CRM records.",
    category: "Product",
    image: "/projects/chateala.png",
    url: "https://chatea.la"
  },
  {
    id: "carti",
    title: "Carti.app",
    description: "WhatsApp finance agent parsing spontaneous voice clips into instant ledger entries and budgets.",
    category: "Product",
    image: "/projects/carti.png",
    status: "Private beta",
    url: "https://carti.app"
  },
  {
    id: "sello",
    title: "Sello",
    description: "WhatsApp-native digital loyalty cards replacing paper stamp cards with instant QR check-ins.",
    category: "Lab",
    image: "/projects/sello.png",
    status: "Live pilot",
    url: "https://sello.cloud.obeskay.com"
  },
  {
    id: "freela",
    title: "Freela",
    description: "AI project scoping tool translating vague client briefs into deliverables and timelines.",
    category: "Lab",
    image: "/projects/freela.png",
    status: "Prototype",
    url: "https://freela.cloud.obeskay.com"
  },
  {
    id: "stickycovers",
    title: "StickyCovers",
    description: "Custom card skin canvas with AI asset generator and MercadoPago automated checkout.",
    category: "Product",
    image: "/projects/stickycovers.png",
    url: "https://stickycovers.cloud.obeskay.com"
  },
  {
    id: "qrapidito",
    title: "QRapidito",
    description: "Digital menus in seconds for restaurants via structured image and PDF menu parsing.",
    category: "Product",
    image: "/projects/qrapidito.png",
    url: "https://qrapidito.com"
  },
  {
    id: "lottie-skill",
    title: "Lottie Animator",
    description: "Agent skill generating production-ready Lottie animations directly from SVG vectors.",
    category: "Open Source",
    image: "/projects/lottie-skill.png",
    stars: 3,
    url: "https://github.com/obeskay/lottie-animator-skill"
  },
  {
    id: "swarm-ville",
    title: "SwarmVille",
    description: "2D visualization of autonomous AI agents collaborating in real-time.",
    category: "Open Source",
    image: "/projects/swarm-ville.png",
    url: "https://github.com/obeskay/swarm-ville"
  },
  {
    id: "one-shot",
    title: "One-Shot",
    description: "Lightning-fast desktop context builder for LLMs built with Wails, Go, and React.",
    category: "Open Source",
    image: "/projects/one-shot.svg",
    url: "https://github.com/obeskay/one-shot"
  },
];

const filters = ["All", "Product", "Lab", "Open Source"] as const;
type Filter = typeof filters[number];

const springTransition = { type: "spring" as const, stiffness: 380, damping: 30 };

export default function Work() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");

  const filteredProjects = activeFilter === "All" 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Subtle Background Accent */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[5%] right-[10%] w-[500px] h-[500px] rounded-full bg-accent-bg/10 blur-[100px]" />
        <div className="absolute bottom-[20%] left-[5%] w-[400px] h-[400px] rounded-full bg-pastel-teal-bg/25 blur-[90px]" />
      </div>

      {/* Hero Section */}
      <section className="pt-24 pb-12 px-6 lg:px-12 relative z-10">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="max-w-3xl mb-12 md:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-4"
            >
              <span className="badge badge-blue">Selected Work</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl sm:text-6xl md:text-7xl font-serif text-text-primary tracking-tight leading-tight lowercase"
            >
              products that <span className="italic">solve real problems.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xs md:text-sm text-text-secondary leading-relaxed max-w-lg mt-4 font-normal"
            >
              Multi-agent frameworks, production SaaS nodes, and developer utilities built with resilient engineering.
            </motion.p>
          </div>

          {/* Recent Shipment Card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-12 p-6 md:p-8 bg-surface border border-border rounded-lg relative overflow-hidden shadow-xs"
          >
            <div className="absolute top-4 right-4 z-10">
              <span className="badge badge-red uppercase tracking-wider">
                Recent shipment
              </span>
            </div>

            <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-12 items-center">
              <div className="relative border border-border bg-surface-alt rounded overflow-hidden aspect-[16/10]">
                <Image
                  src="/projects/sello.png"
                  alt="Sello loyalty product preview"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                  className="object-cover object-top filter grayscale opacity-90 contrast-[1.05] hover:grayscale-0 hover:opacity-100 hover:scale-[1.01] transition-all duration-700"
                />
              </div>

              <div className="flex flex-col gap-4 text-left">
                <div className="flex flex-wrap gap-2">
                  <span className="badge badge-green">sello</span>
                  <span className="badge badge-yellow">live pilot</span>
                </div>

                <div>
                  <h2 className="text-xl md:text-2xl font-semibold text-text-primary tracking-tight mb-2">
                    Digital loyalty cards for local Mexican merchants.
                  </h2>
                  <p className="text-xs md:text-sm text-text-secondary leading-relaxed font-normal">
                    Rebuilt Sello with optimized WebP assets, rate-limiting queue resolution, and a WhatsApp pilot route.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {[
                    ["358kb", "hero WebP"],
                    ["0", "restarts"],
                    ["1", "live CTA"],
                  ].map(([value, label]) => (
                    <div key={label} className="bg-surface-alt border border-border p-3 rounded text-left">
                      <p className="font-mono font-semibold text-sm text-text-primary leading-none">{value}</p>
                      <p className="font-mono text-[9px] uppercase text-text-muted mt-1 tracking-wide leading-none">{label}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-2.5 mt-1">
                  <a
                    href="https://sello.cloud.obeskay.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary inline-flex items-center gap-2 text-xs py-2 px-4 cursor-pointer"
                  >
                    Open live Sello
                    <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                  </a>
                  <a
                    href="https://wa.me/525560348476?text=Hola%20Obed%2C%20quiero%20probar%20Sello%20para%20mi%20negocio%20local."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary inline-flex items-center gap-2 text-xs py-2 px-4 cursor-pointer"
                  >
                    Pilot via WhatsApp
                    <Sparkles className="w-3.5 h-3.5 shrink-0" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Filter Tabs using layoutId */}
          <div className="flex items-center gap-1.5 bg-surface border border-border p-1 rounded-lg w-fit mb-10">
            {filters.map((filter) => {
              const isActive = activeFilter === filter;
              return (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className="relative px-3 py-1 text-xs font-mono font-medium transition-colors select-none cursor-pointer"
                >
                  <span className={`relative z-10 ${isActive ? "text-teal-primary font-semibold" : "text-text-muted hover:text-text-primary"}`}>
                    {filter.toLowerCase()}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="work-filter-pill"
                      className="absolute inset-0 bg-pastel-teal-bg border border-teal-secondary/30 rounded-md shadow-xs"
                      style={{ zIndex: 0 }}
                      transition={springTransition}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Projects Grid with Animated Layout Morphing */}
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 lg:px-12 bg-surface-alt border-t border-border-subtle text-center relative z-10">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-serif tracking-tight text-text-primary mb-4 lowercase">
              have a project in <span className="italic">mind?</span>
            </h2>
            <p className="text-text-secondary mb-6 max-w-md mx-auto text-xs md:text-sm leading-relaxed font-normal">
              Available for architectural advisory, multi-agent pipelines, and TypeScript integrations.
            </p>
            <a
              href="mailto:obeskay.mail@gmail.com"
              className="btn-primary inline-flex items-center gap-2 cursor-pointer"
            >
              Get in touch
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
