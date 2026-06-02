"use client";

import Image from "next/image";
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

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const isExternal = project.url?.startsWith("http");

  return (
    <a
      href={project.url || "#"}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="group block relative"
      style={{ textDecoration: "none" }}
    >
      <div className="card h-full flex flex-col gap-5 bg-surface text-text-primary transition-all">
        {/* Image Area */}
        <div className="aspect-[16/10] bg-surface-alt relative overflow-hidden border-3 border-ink neobrutal-shadow-xs">
          {project.image ? (
            <div className="relative w-full h-full">
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-top filter grayscale contrast-110 hover:grayscale-0 transition-all duration-300"
                loading="lazy"
                quality={85}
              />
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gold">
              <span className="text-5xl font-mono font-black text-ink">
                {project.title.substring(0, 2).toUpperCase()}
              </span>
            </div>
          )}

          {/* Neobrutalist Tag Badge */}
          <div className="absolute top-4 left-4 z-10">
            <span className="px-3 py-1 bg-terracotta border-2 border-ink text-white font-mono text-[10px] font-black uppercase tracking-wider neobrutal-shadow-xs">
              {project.category}
            </span>
          </div>

          {project.stars && project.stars > 0 && (
            <div className="absolute top-4 right-4 z-10">
              <span className="px-2.5 py-1 bg-gold border-2 border-ink text-ink font-mono text-[10px] font-black uppercase tracking-wider neobrutal-shadow-xs flex items-center gap-1">
                <Star className="w-3 h-3 fill-ink text-ink" />
                {project.stars}
              </span>
            </div>
          )}

          {project.status && (
            <div className="absolute top-4 right-4 z-10">
              <span className="px-2.5 py-1 bg-surface border-2 border-ink text-text-primary font-mono text-[10px] font-black uppercase tracking-wider neobrutal-shadow-xs">
                {project.status}
              </span>
            </div>
          )}
        </div>

        {/* Content Area */}
        <div className="flex flex-col flex-grow gap-3">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-lg font-black font-display text-text-primary uppercase tracking-tight group-hover:text-terracotta transition-colors">
              {project.title}
            </h3>
            {project.url && (
              <div className="p-1 bg-surface border-2 border-ink text-ink neobrutal-shadow-xs group-hover:translate-x-[2px] group-hover:translate-y-[-2px] group-hover:shadow-[4px_4px_0_var(--ink)] active:translate-x-0 active:translate-y-0 transition-all">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            )}
          </div>

          <p className="text-text-secondary font-sans font-medium text-xs leading-relaxed flex-grow">
            {project.description}
          </p>

          {project.url ? (
            <div className="mt-2 flex items-center gap-1.5 text-xs font-mono font-black text-terracotta uppercase">
              <span>EXPLORE</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          ) : (
            <div className="mt-2 text-[10px] font-mono font-black text-text-muted uppercase">
              {project.status ?? "Internal lab"}
            </div>
          )}
        </div>
      </div>
    </a>
  );
}
