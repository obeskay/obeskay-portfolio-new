"use client";

import { Clock } from "lucide-react";
import { useEffect, useState } from "react";

function computeCdmxStatus(): { text: string; color: string } {
  const hourStr = new Date().toLocaleTimeString("en-US", {
    timeZone: "America/Mexico_City",
    hour12: false,
  });
  const hour = parseInt(hourStr.split(":")[0], 10);
  if (hour >= 8 && hour < 19) return { text: "Active & Shipping", color: "bg-[#346538]" };
  if (hour >= 19 && hour < 24) return { text: "Chilling & Coding", color: "bg-[#9F2F2D]" };
  return { text: "Off the grid / Resting", color: "bg-[#8E8D8A]" };
}

function computeCdmxTime(): string {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Mexico_City",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  return formatter.format(new Date());
}

export default function StatusWidget({ label }: { label: string }) {
  const [time, setTime] = useState("");
  const [status, setStatus] = useState({ text: label, color: "bg-[#346538]" });

  useEffect(() => {
    setTime(computeCdmxTime());
    setStatus(computeCdmxStatus());
    const id = setInterval(() => {
      setTime(computeCdmxTime());
      setStatus(computeCdmxStatus());
    }, 30_000);
    return () => clearInterval(id);
  }, [label]);

  return (
    <div className="mb-8 flex flex-col sm:flex-row items-center gap-3 bg-surface border border-border rounded-full px-4 py-1.5 shadow-xs">
      <span className="flex items-center gap-2 text-[10px] font-mono font-semibold text-text-secondary uppercase tracking-wider">
        <span className={`w-2 h-2 rounded-full ${status.color} animate-pulse`} />
        {status.text}
      </span>
      <span className="hidden sm:inline text-border font-light">|</span>
      <span className="flex items-center gap-1.5 text-[10px] font-mono font-semibold text-text-muted uppercase tracking-wider">
        <Clock className="w-3.5 h-3.5 text-text-muted shrink-0" />
        cdmx • {time || "—"}
      </span>
    </div>
  );
}
