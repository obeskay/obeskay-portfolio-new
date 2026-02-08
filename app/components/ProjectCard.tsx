"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star, ArrowUpRight } from "lucide-react";

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
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className="group relative block"
    >
      {/* Card Container */}
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="bg-white rounded-2xl overflow-hidden border border-border/50 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300"
      >
        {/* Image/Preview Area */}
        <div className="aspect-[16/10] bg-gradient-to-br from-surface to-border relative overflow-hidden">
          {project.image ? (
            <div className="relative w-full h-full group-hover:scale-105 transition-transform duration-500 ease-out">
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-top"
                loading="lazy"
                quality={85}
              />
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-6xl font-bold text-text-muted/20">
                {project.title.charAt(0)}
              </div>
            </div>
          )}

          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          
          {/* View button on hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
            <div className="bg-white text-foreground px-5 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 shadow-lg transform group-hover:scale-100 scale-90 transition-transform duration-300">
              View Project
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>

          {/* Category badge */}
          <div className="absolute top-4 left-4 z-10">
            <span className="px-3 py-1.5 bg-white/95 backdrop-blur-sm text-foreground text-xs font-medium rounded-full shadow-sm">
              {project.category}
            </span>
          </div>

          {/* Stars badge */}
          {project.stars && project.stars > 0 && (
            <div className="absolute top-4 right-4 z-10">
              <span className="px-3 py-1.5 bg-white/95 backdrop-blur-sm text-foreground text-xs font-medium rounded-full shadow-sm flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                {project.stars}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-200 mb-2">
            {project.title}
          </h3>

          <p className="text-text-muted text-sm leading-relaxed line-clamp-2">
            {project.description}
          </p>

          {/* Subtle arrow indicator */}
          <div className="mt-4 flex items-center text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <span className="text-sm font-medium">Learn more</span>
            <ArrowUpRight className="w-4 h-4 ml-1" />
          </div>
        </div>
      </motion.div>
    </motion.a>
  );
}
