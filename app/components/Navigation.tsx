"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
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

const springTransition = { type: "spring" as const, stiffness: 400, damping: 30 };

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
        className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 backdrop-blur-md ${
          isScrolled 
            ? "bg-background/90 border-border-subtle shadow-xs py-1" 
            : "bg-transparent border-transparent py-3"
        }`}
      >
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="group">
              <motion.span 
                className="text-lg font-semibold text-foreground"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Obed<span className="font-display italic font-normal ml-1 text-gradient-animated">Vargas</span>
              </motion.span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="relative px-5 py-2.5 group"
                  >
                    <span className={`relative z-10 text-sm font-medium transition-colors ${
                      isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                    }`}>
                      {link.label}
                    </span>
                    
                    {isActive && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-moss/8 border border-moss/12 rounded-full"
                        style={{ zIndex: 0 }}
                        transition={springTransition}
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
              <div className="hidden md:flex items-center gap-1">
                {[
                  { href: "https://github.com/obeskay", icon: Github, label: "GitHub" },
                  { href: "https://linkedin.com/in/obeskay", icon: Linkedin, label: "LinkedIn" },
                  { href: "mailto:obeskay.mail@gmail.com", icon: Mail, label: "Email" },
                ].map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith("http") ? "_blank" : undefined}
                    rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="p-2.5 text-text-secondary hover:text-moss hover:bg-moss/8 rounded-full transition-all duration-200"
                    aria-label={social.label}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>

              {/* Mobile Menu Toggle */}
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2.5 text-foreground hover:bg-muted rounded-full transition-colors"
                whileTap={{ scale: 0.95 }}
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        className={`fixed inset-x-0 top-20 z-40 bg-background/95 backdrop-blur-xl border-b border-border md:hidden ${
          isOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div className="container mx-auto px-6 py-6">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link, i) => {
              const isActive = pathname === link.href;
              return (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-3 rounded-2xl text-lg font-medium transition-colors ${
                      isActive 
                        ? "bg-accent text-foreground" 
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              );
            })}
          </nav>
          
          {/* Mobile Socials */}
          <div className="flex items-center gap-3 mt-6 pt-6 border-t border-border">
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
                className="p-3 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-colors"
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
