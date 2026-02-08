"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard, { Project } from "../components/ProjectCard";

const projects: Project[] = [
  {
    id: "chateala",
    title: "Chatea.la",
    description: "AI agents that handle customer support 24/7 via WhatsApp. 3x more leads closed without hiring. Processing 50K+ messages/month.",
    category: "SaaS",
    image: "/projects/chateala.png",
    url: "https://chatea.la"
  },
  {
    id: "qrapidito",
    title: "QRapidito",
    description: "Digital menus in seconds. Send a photo, AI does the rest. 500+ restaurants trust us. Generated 10K+ menus with AI.",
    category: "SaaS",
    image: "/projects/qrapidito.png",
    url: "https://qrapidito.com"
  },
  {
    id: "woow-insurance",
    title: "WOOW Insurance",
    description: "Transforming how people buy insurance. Built AI quote engine that reduced conversion time by 60%. Serving 100K+ users.",
    category: "SaaS",
    image: "/projects/woow-insurance.svg",
    url: "https://woowtodobien.com"
  },
  {
    id: "lottie-skill",
    title: "Lottie Animator",
    description: "Turn static SVGs into smooth animations with AI. No After Effects needed. Used by 200+ developers worldwide.",
    category: "Open Source",
    image: "/projects/lottie-skill.png",
    stars: 3,
    url: "https://github.com/obeskay/lottie-animator-skill"
  },
  {
    id: "vercel-agents",
    title: "AI Agent Framework",
    description: "Multi-agent system for complex conversations. Built with Vercel AI SDK. Handles 100+ concurrent sessions.",
    category: "Open Source",
    image: "/projects/vercel-agents.png",
    stars: 2,
    url: "https://github.com/obeskay/vercel-ai-agents"
  },
  {
    id: "whatsapp-agent",
    title: "WhatsApp AI Agent",
    description: "Voice-enabled WhatsApp AI assistant. Processes natural language. Responds in 200ms average latency.",
    category: "Open Source",
    image: "/projects/whatsapp-agent.png",
    url: "https://github.com/obeskay/whatsapp-ai-agent"
  },
];

const filters = ["All", "SaaS", "Open Source"] as const;
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
              From AI-powered customer support to digital menus that save restaurants hours every week.
              Real impact. Real results.
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
              { label: "SaaS Products", value: "3" },
              { label: "Open Source", value: "3" },
              { label: "Users Impacted", value: "100K+" },
              { label: "Countries", value: "5+" },
            ].map((stat, i) => (
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
              I'm always open to discussing new projects and opportunities. Let's build something meaningful.
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
