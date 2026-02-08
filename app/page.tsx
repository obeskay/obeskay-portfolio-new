"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";

// Stagger animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center px-6 py-20">
        <motion.div 
          className="container mx-auto max-w-4xl text-center"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* Subtle badge */}
          <motion.div variants={item} className="mb-6">
            <span className="inline-flex items-center px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full">
              Available for projects
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="text-5xl sm:text-6xl md:text-8xl font-bold text-foreground mb-6 tracking-tight"
          >
            Obed Vargas
          </motion.h1>

          <motion.p
            variants={item}
            className="text-xl md:text-2xl text-text-muted mb-12 max-w-xl mx-auto leading-relaxed"
          >
            Building AI products that solve real problems
          </motion.p>

          <motion.div
            variants={item}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/work" className="group">
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-foreground text-white rounded-full font-medium transition-colors hover:bg-primary"
              >
                See my work
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.div>
            </Link>
            <Link href="/about">
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-border text-foreground rounded-full font-medium hover:border-foreground transition-colors"
              >
                About me
              </motion.div>
            </Link>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-20"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-6 h-10 mx-auto border-2 border-border rounded-full flex justify-center pt-2"
            >
              <motion.div className="w-1.5 h-1.5 bg-text-muted rounded-full" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border/50">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-text-muted text-sm">
              © {new Date().getFullYear()} Obed Vargas
            </p>
            <div className="flex gap-2">
              {[
                { href: "mailto:obeskay.mail@gmail.com", icon: Mail, label: "Email" },
                { href: "https://github.com/obeskay", icon: Github, label: "GitHub" },
                { href: "https://linkedin.com/in/obeskay", icon: Linkedin, label: "LinkedIn" },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="p-2.5 text-text-muted hover:text-primary hover:bg-surface rounded-lg transition-all duration-200"
                  aria-label={social.label}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
