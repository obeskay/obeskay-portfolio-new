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
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1]
      }}
      className="group relative block"
    >
      {/* Card Container - Clinical Luxury style */}
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="bg-white rounded-[24px] overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500"
      >
        {/* Image Area */}
        <div className="aspect-[16/10] bg-muted relative overflow-hidden">
          {project.image ? (
            <motion.div 
              className="relative w-full h-full"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-top"
                loading="lazy"
                quality={85}
              />
            </motion.div>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted to-surface">
              <span className="text-6xl font-display italic text-muted-foreground/30">
                {project.title.charAt(0)}
              </span>
            </div>
          )}

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* View button */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white text-foreground px-6 py-3 rounded-full text-sm font-semibold flex items-center gap-2 shadow-lg transform group-hover:scale-100 group-hover:translate-y-0 scale-90 translate-y-4 transition-all duration-500"
            >
              View Project
              <ArrowUpRight className="w-4 h-4" />
            </motion.div>
          </div>

          {/* Category badge */}
          <div className="absolute top-5 left-5 z-10">
            <span className="px-4 py-1.5 bg-white text-foreground text-xs font-semibold rounded-full shadow-sm uppercase tracking-wider">
              {project.category}
            </span>
          </div>

          {/* Stars badge */}
          {project.stars && project.stars > 0 && (
            <div className="absolute top-5 right-5 z-10">
              <span className="px-3 py-1.5 bg-white text-foreground text-xs font-semibold rounded-full shadow-sm flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                {project.stars}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-8">
          <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
            {project.title}
          </h3>

          <p className="text-muted-foreground leading-relaxed line-clamp-2">
            {project.description}
          </p>

          {/* Arrow indicator */}
          <div className="mt-6 flex items-center gap-2 text-primary font-medium opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            <span className="text-sm">Explore project</span>
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
      </motion.div>
    </motion.a>
  );
}
