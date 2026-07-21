"use client";

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
        <div className="flex flex-col justify-between h-full bg-surface border border-border rounded-lg p-5 hover:border-teal-primary/40 hover:shadow-sm transition-all duration-300 relative overflow-hidden">
          {/* Header Row: Title + Badges */}
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`badge ${badgeClass}`}>
                  {project.category.toLowerCase()}
                </span>
                {project.status && (
                  <span className="badge badge-red">
                    {project.status.toLowerCase()}
                  </span>
                )}
                {project.stars && project.stars > 0 && (
                  <span className="badge badge-yellow flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current shrink-0" />
                    {project.stars}
                  </span>
                )}
              </div>

              {project.url && (
                <div className="p-1 text-text-muted group-hover:text-teal-primary shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                  <ArrowUpRight className="w-4 h-4 shrink-0" />
                </div>
              )}
            </div>

            <h3 className="text-lg font-semibold text-text-primary group-hover:text-teal-primary transition-colors tracking-tight">
              {project.title}
            </h3>

            <p className="text-xs text-text-secondary leading-relaxed font-normal mt-2">
              {project.description}
            </p>
          </div>

          {/* Bottom Link Bar */}
          <div className="mt-5 pt-3 border-t border-border-subtle flex items-center justify-between">
            <span className="text-[10px] font-mono font-semibold text-text-muted uppercase tracking-wider">
              {project.url ? "View project" : "Internal node"}
            </span>
            {project.url && (
              <span className="text-[10px] font-mono font-semibold text-teal-primary group-hover:underline uppercase tracking-wider flex items-center gap-0.5">
                Visit
                <ArrowUpRight className="w-3 h-3" />
              </span>
            )}
          </div>
        </div>
      </a>
    </motion.div>
  );
}


