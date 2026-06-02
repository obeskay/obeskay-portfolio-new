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

const springTransition = { type: "spring" as const, stiffness: 400, damping: 25 };

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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b-4 border-ink bg-background ${
          isScrolled ? "py-1.5" : "py-3"
        }`}
      >
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="group">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-terracotta border-3 border-ink text-white font-mono text-sm font-black uppercase tracking-wider neobrutal-shadow-xs hover:translate-y-[-2px] hover:box-shadow-[4px_4px_0_var(--ink)] active:translate-y-[2px] transition-all">
                Obed <span className="text-gold font-serif normal-case italic font-medium ml-1">Vargas</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-3">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="relative px-4 py-2 group"
                  >
                    <span className={`relative z-10 text-xs font-mono font-black uppercase tracking-wider transition-colors ${
                      isActive ? "text-ink" : "text-text-secondary group-hover:text-ink"
                    }`}>
                      {link.label}
                    </span>
                    
                    {isActive && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-gold border-3 border-ink neobrutal-shadow-xs"
                        style={{ zIndex: 0 }}
                        transition={springTransition}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Social Links & Mobile Toggle */}
            <div className="flex items-center gap-3">
              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Desktop Socials */}
              <div className="hidden md:flex items-center gap-2">
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
                    className="p-2 bg-surface border-3 border-ink text-text-primary hover:bg-gold hover:translate-y-[-2px] hover:shadow-[4px_4px_0_var(--ink)] active:translate-y-[2px] transition-all"
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 bg-surface border-3 border-ink text-text-primary hover:bg-gold hover:translate-y-[-2px] hover:shadow-[4px_4px_0_var(--ink)] active:translate-y-[2px] transition-all"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        className={`fixed inset-x-0 top-20 z-40 bg-background border-b-4 border-ink md:hidden ${
          isOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div className="container mx-auto px-6 py-6">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 border-3 border-ink text-sm font-mono font-black uppercase tracking-wider neobrutal-shadow-xs transition-all ${
                    isActive 
                      ? "bg-gold text-ink" 
                      : "bg-surface text-text-secondary hover:bg-gold hover:text-ink"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          
          {/* Mobile Socials */}
          <div className="flex items-center gap-3 mt-6 pt-6 border-t-3 border-ink">
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
                className="p-3 bg-surface border-3 border-ink text-text-primary hover:bg-gold hover:translate-y-[-2px] hover:shadow-[4px_4px_0_var(--ink)] active:translate-y-[2px] transition-all"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Spacer for fixed header */}
      <div className="h-20" />
    </>
  );
}
