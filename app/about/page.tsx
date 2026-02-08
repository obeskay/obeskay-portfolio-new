"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, MapPin } from "lucide-react";

const skills = [
  "TypeScript",
  "Next.js",
  "React",
  "Node.js",
  "AI/ML",
  "Conversational AI",
  "Tailwind CSS",
  "Framer Motion",
  "Git",
];

export default function About() {
  return (
    <main className="min-h-screen py-24 px-6">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-4">
            About
          </h1>
        </motion.div>

        {/* Split Layout */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          {/* Photo Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative"
          >
            <div className="aspect-square rounded-2xl overflow-hidden border-4 border-primary/20 shadow-2xl">
              <img
                src="/img/obed/obeskay.webp"
                alt="Obed Vargas"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            {/* Bio */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Hi, I'm Obed
              </h2>
              <p className="text-text-muted leading-relaxed mb-4">
                I'm a senior software engineer based in Mexico City, passionate about building beautiful, functional digital experiences that people love to use.
              </p>
              <p className="text-text-muted leading-relaxed mb-4">
                I specialize in TypeScript, Next.js, and AI agents. Currently exploring the intersection of UX and AI to create intelligent web experiences.
              </p>
              <p className="text-text-muted leading-relaxed">
                When I'm not coding, you'll find me learning new technologies, contributing to open source, or experimenting with AI agents.
              </p>
            </div>

            {/* Skills */}
            <div className="mb-10">
              <h3 className="text-lg font-bold text-foreground mb-4">
                Skills & Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 bg-surface text-foreground text-sm rounded-full hover:bg-primary hover:text-white transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 text-text-muted mb-8">
              <MapPin className="w-4 h-4" />
              <span>Mexico City, Mexico</span>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-bold text-foreground mb-4">
                Let's Connect
              </h3>
              <div className="flex gap-3">
                <a
                  href="mailto:obeskay.mail@gmail.com"
                  className="p-3 bg-surface rounded-full hover:bg-primary hover:text-white transition-colors"
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
                <a
                  href="https://github.com/obeskay"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-surface rounded-full hover:bg-primary hover:text-white transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://linkedin.com/in/obeskay"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-surface rounded-full hover:bg-primary hover:text-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
