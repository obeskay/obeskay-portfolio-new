"use client";

import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail, ExternalLink, Code, Cpu, Zap, MessageSquare, Smartphone, Palette, Database, GitBranch } from "lucide-react";
import Link from "next/link";

const projects = [
  {
    title: "lottie-animator-skill",
    description: "Claude Code skill for creating Lottie animations",
    stars: 3,
    tech: ["TypeScript", "Claude Code", "Lottie"],
    link: "https://github.com/obeskay/lottie-animator-skill",
    icon: <Palette className="w-5 h-5" />,
  },
  {
    title: "vercel-ai-agents",
    description: "Multi-Agent Conversational AI System",
    stars: 2,
    tech: ["Next.js", "AI", "Vercel"],
    link: "https://github.com/obeskay/vercel-ai-agents",
    icon: <MessageSquare className="w-5 h-5" />,
  },
  {
    title: "swarm-ville",
    description: "AI Agent Collaboration in 2D",
    stars: 0,
    tech: ["React", "AI Agents", "Canvas"],
    link: "https://github.com/obeskay/swarm-ville",
    icon: <Cpu className="w-5 h-5" />,
  },
  {
    title: "claude-relay-service",
    description: "Claude Code mirror service",
    stars: 0,
    tech: ["TypeScript", "Claude", "Service"],
    link: "https://github.com/obeskay/claude-relay-service",
    icon: <GitBranch className="w-5 h-5" />,
  },
  {
    title: "whatsapp-ai-agent",
    description: "Voice-enabled WhatsApp AI",
    stars: 0,
    tech: ["WhatsApp", "AI", "Voice"],
    link: "https://github.com/obeskay/whatsapp-ai-agent",
    icon: <Smartphone className="w-5 h-5" />,
  },
  {
    title: "ai-model-comparator",
    description: "Gen UI Benchmark Tool",
    stars: 0,
    tech: ["React", "AI", "Testing"],
    link: "https://github.com/obeskay/ai-model-comparator",
    icon: <Zap className="w-5 h-5" />,
  },
  {
    title: "Chatea.la",
    description: "WhatsApp automation SaaS",
    stars: 0,
    tech: ["SaaS", "WhatsApp", "Automation"],
    link: "https://chatea.la",
    icon: <MessageSquare className="w-5 h-5" />,
  },
  {
    title: "QRapidito",
    description: "QR menu platform",
    stars: 0,
    tech: ["Next.js", "QR Codes", "Restaurant"],
    link: "https://qrapidito.com",
    icon: <Smartphone className="w-5 h-5" />,
  },
];

const skills = [
  { name: "TypeScript", level: 95, icon: <Code className="w-4 h-4" /> },
  { name: "Next.js", level: 90, icon: <Zap className="w-4 h-4" /> },
  { name: "React", level: 95, icon: <Code className="w-4 h-4" /> },
  { name: "AI/ML", level: 85, icon: <Cpu className="w-4 h-4" /> },
  { name: "UX/UI Design", level: 80, icon: <Palette className="w-4 h-4" /> },
  { name: "PostgreSQL", level: 75, icon: <Database className="w-4 h-4" /> },
  { name: "Git/GitHub", level: 90, icon: <GitBranch className="w-4 h-4" /> },
  { name: "Node.js", level: 85, icon: <Code className="w-4 h-4" /> },
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-950 to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(139,92,246,0.1),transparent_50%)]" />

        <div className="relative z-10 container mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <div className="w-32 h-32 md:w-40 md:h-40 mx-auto rounded-full overflow-hidden border-4 border-zinc-800 shadow-2xl mb-6">
                <img
                  src="/img/obed/obeskay.webp"
                  alt="Obed Vargas"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 bg-clip-text text-transparent animate-gradient"
            >
              Obed Vargas
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-zinc-400 mb-6"
            >
              Web Developer & AI Specialist
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg text-zinc-500 max-w-2xl mx-auto mb-8"
            >
              Building intelligent web experiences at the intersection of UX and AI. Based in CDMX, working at WOOW Todo Bien.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex justify-center gap-4 mb-8"
            >
              <Link
                href="#projects"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-semibold hover:bg-zinc-200 transition-all hover:scale-105"
              >
                View Projects
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 border border-zinc-700 rounded-full hover:border-zinc-500 hover:bg-zinc-900 transition-all"
              >
                Get in Touch
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex justify-center gap-4"
            >
              <a
                href="https://github.com/obeskay"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-zinc-900 rounded-full hover:bg-zinc-800 transition-colors border border-zinc-800"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/in/obeskay"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-zinc-900 rounded-full hover:bg-zinc-800 transition-colors border border-zinc-800"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:obeskay.mail@gmail.com"
                className="p-3 bg-zinc-900 rounded-full hover:bg-zinc-800 transition-colors border border-zinc-800"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-zinc-700 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-zinc-500 rounded-full animate-bounce" />
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">About Me</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto" />
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div className="space-y-6 text-lg text-zinc-400">
              <p>
                I'm a web developer based in Mexico City (CDMX) specializing in TypeScript, Next.js, and AI agents.
              </p>
              <p>
                Currently working at <span className="text-white font-semibold">WOOW Todo Bien</span>, an insurance marketplace where I help transform the insurance experience through modern technology.
              </p>
              <p>
                I'm passionate about building automation tools and AI agents that solve real-world problems. My side projects focus on the intersection of UX and AI, creating intuitive interfaces that make powerful technology accessible.
              </p>
              <p>
                When I'm not coding, you can find me exploring new AI frameworks, contributing to open source, or experimenting with new web technologies.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-zinc-900 rounded-2xl p-8 border border-zinc-800"
            >
              <h3 className="text-2xl font-bold mb-6 text-white">Quick Facts</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <span className="text-zinc-400">Based in Mexico City, Mexico</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full" />
                  <span className="text-zinc-400">Specializing in Next.js & AI</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-zinc-400">Building AI-powered tools</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                  <span className="text-zinc-400">Open source contributor</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full" />
                  <span className="text-zinc-400">UX + AI enthusiast</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 px-6 bg-zinc-950">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Skills</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto" />
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                variants={fadeInUp}
                className="bg-zinc-900 rounded-xl p-6 border border-zinc-800 hover:border-zinc-700 transition-all hover:scale-105"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
                    {skill.icon}
                  </div>
                  <span className="font-semibold">{skill.name}</span>
                </div>
                <div className="w-full bg-zinc-800 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 1 }}
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                  />
                </div>
                <span className="text-sm text-zinc-500 mt-2 block">{skill.level}%</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Projects</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto" />
            <p className="text-zinc-400 mt-4 max-w-2xl mx-auto">
              A selection of my open source projects and side projects focusing on AI, automation, and web development.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                variants={fadeInUp}
                className="group bg-zinc-900 rounded-xl p-6 border border-zinc-800 hover:border-blue-500/50 transition-all hover:scale-105 hover:shadow-xl hover:shadow-blue-500/10"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg text-blue-500">
                    {project.icon}
                  </div>
                  <h3 className="text-xl font-bold group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                </div>

                <p className="text-zinc-400 mb-4 text-sm leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-zinc-800 text-xs rounded-full text-zinc-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
                  <div className="flex items-center gap-1 text-zinc-500">
                    {project.stars > 0 && (
                      <>
                        <svg
                          className="w-4 h-4 fill-yellow-500"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                        <span className="text-sm">{project.stars}</span>
                      </>
                    )}
                  </div>

                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    View
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 bg-zinc-950">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6" />
            <p className="text-zinc-400 max-w-2xl mx-auto">
              I'm always open to discussing new projects, ideas, or opportunities to collaborate.
            </p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="bg-zinc-900 rounded-2xl p-8 md:p-12 border border-zinc-800"
          >
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-2">Let's connect!</h3>
                <p className="text-zinc-400">
                  Feel free to reach out through any of these channels:
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <a
                  href="mailto:obeskay.mail@gmail.com"
                  className="flex items-center gap-4 p-4 bg-zinc-800/50 rounded-xl hover:bg-zinc-800 transition-colors group"
                >
                  <div className="p-3 bg-blue-500/10 rounded-lg text-blue-500 group-hover:scale-110 transition-transform">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-semibold">Email</div>
                    <div className="text-sm text-zinc-400">obeskay.mail@gmail.com</div>
                  </div>
                </a>

                <a
                  href="tel:+525560348476"
                  className="flex items-center gap-4 p-4 bg-zinc-800/50 rounded-xl hover:bg-zinc-800 transition-colors group"
                >
                  <div className="p-3 bg-purple-500/10 rounded-lg text-purple-500 group-hover:scale-110 transition-transform">
                    <Smartphone className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-semibold">Phone</div>
                    <div className="text-sm text-zinc-400">+52 55 6034 8476</div>
                  </div>
                </a>
              </div>

              <div className="pt-6 border-t border-zinc-800">
                <p className="text-center text-zinc-500 mb-4">
                  Or find me on social media
                </p>
                <div className="flex justify-center gap-4">
                  <a
                    href="https://github.com/obeskay"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 bg-zinc-800 rounded-xl hover:bg-zinc-700 hover:scale-105 transition-all"
                    aria-label="GitHub"
                  >
                    <Github className="w-6 h-6" />
                  </a>
                  <a
                    href="https://linkedin.com/in/obeskay"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 bg-zinc-800 rounded-xl hover:bg-zinc-700 hover:scale-105 transition-all"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-zinc-900">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-zinc-500 text-sm">
              © {new Date().getFullYear()} Obed Vargas. All rights reserved.
            </p>
            <p className="text-zinc-600 text-sm">
              Built with Next.js 15, React 19, and Tailwind 4
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
