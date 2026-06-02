"use client";

import { motion } from "framer-motion";
import { Laptop, Rocket, TrendingUp, Building2, Bot, Sparkles, MapPin, ArrowUpRight } from "lucide-react";

const milestones = [
  {
    year: "2018",
    title: "started coding",
    description: "Wrote first lines of code. Developed quick utilities, scripted automated routines, and learned the foundations of runtime systems.",
    icon: Laptop,
    badgeClass: "badge-blue",
  },
  {
    year: "2020",
    title: "first software role",
    description: "Began my professional engineering path. Managed web backends, resolved rate-limiting bottlenecks, and worked on database resilience.",
    icon: Rocket,
    badgeClass: "badge-yellow",
  },
  {
    year: "2022",
    title: "senior developer",
    description: "Assumed senior architectural responsibilities. Managed technical roadmaps, refactored hot paths, and directed front-to-back integrations.",
    icon: TrendingUp,
    badgeClass: "badge-green",
  },
  {
    year: "2023",
    title: "woow todo bien",
    description: "Joined WOOW Todo Bien. Designed digital insurance workflows, built chat layers, and improved active customer conversions.",
    icon: Building2,
    badgeClass: "badge-red",
  },
  {
    year: "2024",
    title: "chatea.la",
    description: "Launched Chatea.la. Structured resilient WhatsApp conversational agents that manage thousands of operations for Mexican retailers.",
    icon: Bot,
    badgeClass: "badge-blue",
  },
  {
    year: "2026",
    title: "founder os",
    description: "Shipping personal products (Chatea, Carti) and scaling robust digital automation layers as a senior solo engineer.",
    icon: Sparkles,
    badgeClass: "badge-green",
  },
];

export default function Journey() {
  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Subtle Warm Spot */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[5%] right-[10%] w-[500px] h-[500px] rounded-full bg-accent-bg/10 blur-[100px]" />
        <div className="absolute bottom-[20%] left-[5%] w-[400px] h-[400px] rounded-full bg-pastel-red-bg/8 blur-[90px]" />
      </div>

      {/* Hero */}
      <section className="pt-24 pb-20 px-6 lg:px-12 relative z-10 flex flex-col items-center justify-center min-h-[50vh] text-center">
        <div className="container mx-auto max-w-4xl flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4"
          >
            <span className="badge badge-blue">My Journey</span>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif text-text-primary tracking-tight leading-tight lowercase">
              from <span className="italic">curiosity</span> to <span className="italic">building products.</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 pb-32 px-6 lg:px-12 relative z-10">
        <div className="container mx-auto max-w-3xl">
          <div className="relative border-l border-border pl-6 ml-4 md:pl-10 md:ml-10 space-y-16">
            {milestones.map((milestone, i) => {
              const IconComponent = milestone.icon;
              return (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="relative group text-left"
                >
                  {/* Timeline dot */}
                  <div className="absolute -left-[35px] md:-left-[51px] top-1.5 flex items-center justify-center bg-background rounded-full border border-border w-6 h-6 md:w-8 md:h-8 group-hover:border-text-secondary transition-colors">
                    <IconComponent className="w-3.5 h-3.5 md:w-4.5 md:h-4.5 text-text-secondary" />
                  </div>
                  
                  {/* Content */}
                  <div>
                    <div className="mb-3">
                      <span className={`badge ${milestone.badgeClass}`}>
                        {milestone.year}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-text-primary tracking-tight mb-2 lowercase">
                      {milestone.title}
                    </h3>
                    
                    <p className="text-xs md:text-sm text-text-secondary leading-relaxed max-w-2xl font-normal">
                      {milestone.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 lg:px-12 bg-surface-alt border-t border-border-subtle relative z-10 text-center">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-serif tracking-tight text-text-primary mb-6 lowercase">
              the journey <span className="italic">continues.</span>
            </h2>
            <p className="text-text-secondary mb-8 max-w-md mx-auto text-xs md:text-sm leading-relaxed font-normal">
              Always scripting, always automating. Let&apos;s build clean, resilient developer experiences.
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
