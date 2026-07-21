"use client";

import { motion, AnimatePresence, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, MessageSquare, Sparkles, MapPin } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import ProjectCard, { Project } from "./components/ProjectCard";

// TYPES & CONTEXTS
interface ChatMessage {
  sender: "user" | "bot";
  text: string;
  time: string;
}

const springTransition = { type: "spring" as const, stiffness: 380, damping: 30 };

// Animated counter that counts up when scrolled into view
function AnimatedCounter({ to, suffix = "", duration = 1.4 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / (duration * 1000), 1);
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      setDisplay(Math.round(eased * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  return (
    <span ref={ref}>
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}

const allProjects: Project[] = [
  {
    id: "chateala",
    title: "Chatea.la",
    description: "WhatsApp AI & lead capture SaaS. Converts unstructured audio/text into synced calendar bookings and CRM records.",
    category: "Product",
    image: "/projects/chateala.png",
    url: "https://chatea.la"
  },
  {
    id: "carti",
    title: "Carti.app",
    description: "WhatsApp finance agent parsing spontaneous voice clips into instant ledger entries and budgets.",
    category: "Product",
    image: "/projects/carti.png",
    status: "Private beta",
    url: "https://carti.app"
  },
  {
    id: "sello",
    title: "Sello",
    description: "WhatsApp-native digital loyalty cards replacing paper stamp cards with instant QR check-ins.",
    category: "Lab",
    image: "/projects/sello.png",
    status: "Live pilot",
    url: "https://sello.cloud.obeskay.com"
  },
  {
    id: "freela",
    title: "Freela",
    description: "AI project scoping tool translating vague client briefs into deliverables and timelines.",
    category: "Lab",
    image: "/brand-guides/freela-brand-guide.png",
    status: "Prototype",
    url: "https://freela.cloud.obeskay.com"
  },
  {
    id: "stickycovers",
    title: "StickyCovers",
    description: "Custom card skin canvas with AI asset generator and MercadoPago automated checkout.",
    category: "Product",
    image: "/brand-guides/stickycovers-brand-guide.png",
    url: "https://stickycovers.cloud.obeskay.com"
  },
  {
    id: "lottie-skill",
    title: "Lottie Animator",
    description: "Agent skill generating production-ready Lottie animations directly from SVG vectors.",
    category: "Open Source",
    image: "/projects/lottie-skill.png",
    stars: 3,
    url: "https://github.com/obeskay/lottie-animator-skill"
  }
];

const categories = ["All", "Product", "Lab", "Open Source"] as const;
type Category = typeof categories[number];

export default function Home() {
  const [activeTab, setActiveTab] = useState<Category>("All");
  const [cdmxStatus, setCdmxStatus] = useState({ text: "Open to select work", color: "bg-[#00a896]" });

  useEffect(() => {
    const updateTime = () => {
      const hour24 = new Date().toLocaleTimeString("en-US", {
        timeZone: "America/Mexico_City",
        hour12: false,
      }).split(":")[0];
      const numericHour = parseInt(hour24, 10);

      if (numericHour >= 8 && numericHour < 19) {
        setCdmxStatus({ text: "Open to select work", color: "bg-[#00a896]" });
      } else if (numericHour >= 19 && numericHour < 24) {
        setCdmxStatus({ text: "Wrapping up for today", color: "bg-[#008698]" });
      } else {
        setCdmxStatus({ text: "Off the grid / Resting", color: "bg-[#4a7c78]" });
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // INTERACTIVE WHATSAPP SIMULATOR STATE
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: "bot",
      text: "¡Hola! I am Obed's Agent Worker. Explore how I translate unstructured messages into deterministic data layers.",
      time: "Just now",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedQuickReplies, setSelectedQuickReplies] = useState<string[]>([]);

  // TELEMETRY STATE
  const [telemetry, setTelemetry] = useState({
    chateaHealth: "online",
    cartiHealth: "online",
    messagesProcessed: 148204,
    activeAgents: 6,
  });

  useEffect(() => {
    const msgInterval = setInterval(() => {
      setTelemetry(prev => ({
        ...prev,
        messagesProcessed: prev.messagesProcessed + Math.floor(Math.random() * 3) + 1
      }));
    }, 3500);

    return () => clearInterval(msgInterval);
  }, []);

  const handleQuickReply = (text: string, response: string, category: string) => {
    if (isTyping) return;
    
    const newMsgUser: ChatMessage = {
      sender: "user",
      text,
      time: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true }),
    };
    
    setMessages(prev => [...prev, newMsgUser]);
    setSelectedQuickReplies(prev => [...prev, category]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const newMsgBot: ChatMessage = {
        sender: "bot",
        text: response,
        time: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true }),
      };
      setMessages(prev => [...prev, newMsgBot]);
    }, 1000);
  };

  const resetChat = () => {
    setMessages([
      {
        sender: "bot",
        text: "¡Hola! Choose a topic below to test the agent engine.",
        time: "Just now",
      },
    ]);
    setSelectedQuickReplies([]);
  };

  // CURSOR SPOTLIGHT
  const heroRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);
  const springX = useSpring(mouseX, { stiffness: 120, damping: 25, mass: 0.4 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 25, mass: 0.4 });
  const spotlightX = useTransform(springX, (v) => `${v}px`);
  const spotlightY = useTransform(springY, (v) => `${v}px`);

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleHeroMouseLeave = () => {
    mouseX.set(-1000);
    mouseY.set(-1000);
  };

  const filteredProjects = activeTab === "All"
    ? allProjects
    : allProjects.filter(p => p.category === activeTab);

  return (
    <main className="min-h-screen relative overflow-hidden bg-background">
      {/* Background Accent */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[10%] right-[10%] w-[500px] h-[500px] rounded-full bg-accent-bg/15 blur-[120px]" />
        <div className="absolute bottom-[20%] left-[5%] w-[400px] h-[400px] rounded-full bg-pastel-teal-bg/30 blur-[100px]" />
      </div>

      {/* HERO SECTION */}
      <section
        ref={heroRef}
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={handleHeroMouseLeave}
        className="relative pt-24 pb-24 md:py-32 px-6 lg:px-12 z-10 flex flex-col items-center justify-center min-h-[70vh]"
      >
        <motion.div
          aria-hidden
          className="pointer-events-none absolute z-0 h-[420px] w-[420px] rounded-full opacity-60"
          style={{
            left: spotlightX,
            top: spotlightY,
            x: "-50%",
            y: "-50%",
            background: "radial-gradient(circle, rgba(2,195,154,0.18) 0%, rgba(0,134,152,0.08) 35%, rgba(255,255,255,0) 70%)",
          }}
        />
        <div className="relative container mx-auto max-w-4xl text-center flex flex-col items-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-6 inline-flex items-center gap-2 bg-surface border border-border rounded-full px-3.5 py-1.5 shadow-xs"
          >
            <span className={`w-1.5 h-1.5 rounded-full ${cdmxStatus.color} animate-pulse`} />
            <span className="text-[10px] font-mono font-semibold text-text-secondary uppercase tracking-wider">
              {cdmxStatus.text}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6 text-center w-full max-w-5xl"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-text-primary tracking-tight leading-[1.02] lowercase w-full max-w-5xl mx-auto">
              building <span className="italic">products that work.</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm md:text-base text-text-secondary max-w-lg mx-auto leading-relaxed mb-8 px-4 font-normal"
          >
            AI Lead @ Grupo Promass. Building WhatsApp platforms & dev tools in CDMX.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3 justify-center w-full max-w-xs px-4"
          >
            <Link href="/work" className="w-full">
              <button className="btn-primary w-full whitespace-nowrap">
                view work
                <ArrowRight className="w-3.5 h-3.5 shrink-0" />
              </button>
            </Link>

            <Link href="/contact" className="w-full">
              <button className="btn-secondary w-full whitespace-nowrap">
                contact
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* METRICS STRIP */}
      <section className="py-12 px-6 lg:px-12 bg-surface border-y border-border-subtle relative z-10">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
            {[
              { value: <AnimatedCounter to={6} suffix="+" />, label: "Years building", accent: "text-teal-primary" },
              { value: <AnimatedCounter to={12} suffix="+" />, label: "Products shipped", accent: "text-teal-secondary" },
              { value: <AnimatedCounter to={148} suffix="K" />, label: "Messages processed", accent: "text-teal-accent" },
              { value: <AnimatedCounter to={6} />, label: "AI agents live", accent: "text-teal-primary" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="text-center md:border-r md:border-border-subtle md:last:border-r-0"
              >
                <p className={`text-3xl md:text-4xl font-serif tracking-tight ${stat.accent} leading-none`}>
                  {stat.value}
                </p>
                <p className="mt-2 text-[10px] font-mono font-semibold uppercase tracking-wider text-text-muted">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* INTERACTIVE WHATSAPP AGENT PREVIEW */}
      <section className="py-20 px-6 lg:px-12 bg-surface-alt relative z-10">
        <div className="container mx-auto max-w-5xl">
          <div className="grid lg:grid-cols-[1fr_0.9fr] gap-10 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif tracking-tight text-text-primary mb-4 lowercase">
                conversational <span className="italic">agent engines</span>
              </h2>
              <p className="text-text-secondary leading-relaxed text-sm mb-6 font-normal">
                I design resilient WhatsApp interfaces like <strong className="text-text-primary font-medium">Chatea.la</strong> and <strong className="text-text-primary font-medium">Carti.app</strong> that translate raw audio clips or short text into structured, deterministic database layers.
              </p>
              
              <div className="space-y-4">
                <div className="flex gap-3 items-start">
                  <div className="p-1.5 bg-pastel-teal-bg text-teal-primary rounded-md h-fit border border-border shrink-0 mt-0.5">
                    <Sparkles className="w-4 h-4 shrink-0" />
                  </div>
                  <div>
                    <h4 className="font-sans font-semibold text-text-primary text-xs tracking-tight">Structured State Workflows</h4>
                    <p className="text-xs text-text-muted leading-relaxed">Handling webhook streams, rate-limiting, and state continuity.</p>
                  </div>
                </div>
                
                <div className="flex gap-3 items-start">
                  <div className="p-1.5 bg-pastel-blue-bg text-pastel-blue-fg rounded-md h-fit border border-border shrink-0 mt-0.5">
                    <MessageSquare className="w-4 h-4 shrink-0" />
                  </div>
                  <div>
                    <h4 className="font-sans font-semibold text-text-primary text-xs tracking-tight">Operator Handover Loops</h4>
                    <p className="text-xs text-text-muted leading-relaxed">Deterministic fallback triggers when human intervention is required.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Frame */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="window-chrome relative w-full max-w-sm mx-auto aspect-[9/14] flex flex-col justify-between"
            >
              <div className="window-header justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="window-dot" />
                  <div className="window-dot" />
                  <div className="window-dot" />
                  <span className="text-[10px] font-mono text-text-muted uppercase ml-2 tracking-wider">agent_runtime_v3</span>
                </div>
                <button onClick={resetChat} className="text-[9px] font-mono text-pastel-red-fg px-2.5 py-0.5 bg-pastel-red-bg border border-border rounded-full hover:opacity-85 transition-opacity whitespace-nowrap">
                  reset
                </button>
              </div>

              <div className="flex-1 p-4 overflow-y-auto space-y-3 flex flex-col bg-surface">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`max-w-[88%] p-3 rounded-lg text-xs leading-relaxed border ${
                      msg.sender === "user"
                        ? "bg-pastel-blue-bg border-pastel-blue-fg/20 text-text-primary self-end"
                        : "bg-surface-alt border-border text-text-primary self-start"
                    }`}
                  >
                    <p>{msg.text}</p>
                    <span className="block text-[8px] mt-1 text-right text-text-muted leading-none">
                      {msg.time}
                    </span>
                  </div>
                ))}

                {isTyping && (
                  <div className="bg-surface-alt border border-border self-start rounded-lg p-2.5 flex items-center gap-1 max-w-[80%]">
                    <span className="w-1.5 h-1.5 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                )}
              </div>

              <div className="bg-surface-alt border-t border-border p-3">
                <div className="flex gap-2 overflow-x-auto flex-nowrap scrollbar-none pb-1">
                  {!selectedQuickReplies.includes("chateala") && (
                    <button onClick={() => handleQuickReply("Tell me about Chatea.la", "Chatea.la automates WhatsApp lead qualification, calendar booking, and CRM synchronization for Mexican businesses.", "chateala")} className="flex-shrink-0 bg-surface hover:bg-surface-alt border border-border px-3 py-1.5 rounded-md text-xs font-medium text-text-secondary hover:text-text-primary transition-colors whitespace-nowrap">
                      chatea.la
                    </button>
                  )}

                  {!selectedQuickReplies.includes("carti") && (
                    <button onClick={() => handleQuickReply("What is Carti.app?", "Carti.app parses WhatsApp voice notes and receipts into instant expense entries and budget balances.", "carti")} className="flex-shrink-0 bg-surface hover:bg-surface-alt border border-border px-3 py-1.5 rounded-md text-xs font-medium text-text-secondary hover:text-text-primary transition-colors whitespace-nowrap">
                      carti.app
                    </button>
                  )}

                  {!selectedQuickReplies.includes("about") && (
                    <button onClick={() => handleQuickReply("Are you available for projects?", "Yes. Obed provides architectural advisory, agentic workflows, and high-performance TypeScript integrations.", "about")} className="flex-shrink-0 bg-surface hover:bg-surface-alt border border-border px-3 py-1.5 rounded-md text-xs font-medium text-text-secondary hover:text-text-primary transition-colors whitespace-nowrap">
                      availability
                    </button>
                  )}

                  {selectedQuickReplies.length >= 3 && (
                    <div className="py-1 text-center w-full flex-shrink-0">
                      <p className="text-[10px] font-mono text-pastel-green-fg uppercase font-semibold">Demo complete.</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FEATURED WORK WITH ANIMATED TABS */}
      <section className="py-20 px-6 lg:px-12 bg-background border-t border-border-subtle relative z-10">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <div>
              <span className="badge badge-green mb-3">Selected Work</span>
              <h2 className="text-3xl md:text-4xl font-serif tracking-tight text-text-primary lowercase">
                featured <span className="italic">systems & apps</span>
              </h2>
            </div>

            {/* Filter Tabs using layoutId */}
            <div className="flex items-center gap-1.5 bg-surface border border-border p-1 rounded-lg w-fit">
              {categories.map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className="relative px-3 py-1 text-xs font-mono font-medium transition-colors select-none cursor-pointer"
                  >
                    <span className={`relative z-10 ${isActive ? "text-teal-primary font-semibold" : "text-text-muted hover:text-text-primary"}`}>
                      {tab}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="home-filter-pill"
                        className="absolute inset-0 bg-pastel-teal-bg border border-teal-secondary/30 rounded-md shadow-xs"
                        style={{ zIndex: 0 }}
                        transition={springTransition}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Project Cards Grid with Framer Motion layout morphing */}
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ECOSYSTEM LIVE TELEMETRY BENTO */}
      <section className="py-16 px-6 lg:px-12 bg-surface border-t border-border-subtle relative z-10">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="p-6 md:p-8 rounded-lg bg-surface-alt border border-border shadow-xs flex flex-col lg:flex-row items-center justify-between gap-6"
          >
            <div className="flex flex-col gap-1 text-left">
              <span className="badge badge-green w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00a896] animate-ping" />
                Live Performance
              </span>
              <h3 className="text-lg font-semibold text-text-primary mt-2">Systems Telemetry</h3>
              <p className="text-xs text-text-secondary leading-relaxed font-normal">Real-time stats across active production nodes.</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full lg:w-auto shrink-0">
              <div className="p-3.5 bg-surface border border-border rounded-lg text-left">
                <span className="text-[9px] font-mono font-semibold text-text-muted uppercase tracking-wider">Processed</span>
                <span className="text-base font-mono font-semibold text-text-primary block mt-1">{telemetry.messagesProcessed.toLocaleString()}</span>
                <span className="text-[9px] font-mono text-pastel-green-fg uppercase font-semibold">▲ live</span>
              </div>

              <div className="p-3.5 bg-surface border border-border rounded-lg text-left">
                <span className="text-[9px] font-mono font-semibold text-text-muted uppercase tracking-wider">AI Workers</span>
                <span className="text-base font-mono font-semibold text-text-primary block mt-1">{telemetry.activeAgents} active</span>
                <span className="text-[9px] font-mono text-text-muted uppercase font-semibold">loops</span>
              </div>

              <div className="p-3.5 bg-surface border border-border rounded-lg text-left">
                <span className="text-[9px] font-mono font-semibold text-text-muted uppercase tracking-wider">Chatea.la</span>
                <span className="text-[10px] font-mono font-semibold text-pastel-green-fg block mt-1.5 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00a896] animate-pulse" />
                  ONLINE
                </span>
                <span className="text-[8px] font-mono text-text-muted uppercase block mt-1">SaaS node</span>
              </div>

              <div className="p-3.5 bg-surface border border-border rounded-lg text-left">
                <span className="text-[9px] font-mono font-semibold text-text-muted uppercase tracking-wider">Carti.app</span>
                <span className="text-[10px] font-mono font-semibold text-pastel-green-fg block mt-1.5 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00a896] animate-pulse" />
                  ONLINE
                </span>
                <span className="text-[8px] font-mono text-text-muted uppercase block mt-1">Queue node</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TECHNICAL INSTRUMENTATION */}
      <section className="py-20 px-6 lg:px-12 bg-background relative z-10 border-t border-border-subtle">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-serif tracking-tight text-text-primary lowercase">
              technical <span className="italic">stack</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { name: "TypeScript", desc: "type-safe systems" },
              { name: "Next.js", desc: "app router, RSC" },
              { name: "AI Agents", desc: "multi-agent flows" },
              { name: "React", desc: "19, server components" },
              { name: "Node.js", desc: "realtime backends" },
              { name: "Tailwind CSS", desc: "v4 design systems" },
              { name: "PostgreSQL", desc: "relational data" },
              { name: "Go", desc: "perf-critical services" },
            ].map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
                whileHover={{ y: -3 }}
                className="group relative p-4 bg-surface rounded-lg border border-border hover:border-teal-secondary cursor-default text-center shadow-xs transition-all overflow-hidden"
              >
                <motion.div
                  layoutId={`skill-glow-${i % 4}`}
                  className="absolute inset-0 bg-pastel-teal-bg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  transition={springTransition}
                />
                <p className="relative z-10 font-mono text-xs font-semibold text-text-secondary group-hover:text-teal-primary transition-colors tracking-wide">
                  {skill.name}
                </p>
                <p className="relative z-10 mt-1 text-[10px] font-mono text-text-muted">
                  {skill.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 px-6 lg:px-12 border-t border-border-subtle bg-surface-alt relative z-10">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-text-muted">
            <p>© {new Date().getFullYear()} Obed Vargas</p>
            <p className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              Mexico City, Mexico
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
