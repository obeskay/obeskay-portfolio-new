"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import ProjectCard, { Project } from "../components/ProjectCard";

const projects: Project[] = [
  {
    id: "chateala",
    title: "Chatea.la",
    description: "WhatsApp AI & lead capture SaaS. Converts unstructured audio/text into synced calendar bookings and CRM records.",
    category: "Product",
    image: "/brand-guides/chateala-brand-guide.png",
    url: "https://chatea.la"
  },
  {
    id: "carti",
    title: "Carti.app",
    description: "WhatsApp finance agent parsing spontaneous voice clips into instant ledger entries and budgets.",
    category: "Product",
    image: "/brand-guides/carti-brand-guide.png",
    status: "Private beta",
    url: "https://carti.app"
  },
  {
    id: "sello",
    title: "Sello",
    description: "WhatsApp-native digital loyalty cards replacing paper stamp cards with instant QR check-ins.",
    category: "Lab",
    image: "/brand-guides/sello-brand-guide.png",
    status: "Live pilot",
    url: "https://sello.cloud.obeskay.com"
  },
  {
    id: "freela",
    title: "Freela",
    description: "AI project scoping tool translating vague client briefs into deliverables and timelines.",
    category: "Lab",
    image: "/brand-guides/freela-brand-guide.png",
    status: "Prototype",
    url: "https://freela.cloud.obeskay.com"
  },
  {
    id: "stickycovers",
    title: "StickyCovers",
    description: "Custom card skin canvas with AI asset generator and MercadoPago automated checkout.",
    category: "Product",
    image: "/brand-guides/stickycovers-brand-guide.png",
    url: "https://stickycovers.cloud.obeskay.com"
  },
  {
    id: "qrapidito",
    title: "QRapidito",
    description: "Digital menus in seconds for restaurants via structured image and PDF menu parsing.",
    category: "Product",
    image: "/brand-guides/qrapidito-brand-guide.png",
    url: "https://qrapidito.com"
  },
  {
    id: "lottie-skill",
    title: "Lottie Animator",
    description: "Agent skill generating production-ready Lottie animations directly from SVG vectors.",
    category: "Open Source",
    image: "/brand-guides/lottie-skill-brand-guide.png",
    stars: 3,
    url: "https://github.com/obeskay/lottie-animator-skill"
  },
  {
    id: "swarm-ville",
    title: "SwarmVille",
    description: "2D visualization of autonomous AI agents collaborating in real-time.",
    category: "Open Source",
    image: "/brand-guides/swarm-ville-brand-guide.png",
    url: "https://github.com/obeskay/swarm-ville"
  },
  {
    id: "one-shot",
    title: "One-Shot",
    description: "Lightning-fast desktop context builder for LLMs built with Wails, Go, and React.",
    category: "Open Source",
    image: "/brand-guides/one-shot-brand-guide.png",
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
        <div className="container mx-auto max-w-5xl">
          {/* Header */}
          <div className="max-w-3xl mb-12">
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

          {/* Recent Shipment — Typographic Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-12 p-6 md:p-8 bg-surface border border-border rounded-lg relative shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          >
            <div className="flex flex-col gap-2 max-w-xl">
              <div className="flex items-center gap-2">
                <span className="badge badge-green">sello</span>
                <span className="badge badge-yellow">live pilot</span>
                <span className="badge badge-red uppercase tracking-wider">Recent shipment</span>
              </div>
              <h2 className="text-xl font-semibold text-text-primary tracking-tight mt-1">
                Digital loyalty cards for local Mexican merchants.
              </h2>
              <p className="text-xs text-text-secondary leading-relaxed font-normal">
                WhatsApp QR check-in flows, rate-limiting queue workers, and live merchant pilots.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <a
                href="https://sello.cloud.obeskay.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2 text-xs py-2 px-4 cursor-pointer"
              >
                Open Sello
                <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
              </a>
              <a
                href="https://wa.me/525560348476?text=Hola%20Obed%2C%20quiero%20probar%20Sello%20para%20mi%20negocio%20local."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex items-center gap-2 text-xs py-2 px-4 cursor-pointer"
              >
                Pilot
                <Sparkles className="w-3.5 h-3.5 shrink-0" />
              </a>
            </div>
          </motion.div>

          {/* Filter Tabs using layoutId */}
          <div className="flex items-center gap-1.5 bg-surface border border-border p-1 rounded-lg w-fit mb-8">
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
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
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
            <h2 className="text-3xl md:text-4xl font-serif tracking-tight text-text-primary mb-3 lowercase">
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
