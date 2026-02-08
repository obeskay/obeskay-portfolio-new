"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useRef } from "react";

// Reveal animation component
const RevealText = ({ 
  children, 
  delay = 0,
  className = "" 
}: { 
  children: React.ReactNode; 
  delay?: number;
  className?: string;
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
      className={className}
    >
      {children}
    </motion.div>
  </div>
);

// Stagger container
const staggerContainer = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative min-h-[90vh] flex items-center justify-center px-6 lg:px-12 overflow-hidden"
      >
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-[10%] w-[500px] h-[500px] bg-accent/30 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-[5%] w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
        </div>

        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 container mx-auto max-w-5xl text-center"
        >
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-foreground text-sm font-medium rounded-full">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              Available for projects
            </span>
          </motion.div>

          {/* Main heading with mixed typography */}
          <div className="mb-8">
            <RevealText delay={0.1}>
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold text-foreground tracking-tight leading-[1.1]">
                Building <span className="font-display italic font-normal">products</span>
              </h1>
            </RevealText>
            <RevealText delay={0.2}>
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold text-foreground tracking-tight leading-[1.1]">
                that <span className="font-display italic font-normal">actually</span> work
              </h1>
            </RevealText>
          </div>

          {/* Subtitle */}
          <RevealText delay={0.4}>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed mb-12">
              Senior Software Engineer crafting AI-powered experiences 
              at the intersection of technology and design.
            </p>
          </RevealText>

          {/* CTA Buttons */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.div variants={fadeUp}>
              <Link href="/work">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium transition-all hover:shadow-lg hover:shadow-primary/20"
                >
                  View my work
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.div>
              </Link>
            </motion.div>
            
            <motion.div variants={fadeUp}>
              <Link href="/about">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center justify-center px-8 py-4 bg-muted text-foreground rounded-full font-medium transition-all hover:bg-surface-hover"
                >
                  About me
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center pt-2"
          >
            <motion.div className="w-1.5 h-1.5 bg-muted-foreground rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Projects Teaser */}
      <section className="py-24 px-6 lg:px-12 bg-surface">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16"
          >
            <div>
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">
                Featured Work
              </p>
              <h2 className="text-3xl md:text-4xl font-semibold text-foreground">
                Recent <span className="font-display italic font-normal">projects</span>
              </h2>
            </div>
            <Link 
              href="/work"
              className="group inline-flex items-center gap-2 text-foreground font-medium hover:text-primary transition-colors"
            >
              View all projects
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </motion.div>

          {/* Bento Grid Preview */}
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: "Chatea.la", desc: "AI-powered WhatsApp automation", tag: "SaaS" },
              { title: "QRapidito", desc: "Digital menus for restaurants", tag: "SaaS" },
            ].map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link href="/work" className="group block">
                  <div className="card-luxury p-8 h-full">
                    <span className="inline-block px-3 py-1 bg-accent text-sm font-medium rounded-full mb-6">
                      {project.tag}
                    </span>
                    <h3 className="text-2xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground">{project.desc}</p>
                    <div className="mt-6 flex items-center gap-2 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      Learn more
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 lg:px-12 border-t border-border">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} Obed Vargas. Built with care.
            </p>
            <p className="text-muted-foreground text-sm">
              Mexico City, Mexico
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
