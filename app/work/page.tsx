"use client";

import { motion } from "framer-motion";
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

export default function Work() {
  return (
    <main className="min-h-screen py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-4">
            Work
          </h1>
          <p className="text-xl text-text-muted max-w-2xl">
            Products that solve real problems. From AI-powered customer support to digital menus that save restaurants hours every week.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex gap-4 mb-12"
        >
          <button className="px-4 py-2 text-sm font-medium rounded-full bg-foreground text-background">
            All
          </button>
          <button className="px-4 py-2 text-sm font-medium rounded-full text-text-muted hover:text-foreground transition-colors">
            SaaS
          </button>
          <button className="px-4 py-2 text-sm font-medium rounded-full text-text-muted hover:text-foreground transition-colors">
            Open Source
          </button>
        </motion.div>

        {/* Projects Grid - 2 columns for more visual impact */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </main>
  );
}
