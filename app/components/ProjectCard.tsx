"use client";

import { motion } from "framer-motion";
import { ExternalLink, Star } from "lucide-react";

export interface Project {
  id: string;
  title: string;
  description: string;
  category: "SaaS" | "Open Source";
  image?: string;
  stars?: number;
  url: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative block"
    >
      {/* Card Container */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-surface rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-colors"
      >
        {/* Image/Preview Area */}
        <div className="aspect-video bg-gradient-to-br from-surface to-border flex items-center justify-center relative overflow-hidden">
          <div className="text-4xl font-bold text-muted/30 group-hover:text-primary/20 transition-colors">
            {project.title.charAt(0)}
          </div>

          {/* Overlay on hover */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 bg-foreground/5 flex items-center justify-center"
          >
            <div className="bg-primary text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
              View Project
              <ExternalLink className="w-4 h-4" />
            </div>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-xs text-muted uppercase tracking-wider mt-1">
                {project.category}
              </p>
            </div>
            {project.stars && project.stars > 0 && (
              <div className="flex items-center gap-1 text-muted flex-shrink-0">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm">{project.stars}</span>
              </div>
            )}
          </div>

          <p className="text-muted text-sm leading-relaxed">
            {project.description}
          </p>
        </div>
      </motion.div>
    </motion.a>
  );
}
