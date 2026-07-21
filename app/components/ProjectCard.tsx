"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star, ArrowUpRight } from "lucide-react";

export interface Project {
  id: string;
  title: string;
  description: string;
  category: "Product" | "Lab" | "Open Source";
  image?: string;
  stars?: number;
  url?: string;
  status?: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

const springTransition = { type: "spring" as const, stiffness: 350, damping: 28 };

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const isExternal = project.url?.startsWith("http");

  // Determine pastel badge type
  const badgeClass = 
    project.category === "Product" ? "badge-blue" :
    project.category === "Lab" ? "badge-green" : 
    "badge-yellow";

  return (
    <motion.div
      layout
      layoutId={`project-card-${project.id}`}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={springTransition}
      className="h-full"
    >
      <a
        href={project.url || "#"}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className="group block h-full select-none"
        style={{ textDecoration: "none" }}
      >
        <div className="flex flex-col h-full bg-surface border border-border rounded-lg overflow-hidden shadow-xs hover:border-teal-primary/40 hover:shadow-md transition-all duration-300">
          {/* Image Area */}
          <div className="aspect-[16/10] bg-surface-alt relative overflow-hidden border-b border-border">
            {project.image ? (
              <div className="relative w-full h-full">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-top filter grayscale opacity-90 contrast-[1.05] group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-500"
                  loading="lazy"
                />
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-surface-alt">
                <span className="text-xl font-mono text-text-muted">
                  {project.title.substring(0, 2).toLowerCase()}
                </span>
              </div>
            )}

            {/* Tag Badges */}
            <div className="absolute top-3 left-3 z-10">
              <span className={`badge ${badgeClass}`}>
                {project.category.toLowerCase()}
              </span>
            </div>

            {project.stars && project.stars > 0 && (
              <div className="absolute top-3 right-3 z-10">
                <span className="badge badge-yellow flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current shrink-0" />
                  {project.stars}
                </span>
              </div>
            )}

            {project.status && (
              <div className="absolute top-3 right-3 z-10">
                <span className="badge badge-red">
                  {project.status.toLowerCase()}
                </span>
              </div>
            )}
          </div>

          {/* Content Area */}
          <div className="flex flex-col flex-grow p-5 gap-3">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-base font-semibold text-text-primary group-hover:text-teal-primary transition-colors">
                {project.title}
              </h3>
              {project.url && (
                <div className="p-1 text-text-muted group-hover:text-teal-primary transition-colors shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                  <ArrowUpRight className="w-4 h-4 shrink-0" />
                </div>
              )}
            </div>

            <p className="text-xs text-text-secondary leading-relaxed font-normal flex-grow line-clamp-3">
              {project.description}
            </p>

            {project.url ? (
              <div className="mt-2 flex items-center gap-1 text-[10px] font-mono font-semibold text-teal-primary uppercase tracking-wide">
                <span>explore</span>
                <ArrowUpRight className="w-3 h-3" />
              </div>
            ) : (
              <div className="mt-2 text-[9px] font-mono font-semibold text-text-muted uppercase tracking-wide">
                {project.status?.toLowerCase() ?? "internal lab"}
              </div>
            )}
          </div>
        </div>
      </a>
    </motion.div>
  );
}

