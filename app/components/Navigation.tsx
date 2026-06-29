"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/journey", label: "Journey" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const springTransition = { type: "spring" as const, stiffness: 380, damping: 30 };

export default function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-border-subtle bg-background/80 backdrop-blur-md ${
          isScrolled ? "py-1" : "py-3"
        }`}
      >
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="group">
              <span className="font-serif lowercase italic text-2xl tracking-tight text-text-primary select-none transition-opacity hover:opacity-80">
                obeskay<span className="text-accent font-sans not-italic">.</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1.5">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="relative px-3.5 py-1.5 group"
                  >
                    <span className={`relative z-10 text-xs font-medium tracking-wide transition-colors ${
                      isActive ? "text-teal-primary font-semibold" : "text-text-secondary group-hover:text-teal-primary"
                    }`}>
                      {link.label}
                    </span>

                    {/* Hover background — shared layoutId per link */}
                    {!isActive && (
                      <motion.div
                        layoutId={`nav-hover-${link.href}`}
                        className="absolute inset-0 bg-surface-alt border border-border-subtle rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        style={{ zIndex: 0 }}
                      />
                    )}

                    {/* Active pill — slides between links via shared layoutId */}
                    {isActive && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-pastel-teal-bg border border-teal-secondary/40 rounded-md shadow-xs"
                        style={{ zIndex: 0 }}
                        transition={springTransition}
                      />
                    )}

                    {/* Active underline indicator — slides via shared layoutId */}
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute bottom-0 left-2 right-2 h-0.5 bg-teal-accent rounded-full"
                        transition={springTransition}
                        style={{ zIndex: 1 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Social Links & Mobile Toggle */}
            <div className="flex items-center gap-2">
              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Desktop Socials */}
              <div className="hidden md:flex items-center gap-1.5">
                {[
                  { href: "https://github.com/obeskay", icon: Github, label: "GitHub" },
                  { href: "https://linkedin.com/in/obeskay", icon: Linkedin, label: "LinkedIn" },
                  { href: "mailto:obeskay.mail@gmail.com", icon: Mail, label: "Email" },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith("http") ? "_blank" : undefined}
                    rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="p-2 bg-surface border border-border text-text-secondary hover:text-text-primary hover:bg-surface-alt transition-colors rounded-md"
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4 shrink-0" />
                  </a>
                ))}
              </div>

              {/* Mobile Menu Toggle */}
              <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 bg-surface border border-border text-text-secondary hover:text-text-primary hover:bg-surface-alt transition-colors rounded-md whitespace-nowrap" aria-label="Toggle menu">
                {isOpen ? <X className="w-4 h-4 shrink-0" /> : <Menu className="w-4 h-4 shrink-0" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className={`fixed inset-x-0 top-16 z-40 bg-background border-b border-border-subtle md:hidden ${
          isOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div className="container mx-auto px-6 py-6">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-2.5 border border-border text-xs font-medium tracking-wide transition-all rounded-md ${
                    isActive 
                      ? "bg-surface-alt text-text-primary font-semibold" 
                      : "bg-surface text-text-secondary hover:bg-surface-alt hover:text-text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          
          {/* Mobile Socials */}
          <div className="flex items-center gap-2 mt-6 pt-6 border-t border-border-subtle">
            {[
              { href: "https://github.com/obeskay", icon: Github, label: "GitHub" },
              { href: "https://linkedin.com/in/obeskay", icon: Linkedin, label: "LinkedIn" },
              { href: "mailto:obeskay.mail@gmail.com", icon: Mail, label: "Email" },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="p-2.5 bg-surface border border-border text-text-secondary hover:text-text-primary hover:bg-surface-alt transition-colors rounded-md"
                aria-label={social.label}
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Spacer for fixed header */}
      <div className="h-16" />
    </>
  );
}
