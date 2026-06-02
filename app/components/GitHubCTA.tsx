"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Github, Star, ArrowUpRight, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const STORAGE_KEY = "github-cta-dismissed";
const DISMISS_DURATION_DAYS = 7;
const SCROLL_THRESHOLD = 0.3; // 30% scroll

export default function GitHubCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const isDismissed = useRef(false);

  useEffect(() => {
    const dismissedAt = localStorage.getItem(STORAGE_KEY);
    if (dismissedAt) {
      const dismissedTime = parseInt(dismissedAt, 10);
      const now = Date.now();
      const daysSinceDismissed =
        (now - dismissedTime) / (1000 * 60 * 60 * 24);

      if (daysSinceDismissed < DISMISS_DURATION_DAYS) {
        isDismissed.current = true;
        return;
      }
    }

    const handleScroll = () => {
      if (isDismissed.current) return;

      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = scrollTop / docHeight;

      if (scrollPercent >= SCROLL_THRESHOLD) {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsVisible(false);
    isDismissed.current = true;
    localStorage.setItem(STORAGE_KEY, Date.now().toString());
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-6 right-6 z-50"
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.98 }}
          transition={{
            duration: 0.3,
            ease: "easeOut",
          }}
        >
          <div className="relative">
            <a
              href="https://github.com/obeskay"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 bg-surface border border-border px-4 py-3 rounded-lg shadow-sm hover:border-text-secondary transition-all"
            >
              <Github className="w-4.5 h-4.5 text-text-primary flex-shrink-0" />
              <div className="flex flex-col text-left">
                <span className="text-[10px] font-mono text-text-muted uppercase tracking-wider leading-none mb-1">Follow for updates</span>
                <span className="font-semibold text-xs text-text-primary flex items-center gap-1.5 leading-none">
                  @obeskay
                  <span className="badge badge-yellow text-[9px] px-1.5 py-0">
                    <Star className="w-2.5 h-2.5 fill-current shrink-0" />
                    5+
                  </span>
                </span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-text-muted group-hover:text-text-primary transition-colors flex-shrink-0" />
            </a>
            
            <button onClick={handleClose} className="absolute -top-1.5 -right-1.5 bg-surface border border-border rounded p-0.5 shadow-xs text-text-muted hover:text-text-primary hover:bg-surface-alt transition-colors cursor-pointer whitespace-nowrap" aria-label="Close GitHub CTA">
              <X className="w-3 h-3 shrink-0" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
