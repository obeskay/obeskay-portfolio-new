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
  },
  {
    icon: Github,
    title: "GitHub",
    value: "@obeskay",
    href: "https://github.com/obeskay",
    description: "Check out my open source projects",
  },
  {
    icon: Linkedin,
    title: "LinkedIn",
    value: "/in/obeskay",
    href: "https://linkedin.com/in/obeskay",
    description: "Let's connect professionally",
  },
  {
    icon: Twitter,
    title: "Twitter / X",
    value: "@obeskay",
    href: "https://x.com/obeskay",
    description: "Follow my thoughts and updates",
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
    // Open email client with form data
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
              className="text-sm font-medium text-primary uppercase tracking-wider mb-4"
            >
              Get in Touch
            </motion.p>

            <RevealText delay={0.2}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-foreground tracking-tight mb-6">
                Let's build something <span className="font-display italic font-normal">amazing</span>
              </h1>
            </RevealText>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg text-muted-foreground leading-relaxed"
            >
              Have a project in mind? Want to collaborate? Or just want to say hi?
              I'd love to hear from you.
            </motion.p>
          </div>

          {/* Contact Methods */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
            {contactMethods.map((method, i) => (
              <motion.a
                key={method.title}
                href={method.href}
                target={method.href.startsWith("http") ? "_blank" : undefined}
                rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group p-6 bg-surface rounded-2xl border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg"
              >
                <method.icon className="w-6 h-6 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-foreground mb-1">{method.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{method.value}</p>
                <p className="text-xs text-muted-foreground/70">{method.description}</p>
              </motion.a>
            ))}
          </div>

          {/* Location Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="flex items-center gap-3 px-6 py-4 bg-accent/20 rounded-2xl w-fit mb-20"
          >
            <MapPin className="w-5 h-5 text-primary" />
            <div>
              <p className="text-sm font-medium text-foreground">Based in</p>
              <p className="text-foreground/80">Mexico City, Mexico</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 px-6 lg:px-12 bg-surface relative overflow-hidden">
        {/* Background accent */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto max-w-3xl relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
              Send a <span className="font-display italic font-normal">message</span>
            </h2>
            <p className="text-muted-foreground">
              Fill out the form below and I'll get back to you within 24 hours.
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            onSubmit={handleSubmit}
            className="bg-white rounded-[28px] p-8 md:p-12 shadow-xl border border-border"
          >
            <div className="space-y-6">
              {formFields.map((field, i) => (
                <motion.div
                  key={field.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                >
                  <label htmlFor={field.name} className="block text-sm font-medium text-foreground mb-2">
                    {field.label}
                  </label>
                  {field.type === "textarea" ? (
                    <textarea
                      id={field.name}
                      name={field.name}
                      rows={field.rows}
                      required={field.required}
                      placeholder={field.placeholder}
                      className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 resize-none"
                    />
                  ) : (
                    <input
                      type={field.type}
                      id={field.name}
                      name={field.name}
                      required={field.required}
                      placeholder={field.placeholder}
                      className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
                    />
                  )}
                </motion.div>
              ))}
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full mt-8 inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium transition-all hover:shadow-lg hover:shadow-primary/20"
            >
              Send Message
              <Send className="w-4 h-4" />
            </motion.button>
          </motion.form>
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
              Prefer a <span className="font-display italic font-normal">quick chat</span>?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Schedule a free 30-minute call to discuss your project.
            </p>
            <a
              href="mailto:obeskay.mail@gmail.com?subject=Quick%20Chat%20Request"
              className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-accent-foreground rounded-full font-medium transition-all hover:shadow-lg hover:shadow-accent/40"
            >
              Schedule a call
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
