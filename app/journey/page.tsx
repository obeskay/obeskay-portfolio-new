"use client";

import { motion } from "framer-motion";

const milestones = [
  {
    year: "2018",
    title: "Started Coding",
    description: "Wrote my first lines of code. Fell in love with building things.",
    icon: "💻",
  },
  {
    year: "2020",
    title: "First Job",
    description: "Landed my first developer role. Learned production patterns.",
    icon: "🚀",
  },
  {
    year: "2022",
    title: "Senior Developer",
    description: "Promoted to Senior Engineer. Leading teams and architecture.",
    icon: "📈",
  },
  {
    year: "2023",
    title: "WOOW Todo Bien",
    description: "Joined WOOW Todo Bien. Transforming insurance with AI.",
    icon: "🏢",
  },
  {
    year: "2024",
    title: "Chatea.la",
    description: "Founded Chatea.la. Building AI agents for WhatsApp automation.",
    icon: "🤖",
  },
  {
    year: "2026",
    title: "The Future",
    description: "Continuing to push boundaries. Building products that matter.",
    icon: "✨",
  },
];

export default function Journey() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="py-32 px-6 lg:px-12 bg-surface relative overflow-hidden">
        {/* Background accent */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/15 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="container mx-auto max-w-6xl relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-sm font-medium text-primary uppercase tracking-[0.15em] mb-3 letter-wide">
              My Journey
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-foreground leading-display">
              From <span className="font-display italic font-normal">curiosity</span> to{" "}
              <span className="font-display italic font-normal">building</span> products
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-32 px-6 lg:px-12">
        <div className="container mx-auto max-w-4xl">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-border hidden md:block" />
            
            {milestones.map((milestone, i) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`relative py-12 md:py-16 ${
                  i % 2 === 0 ? 'md:text-left md:pr-16' : 'md:text-right md:pl-16'
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-8 top-1/2 -translate-y-1/2 md:left-1/2 md:-translate-x-1/2">
                  <div className="w-4 h-4 rounded-full bg-accent shadow-lg shadow-accent/30" />
                </div>
                
                {/* Content */}
                <div className="ml-16 md:ml-0 pl-8 md:pl-0">
                  <span className="inline-block px-4 py-1.5 bg-primary text-primary-foreground text-sm font-medium rounded-full mb-4">
                    {milestone.year}
                  </span>
                  <h3 className="text-2xl font-semibold text-foreground mb-3 flex items-center gap-3">
                    <span className="text-3xl">{milestone.icon}</span>
                    {milestone.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed max-w-lg">
                    {milestone.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 lg:px-12 bg-primary">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-3xl md:text-4xl font-semibold text-primary-foreground mb-6">
              The journey <span className="font-display italic font-normal">continues</span>
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto leading-relaxed">
              Always learning, always building. Let's create something amazing together.
            </p>
            <a
              href="mailto:obeskay.mail@gmail.com"
              className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-accent-foreground rounded-full font-medium hover:shadow-lg hover:shadow-accent/40 transition-all"
            >
              Get in touch
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
