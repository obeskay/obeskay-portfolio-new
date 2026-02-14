"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Github, Linkedin, Mail, MapPin, ArrowUpRight, Twitter } from "lucide-react";
import { useRef } from "react";

const skills = [
  { name: "TypeScript", level: 95, category: "Languages" },
  { name: "Next.js", level: 92, category: "Frameworks" },
  { name: "React", level: 94, category: "Frameworks" },
  { name: "Node.js", level: 88, category: "Runtime" },
  { name: "AI Agents", level: 90, category: "AI/ML" },
  { name: "Vercel AI SDK", level: 89, category: "AI/ML" },
  { name: "Tailwind CSS", level: 95, category: "Styling" },
  { name: "Framer Motion", level: 85, category: "Animation" },
  { name: "PostgreSQL", level: 82, category: "Database" },
  { name: "Go", level: 78, category: "Languages" },
  { name: "Wails", level: 80, category: "Desktop" },
  { name: "LangChain", level: 85, category: "AI/ML" },
];

const experience = [
  {
    role: "Senior Software Engineer",
    company: "WOOW Todo Bien",
    period: "2023 — Present",
    description: "Transforming how people buy insurance with AI-powered experiences.",
  },
  {
    role: "Founder",
    company: "Chatea.la",
    period: "2024 — Present",
    description: "Building AI agents for WhatsApp automation.",
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
  
  const imageY = useTransform(scrollYProgress, [0, 1], [50, -50]);

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
              About Me
            </motion.p>
            
            <RevealText delay={0.2}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-foreground tracking-tight">
                Building <span className="font-display italic font-normal">useful</span> things
              </h1>
            </RevealText>
          </div>

          {/* Split Layout */}
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Photo */}
            <motion.div
              ref={imageRef}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <motion.div 
                style={{ y: imageY }}
                className="relative aspect-[4/5] rounded-[32px] overflow-hidden bg-gradient-to-br from-surface to-border border-2 border-border shadow-2xl"
              >
                <Image
                  src="/img/nobanana.jpg"
                  alt="No banana - Obed's creative vibe"
                  fill
                  className="object-cover"
                  priority
                />
                
                {/* Floating badge */}
                <motion.div
                  initial={{ opacity: 0, x: -20, rotate: -10 }}
                  animate={{ opacity: 1, x: 0, rotate: 0 }}
                  transition={{ duration: 0.8, delay: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
                  className="absolute -right-4 top-12 bg-accent px-6 py-4 rounded-2xl shadow-lg shadow-accent/30"
                >
                  <p className="text-sm font-medium text-foreground flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Mexico City
                  </p>
                </motion.div>

                {/* Creative tag */}
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-bold text-primary shadow-sm">
                  🍌 No banana
                </div>
              </motion.div>
            </motion.div>

            {/* Content */}
            <div className="flex flex-col justify-center">
              {/* Bio */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mb-12"
              >
                <h2 className="text-2xl font-semibold text-foreground mb-6">
                  Hey, I'm <span className="font-display italic font-normal">Obed</span>
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    I build products that actually work. Based in Mexico City, I focus on the
                    intersection of AI and UX—making powerful technology feel simple and human.
                  </p>
                  <p>
                    <span className="text-foreground font-medium">What I specialize in:</span>
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-2">
                    <li>AI Agents and multi-agent systems (Vercel AI SDK, LangChain)</li>
                    <li>Developer tools and productivity automation</li>
                    <li>TypeScript full-stack applications</li>
                    <li>Desktop apps with Go and Wails</li>
                  </ul>
                  <p>
                    Currently at <span className="text-foreground font-medium">WOOW Todo Bien</span>,
                    transforming how people buy insurance. On the side, I ship SaaS products and
                    open source tools that solve real problems.
                  </p>
                  <p className="text-foreground font-medium">
                    No fluff. Just useful software.
                  </p>
                </div>
              </motion.div>

              {/* Skills */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="mb-12"
              >
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-6">
                  Technical Skills
                </h3>
                <div className="space-y-4">
                  {skills.map((skill, i) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.6 + i * 0.05 }}
                      className="group"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                          {skill.name}
                        </span>
                        <span className="text-xs text-muted-foreground">{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: 0.8 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                          className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Connect */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
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
                      className="p-4 bg-muted text-foreground rounded-2xl hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                      aria-label={social.label}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <social.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-32 px-6 lg:px-12 bg-surface relative overflow-hidden">
        {/* Background accent */}
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/15 rounded-full blur-[150px] pointer-events-none" />
        
        <div className="container mx-auto max-w-6xl relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-16"
          >
            <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">
              Experience
            </p>
            <h2 className="text-3xl md:text-5xl font-semibold text-foreground">
              Where I've <span className="font-display italic font-normal">worked</span>
            </h2>
          </motion.div>

          <div className="space-y-6">
            {experience.map((exp, i) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <motion.div 
                  whileHover={{ x: 8 }}
                  transition={{ duration: 0.3 }}
                  className="group p-8 bg-white rounded-[28px] shadow-sm hover:shadow-xl transition-all duration-500 border border-transparent hover:border-accent/50"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-3 h-3 rounded-full bg-accent group-hover:scale-125 transition-transform" />
                        <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                          {exp.role}
                        </h3>
                      </div>
                      <p className="text-primary font-medium ml-6">{exp.company}</p>
                      <p className="text-muted-foreground mt-3 ml-6 leading-relaxed">{exp.description}</p>
                    </div>
                    <span className="text-sm text-muted-foreground whitespace-nowrap ml-6 md:ml-0 px-4 py-2 bg-surface rounded-full">
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
      <section className="py-20 px-6 lg:px-12">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-6">
              Let's build something <span className="font-display italic font-normal">together</span>
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              I'm always interested in hearing about new projects and opportunities.
            </p>
            <motion.a
              href="mailto:obeskay.mail@gmail.com"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium transition-all hover:shadow-lg hover:shadow-primary/20"
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
