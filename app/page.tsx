"use client";

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Clock, MessageSquare, Send, Sparkles, User, MapPin } from "lucide-react";
import { useRef, useState, useEffect } from "react";

/* ═══════════════════════════════════════════════════════════════════════════
   TYPES & CONTEXTS
   ═══════════════════════════════════════════════════════════════════════════ */
interface ChatMessage {
  sender: "user" | "bot";
  text: string;
  time: string;
}

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  /* ═══════════════════════════════════════════════════════════════════════════
     CDMX REAL-TIME CLOCK & STATUS WIDGET
     ═══════════════════════════════════════════════════════════════════════════ */
  const [cdmxTime, setCdmxTime] = useState("");
  const [cdmxStatus, setCdmxStatus] = useState({ text: "Active & Shipping", color: "bg-moss" });

  useEffect(() => {
    const updateTime = () => {
      const options = {
        timeZone: "America/Mexico_City",
        hour: "numeric" as const,
        minute: "numeric" as const,
        second: "numeric" as const,
        hour12: true,
      };
      
      const formatter = new Intl.DateTimeFormat("en-US", options);
      const parts = formatter.formatToParts(new Date());
      const hourPart = parts.find(p => p.type === "hour");
      const minPart = parts.find(p => p.type === "minute");
      const dayPeriod = parts.find(p => p.type === "dayPeriod");
      
      if (hourPart && minPart && dayPeriod) {
        setCdmxTime(`${hourPart.value}:${minPart.value} ${dayPeriod.value}`);
        
        const hour24 = new Date().toLocaleTimeString("en-US", {
          timeZone: "America/Mexico_City",
          hour12: false,
        }).split(":")[0];
        
        const numericHour = parseInt(hour24, 10);
        
        if (numericHour >= 8 && numericHour < 19) {
          setCdmxStatus({ text: "Active & Shipping", color: "bg-moss" });
        } else if (numericHour >= 19 && numericHour < 24) {
          setCdmxStatus({ text: "Chilling & Coding", color: "bg-terracotta" });
        } else {
          setCdmxStatus({ text: "Sleeping / Off the grid", color: "bg-stone" });
        }
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  /* ═══════════════════════════════════════════════════════════════════════════
     INTERACTIVE WHATSAPP SIMULATOR STATE
     ═══════════════════════════════════════════════════════════════════════════ */
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: "bot",
      text: "¡Hola! I am Obed's Agent Bot. I run on his multi-agent architecture. What would you like to explore today?",
      time: "Just now",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedQuickReplies, setSelectedQuickReplies] = useState<string[]>([]);

  const handleQuickReply = (text: string, response: string, category: string) => {
    if (isTyping) return;
    
    // Add user message
    const newMsgUser: ChatMessage = {
      sender: "user",
      text,
      time: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true }),
    };
    
    setMessages(prev => [...prev, newMsgUser]);
    setSelectedQuickReplies(prev => [...prev, category]);
    setIsTyping(true);

    // Simulate agent processing time
    setTimeout(() => {
      setIsTyping(false);
      const newMsgBot: ChatMessage = {
        sender: "bot",
        text: response,
        time: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true }),
      };
      setMessages(prev => [...prev, newMsgBot]);
    }, 1500);
  };

  const resetChat = () => {
    setMessages([
      {
        sender: "bot",
        text: "¡Hola! Let's start fresh. Pick a topic to see how I help businesses automate communication.",
        time: "Just now",
      },
    ]);
    setSelectedQuickReplies([]);
  };

  return (
    <main className="min-h-screen relative overflow-hidden bg-background">
      {/* Dynamic Background Organic Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-20 right-[15%] w-[450px] h-[450px] bg-moss/8 rounded-full blur-[90px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-40 left-[10%] w-[350px] h-[350px] bg-terracotta/6 rounded-full blur-[70px] animate-pulse" style={{ animationDuration: '10s' }} />
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════════
         HERO SECTION
         ═══════════════════════════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-[85vh] flex items-center justify-center px-6 lg:px-12 z-10"
      >
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative container mx-auto max-w-4xl text-center flex flex-col items-center"
        >
          {/* Status Badge with Mexico City Time */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8 flex flex-col sm:flex-row items-center gap-3 bg-surface border border-border-subtle rounded-[20px] sm:rounded-full px-5 py-2 shadow-sm"
          >
            <span className="flex items-center gap-2 text-xs font-semibold text-text-secondary">
              <span className={`w-2.5 h-2.5 rounded-full ${cdmxStatus.color} animate-pulse`} />
              {cdmxStatus.text}
            </span>
            <span className="hidden sm:inline text-text-muted">|</span>
            <span className="flex items-center gap-1.5 text-xs text-text-muted">
              <Clock className="w-3.5 h-3.5" />
              CDMX • {cdmxTime || "CST"}
            </span>
          </motion.div>

          {/* Main Heading with Hand-Drawn SVG Squiggle */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mb-8 text-center"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-text-primary tracking-tight leading-none">
              Building
            </h1>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-text-primary tracking-tight leading-none mt-2 relative inline-block">
              products that{" "}
              <span className="relative inline-block font-display italic font-normal text-text-primary">
                work
                {/* Hand-drawn SVG highlight underline */}
                <svg
                  className="absolute left-0 -bottom-2 w-full h-3 text-terracotta z-10 overflow-visible"
                  viewBox="0 0 100 10"
                  preserveAspectRatio="none"
                  fill="none"
                >
                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 1, duration: 1.2, ease: "easeOut" }}
                    d="M3 5 C 20 2, 40 7, 97 4 C 80 8, 40 3, 10 7"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-lg md:text-xl text-text-secondary max-w-xl mx-auto leading-relaxed mb-12"
          >
            Senior Software Engineer based in Mexico City. I design AI-powered
            experiences and developer automation that make complex systems feel simple, organic, and friendly.
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
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-moss text-white rounded-full font-medium shadow-md transition-all hover:bg-moss-light"
              >
                View my work
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>

            <Link href="/about">
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center px-6 py-3 bg-surface text-text-primary rounded-full font-medium border border-border hover:border-moss/50 shadow-sm transition-all"
              >
                About me
              </motion.button>
            </Link>

            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center px-6 py-3 bg-transparent text-text-primary rounded-full font-medium border border-border hover:border-moss/50 transition-all"
              >
                Contact
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════════
         INTERACTIVE WHATSAPP AGENT PREVIEW (SPECIAL TOUCH)
         ═══════════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 lg:px-12 bg-background border-t border-border-subtle relative z-10">
        <div className="container mx-auto max-w-5xl">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
            {/* Context Left */}
            <div>
              <p className="text-xs font-semibold text-moss uppercase tracking-wider mb-3">
                Live Demonstration
              </p>
              <h2 className="text-3xl md:text-5xl text-text-primary tracking-tight mb-6">
                Interactive{" "}
                <span className="font-display italic font-normal text-terracotta">
                  agent
                </span>{" "}
                workflow
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                Most AI solutions sound abstract. I design active, production-ready WhatsApp interfaces like{" "}
                <strong className="text-text-primary font-semibold">Chatea.la</strong> and{" "}
                <strong className="text-text-primary font-semibold">Carti.app</strong> that turn casual voice messages or text into structured actions.
              </p>
              
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="p-2 bg-moss/10 text-moss rounded-lg h-fit">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-primary text-sm">Resilient Webhooks</h4>
                    <p className="text-xs text-text-muted mt-0.5">Designed to withstand rate-limiting and handle context-driven memory states.</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="p-2 bg-terracotta/10 text-terracotta rounded-lg h-fit">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-primary text-sm">Human in the Loop</h4>
                    <p className="text-xs text-text-muted mt-0.5">Smooth handover channels that let operators step in when complex needs arise.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Frame Right */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative w-full max-w-md mx-auto aspect-[9/16] rounded-[36px] bg-[#FAF7F0] dark:bg-[#151312] border-8 border-charcoal/95 dark:border-stone-900 shadow-2xl overflow-hidden flex flex-col justify-between"
            >
              {/* Phone Header */}
              <div className="bg-[#128C7E] dark:bg-[#202c33] text-white px-4 pt-8 pb-3.5 flex items-center justify-between shadow-md">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center font-display italic font-bold">
                    OV
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold leading-none text-white">Obed&apos;s Agent</h3>
                    <p className="text-[10px] text-white/80 mt-1 leading-none flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      online
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={resetChat}
                    className="text-xs bg-white/10 hover:bg-white/20 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                  >
                    Reset
                  </button>
                </div>
              </div>

              {/* Chat Log (Scrollable) */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3 flex flex-col bg-[#efeae2] dark:bg-[#0b141a]">
                {messages.map((msg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className={`max-w-[80%] p-3 rounded-2xl text-xs relative ${
                      msg.sender === "user"
                        ? "bg-[#d9fdd3] dark:bg-[#005c4b] text-[#111b21] dark:text-[#e9edef] self-end rounded-tr-none"
                        : "bg-white dark:bg-[#202c33] text-[#111b21] dark:text-[#e9edef] self-start rounded-tl-none shadow-sm"
                    }`}
                  >
                    <p className="leading-relaxed">{msg.text}</p>
                    <span className="block text-[8px] text-text-muted text-right mt-1.5 leading-none">
                      {msg.time}
                    </span>
                  </motion.div>
                ))}

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-[#202c33] text-[#111b21] dark:text-[#e9edef] self-start rounded-2xl rounded-tl-none p-3 shadow-sm flex items-center gap-1 max-w-[80%]"
                  >
                    <span className="w-1.5 h-1.5 bg-stone rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-stone rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-stone rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </motion.div>
                )}
              </div>

              {/* Quick Reply Drawer / Inputs */}
              <div className="bg-[#f0f2f5] dark:bg-[#1f2c34] p-3 border-t border-stone-200/50 dark:border-stone-800">
                <p className="text-[10px] text-text-muted uppercase font-bold tracking-wider mb-2.5 px-1">
                  Choose a Quick Option:
                </p>
                <div className="flex flex-col gap-1.5">
                  {!selectedQuickReplies.includes("chateala") && (
                    <button
                      onClick={() => handleQuickReply(
                        "Tell me about Chatea.la",
                        "Chatea.la is a resilient WhatsApp AI platform built for local Mexican operators. It structures messy inbound business text and coordinates lead captures, automatic calendars, and active databases.",
                        "chateala"
                      )}
                      className="w-full text-left bg-white dark:bg-[#202c33] border border-stone-200/60 dark:border-stone-800 hover:border-moss/50 p-2.5 rounded-xl text-xs text-text-primary font-medium transition-all shadow-xs flex items-center justify-between cursor-pointer group"
                    >
                      <span>⚡️ Show me Chatea.la</span>
                      <ArrowRight className="w-3.5 h-3.5 text-text-muted group-hover:text-moss group-hover:translate-x-0.5 transition-all" />
                    </button>
                  )}

                  {!selectedQuickReplies.includes("carti") && (
                    <button
                      onClick={() => handleQuickReply(
                        "What is Carti.app?",
                        "Carti.app is a WhatsApp assistant that translates spontaneous text and audio logs into instant financial tracking. It is a live agent that leverages conversational triggers to handle household accounting.",
                        "carti"
                      )}
                      className="w-full text-left bg-white dark:bg-[#202c33] border border-stone-200/60 dark:border-stone-800 hover:border-moss/50 p-2.5 rounded-xl text-xs text-text-primary font-medium transition-all shadow-xs flex items-center justify-between cursor-pointer group"
                    >
                      <span>🪙 Tell me about Carti.app</span>
                      <ArrowRight className="w-3.5 h-3.5 text-text-muted group-hover:text-moss group-hover:translate-x-0.5 transition-all" />
                    </button>
                  )}

                  {!selectedQuickReplies.includes("about") && (
                    <button
                      onClick={() => handleQuickReply(
                        "Are you currently available?",
                        "Yes. Obed is available for premium consulting and architectural engineering. He enjoys helping startups structure robust agent workflows and clean React/Node integrations.",
                        "about"
                      )}
                      className="w-full text-left bg-white dark:bg-[#202c33] border border-stone-200/60 dark:border-stone-800 hover:border-moss/50 p-2.5 rounded-xl text-xs text-text-primary font-medium transition-all shadow-xs flex items-center justify-between cursor-pointer group"
                    >
                      <span>🤝 Availability & Projects</span>
                      <ArrowRight className="w-3.5 h-3.5 text-text-muted group-hover:text-moss group-hover:translate-x-0.5 transition-all" />
                    </button>
                  )}

                  {selectedQuickReplies.length >= 3 && (
                    <div className="text-center py-2">
                      <p className="text-[10px] text-moss font-semibold">Demo finished. Tap Reset to start over.</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════════
         FEATURED WORK
         ═══════════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 lg:px-12 bg-surface-alt border-t border-border-subtle relative z-10">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
          >
            <div>
              <p className="text-xs font-semibold text-moss uppercase tracking-wider mb-3">
                Selected Work
              </p>
              <h2 className="text-4xl md:text-5xl text-text-primary tracking-tight">
                Featured projects
              </h2>
            </div>
            <Link
              href="/work"
              className="inline-flex items-center gap-2 text-text-primary font-medium hover:text-moss transition-colors group"
            >
              Explore all
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>

          {/* Project Cards with Warm Touch */}
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Chatea.la",
                desc: "WhatsApp AI lead-capture and auto-scheduling SaaS. Powering active customer communication for Mexican SMBs, transforming raw conversations into structured CRM database records. Cash-flowing with solid MRR.",
                tag: "SaaS",
                link: "https://chatea.la"
              },
              {
                title: "StickyCovers",
                desc: "E-commerce de stickers para tarjetas en CDMX. Creador de stickers con IA, bundles con optimización de ticket promedio (AOV), checkout con MercadoPago, suscripción StickyClub, e email marketing con Resend. Rentable y EBITDA positivo.",
                tag: "Product",
                link: "https://stickycovers.cloud.obeskay.com"
              },
              {
                title: "Freela",
                desc: "AI-native matching prototype and scoping engine. A validation lab engineered to test automatic brief synthesis, freelance proposal pipelines, and project routing.",
                tag: "Lab",
                link: "https://freela.cloud.obeskay.com"
              },
              {
                title: "SwarmVille",
                desc: "Real-time 2D visualization agent environment mapping how autonomous multi-agent swarms coordinate and execute complex tasks.",
                tag: "Open Source",
                link: "https://github.com/obeskay/swarm-ville"
              }
            ].map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <a 
                  href={project.link} 
                  target={project.link.startsWith("http") ? "_blank" : undefined}
                  rel={project.link.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  <motion.div
                    whileHover={{ y: -6 }}
                    className="group card h-full cursor-pointer bg-surface hover:border-moss/40 shadow-xs hover:shadow-md transition-all duration-300 relative overflow-hidden"
                  >
                    <span className="inline-block px-3 py-1 bg-surface-alt text-xs font-semibold text-moss rounded-full mb-4 border border-border-subtle">
                      {project.tag}
                    </span>
                    <h3 className="text-xl font-semibold text-text-primary mb-2 group-hover:text-moss transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-text-secondary leading-relaxed text-sm">{project.desc}</p>
                  </motion.div>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════════
         SKILLS SECTION
         ═══════════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 lg:px-12 bg-background relative z-10">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-xs font-semibold text-moss uppercase tracking-wider mb-3">
              Expertise
            </p>
            <h2 className="text-4xl md:text-5xl text-text-primary tracking-tight">
              Core stack
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
                className="group p-5 bg-surface rounded-xl border border-border-subtle hover:border-moss/40 transition-all cursor-default text-center shadow-xs"
              >
                <p className="font-semibold text-text-primary group-hover:text-moss transition-colors">
                  {skill}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════════
         FOOTER
         ═══════════════════════════════════════════════════════════════════════════ */}
      <footer className="py-12 px-6 lg:px-12 border-t border-border-subtle bg-surface-alt relative z-10">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-muted">
            <p>© {new Date().getFullYear()} Obed Vargas</p>
            <p className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              Mexico City, Mexico
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
