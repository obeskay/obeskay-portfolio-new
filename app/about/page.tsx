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
    description: "Transforming how people buy insurance with robust AI-powered messaging systems, React flows, and real-time backend orchestration.",
  },
  {
    role: "Founder",
    company: "Chatea.la",
    period: "2024 — Present",
    description: "Architecting autonomous conversational interfaces for WhatsApp, managing lead pipelines, scheduler integrations, and operator visibility.",
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
  
  const imageY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <main className="min-h-screen relative overflow-hidden bg-background">
      {/* Dynamic Background Organic Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-40 left-[5%] w-[400px] h-[400px] bg-moss/6 rounded-full blur-[90px]" />
        <div className="absolute bottom-20 right-[10%] w-[350px] h-[350px] bg-terracotta/4 rounded-full blur-[80px]" />
      </div>

      {/* Hero Section */}
      <section className="py-20 lg:py-32 px-6 lg:px-12 relative z-10">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="max-w-3xl mb-20">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-sm font-semibold text-moss uppercase tracking-wider mb-4"
            >
              About Me
            </motion.p>
            
            <RevealText delay={0.2}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-text-primary tracking-tight leading-tight relative inline-block">
                Building{" "}
                <span className="relative inline-block font-display italic font-normal text-text-primary">
                  useful
                  {/* Underline SVG squiggle */}
                  <svg
                    className="absolute left-0 -bottom-2 w-full h-3 text-terracotta z-10 overflow-visible"
                    viewBox="0 0 100 10"
                    preserveAspectRatio="none"
                    fill="none"
                  >
                    <path
                      d="M3 5 C 20 2, 40 7, 97 4 C 80 8, 40 3, 10 7"
                      stroke="currentColor"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>{" "}
                things
              </h1>
            </RevealText>
          </div>

          {/* Split Layout */}
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Photo Column */}
            <motion.div
              ref={imageRef}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative w-full max-w-md mx-auto lg:mx-0"
            >
              <motion.div 
                style={{ y: imageY }}
                className="relative aspect-[4/5] rounded-[32px] overflow-hidden bg-surface border border-border shadow-lg"
              >
                <Image
                  src="/img/nobanana.jpg"
                  alt="Obed Vargas - AI Architect"
                  fill
                  className="object-cover"
                  priority
                />
                
                {/* Floating Mexico City Badge */}
                <motion.div
                  initial={{ opacity: 0, x: -20, rotate: -6 }}
                  animate={{ opacity: 1, x: 0, rotate: 0 }}
                  transition={{ duration: 0.8, delay: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
                  className="absolute -right-4 top-12 bg-moss px-5 py-3 rounded-2xl shadow-md text-white border border-white/10"
                >
                  <p className="text-xs font-semibold flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-white/90" />
                    Mexico City
                  </p>
                </motion.div>


              </motion.div>
            </motion.div>

            {/* Content Column */}
            <div className="flex flex-col justify-center">
              {/* Bio */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mb-12"
              >
                <h2 className="text-2xl font-semibold text-text-primary mb-6">
                  Hey, I&apos;m <span className="font-display italic font-normal text-terracotta">Obed</span>
                </h2>
                <div className="space-y-4 text-text-secondary leading-relaxed text-sm md:text-base">
                  <p>
                    I design tools and workflows that actually solve operational friction. Based in Mexico City, I specialize in the
                    intersection of conversational AI and user interface design—shaping interfaces that feel simple, natural, and human.
                  </p>
                  <p className="font-medium text-text-primary">
                    Core areas of focus:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-2 text-sm text-text-secondary">
                    <li>AI agent workflows & multi-agent coordination (Vercel AI SDK, LangChain)</li>
                    <li>Resilient WhatsApp integration layers & conversational mechanics</li>
                    <li>Full-stack TypeScript environments (Next.js, Node.js)</li>
                    <li>Lightweight, native desktop tools (Go & Wails)</li>
                  </ul>
                  <p>
                    Currently at <strong className="text-text-primary font-semibold">WOOW Todo Bien</strong>, optimizing how digital insurance matches active client lives. On the side, I structure and scale personal tools and SaaS experiments that support real operators.
                  </p>
                  <p className="text-moss font-semibold italic">
                    No artificial fluff. Just useful software.
                  </p>
                </div>
              </motion.div>

              {/* Bento Skills Layout (Replacement of progress bars) */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="mb-12"
              >
                <h3 className="text-xs font-semibold text-moss uppercase tracking-wider mb-6">
                  Technical Architecture
                </h3>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  {Object.entries(groupedSkills).map(([category, items], gridIdx) => {
                    const IconComponent = categoryIcons[category] || Code2;
                    return (
                      <div 
                        key={category}
                        className="bg-surface border border-border-subtle p-5 rounded-2xl hover:border-moss/30 transition-all duration-300 shadow-xs"
                      >
                        <div className="flex items-center gap-2 mb-3.5 text-text-primary">
                          <IconComponent className="w-4 h-4 text-moss" />
                          <h4 className="text-xs font-bold uppercase tracking-wider">{category}</h4>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {items.map((skill) => (
                            <span 
                              key={skill.name}
                              className="px-2.5 py-1 bg-surface-alt border border-border-subtle text-xs text-text-secondary rounded-lg font-medium hover:border-moss/20 hover:text-text-primary transition-colors"
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
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <h3 className="text-xs font-semibold text-moss uppercase tracking-wider mb-4">
                  Connect
                </h3>
                <div className="flex gap-3">
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
                      className="p-3.5 bg-surface text-text-secondary rounded-2xl border border-border-subtle hover:bg-moss hover:text-white hover:border-transparent transition-all duration-300"
                      aria-label={social.label}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <social.icon className="w-4.5 h-4.5" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-32 px-6 lg:px-12 bg-surface relative overflow-hidden border-t border-border-subtle">
        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-16"
          >
            <p className="text-sm font-semibold text-moss uppercase tracking-wider mb-3">
              Professional Path
            </p>
            <h2 className="text-3xl md:text-5xl font-semibold text-text-primary">
              Where I&apos;ve <span className="font-display italic font-normal text-terracotta">designed</span>
            </h2>
          </motion.div>

          <div className="space-y-6">
            {experience.map((exp, i) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <motion.div 
                  whileHover={{ x: 6 }}
                  transition={{ duration: 0.3 }}
                  className="group p-8 bg-background rounded-[24px] border border-border-subtle hover:border-moss/30 hover:shadow-md transition-all duration-500"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-moss group-hover:scale-125 transition-transform" />
                        <h3 className="text-lg font-semibold text-text-primary group-hover:text-moss transition-colors">
                          {exp.role}
                        </h3>
                      </div>
                      <p className="text-moss font-semibold text-sm ml-5.5">{exp.company}</p>
                      <p className="text-text-secondary text-sm mt-3 ml-5.5 leading-relaxed">{exp.description}</p>
                    </div>
                    <span className="text-xs text-text-muted whitespace-nowrap ml-5.5 md:ml-0 px-4 py-2 bg-surface-alt rounded-full border border-border-subtle self-start md:self-auto">
                      {exp.period}
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 lg:px-12 border-t border-border-subtle bg-surface-alt relative z-10 text-center">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-3xl md:text-4xl font-semibold text-text-primary mb-6">
              Let&apos;s build something <span className="font-display italic font-normal text-terracotta">together</span>
            </h2>
            <p className="text-text-secondary mb-8 max-w-lg mx-auto text-sm md:text-base leading-relaxed">
              I am always open to discussing robust integrations, multi-agent frameworks, and high-quality frontend layers.
            </p>
            <motion.a
              href="mailto:obeskay.mail@gmail.com"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-moss text-white rounded-full font-medium shadow-md transition-all hover:bg-moss-light"
            >
              Get in touch
              <ArrowUpRight className="w-4 h-4" />
            </motion.a>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
