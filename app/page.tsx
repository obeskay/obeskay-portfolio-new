"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";

// Simple fade-up animation
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  },
};

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-[85vh] flex items-center justify-center px-6 lg:px-12"
      >
        {/* Subtle background accent */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 right-[10%] w-[400px] h-[400px] bg-moss/8 rounded-full blur-[80px]" />
          <div className="absolute bottom-20 left-[5%] w-[300px] h-[300px] bg-terracotta/6 rounded-full blur-[60px]" />
        </div>

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 container mx-auto max-w-4xl text-center"
        >
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8 flex justify-center"
          >
            <span className="badge">
              <span className="w-1.5 h-1.5 bg-moss rounded-full animate-pulse" />
              Available for projects
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mb-8"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-text-primary tracking-tight leading-none">
              Building
            </h1>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-text-primary tracking-tight leading-none mt-2">
              products that <span className="font-display italic">work</span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-lg md:text-xl text-text-secondary max-w-lg mx-auto leading-relaxed mb-12"
          >
            Senior Software Engineer crafting AI-powered experiences
            at the intersection of technology and design.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Link href="/work">
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-moss text-white rounded-full font-medium transition-all"
              >
                View my work
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>

            <Link href="/about">
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center px-6 py-3 bg-surface text-text-primary rounded-full font-medium border border-border hover:border-moss/50 transition-all"
              >
                About
              </motion.button>
            </Link>

            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center px-6 py-3 bg-transparent text-text-primary rounded-full font-medium border border-border hover:border-moss/50 transition-all"
              >
                Contact
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Projects */}
      <section className="py-24 px-6 lg:px-12 bg-surface-alt">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
          >
            <div>
              <p className="text-xs font-medium text-accent uppercase tracking-wider mb-3">
                Featured Work
              </p>
              <h2 className="text-4xl md:text-5xl text-text-primary">
                Recent projects
              </h2>
            </div>
            <Link
              href="/work"
              className="inline-flex items-center gap-2 text-text-primary font-medium hover:text-accent transition-colors"
            >
              View all
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Project Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Chatea.la",
                desc: "AI agents that handle customer support 24/7 via WhatsApp.",
                tag: "SaaS"
              },
              {
                title: "One-Shot",
                desc: "Context builder for LLMs. Drag, drop, ship.",
                tag: "Open Source"
              },
            ].map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link href="/work">
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="group card h-full cursor-pointer"
                  >
                    <span className="inline-block px-3 py-1 bg-surface-alt text-xs font-medium rounded-full mb-4 border border-border-subtle">
                      {project.tag}
                    </span>
                    <h3 className="text-xl font-semibold text-text-primary mb-2 group-hover:text-accent transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-text-secondary leading-relaxed">{project.desc}</p>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="py-24 px-6 lg:px-12">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-xs font-medium text-accent uppercase tracking-wider mb-3">
              Expertise
            </p>
            <h2 className="text-4xl md:text-5xl text-text-primary">
              Technologies
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "TypeScript", "Next.js", "AI Agents", "React",
              "Node.js", "Tailwind CSS", "PostgreSQL", "Go"
            ].map((skill, i) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group p-5 bg-surface rounded-xl border border-border-subtle hover:border-accent/50 transition-all cursor-default"
              >
                <p className="font-medium text-text-primary group-hover:text-accent transition-colors">
                  {skill}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 lg:px-12 border-t border-border-subtle">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-text-muted">
            <p>© {new Date().getFullYear()} Obed Vargas</p>
            <p>Mexico City, Mexico</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
