"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Github, Linkedin, Mail, MapPin, ArrowUpRight, Twitter, Sparkles, Code2, Database, Laptop, MessageSquare } from "lucide-react";
import { useRef } from "react";

const skills = [
  { name: "TypeScript", level: 95, category: "Languages" },
  { name: "Next.js", level: 92, category: "Frameworks" },
  { name: "React", level: 94, category: "Frameworks" },
  { name: "Node.js", level: 88, category: "Runtime/DB" },
  { name: "AI Agents", level: 90, category: "AI & Agents" },
  { name: "Vercel AI SDK", level: 89, category: "AI & Agents" },
  { name: "Tailwind CSS", level: 95, category: "Frontend Details" },
  { name: "Framer Motion", level: 85, category: "Frontend Details" },
  { name: "PostgreSQL", level: 82, category: "Runtime/DB" },
  { name: "Go", level: 78, category: "Languages" },
  { name: "Wails", level: 80, category: "Desktop Apps" },
  { name: "LangChain", level: 85, category: "AI & Agents" },
];

const experience = [
  {
    role: "Senior Software Engineer",
    company: "WOOW Todo Bien",
    period: "2023 — Present",
    description: "Transforming digital insurance channels with resilient chat integrations, structured React flows, and real-time backend orchestration.",
  },
  {
    role: "Founder",
    company: "Chatea.la",
    period: "2024 — Present",
    description: "Architecting autonomous conversational interfaces for WhatsApp, managing lead pipelines, automatic calendars, and active operator dashboards.",
  },
];

// Helper to group skills by category
const groupedSkills = skills.reduce((acc, skill) => {
  if (!acc[skill.category]) acc[skill.category] = [];
  acc[skill.category].push(skill);
  return acc;
}, {} as Record<string, typeof skills>);

// Category Icons mapping
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const categoryIcons: Record<string, any> = {
  "Languages": Code2,
  "Frameworks": Laptop,
  "AI & Agents": Sparkles,
  "Runtime/DB": Database,
  "Frontend Details": MessageSquare,
  "Desktop Apps": Laptop,
};

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
        ease: [0.16, 1, 0.3, 1]
      }}
    >
      {children}
    </motion.div>
  </div>
);

export default function About() {
  const imageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"]
  });
  
  const imageY = useTransform(scrollYProgress, [0, 1], [20, -20]);

  return (
    <main className="min-h-screen relative overflow-hidden bg-background">
      {/* Subtle Warm Spot */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-40 left-[5%] w-[400px] h-[400px] bg-accent-bg/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 right-[10%] w-[350px] h-[350px] bg-pastel-red-bg/8 rounded-full blur-[90px]" />
      </div>

      {/* Hero Section */}
      <section className="py-20 lg:py-32 px-6 lg:px-12 relative z-10">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="max-w-3xl mb-16 md:mb-24">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-4"
            >
              <span className="badge badge-blue">About Me</span>
            </motion.div>
            
            <RevealText delay={0.1}>
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif text-text-primary tracking-tight leading-tight lowercase">
                building <span className="italic">useful things.</span>
              </h1>
            </RevealText>
          </div>

          {/* Split Layout */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Photo Column */}
            <motion.div
              ref={imageRef}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative w-full max-w-sm mx-auto lg:mx-0"
            >
              <motion.div 
                style={{ y: imageY }}
                className="relative aspect-[4/5] rounded-lg overflow-hidden bg-surface border border-border shadow-xs"
              >
                <Image
                  src="/img/nobanana.jpg"
                  alt="Obed Vargas - AI Architect"
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  priority
                />
                
                {/* Floating Mexico City Badge */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="absolute right-4 top-4 bg-surface border border-border px-3.5 py-1.5 rounded-full shadow-xs text-text-secondary"
                >
                  <p className="text-[10px] font-mono font-semibold flex items-center gap-1.5 uppercase tracking-wider">
                    <MapPin className="w-3.5 h-3.5 text-text-muted" />
                    CDMX
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Content Column */}
            <div className="flex flex-col justify-center">
              {/* Bio */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mb-12"
              >
                <h2 className="text-2xl md:text-3xl font-serif tracking-tight text-text-primary mb-6 lowercase">
                  hey, i&apos;m <span className="italic font-serif">obed.</span>
                </h2>
                <div className="space-y-5 text-text-secondary leading-relaxed text-sm md:text-base font-normal">
                  <p>
                    I design tools and workflows that actively solve operational friction. Based in Mexico City, I specialize in the intersection of conversational AI platforms and user interface engineering—crafting systems that feel lightweight, logical, and thoroughly reliable.
                  </p>
                  <p className="font-semibold text-text-primary tracking-tight">
                    Technical areas of focus:
                  </p>
                  <ul className="space-y-2.5 ml-2">
                    <li className="flex items-start gap-2 text-sm text-text-secondary">
                      <span className="w-1.5 h-1.5 rounded-full bg-text-muted mt-2 shrink-0" />
                      <span>AI agent workflows and multi-agent coordination (Vercel AI SDK, LangChain)</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-text-secondary">
                      <span className="w-1.5 h-1.5 rounded-full bg-text-muted mt-2 shrink-0" />
                      <span>Resilient WhatsApp integration architecture & webhook ingestion</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-text-secondary">
                      <span className="w-1.5 h-1.5 rounded-full bg-text-muted mt-2 shrink-0" />
                      <span>Full-stack TypeScript development (Next.js, React, Node.js)</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-text-secondary">
                      <span className="w-1.5 h-1.5 rounded-full bg-text-muted mt-2 shrink-0" />
                      <span>Lightweight native desktop tools (Go & Wails)</span>
                    </li>
                  </ul>
                  <p>
                    Currently at <strong className="text-text-primary font-medium">WOOW Todo Bien</strong>, refining how digital insurance matched active client routines. On the side, I structure and scale personal tools and SaaS experiments that support actual operators.
                  </p>
                  <p className="text-pastel-green-fg font-medium italic">
                    No artificial hype. Just robust software.
                  </p>
                </div>
              </motion.div>

              {/* Bento Skills Layout */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mb-12"
              >
                <h3 className="text-[10px] font-mono font-semibold text-text-muted uppercase tracking-wider mb-6">
                  Technical Instrumentation
                </h3>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  {Object.entries(groupedSkills).map(([category, items]) => {
                    const IconComponent = categoryIcons[category] || Code2;
                    return (
                      <div 
                        key={category}
                        className="bg-surface border border-border p-5 rounded-lg hover:border-text-secondary transition-all duration-300 shadow-xs"
                      >
                        <div className="flex items-center gap-2 mb-3.5 text-text-primary">
                          <IconComponent className="w-4 h-4 text-text-secondary" />
                          <h4 className="text-xs font-semibold uppercase tracking-wider">{category.toLowerCase()}</h4>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {items.map((skill) => (
                            <span 
                              key={skill.name}
                              className="px-2.5 py-1 bg-surface-alt border border-border text-xs text-text-secondary rounded font-mono hover:text-text-primary transition-colors"
                            >
                              {skill.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Connect */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <h3 className="text-[10px] font-mono font-semibold text-text-muted uppercase tracking-wider mb-4">
                  Connect
                </h3>
                <div className="flex gap-2.5">
                  {[
                    { href: "mailto:obeskay.mail@gmail.com", icon: Mail, label: "Email" },
                    { href: "https://github.com/obeskay", icon: Github, label: "GitHub" },
                    { href: "https://linkedin.com/in/obeskay", icon: Linkedin, label: "LinkedIn" },
                    { href: "https://x.com/obeskay", icon: Twitter, label: "X / Twitter" },
                  ].map((social) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target={social.href.startsWith("http") ? "_blank" : undefined}
                      rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="p-3 bg-surface text-text-secondary rounded-lg border border-border hover:bg-surface-alt hover:text-text-primary transition-colors"
                      aria-label={social.label}
                      whileHover={{ scale: 0.98 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <social.icon className="w-4 h-4" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-24 px-6 lg:px-12 bg-surface relative overflow-hidden border-t border-border-subtle">
        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <span className="badge badge-green mb-4">Professional Path</span>
            <h2 className="text-3xl md:text-4xl font-serif tracking-tight text-text-primary lowercase">
              professional <span className="italic">experience</span>
            </h2>
          </motion.div>

          <div className="space-y-4">
            {experience.map((exp, i) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <div className="group p-6 bg-background rounded-lg border border-border hover:border-text-secondary transition-all duration-300 shadow-xs">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-grow">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-text-muted" />
                        <h3 className="text-base font-semibold text-text-primary group-hover:text-text-primary transition-colors">
                          {exp.role}
                        </h3>
                      </div>
                      <p className="text-xs font-semibold text-text-secondary ml-3.5">{exp.company}</p>
                      <p className="text-xs md:text-sm text-text-secondary mt-3 ml-3.5 leading-relaxed font-normal">{exp.description}</p>
                    </div>
                    <span className="text-[10px] font-mono font-semibold text-text-muted whitespace-nowrap px-3 py-1 bg-surface-alt rounded-md border border-border self-start md:self-auto uppercase tracking-wide">
                      {exp.period}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 lg:px-12 border-t border-border-subtle bg-surface-alt relative z-10 text-center">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-serif tracking-tight text-text-primary mb-6 lowercase">
              let&apos;s build something <span className="italic">together.</span>
            </h2>
            <p className="text-text-secondary mb-8 max-w-md mx-auto text-xs md:text-sm leading-relaxed font-normal">
              I am always open to discussing technical integrations, agent architectures, and clean, utilitarian user interfaces.
            </p>
            <motion.a
              href="mailto:obeskay.mail@gmail.com"
              whileHover={{ scale: 0.98 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary inline-flex items-center gap-2 cursor-pointer"
            >
              Get in touch
              <ArrowUpRight className="w-3.5 h-3.5" />
            </motion.a>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
