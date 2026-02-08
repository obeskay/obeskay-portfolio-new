"use client";

import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail, ExternalLink, Star } from "lucide-react";
import Link from "next/link";

const projects = [
  {
    title: "lottie-animator-skill",
    description: "Claude Code skill for creating Lottie animations",
    stars: 3,
    tech: ["TypeScript", "Claude Code", "Lottie"],
    link: "https://github.com/obeskay/lottie-animator-skill",
  },
  {
    title: "vercel-ai-agents",
    description: "Multi-Agent Conversational AI System",
    stars: 2,
    tech: ["Next.js", "AI", "Vercel"],
    link: "https://github.com/obeskay/vercel-ai-agents",
  },
  {
    title: "Chatea.la",
    description: "WhatsApp automation SaaS",
    tech: ["SaaS", "WhatsApp", "Automation"],
    link: "https://chatea.la",
  },
  {
    title: "QRapidito",
    description: "QR menu platform",
    tech: ["Next.js", "QR Codes", "Restaurant"],
    link: "https://qrapidito.com",
  },
  {
    title: "swarm-ville",
    description: "AI Agent Collaboration in 2D",
    tech: ["React", "AI Agents", "Canvas"],
    link: "https://github.com/obeskay/swarm-ville",
  },
  {
    title: "whatsapp-ai-agent",
    description: "Voice-enabled WhatsApp AI",
    tech: ["WhatsApp", "AI", "Voice"],
    link: "https://github.com/obeskay/whatsapp-ai-agent",
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1.5, ease: "easeOut" },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative z-10 container mx-auto px-6 py-12"
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-16">
            {/* Profile Photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="w-full md:w-[25vw] max-w-[400px] aspect-square"
            >
              <div className="w-full h-full rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl">
                <img
                  src="/img/obed/obeskay.webp"
                  alt="Obed Vargas"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Hero Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
              className="flex-1 text-center md:text-left max-w-2xl"
            >
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.4 }}
                className="text-4xl md:text-6xl font-bold mb-6 text-foreground"
              >
                I build enjoyable websites
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.6 }}
                className="text-lg md:text-xl text-text-muted mb-10 leading-relaxed"
              >
                Hi, I'm Obed. A developer focused on creating beautiful, functional digital experiences that people love to use.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
              >
                <Link
                  href="#projects"
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white rounded-full font-medium hover:bg-opacity-90 transition-all hover:scale-105"
                >
                  My work
                  <span>⚡️</span>
                </Link>
                <Link
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-primary text-primary rounded-full font-medium hover:bg-primary hover:text-white transition-all hover:scale-105"
                >
                  Me
                  <span>😃</span>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6 bg-surface">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Selected Projects
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {projects.map((project, index) => (
              <motion.a
                key={project.title}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                variants={fadeInUp}
                className="group bg-white rounded-2xl p-6 border border-border hover:border-primary/50 transition-all hover:scale-105 hover:shadow-xl hover:shadow-primary/5"
              >
                <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                  {project.title}
                </h3>

                <p className="text-text-muted mb-4 text-sm leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-surface text-xs rounded-full text-text-muted"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center gap-1 text-text-muted">
                    {(project.stars ?? 0) > 0 && (
                      <>
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{project.stars}</span>
                      </>
                    )}
                  </div>

                  <div className="flex items-center gap-1 text-sm text-primary">
                    View
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 bg-background">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Let's work together
            </h2>
            <p className="text-lg text-text-muted mb-10 max-w-xl mx-auto">
              I'm always interested in hearing about new projects and opportunities.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
              className="flex justify-center gap-4 mb-10"
            >
              <a
                href="mailto:obeskay.mail@gmail.com"
                className="p-4 bg-surface rounded-full hover:bg-surface-hover hover:scale-110 transition-all border border-border"
                aria-label="Email"
              >
                <Mail className="w-6 h-6 text-primary" />
              </a>
              <a
                href="https://github.com/obeskay"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-surface rounded-full hover:bg-surface-hover hover:scale-110 transition-all border border-border"
                aria-label="GitHub"
              >
                <Github className="w-6 h-6 text-primary" />
              </a>
              <a
                href="https://linkedin.com/in/obeskay"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-surface rounded-full hover:bg-surface-hover hover:scale-110 transition-all border border-border"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-6 h-6 text-primary" />
              </a>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.4 }}
              className="text-text-muted"
            >
              obeskay.mail@gmail.com
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col items-center gap-2">
            <p className="text-text-muted text-sm">
              © {new Date().getFullYear()} Obed Vargas
            </p>
            <p className="text-text-muted/60 text-xs">
              Built with Next.js & Tailwind
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
