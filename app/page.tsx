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

  /* ═══════════════════════════════════════════════════════════════════════════
     ECOSYSTEM LIVE TELEMETRY STATE
     ═══════════════════════════════════════════════════════════════════════════ */
  const [telemetry, setTelemetry] = useState({
    chateaHealth: "loading",
    cartiHealth: "loading",
    messagesProcessed: 148204,
    activeAgents: 6,
  });

  useEffect(() => {
    // Simulate real-time processed messages ticker
    const msgInterval = setInterval(() => {
      setTelemetry(prev => ({
        ...prev,
        messagesProcessed: prev.messagesProcessed + Math.floor(Math.random() * 3) + 1
      }));
    }, 4000);

    // Simulate async API ping connection state
    const healthTimeout = setTimeout(() => {
      setTelemetry(prev => ({
        ...prev,
        chateaHealth: "online",
        cartiHealth: "online"
      }));
    }, 1800);

    return () => {
      clearInterval(msgInterval);
      clearTimeout(healthTimeout);
    };
  }, []);

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
            className="text-base md:text-lg text-text-secondary max-w-lg mx-auto leading-relaxed mb-10 px-4"
          >
            Software Engineer based in CDMX. I build AI experiences and automations that make complex systems feel simple, organic, and friendly.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-3 justify-center w-full max-w-sm px-6"
          >
            <Link href="/work" className="w-full">
              <motion.button
                whileHover={{ scale: 1.01, y: -1 }}
                whileTap={{ scale: 0.99 }}
                className="w-full inline-flex items-center justify-center gap-2 h-12 bg-moss text-white rounded-xl font-medium shadow-xs transition-all hover:bg-moss-light cursor-pointer"
              >
                View my work
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>

            <Link href="/contact" className="w-full">
              <motion.button
                whileHover={{ scale: 1.01, y: -1 }}
                whileTap={{ scale: 0.99 }}
                className="w-full inline-flex items-center justify-center h-12 bg-surface text-text-primary rounded-xl font-medium border border-border hover:border-moss/40 transition-all cursor-pointer"
              >
                Get in touch
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
              className="relative w-full max-w-md mx-auto aspect-[9/16] rounded-[32px] bg-[#FAF8F5] dark:bg-[#121110] border border-border-subtle shadow-2xl overflow-hidden flex flex-col justify-between"
            >
              {/* Phone Header */}
              <div className="bg-surface dark:bg-surface text-text-primary px-5 pt-7 pb-4 flex items-center justify-between border-b border-border-subtle">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-moss/10 dark:bg-moss/20 flex items-center justify-center text-moss font-semibold text-xs">
                    OV
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-text-primary leading-none">Obed&apos;s Agent</h3>
                    <p className="text-[9px] text-text-muted mt-1 leading-none flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-moss" />
                      Active
                    </p>
                  </div>
                </div>
                <button 
                  onClick={resetChat}
                  className="text-[10px] text-text-muted hover:text-text-primary px-2.5 py-1 bg-surface-alt border border-border rounded-lg transition-colors cursor-pointer"
                >
                  Clear
                </button>
              </div>

              {/* Chat Log (Scrollable) */}
              <div className="flex-1 p-5 overflow-y-auto space-y-3.5 flex flex-col bg-[#FAF8F5] dark:bg-[#121110]">
                {messages.map((msg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.25 }}
                    className={`max-w-[85%] p-3.5 rounded-2xl text-xs relative leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-moss text-white self-end rounded-tr-none"
                        : "bg-surface text-text-primary self-start rounded-tl-none border border-border-subtle shadow-xs"
                    }`}
                  >
                    <p>{msg.text}</p>
                    <span className={`block text-[8px] mt-1.5 leading-none text-right ${
                      msg.sender === "user" ? "text-white/70" : "text-text-muted"
                    }`}>
                      {msg.time}
                    </span>
                  </motion.div>
                ))}

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-surface text-text-primary border border-border-subtle self-start rounded-2xl rounded-tl-none p-3.5 shadow-xs flex items-center gap-1 max-w-[80%]"
                  >
                    <span className="w-1.5 h-1.5 bg-moss rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-moss rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-moss rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </motion.div>
                )}
              </div>

              {/* Quick Reply Drawer (Horizontal Swipable List for perfect gestures!) */}
              <div className="bg-surface-alt dark:bg-surface border-t border-border-subtle p-4">
                <p className="text-[9px] text-text-muted uppercase font-bold tracking-wider mb-2.5 px-1">
                  Tap to ask:
                </p>
                <div className="flex gap-2 overflow-x-auto flex-nowrap scrollbar-none pb-1 -mx-1 px-1">
                  {!selectedQuickReplies.includes("chateala") && (
                    <button
                      onClick={() => handleQuickReply(
                        "Tell me about Chatea.la",
                        "Chatea.la is a resilient WhatsApp AI platform built for local Mexican operators. It structures messy inbound business text and coordinates lead captures, automatic calendars, and active databases.",
                        "chateala"
                      )}
                      className="flex-shrink-0 bg-surface hover:border-moss/50 border border-border px-3.5 py-2.5 rounded-full text-xs text-text-primary font-medium transition-all shadow-xs cursor-pointer"
                    >
                      ⚡️ Chatea.la
                    </button>
                  )}

                  {!selectedQuickReplies.includes("carti") && (
                    <button
                      onClick={() => handleQuickReply(
                        "What is Carti.app?",
                        "Carti.app is a WhatsApp assistant that translates spontaneous text and audio logs into instant financial tracking. It is a live agent that leverages conversational triggers to handle household accounting.",
                        "carti"
                      )}
                      className="flex-shrink-0 bg-surface hover:border-moss/50 border border-border px-3.5 py-2.5 rounded-full text-xs text-text-primary font-medium transition-all shadow-xs cursor-pointer"
                    >
                      🪙 Carti.app
                    </button>
                  )}

                  {!selectedQuickReplies.includes("about") && (
                    <button
                      onClick={() => handleQuickReply(
                        "Are you currently available?",
                        "Yes. Obed is available for premium consulting and architectural engineering. He enjoys helping startups structure robust agent workflows and clean React/Node integrations.",
                        "about"
                      )}
                      className="flex-shrink-0 bg-surface hover:border-moss/50 border border-border px-3.5 py-2.5 rounded-full text-xs text-text-primary font-medium transition-all shadow-xs cursor-pointer"
                    >
                      🤝 Availability
                    </button>
                  )}

                  {selectedQuickReplies.length >= 3 && (
                    <div className="text-center py-2 w-full flex-shrink-0">
                      <p className="text-[10px] text-moss font-semibold">Demo completed.</p>
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

          {/* Project Cards with Neobrutalist Touch */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Chatea.la",
                desc: "Conversational AI and lead automation SaaS for Mexican SMBs. Converts unstructured voice messages and texts into structured database leads.",
                tag: "SaaS",
                link: "https://chatea.la"
              },
              {
                title: "Carti.app",
                desc: "WhatsApp finance agent that parses spontaneous voice logs and texts into real-time household bookkeeping and expense tracking.",
                tag: "Private Beta",
                link: "https://carti.app"
              },
              {
                title: "StickyCovers",
                desc: "Custom credit card sticker customizer with MercadoPago checkout. Profitable personal e-commerce with built-in AI image generation.",
                tag: "Product",
                link: "https://stickycovers.cloud.obeskay.com"
              },
              {
                title: "Sello",
                desc: "Digital loyalty cards for local Mexican businesses. Replaces paper stamp cards with a WhatsApp-native QR checking flow.",
                tag: "Lab",
                link: "https://sello.cloud.obeskay.com"
              },
              {
                title: "Freela",
                desc: "AI matching engine and project scoping laboratory. Synthesizes complex client briefs into automated, precise developer proposals.",
                tag: "Lab",
                link: "https://freela.cloud.obeskay.com"
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

          {/* Ecosystem Live Telemetry Bento Widget */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12 p-6 md:p-8 rounded-3xl bg-surface border border-border-subtle shadow-xs hover:border-moss/30 transition-all flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-moss/2 pointer-events-none" />
            
            <div className="flex flex-col gap-1.5 text-left relative z-10">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-moss/10 text-[10px] font-bold text-moss uppercase tracking-wider w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-moss animate-ping" />
                Ecosystem Telemetry
              </span>
              <h3 className="text-xl font-bold text-text-primary mt-1">Live Systems Performance</h3>
              <p className="text-xs text-text-secondary">Real-time status, active AI workers, and transactional telemetry across my main SaaS builds.</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full md:w-auto relative z-10 shrink-0">
              {/* Telemetry Item 1: Messages Ticker */}
              <div className="p-4 bg-background/50 border border-border-subtle rounded-2xl flex flex-col justify-center text-left">
                <span className="text-[9px] font-bold text-text-muted uppercase tracking-wider">Processed</span>
                <span className="text-lg font-black text-text-primary tabular-nums mt-0.5">{telemetry.messagesProcessed.toLocaleString()}</span>
                <span className="text-[9px] text-moss font-semibold mt-1">▲ live incoming</span>
              </div>

              {/* Telemetry Item 2: Active AI Workers */}
              <div className="p-4 bg-background/50 border border-border-subtle rounded-2xl flex flex-col justify-center text-left">
                <span className="text-[9px] font-bold text-text-muted uppercase tracking-wider">AI Workers</span>
                <span className="text-lg font-black text-text-primary tabular-nums mt-0.5">{telemetry.activeAgents} active</span>
                <span className="text-[9px] text-text-muted mt-1">multi-agent loops</span>
              </div>

              {/* Telemetry Item 3: Chatea Health */}
              <div className="p-4 bg-background/50 border border-border-subtle rounded-2xl flex flex-col justify-center text-left">
                <span className="text-[9px] font-bold text-text-muted uppercase tracking-wider">Chatea.la</span>
                <span className={`text-sm font-bold mt-1.5 leading-none flex items-center gap-1.5 ${telemetry.chateaHealth === 'online' ? 'text-moss' : 'text-text-muted'}`}>
                  <span className={`w-2 h-2 rounded-full ${telemetry.chateaHealth === 'online' ? 'bg-moss animate-pulse' : 'bg-stone animate-pulse'}`} />
                  {telemetry.chateaHealth === 'online' ? 'ONLINE' : 'PINGING...'}
                </span>
                <span className="text-[9px] text-text-muted mt-2">v2.1.2 SaaS node</span>
              </div>

              {/* Telemetry Item 4: Carti.app Health */}
              <div className="p-4 bg-background/50 border border-border-subtle rounded-2xl flex flex-col justify-center text-left">
                <span className="text-[9px] font-bold text-text-muted uppercase tracking-wider">Carti.app</span>
                <span className={`text-sm font-bold mt-1.5 leading-none flex items-center gap-1.5 ${telemetry.cartiHealth === 'online' ? 'text-moss' : 'text-text-muted'}`}>
                  <span className={`w-2 h-2 rounded-full ${telemetry.cartiHealth === 'online' ? 'bg-moss animate-pulse' : 'bg-stone animate-pulse'}`} />
                  {telemetry.cartiHealth === 'online' ? 'ONLINE' : 'PINGING...'}
                </span>
                <span className="text-[9px] text-text-muted mt-2">SQLite queue node</span>
              </div>
            </div>
          </motion.div>
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
