"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Twitter, MapPin, Send, ArrowUpRight } from "lucide-react";

const contactMethods = [
  {
    icon: Mail,
    title: "Email",
    value: "obeskay.mail@gmail.com",
    href: "mailto:obeskay.mail@gmail.com",
    description: "For business inquiries and collaborations",
    badgeClass: "badge-blue",
  },
  {
    icon: Github,
    title: "GitHub",
    value: "@obeskay",
    href: "https://github.com/obeskay",
    description: "Check out my active developer repositories",
    badgeClass: "badge-yellow",
  },
  {
    icon: Linkedin,
    title: "LinkedIn",
    value: "/in/obeskay",
    href: "https://linkedin.com/in/obeskay",
    description: "Let's connect professionally",
    badgeClass: "badge-green",
  },
  {
    icon: Twitter,
    title: "Twitter / X",
    value: "@obeskay",
    href: "https://x.com/obeskay",
    description: "Follow my updates and systems notes",
    badgeClass: "badge-red",
  },
];

const formFields = [
  { name: "name", label: "Name", type: "text", placeholder: "Your name", required: true },
  { name: "email", label: "Email", type: "email", placeholder: "your@email.com", required: true },
  { name: "subject", label: "Subject", type: "text", placeholder: "What's this about?", required: true },
  { name: "message", label: "Message", type: "textarea", placeholder: "Tell me about your project...", required: true, rows: 5 },
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
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  </div>
);

export default function Contact() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const subject = (form.elements.namedItem("subject") as HTMLInputElement).value;
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value;

    const mailtoLink = `mailto:obeskay.mail@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    )}`;
    window.location.href = mailtoLink;
  };

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Subtle Warm Spot */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[5%] right-[10%] w-[500px] h-[500px] rounded-full bg-accent-bg/10 blur-[100px]" />
        <div className="absolute bottom-[20%] left-[5%] w-[400px] h-[400px] rounded-full bg-pastel-red-bg/8 blur-[90px]" />
      </div>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6 lg:px-12 relative z-10">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="max-w-3xl mb-16 md:mb-24">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-4"
            >
              <span className="badge badge-blue">Get in Touch</span>
            </motion.div>

            <RevealText delay={0.1}>
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif text-text-primary tracking-tight leading-tight lowercase">
                let&apos;s build something <span className="italic">together.</span>
              </h1>
            </RevealText>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm md:text-base text-text-secondary leading-relaxed max-w-xl mt-6 font-normal"
            >
              Have a project in mind? Want to collaborate on resilient agent workflows or developer tools? I&apos;d love to hear from you.
            </motion.p>
          </div>

          {/* Contact Methods Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {contactMethods.map((method, i) => (
              <motion.a
                key={method.title}
                href={method.href}
                target={method.href.startsWith("http") ? "_blank" : undefined}
                rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.05 }}
                className="group p-5 bg-surface border border-border rounded-lg hover:border-text-secondary transition-colors shadow-xs"
              >
                <method.icon className="w-5 h-5 text-text-secondary mb-4" />
                <div className="mb-2">
                  <span className={`badge ${method.badgeClass}`}>
                    {method.title.toLowerCase()}
                  </span>
                </div>
                <p className="text-xs text-text-primary font-semibold mb-1 truncate">{method.value}</p>
                <p className="text-[11px] text-text-muted leading-relaxed font-normal">{method.description}</p>
              </motion.a>
            ))}
          </div>

          {/* Location Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex items-center gap-3.5 px-5 py-3 bg-surface border border-border rounded-lg w-fit shadow-xs mb-16"
          >
            <MapPin className="w-4 h-4 text-text-muted" />
            <div>
              <p className="text-[9px] font-mono font-semibold text-text-muted uppercase tracking-wider">Based in</p>
              <p className="text-xs text-text-secondary font-medium">Mexico City, Mexico</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 px-6 lg:px-12 bg-surface relative overflow-hidden border-t border-border-subtle">
        <div className="container mx-auto max-w-2xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-serif tracking-tight text-text-primary mb-4 lowercase">
              send a <span className="italic">direct message</span>
            </h2>
            <p className="text-xs md:text-sm text-text-secondary leading-relaxed font-normal">
              Fill out the details below and I&apos;ll get back to you directly.
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            onSubmit={handleSubmit}
            className="bg-surface-alt rounded-lg p-8 shadow-xs border border-border"
          >
            <div className="space-y-5">
              {formFields.map((field) => (
                <div key={field.name}>
                  <label htmlFor={field.name} className="block text-[10px] font-mono font-semibold uppercase tracking-wider text-text-secondary mb-2">
                    {field.label}
                  </label>
                  {field.type === "textarea" ? (
                    <textarea
                      id={field.name}
                      name={field.name}
                      rows={field.rows}
                      required={field.required}
                      placeholder={field.placeholder}
                      className="w-full px-3.5 py-2.5 bg-surface border border-border rounded text-xs text-text-primary placeholder:text-text-muted/65 focus:outline-none focus:border-text-secondary transition-colors resize-none font-normal"
                    />
                  ) : (
                    <input
                      type={field.type}
                      id={field.name}
                      name={field.name}
                      required={field.required}
                      placeholder={field.placeholder}
                      className="w-full px-3.5 py-2.5 bg-surface border border-border rounded text-xs text-text-primary placeholder:text-text-muted/65 focus:outline-none focus:border-text-secondary transition-colors font-normal"
                    />
                  )}
                </div>
              ))}
            </div>

            <button
              type="submit"
              className="btn-primary w-full mt-6 inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              Send Message
              <Send className="w-3.5 h-3.5" />
            </button>
          </motion.form>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 lg:px-12 text-center bg-background relative z-10 border-t border-border-subtle">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-serif tracking-tight text-text-primary mb-6 lowercase">
              prefer a <span className="italic">quick chat?</span>
            </h2>
            <p className="text-text-secondary leading-relaxed text-xs md:text-sm font-normal mb-8 max-w-md mx-auto">
              Drop me an email to schedule a 30-minute introductory sync.
            </p>
            <motion.a
              href="mailto:obeskay.mail@gmail.com?subject=Quick%20Chat%20Request"
              whileHover={{ scale: 0.98 }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary inline-flex items-center gap-2 cursor-pointer"
            >
              Schedule a call
              <ArrowUpRight className="w-3.5 h-3.5" />
            </motion.a>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
