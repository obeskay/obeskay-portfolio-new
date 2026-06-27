"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Bot, Layers3, MessageSquare, Rocket, Sparkles } from "lucide-react";
import ProjectCard, { Project } from "../components/ProjectCard";

const projects: Project[] = [
  {
    id: "chateala",
    title: "Chatea.la",
    description: "WhatsApp-first conversational AI and lead capture SaaS. Converts unstructured customer messages and voice notes into structured CRM database records and synced appointments. Built on a resilient multi-agent architecture handling thousands of monthly messages.",
    category: "Product",
    image: "/projects/chateala.png",
    url: "https://chatea.la"
  },
  {
    id: "carti",
    title: "Carti.app",
    description: "A WhatsApp-native personal and household finance agent. Leverages LLMs to capture spontaneous expenses, classify transactions, and manage budgets from raw voice notes or text logs. Built on a highly secure, tokenized API pipeline.",
    category: "Product",
    image: "/projects/carti.png",
    status: "Private beta",
    url: "https://carti.app"
  },
  {
    id: "freela",
    title: "Freela",
    description: "AI-native freelancer matching engine and scoping prototype. A functional validation lab designed to synthesize client briefs, automate proposals, and optimize matching pipelines using automated LLM scoping.",
    category: "Lab",
    image: "/projects/freela.png",
    status: "Prototype",
    url: "https://freela.cloud.obeskay.com"
  },
  {
    id: "sello",
    title: "Sello",
    description: "Digital loyalty cards for local Mexican businesses. Replaces paper stamp cards with a WhatsApp-native QR checking flow, live pilot CTA, and Obeskay neobrutalist brand system.",
    category: "Lab",
    image: "/projects/sello.png",
    status: "Live pilot",
    url: "https://sello.cloud.obeskay.com"
  },
  {
    id: "stickycovers",
    title: "StickyCovers",
    description: "E-commerce de stickers personalizados para tarjetas en CDMX. Creador de diseños únicos con IA, carrito inteligente para optimizar el ticket promedio (AOV), pasarela de MercadoPago, y flujos automáticos de email y retención vía Resend. Rentable y EBITDA positivo.",
    category: "Product",
    image: "/projects/stickycovers.png",
    url: "https://stickycovers.cloud.obeskay.com"
  },
  {
    id: "qrapidito",
    title: "QRapidito",
    description: "Digital menus in seconds. A practical AI workflow for restaurants that need to turn messy menu inputs into something customers can use.",
    category: "Product",
    image: "/projects/qrapidito.png",
    url: "https://qrapidito.com"
  },
  {
    id: "lottie-skill",
    title: "Lottie Animator",
    description: "A local agent skill for turning static SVGs into motion-ready Lottie assets without opening a heavyweight animation stack.",
    category: "Open Source",
    image: "/projects/lottie-skill.png",
    stars: 3,
    url: "https://github.com/obeskay/lottie-animator-skill"
  },
  {
    id: "swarm-ville",
    title: "SwarmVille",
    description: "2D visualization of AI agents collaborating in real-time. Watch autonomous agents solve problems together.",
    category: "Open Source",
    image: "/projects/swarm-ville.png",
    url: "https://github.com/obeskay/swarm-ville"
  },
  {
    id: "one-shot",
    title: "One-Shot",
    description: "Context builder for LLMs. Drag, drop, ship. Built with Wails, Go, and React. Lightning-fast desktop app.",
    category: "Open Source",
    image: "/projects/one-shot.svg",
    url: "https://github.com/obeskay/one-shot"
  },
];

const filters = ["All", "Product", "Lab", "Open Source"] as const;
type Filter = typeof filters[number];

// Reveal animation component
const RevealText = ({ 
  children, 
  delay = 0,
}: { 
  children: React.ReactNode; 
  delay?: number;
}) => (
  <div className="overflow-hidden">
    <motion.div
      initial={{ y: "100%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ 
        duration: 0.8, 
        delay,
        ease: [0.16, 1, 0.3, 1]
      }}
    >
      {children}
    </motion.div>
  </div>
);

export default function Work() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");

  const filteredProjects = activeFilter === "All" 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Subtle Warm Spot */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[5%] right-[10%] w-[500px] h-[500px] rounded-full bg-accent-bg/10 blur-[100px]" />
        <div className="absolute bottom-[20%] left-[5%] w-[400px] h-[400px] rounded-full bg-pastel-red-bg/8 blur-[90px]" />
      </div>

      {/* Hero Section */}
      <section className="pt-24 pb-12 px-6 lg:px-12 relative z-10">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="max-w-3xl mb-16 md:mb-20">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-4"
            >
              <span className="badge badge-blue">Selected Work</span>
            </motion.div>
            
            <RevealText delay={0.1}>
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif text-text-primary tracking-tight leading-tight lowercase">
                products that <span className="italic">solve real problems.</span>
              </h1>
            </RevealText>
            
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xs md:text-sm text-text-secondary leading-relaxed max-w-xl mt-6 font-normal"
            >
              Independent products, multi-agent frameworks, and developer utilities built with a strong bias toward physical operators, active user loops, and resilient engineering.
            </motion.p>
          </div>

          {/* Recent Shipping Proof */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-16 p-6 md:p-8 bg-surface border border-border rounded-lg relative overflow-hidden shadow-xs"
          >
            <div className="absolute top-4 right-4 z-10">
              <span className="badge badge-red uppercase tracking-wider">
                Recent shipment
              </span>
            </div>

            <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-12 items-center">
              {/* Product Preview Image */}
              <div className="relative border border-border bg-surface-alt rounded overflow-hidden aspect-[16/10]">
                <Image
                  src="/projects/sello.png"
                  alt="Sello loyalty product preview"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                  className="object-cover object-top grayscale opacity-90 contrast-[1.05] hover:grayscale-0 hover:opacity-100 hover:scale-[1.01] transition-all duration-700"
                />
              </div>

              <div className="flex flex-col gap-5 text-left">
                <div className="flex flex-wrap gap-2">
                  <span className="badge badge-green">sello</span>
                  <span className="badge badge-yellow">live pilot</span>
                </div>

                <div>
                  <h2 className="text-xl md:text-2xl font-semibold text-text-primary tracking-tight mb-3">
                    Loyalty cards for local operators, shipped as a sellable demo.
                  </h2>
                  <p className="text-xs md:text-sm text-text-secondary leading-relaxed font-normal">
                    Rebuilt Sello as an ultra-clean, minimal product surface: optimized WebP assets, resolved rate-limiting queues, set up structural SEO hooks, and wired a live WhatsApp pilot route for Mexican retailers.
                  </p>
                </div>

                {/* Micro metrics */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    ["358kb", "hero WebP"],
                    ["0", "restars"],
                    ["1", "live CTA"],
                  ].map(([value, label]) => (
                    <div key={label} className="bg-surface-alt border border-border p-3.5 rounded text-left">
                      <p className="font-mono font-semibold text-base text-text-primary leading-none">{value}</p>
                      <p className="font-mono text-[9px] uppercase text-text-muted mt-1.5 tracking-wide leading-none">{label}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-2.5">
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

          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap gap-2 mb-12"
          >
            {filters.map((filter) => {
              const isActive = activeFilter === filter;
              return (
                <button key={filter} onClick={() => setActiveFilter(filter)} className={`px-4 py-2 border text-xs font-medium rounded-md transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? "bg-surface-alt text-text-primary font-semibold border-text-secondary shadow-xs"
                      : "bg-surface border-border text-text-secondary hover:bg-surface-alt hover:text-text-primary"
                  }`}>
                  <span>{filter.toLowerCase()}</span>
                </button>
              );
            })}
          </motion.div>

          {/* Impact Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <h2 className="text-[10px] font-mono font-semibold text-text-muted uppercase tracking-wider mb-6">
              technical indicators
            </h2>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  value: "5",
                  suffix: "",
                  label: "Active SaaS Products",
                  trend: "built end-to-end",
                  badgeClass: "badge-blue",
                },
                {
                  value: "3",
                  suffix: "",
                  label: "Multi-Agent Frameworks",
                  trend: "whatsapp loops",
                  badgeClass: "badge-yellow",
                },
                {
                  value: "24",
                  suffix: "/7",
                  label: "Operational Uptime",
                  trend: "resilient queues",
                  badgeClass: "badge-green",
                },
                {
                  value: "1",
                  suffix: "",
                  label: "Integrated Founder OS",
                  trend: "TypeScript + Go",
                  badgeClass: "badge-red",
                },
              ].map((metric, i) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.5 }}
                  className="bg-surface border border-border p-5 rounded-lg hover:border-text-secondary transition-all shadow-xs"
                >
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className={`badge ${metric.badgeClass}`}>
                      {metric.trend}
                    </span>
                  </div>
                  <p className="text-2xl md:text-3xl font-semibold text-text-primary tracking-tight leading-none mb-1">
                    {metric.value}{metric.suffix}
                  </p>
                  <p className="text-xs text-text-secondary mt-2 font-normal leading-normal">{metric.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Projects Grid */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Core Focus Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { label: "Production SaaS", value: "5" },
              { label: "Digital Labs", value: "2" },
              { label: "Open Source Nodes", value: "3" },
              { label: "Core Pipeline Focus", value: "AI Agents" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="p-5 bg-surface border border-border rounded-lg text-left"
              >
                <p className="text-2xl font-semibold text-text-primary mb-1">
                  {stat.value.toLowerCase()}
                </p>
                <p className="text-xs text-text-secondary leading-normal font-normal">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 lg:px-12 bg-surface-alt border-t border-border-subtle text-center relative z-10">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-serif tracking-tight text-text-primary mb-6 lowercase">
              have a project in <span className="italic">mind?</span>
            </h2>
            <p className="text-text-secondary mb-8 max-w-md mx-auto text-xs md:text-sm leading-relaxed font-normal">
              I am always happy to sync about technical architecture pipelines, agent loops, or premium UI dashboards.
            </p>
            <motion.a
              href="mailto:obeskay.mail@gmail.com"
              whileHover={{ scale: 0.98 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary inline-flex items-center gap-2 cursor-pointer"
            >
              Get in touch
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
            </motion.a>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
