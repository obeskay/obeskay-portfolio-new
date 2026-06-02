"use client";

import { motion, AnimatePresence } from "framer-motion";
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
  /* ═══════════════════════════════════════════════════════════════════════════
     CDMX REAL-TIME CLOCK & STATUS WIDGET
     ═══════════════════════════════════════════════════════════════════════════ */
  const [cdmxTime, setCdmxTime] = useState("");
  const [cdmxStatus, setCdmxStatus] = useState({ text: "Active & Shipping", color: "bg-[#346538]" });

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
          setCdmxStatus({ text: "Active & Shipping", color: "bg-[#346538]" });
        } else if (numericHour >= 19 && numericHour < 24) {
          setCdmxStatus({ text: "Chilling & Coding", color: "bg-[#9F2F2D]" });
        } else {
          setCdmxStatus({ text: "Off the grid / Resting", color: "bg-[#8E8D8A]" });
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
    const msgInterval = setInterval(() => {
      setTelemetry(prev => ({
        ...prev,
        messagesProcessed: prev.messagesProcessed + Math.floor(Math.random() * 3) + 1
      }));
    }, 4000);

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
    }, 1200);
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
      {/* Subtle Warm Gradient Blob */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[10%] right-[10%] w-[500px] h-[500px] rounded-full bg-accent-bg/15 blur-[120px]" />
        <div className="absolute bottom-[20%] left-[5%] w-[400px] h-[400px] rounded-full bg-pastel-red-bg/10 blur-[100px]" />
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════════
         HERO SECTION
         ═══════════════════════════════════════════════════════════════════════════ */}
      <section className="relative pt-24 pb-28 md:py-36 px-6 lg:px-12 z-10 flex flex-col items-center justify-center min-h-[75vh]">
        <div className="relative container mx-auto max-w-4xl text-center flex flex-col items-center">
          {/* Status Badge with Mexico City Time */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 flex flex-col sm:flex-row items-center gap-3 bg-surface border border-border rounded-full px-4 py-1.5 shadow-xs"
          >
            <span className="flex items-center gap-2 text-[10px] font-mono font-semibold text-text-secondary uppercase tracking-wider">
              <span className={`w-2 h-2 rounded-full ${cdmxStatus.color} animate-pulse`} />
              {cdmxStatus.text}
            </span>
            <span className="hidden sm:inline text-border font-light">|</span>
            <span className="flex items-center gap-1.5 text-[10px] font-mono font-semibold text-text-muted uppercase tracking-wider">
              <Clock className="w-3.5 h-3.5 text-text-muted" />
              cdmx • {cdmxTime || "cst"}
            </span>
          </motion.div>

          {/* Main Heading with Elegant display serif font */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mb-8 text-center"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-text-primary tracking-tight leading-[1.08] lowercase max-w-3xl">
              building <span className="italic">products that work.</span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm md:text-base text-text-secondary max-w-lg mx-auto leading-relaxed mb-10 px-4 font-normal"
          >
            Software Engineer based in Mexico City. I build robust AI experiences, multi-agent frameworks, and productivity systems that turn complex logic into clean, intuitive utilities.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3 justify-center w-full max-w-sm px-6"
          >
            <Link href="/work" className="w-full">
              <button className="btn-primary w-full">
                explore my work
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </Link>

            <Link href="/contact" className="w-full">
              <button className="btn-secondary w-full">
                get in touch
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════════
         INTERACTIVE WHATSAPP AGENT PREVIEW (SPECIAL TOUCH)
         ═══════════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 lg:px-12 bg-surface-alt border-t border-border-subtle relative z-10">
        <div className="container mx-auto max-w-5xl">
          <div className="grid lg:grid-cols-[1fr_0.9fr] gap-12 lg:gap-16 items-center">
            {/* Context Left */}
            <div>
              <span className="badge badge-blue mb-4">Live Demonstration</span>
              <h2 className="text-3xl md:text-4xl font-serif tracking-tight text-text-primary mb-6 lowercase">
                interactive <span className="italic">agent workflows</span>
              </h2>
              <p className="text-text-secondary leading-relaxed text-sm mb-8 font-normal">
                Most AI integrations sound abstract. I design resilient, production-ready WhatsApp interfaces like <strong className="text-text-primary font-medium">Chatea.la</strong> and <strong className="text-text-primary font-medium">Carti.app</strong> that translate spontaneous audio clips or quick texts into deterministic, structured data layers.
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="p-2 bg-pastel-blue-bg text-pastel-blue-fg rounded-lg h-fit border border-border">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-sans font-semibold text-text-primary text-sm tracking-tight">Structured State Workflows</h4>
                    <p className="text-xs text-text-muted mt-1 leading-relaxed">Handling robust webhook pings, contextual memory states, and rate-limiting gracefully.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="p-2 bg-pastel-red-bg text-pastel-red-fg rounded-lg h-fit border border-border">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-sans font-semibold text-text-primary text-sm tracking-tight">Operator Handover Loops</h4>
                    <p className="text-xs text-text-muted mt-1 leading-relaxed">Smooth fallback protocols that route complex requests to actual operators when required.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Frame Right (Clean Web App Mockup style) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="window-chrome relative w-full max-w-sm mx-auto aspect-[9/15] flex flex-col justify-between"
            >
              {/* Mockup Header */}
              <div className="window-header justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="window-dot" />
                  <div className="window-dot" />
                  <div className="window-dot" />
                  <span className="text-[10px] font-mono text-text-muted uppercase ml-2 tracking-wider">obeskay_agent_worker</span>
                </div>
                <button 
                  onClick={resetChat}
                  className="text-[9px] font-mono text-pastel-red-fg px-2.5 py-0.5 bg-pastel-red-bg border border-border rounded-full hover:opacity-85 transition-opacity"
                >
                  reset
                </button>
              </div>

              {/* Chat Log (Scrollable) */}
              <div className="flex-1 p-5 overflow-y-auto space-y-4 flex flex-col bg-surface">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`max-w-[85%] p-3 rounded-lg text-xs leading-relaxed border ${
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
                  <div className="bg-surface-alt border border-border self-start rounded-lg p-3 flex items-center gap-1 max-w-[80%]">
                    <span className="w-1.5 h-1.5 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                )}
              </div>

              {/* Quick Reply Drawer */}
              <div className="bg-surface-alt border-t border-border p-4">
                <p className="text-[9px] font-mono font-semibold text-text-muted uppercase tracking-wider mb-2.5">
                  Select a prompt:
                </p>
                <div className="flex gap-2 overflow-x-auto flex-nowrap scrollbar-none pb-1 -mx-1 px-1">
                  {!selectedQuickReplies.includes("chateala") && (
                    <button
                      onClick={() => handleQuickReply(
                        "Tell me about Chatea.la",
                        "Chatea.la is a WhatsApp AI automation platform for Mexican businesses. It processes unstructured messages, coordinates calendars, qualifies leads, and updates active CRM databases automatically.",
                        "chateala"
                      )}
                      className="flex-shrink-0 bg-surface hover:bg-surface-alt border border-border px-3 py-1.5 rounded-md text-xs font-medium text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
                    >
                      chatea.la
                    </button>
                  )}

                  {!selectedQuickReplies.includes("carti") && (
                    <button
                      onClick={() => handleQuickReply(
                        "What is Carti.app?",
                        "Carti.app is a secure WhatsApp assistant for personal finance tracking. It parses messy voice logs and text receipts into instant ledger updates. It is a live agent making accounting friction-free.",
                        "carti"
                      )}
                      className="flex-shrink-0 bg-surface hover:bg-surface-alt border border-border px-3 py-1.5 rounded-md text-xs font-medium text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
                    >
                      carti.app
                    </button>
                  )}

                  {!selectedQuickReplies.includes("about") && (
                    <button
                      onClick={() => handleQuickReply(
                        "Are you currently available?",
                        "Yes. Obed is available for architectural advisory, multi-agent pipelines, and premium TypeScript engineering integrations. He loves designing elegant developer products.",
                        "about"
                      )}
                      className="flex-shrink-0 bg-surface hover:bg-surface-alt border border-border px-3 py-1.5 rounded-md text-xs font-medium text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
                    >
                      availability
                    </button>
                  )}

                  {selectedQuickReplies.length >= 3 && (
                    <div className="py-1 text-center w-full flex-shrink-0">
                      <p className="text-[10px] font-mono text-pastel-green-fg uppercase font-medium">Demo complete.</p>
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
      <section className="py-24 px-6 lg:px-12 bg-background border-t border-border-subtle relative z-10">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
          >
            <div>
              <span className="badge badge-green mb-4">Selected Work</span>
              <h2 className="text-3xl md:text-4xl font-serif tracking-tight text-text-primary lowercase">
                featured <span className="italic">digital works</span>
              </h2>
            </div>
            <Link
              href="/work"
              className="inline-flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-text-secondary hover:text-text-primary transition-colors group"
            >
              Explore all
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>

          {/* Project Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Chatea.la",
                desc: "WhatsApp automation for Mexican operators. Direct pipelines that take unstructured voice logs and text, qualifying them into actual calendar bookings and leads.",
                tag: "SaaS",
                link: "https://chatea.la",
                image: "/projects/chateala.png",
                badgeClass: "badge-blue"
              },
              {
                title: "Carti.app",
                desc: "WhatsApp-native personal finance bookkeeping. Translates informal text and audio logs into structured budgets and ledger entries, cleanly and securely.",
                tag: "Private Beta",
                link: "https://carti.app",
                image: "/projects/carti.png",
                badgeClass: "badge-yellow"
              },
              {
                title: "Sello",
                desc: "WhatsApp-native digital loyalty cards. Swaps easily misplaced paper stamp cards with a fast QR scanning flow that runs directly in the client chat.",
                tag: "Lab",
                link: "https://sello.cloud.obeskay.com",
                image: "/projects/sello.webp",
                badgeClass: "badge-green"
              },
              {
                title: "Freela",
                desc: "AI proposal scoping and design tool. Synthesizes vague client briefs into structured scope-of-work sheets, timelines, and precise deliverables.",
                tag: "Lab",
                link: "https://freela.cloud.obeskay.com",
                image: "/projects/freela.png",
                badgeClass: "badge-green"
              },
              {
                title: "StickyCovers",
                desc: "Custom credit card skin customizer. Integrates interactive client canvases with MercadoPago checkouts and automated email retention hooks.",
                tag: "Product",
                link: "https://stickycovers.cloud.obeskay.com",
                image: "/projects/stickycovers.png",
                badgeClass: "badge-red"
              },
              {
                title: "obeskay.com",
                desc: "Personal directory and lab nodes. A minimalist space detailing active production systems, tools, and developer experiments.",
                tag: "Portfolio",
                link: "https://obeskay.com",
                image: "/projects/obeskay_home.png",
                badgeClass: "badge-blue"
              }
            ].map((project, i) => {
              return (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="h-full"
                >
                  <a 
                    href={project.link} 
                    target={project.link.startsWith("http") ? "_blank" : undefined}
                    rel={project.link.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="block h-full group"
                  >
                    <div className="flex flex-col h-full bg-surface border border-border rounded-lg overflow-hidden shadow-xs hover:border-text-secondary hover:shadow-sm transition-all duration-300">
                      {/* Content Header */}
                      <div className="p-5 flex-grow">
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className={`badge ${project.badgeClass}`}>
                            {project.tag}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-text-primary group-hover:text-text-primary transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-xs text-text-secondary font-normal mt-2 leading-relaxed">{project.desc}</p>
                      </div>

                      {/* Crisp Image Frame */}
                      <div className="mt-auto relative w-full h-44 overflow-hidden border-t border-border bg-surface-alt">
                        <img 
                          src={project.image} 
                          alt={project.title} 
                          className="w-full h-full object-cover grayscale opacity-90 contrast-[1.05] group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-500" 
                        />
                      </div>
                    </div>
                  </a>
                </motion.div>
              );
            })}
          </div>

          {/* Ecosystem Live Telemetry Bento Widget */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-12 p-6 md:p-8 rounded-lg bg-surface-alt border border-border shadow-xs hover:border-text-muted transition-colors flex flex-col lg:flex-row items-center justify-between gap-6 relative overflow-hidden"
          >
            <div className="flex flex-col gap-1 text-left relative z-10">
              <span className="badge badge-green w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-[#346538] animate-ping" />
                Live Performance
              </span>
              <h3 className="text-lg font-semibold text-text-primary mt-2">Active Systems Telemetry</h3>
              <p className="text-xs text-text-secondary leading-relaxed font-normal">Real-time tracking of processed webhook integrations and active AI worker flows across production SaaS systems.</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full lg:w-auto relative z-10 shrink-0">
              {/* Telemetry Item 1: Messages Ticker */}
              <div className="p-4 bg-surface border border-border rounded-lg flex flex-col justify-center text-left">
                <span className="text-[9px] font-mono font-semibold text-text-muted uppercase tracking-wider">Processed</span>
                <span className="text-base font-mono font-semibold text-text-primary mt-1">{telemetry.messagesProcessed.toLocaleString()}</span>
                <span className="text-[9px] font-mono text-pastel-green-fg uppercase mt-1 font-semibold">▲ live</span>
              </div>

              {/* Telemetry Item 2: Active AI Workers */}
              <div className="p-4 bg-surface border border-border rounded-lg flex flex-col justify-center text-left">
                <span className="text-[9px] font-mono font-semibold text-text-muted uppercase tracking-wider">AI Workers</span>
                <span className="text-base font-mono font-semibold text-text-primary mt-1">{telemetry.activeAgents} active</span>
                <span className="text-[9px] font-mono text-text-muted uppercase mt-1 font-semibold">loops</span>
              </div>

              {/* Telemetry Item 3: Chatea Health */}
              <div className="p-4 bg-surface border border-border rounded-lg flex flex-col justify-center text-left">
                <span className="text-[9px] font-mono font-semibold text-text-muted uppercase tracking-wider">Chatea.la</span>
                <span className={`text-[10px] font-mono font-semibold mt-1.5 leading-none flex items-center gap-1.5 ${telemetry.chateaHealth === 'online' ? 'text-pastel-green-fg' : 'text-text-muted'}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${telemetry.chateaHealth === 'online' ? 'bg-[#346538]' : 'bg-[#8E8D8A]'} animate-pulse`} />
                  {telemetry.chateaHealth === 'online' ? 'ONLINE' : 'PING...'}
                </span>
                <span className="text-[8px] font-mono text-text-muted uppercase mt-2">SaaS node</span>
              </div>

              {/* Telemetry Item 4: Carti.app Health */}
              <div className="p-4 bg-surface border border-border rounded-lg flex flex-col justify-center text-left">
                <span className="text-[9px] font-mono font-semibold text-text-muted uppercase tracking-wider">Carti.app</span>
                <span className={`text-[10px] font-mono font-semibold mt-1.5 leading-none flex items-center gap-1.5 ${telemetry.cartiHealth === 'online' ? 'text-pastel-green-fg' : 'text-text-muted'}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${telemetry.cartiHealth === 'online' ? 'bg-[#346538]' : 'bg-[#8E8D8A]'} animate-pulse`} />
                  {telemetry.cartiHealth === 'online' ? 'ONLINE' : 'PING...'}
                </span>
                <span className="text-[8px] font-mono text-text-muted uppercase mt-2">Queue node</span>
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <span className="badge badge-yellow mb-4">Expertise</span>
            <h2 className="text-3xl md:text-4xl font-serif tracking-tight text-text-primary lowercase">
              technical <span className="italic">instrumentation</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "TypeScript", "Next.js", "AI Agents", "React",
              "Node.js", "Tailwind CSS", "PostgreSQL", "Go"
            ].map((skill, i) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.03 }}
                className="group p-4 bg-surface rounded-lg border border-border hover:border-text-secondary transition-colors cursor-default text-center shadow-xs"
              >
                <p className="font-mono text-xs text-text-secondary group-hover:text-text-primary transition-colors tracking-wide">
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
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-text-muted">
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
