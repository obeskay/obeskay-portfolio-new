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

  const badgeClass = 
    project.category === "Product" ? "badge-blue" :
    project.category === "Lab" ? "badge-green" : 
    "badge-yellow";

  return (
    <motion.div
      layout
      layoutId={`project-card-${project.id}`}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
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
          {/* Fresh Screenshot Frame */}
          <div className="aspect-[16/10] bg-surface-alt relative overflow-hidden border-b border-border">
            {project.image ? (
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover object-top filter grayscale opacity-90 contrast-[1.05] group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-500"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-surface-alt">
                <span className="text-xl font-mono text-text-muted">
                  {project.title.substring(0, 2).toLowerCase()}
                </span>
              </div>
            )}

            {/* Badges Overlay */}
            <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5">
              <span className={`badge ${badgeClass}`}>
                {project.category.toLowerCase()}
              </span>
              {project.status && (
                <span className="badge badge-red">
                  {project.status.toLowerCase()}
                </span>
              )}
            </div>

            {project.stars && project.stars > 0 && (
              <div className="absolute top-3 right-3 z-10">
                <span className="badge badge-yellow flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current shrink-0" />
                  {project.stars}
                </span>
              </div>
            )}
          </div>

          {/* Minimal Content */}
          <div className="flex flex-col flex-grow p-4 justify-between gap-2">
            <div>
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-base font-semibold text-text-primary group-hover:text-teal-primary transition-colors tracking-tight">
                  {project.title}
                </h3>
                {project.url && (
                  <ArrowUpRight className="w-3.5 h-3.5 text-text-muted group-hover:text-teal-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
                )}
              </div>

              <p className="text-xs text-text-secondary leading-relaxed font-normal mt-1 line-clamp-2">
                {project.description}
              </p>
            </div>
          </div>
        </div>
      </a>
    </motion.div>
  );
}



