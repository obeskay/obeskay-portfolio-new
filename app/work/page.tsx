"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Layers3, MessageSquare, Rocket } from "lucide-react";
import ProjectCard, { Project } from "../components/ProjectCard";

const projects: Project[] = [
  {
    id: "chateala",
    title: "Chatea.la",
    description: "WhatsApp AI automation for Mexican businesses: lead capture, appointment flows, admin visibility, and resilient messaging infrastructure.",
    category: "Product",
    image: "/projects/chateala.png",
    url: "https://chatea.la"
  },
  {
    id: "carti",
    title: "Carti.app",
    description: "A WhatsApp-native finance assistant that turns text and voice notes into structured transactions, budgets, and useful money context.",
    category: "Product",
    image: "/projects/carti.svg",
    url: "https://carti.app",
    status: "Private beta"
  },
  {
    id: "freela",
    title: "Freela",
    description: "An AI-native freelance marketplace experiment for matching briefs, proposals, conversations, and project signals in one focused workspace.",
    category: "Lab",
    image: "/projects/freela.svg",
    status: "Prototype"
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
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 px-6 lg:px-12">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="max-w-3xl mb-20">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-sm font-medium text-primary uppercase tracking-wider mb-4"
            >
              Selected Work
            </motion.p>
            
            <RevealText delay={0.2}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-foreground tracking-tight mb-6">
                Products that <span className="font-display italic font-normal">solve</span> real problems
              </h1>
            </RevealText>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg text-muted-foreground leading-relaxed"
            >
              Independent products, agentic systems, and small tools with a bias toward
              real operators, real workflows, and things that can survive outside a demo.
            </motion.p>
          </div>

          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap gap-2 mb-16"
          >
            {filters.map((filter) => (
              <motion.button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`relative px-6 py-2.5 text-sm font-medium rounded-full transition-all duration-300 ${
                  activeFilter === filter
                    ? "text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {activeFilter === filter && (
                  <motion.div
                    layoutId="filter-bg"
                    className="absolute inset-0 bg-primary rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{filter}</span>
              </motion.button>
            ))}
          </motion.div>

          {/* Impact Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-20"
          >
            <h2 className="text-sm font-medium text-primary uppercase tracking-wider mb-8">
              By the numbers
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {[
                {
                  icon: Rocket,
                  value: "4",
                  suffix: "",
                  label: "Personal Products",
                  trend: "Built end-to-end",
                },
                {
                  icon: Bot,
                  value: "3",
                  suffix: "",
                  label: "Agentic Systems",
                  trend: "WhatsApp + AI",
                },
                {
                  icon: MessageSquare,
                  value: "24",
                  suffix: "/7",
                  label: "Messaging Focus",
                  trend: "Ops-first",
                },
                {
                  icon: Layers3,
                  value: "1",
                  suffix: "",
                  label: "Founder OS",
                  trend: "AI-assisted",
                },
              ].map((metric, i) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="group bg-surface rounded-2xl p-6 border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="flex items-start justify-between mb-4">
                    <metric.icon className="w-5 h-5 text-muted-foreground" />
                    <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-full">
                      {metric.trend}
                    </span>
                  </div>
                  <p className="text-3xl md:text-4xl font-bold text-foreground mb-1">
                    {metric.value}{metric.suffix}
                  </p>
                  <p className="text-sm text-muted-foreground">{metric.label}</p>
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
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { label: "Products", value: "4" },
              { label: "Labs", value: "1" },
              { label: "Open Source", value: "3" },
              { label: "Core Focus", value: "AI" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="p-6 bg-surface rounded-2xl border border-border"
              >
                <p className="text-3xl md:text-4xl font-semibold text-primary mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 lg:px-12 bg-primary">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-3xl md:text-4xl font-semibold text-primary-foreground mb-6">
              Have a project in <span className="font-display italic font-normal">mind</span>?
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
              I&apos;m always open to discussing new projects and opportunities. Let&apos;s build something meaningful.
            </p>
            <a
              href="mailto:obeskay.mail@gmail.com"
              className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-foreground rounded-full font-medium transition-all hover:shadow-lg hover:shadow-accent/40"
            >
              Get in touch
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
