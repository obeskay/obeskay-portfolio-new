"use client";

import { motion } from "framer-motion";
import {
  Monitor,
  Terminal,
  Sparkles,
  Package,
  Laptop,
  Keyboard,
  Mouse,
  Code2,
  Palette,
  MessageSquare,
  StickyNote,
  Layers,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface UseItem {
  name: string;
  description: string;
}

interface UseSection {
  title: string;
  icon: LucideIcon;
  items: UseItem[];
}

const sections: UseSection[] = [
  {
    title: "Hardware Setup",
    icon: Monitor,
    items: [
      { name: "MacBook Air M2", description: '13", 16GB RAM, 512GB SSD' },
      { name: "Dell 27\" 4K Monitor", description: "Primary external display" },
      { name: "Keychron K3 Pro", description: "Mechanical keyboard, low profile switches" },
      { name: "Logitech MX Master 3S", description: "Best mouse for productivity" },
    ],
  },
  {
    title: "Development Tools",
    icon: Terminal,
    items: [
      { name: "Cursor + VS Code", description: "With vim keybindings enabled" },
      { name: "iTerm2 + zsh + Starship", description: "Fast, beautiful terminal setup" },
      { name: "JetBrains Mono", description: "My go-to monospace font" },
      { name: "Catppuccin Mocha", description: "Soothing pastel theme everywhere" },
    ],
  },
  {
    title: "AI & Productivity Stack",
    icon: Sparkles,
    items: [
      { name: "Claude Code, Cursor", description: "AI coding assistants I use daily" },
      { name: "Claude, ChatGPT", description: "For research and brainstorming" },
      { name: "n8n", description: "Workflow automation platform" },
      { name: "Notion + Obsidian", description: "Notes and knowledge management" },
    ],
  },
  {
    title: "Favorite npm packages",
    icon: Package,
    items: [
      { name: "Next.js, React, TypeScript", description: "Full-stack framework stack" },
      { name: "Tailwind CSS, Framer Motion", description: "Styling and animations" },
      { name: "Prisma, tRPC", description: "Database and type-safe APIs" },
      { name: "Zod, date-fns", description: "Validation and date utilities" },
    ],
  },
];

// Reveal animation component
const RevealText = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => (
  <div className="overflow-hidden">
    <motion.div
      initial={{ y: "100%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  </div>
);

// Get specific icon for hardware items
const getHardwareIcon = (name: string): LucideIcon | null => {
  if (name.includes("MacBook")) return Laptop;
  if (name.includes("Monitor")) return Monitor;
  if (name.includes("Keychron")) return Keyboard;
  if (name.includes("Mouse")) return Mouse;
  return null;
};

// Get specific icon for dev tools items
const getDevToolIcon = (name: string): LucideIcon | null => {
  if (name.includes("Cursor") || name.includes("VS Code")) return Code2;
  if (name.includes("iTerm")) return Terminal;
  if (name.includes("JetBrains")) return Palette;
  if (name.includes("Catppuccin")) return Layers;
  return null;
};

// Get specific icon for AI items
const getAIIcon = (name: string): LucideIcon | null => {
  if (name.includes("Claude") || name.includes("ChatGPT")) return MessageSquare;
  if (name.includes("n8n")) return Zap;
  if (name.includes("Notion") || name.includes("Obsidian")) return StickyNote;
  return null;
};

// Get specific icon for package items
const getPackageIcon = (name: string): LucideIcon | null => {
  if (name.includes("Next.js") || name.includes("React")) return Layers;
  if (name.includes("Tailwind") || name.includes("Framer")) return Palette;
  if (name.includes("Prisma") || name.includes("tRPC")) return Zap;
  if (name.includes("Zod")) return Package;
  return null;
};

export default function UsesPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 px-6 lg:px-12">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="max-w-3xl mb-20">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4"
            >
              Uses
            </motion.p>

            <RevealText delay={0.2}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-foreground tracking-tight">
                The tools I use <span className="font-display italic font-normal">daily</span>
              </h1>
            </RevealText>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 text-lg text-muted-foreground leading-relaxed"
            >
              A collection of hardware, software, and packages that power my workflow.
              Inspired by{" "}
              <a
                href="https://uses.tech"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                uses.tech
              </a>
              .
            </motion.p>
          </div>

          {/* Sections Grid */}
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {sections.map((section, sectionIndex) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.4 + sectionIndex * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="bg-surface rounded-[28px] p-8 border border-border hover:border-accent/50 transition-all duration-300"
              >
                {/* Section Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-accent/20 rounded-2xl">
                    <section.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-xl font-semibold text-foreground">
                    {section.title}
                  </h2>
                </div>

                {/* Items */}
                <div className="space-y-4">
                  {section.items.map((item, itemIndex) => {
                    let ItemIcon: LucideIcon | null = null;
                    if (section.title === "Hardware Setup") {
                      ItemIcon = getHardwareIcon(item.name);
                    } else if (section.title === "Development Tools") {
                      ItemIcon = getDevToolIcon(item.name);
                    } else if (section.title === "AI & Productivity Stack") {
                      ItemIcon = getAIIcon(item.name);
                    } else if (section.title === "Favorite npm packages") {
                      ItemIcon = getPackageIcon(item.name);
                    }

                    return (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.4,
                          delay: 0.5 + sectionIndex * 0.1 + itemIndex * 0.05,
                        }}
                        className="group p-4 bg-white rounded-2xl hover:shadow-md transition-all duration-300 border border-transparent hover:border-accent/30"
                      >
                        <div className="flex items-start gap-3">
                          {ItemIcon && (
                            <ItemIcon className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                          )}
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                              {item.name}
                            </h3>
                            <p className="text-sm text-muted-foreground mt-0.5">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Outro Section */}
      <section className="py-20 px-6 lg:px-12 bg-surface">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-muted-foreground leading-relaxed">
              This setup evolves constantly. I&apos;m always trying new tools and refining my workflow
              to be more efficient and enjoy the process of building software.
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
