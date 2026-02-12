"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Github, Star, ArrowUpRight, X } from "lucide-react";
import { useState, useEffect } from "react";

const STORAGE_KEY = "github-cta-dismissed";
const DISMISS_DURATION_DAYS = 7;
const SCROLL_THRESHOLD = 0.3; // 30% scroll

export default function GitHubCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if user has dismissed the widget recently
    const dismissedAt = localStorage.getItem(STORAGE_KEY);
    if (dismissedAt) {
      const dismissedTime = parseInt(dismissedAt, 10);
      const now = Date.now();
      const daysSinceDismissed =
        (now - dismissedTime) / (1000 * 60 * 60 * 24);

      if (daysSinceDismissed < DISMISS_DURATION_DAYS) {
        setIsDismissed(true);
        return;
      }
    }

    // Scroll detection
    const handleScroll = () => {
      if (isDismissed) return;

      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = scrollTop / docHeight;

      if (scrollPercent >= SCROLL_THRESHOLD && !isVisible) {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial scroll position

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isVisible, isDismissed]);

  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsVisible(false);
    setIsDismissed(true);
    localStorage.setItem(STORAGE_KEY, Date.now().toString());
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-8 right-8 z-50"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{
            duration: 0.4,
            ease: [0.4, 0, 0.2, 1],
          }}
        >
          <a
            href="https://github.com/obeskay"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 bg-[#24292e] text-white px-5 py-3 rounded-2xl shadow-2xl hover:shadow-[#24292e]/30 transition-all duration-300 hover:scale-105"
          >
            <Github className="w-5 h-5 flex-shrink-0" />
            <div className="flex flex-col">
              <span className="text-xs text-gray-400">Follow for more</span>
              <span className="font-semibold text-sm flex items-center gap-1.5">
                @obeskay
                <span className="text-xs bg-white/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  5+
                </span>
              </span>
            </div>
            <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
          </a>
          <button
            onClick={handleClose}
            className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 transition-colors"
            aria-label="Close GitHub CTA"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
