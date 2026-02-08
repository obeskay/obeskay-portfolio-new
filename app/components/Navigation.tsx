"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-border/50"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group">
            <motion.span 
              className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Obed Vargas
            </motion.span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative px-4 py-2 group"
                >
                  <span className={`relative z-10 text-sm font-medium transition-colors duration-200 ${
                    isActive ? "text-primary" : "text-text-muted group-hover:text-foreground"
                  }`}>
                    {link.label}
                  </span>
                  
                  {/* Hover background */}
                  <motion.div
                    className="absolute inset-0 bg-surface rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    layoutId={isActive ? undefined : `nav-hover-${link.href}`}
                  />
                  
                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-primary rounded-full"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-1">
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
                className="p-2.5 text-text-muted hover:text-primary hover:bg-surface rounded-lg transition-all duration-200"
                aria-label={social.label}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
