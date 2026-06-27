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
      { name: 'Dell 27" 4K Monitor', description: "Primary external display" },
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

const getHardwareIcon = (name: string): LucideIcon | null => {
  if (name.includes("MacBook")) return Laptop;
  if (name.includes("Monitor")) return Monitor;
  if (name.includes("Keychron")) return Keyboard;
  if (name.includes("Mouse")) return Mouse;
  return null;
};

const getDevToolIcon = (name: string): LucideIcon | null => {
  if (name.includes("Cursor") || name.includes("VS Code")) return Code2;
  if (name.includes("iTerm")) return Terminal;
  if (name.includes("JetBrains")) return Palette;
  if (name.includes("Catppuccin")) return Layers;
  return null;
};

const getAIIcon = (name: string): LucideIcon | null => {
  if (name.includes("Claude") || name.includes("ChatGPT")) return MessageSquare;
  if (name.includes("n8n")) return Zap;
  if (name.includes("Notion") || name.includes("Obsidian")) return StickyNote;
  return null;
};

const getPackageIcon = (name: string): LucideIcon | null => {
  if (name.includes("Next.js") || name.includes("React")) return Layers;
  if (name.includes("Tailwind") || name.includes("Framer")) return Palette;
  if (name.includes("Prisma") || name.includes("tRPC")) return Zap;
  if (name.includes("Zod")) return Package;
  return null;
};

export default function UsesPage({
  params: _params,
}: {
  params: Promise<{ lang: string }>;
}) {
  // params is consumed by the parent [lang] layout; this page renders the
  // same content in both languages until a real translation is added.
  void _params;
  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[5%] right-[10%] w-[500px] h-[500px] rounded-full bg-accent-bg/10 blur-[100px]" />
        <div className="absolute bottom-[20%] left-[5%] w-[400px] h-[400px] rounded-full bg-pastel-red-bg/8 blur-[90px]" />
      </div>

      <section className="pt-24 pb-12 px-6 lg:px-12 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <div className="max-w-3xl mb-16 md:mb-20">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-4"
            >
              <span className="badge badge-blue">Uses</span>
            </motion.div>

            <RevealText delay={0.1}>
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif text-text-primary tracking-tight leading-tight lowercase">
                the tools i use <span className="italic">daily.</span>
              </h1>
            </RevealText>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xs md:text-sm text-text-secondary leading-relaxed max-w-xl mt-6 font-normal"
            >
              A collection of hardware setup elements, engineering tools, and package architectures that power my workflow. Inspired by{" "}
              <a
                href="https://uses.tech"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-primary font-medium hover:underline"
              >
                uses.tech
              </a>
              .
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {sections.map((section, sectionIndex) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.3 + sectionIndex * 0.05,
                }}
                className="bg-surface rounded-lg p-6 border border-border hover:border-text-secondary transition-colors shadow-xs"
              >
                <div className="flex items-center gap-3.5 mb-6">
                  <div className="p-2 bg-surface-alt border border-border rounded-lg">
                    <section.icon className="w-4 h-4 text-text-secondary" />
                  </div>
                  <h2 className="text-base font-semibold text-text-primary uppercase tracking-wider">
                    {section.title.toLowerCase()}
                  </h2>
                </div>

                <div className="space-y-3">
                  {section.items.map((item) => {
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
                      <div
                        key={item.name}
                        className="group p-4 bg-surface-alt rounded border border-border hover:border-text-muted transition-colors"
                      >
                        <div className="flex items-start gap-3">
                          {ItemIcon && (
                            <ItemIcon className="w-4 h-4 text-text-muted mt-0.5 flex-shrink-0" />
                          )}
                          <div className="flex-1 min-w-0">
                            <h3 className="font-mono text-xs font-semibold text-text-primary transition-colors tracking-wide lowercase">
                              {item.name}
                            </h3>
                            <p className="text-xs text-text-secondary mt-1 font-normal leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 lg:px-12 bg-surface-alt border-t border-border-subtle relative z-10 text-center">
        <div className="container mx-auto max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs md:text-sm text-text-secondary leading-relaxed font-normal">
              This stack is subject to steady iteration. I actively prune dependencies, debug performance leaks, and optimize integrations to keep my building flows fast and uncluttered.
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
