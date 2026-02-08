"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import { Github, Linkedin, Mail, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const { scrollY } = useScroll();
  const headerBg = useTransform(
    scrollY,
    [0, 100],
    ["rgba(250, 250, 249, 0)", "rgba(250, 250, 249, 0.9)"]
  );
  const headerBorder = useTransform(
    scrollY,
    [0, 100],
    ["rgba(214, 211, 209, 0)", "rgba(214, 211, 209, 1)"]
  );

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        style={{ 
          backgroundColor: headerBg,
          borderColor: headerBorder,
        }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b transition-all duration-300"
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
                Obed<span className="font-display italic font-normal ml-1">Vargas</span>
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
                    <span className={`relative z-10 text-sm font-medium transition-colors duration-300 ${
                      isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                    }`}>
                      {link.label}
                    </span>
                    
                    {/* Active indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-accent rounded-full"
                        style={{ zIndex: 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Social Links & Mobile Toggle */}
            <div className="flex items-center gap-2">
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
                    className="p-2.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-all duration-200"
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
      </motion.header>

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
