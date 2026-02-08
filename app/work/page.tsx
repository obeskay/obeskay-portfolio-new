"use client";

import { motion } from "framer-motion";
import ProjectCard, { Project } from "../components/ProjectCard";

const projects: Project[] = [
  {
    id: "chateala",
    title: "Chatea.la",
    description: "WhatsApp automation SaaS",
    category: "SaaS",
    image: "/projects/chateala.png",
    url: "https://chatea.la"
  },
  {
    id: "qrapidito",
    title: "QRapidito",
    description: "QR menu platform for restaurants",
    category: "SaaS",
    url: "https://qrapidito.com"
  },
  {
    id: "lottie-skill",
    title: "Lottie Animator Skill",
    description: "Claude Code skill for Lottie animations",
    category: "Open Source",
    stars: 3,
    url: "https://github.com/obeskay/lottie-animator-skill"
  },
  {
    id: "vercel-agents",
    title: "Vercel AI Agents",
    description: "Multi-agent conversational AI system",
    category: "Open Source",
    stars: 2,
    url: "https://github.com/obeskay/vercel-ai-agents"
  },
  {
    id: "swarm-ville",
    title: "Swarm Ville",
    description: "AI agent collaboration in 2D",
    category: "Open Source",
    url: "https://github.com/obeskay/swarm-ville"
  },
  {
    id: "whatsapp-agent",
    title: "WhatsApp AI Agent",
    description: "Voice-enabled WhatsApp AI assistant",
    category: "Open Source",
    url: "https://github.com/obeskay/whatsapp-ai-agent"
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
            Selected Work
          </h1>
          <p className="text-xl text-text-muted">
            A collection of projects I've built
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

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </main>
  );
}
