"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard, { Project } from "../components/ProjectCard";

const projects: Project[] = [
  {
    id: "chateala",
    title: "Chatea.la",
    description: "AI agents that handle customer support 24/7 via WhatsApp. 3x more leads closed without hiring.",
    category: "SaaS",
    image: "/projects/chateala.png",
    url: "https://chatea.la"
  },
  {
    id: "qrapidito",
    title: "QRapidito",
    description: "Digital menus in seconds. Send a photo, AI does the rest. 500+ restaurants, 4.9★ rating.",
    category: "SaaS",
    image: "/projects/qrapidito.png",
    url: "https://qrapidito.com"
  },
  {
    id: "lottie-skill",
    title: "Lottie Animator",
    description: "Turn static SVGs into smooth animations with AI. No After Effects needed.",
    category: "Open Source",
    image: "/projects/lottie-skill.png",
    stars: 3,
    url: "https://github.com/obeskay/lottie-animator-skill"
  },
  {
    id: "vercel-agents",
    title: "AI Agent Framework",
    description: "Multi-agent system for complex conversations. Built with Vercel AI SDK.",
    category: "Open Source",
    image: "/projects/vercel-agents.png",
    stars: 2,
    url: "https://github.com/obeskay/vercel-ai-agents"
  }
];

const filters = ["All", "SaaS", "Open Source"] as const;
type Filter = typeof filters[number];

// Stagger animation
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function Work() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");

  const filteredProjects = activeFilter === "All" 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  return (
    <main className="min-h-screen py-24 px-6">
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 tracking-tight">
            Work
          </h1>
          <p className="text-xl text-text-muted max-w-2xl leading-relaxed">
            Products that solve real problems. From AI-powered customer support to digital menus that save restaurants hours every week.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex gap-2 mb-12"
        >
          {filters.map((filter) => (
            <motion.button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`relative px-5 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
                activeFilter === filter 
                  ? "text-white" 
                  : "text-text-muted hover:text-foreground"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {activeFilter === filter && (
                <motion.div
                  layoutId="filter-indicator"
                  className="absolute inset-0 bg-foreground rounded-full"
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
            variants={container}
            initial="hidden"
            animate="show"
            className="grid md:grid-cols-2 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 text-text-muted"
          >
            No projects in this category yet.
          </motion.div>
        )}
      </div>
    </main>
  );
}
