"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { ArrowUpRight, Sparkle } from "./icons";

/** Oznaka sekcije: krug sa zvjezdicom + pill, kao u referenci */
export function SectionBadge({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <div className="inline-flex items-center">
      <span
        className={`grid size-9 place-items-center rounded-full border ${
          dark ? "border-white bg-white text-ink" : "border-ink/15 bg-white text-ink"
        }`}
      >
        <Sparkle className="size-3.5" />
      </span>
      <span
        className={`-ml-px rounded-full border px-4 py-[7px] text-[13px] font-medium leading-none tracking-[-0.005em] ${
          dark ? "border-white bg-white text-ink" : "border-ink/15 bg-white text-ink"
        }`}
      >
        {children}
      </span>
    </div>
  );
}

/** Pill dugme s okruglom strelicom (Book Now iz reference) */
export function PillArrowButton({
  children,
  onClick,
  href,
  variant = "light",
  className = "",
  external = false,
}: {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: "light" | "dark" | "glass" | "outline";
  className?: string;
  external?: boolean;
}) {
  const styles = {
    light: "bg-white text-ink border-white",
    dark: "bg-ink text-white border-ink",
    glass: "bg-white/10 text-white border-white/30 backdrop-blur-md",
    outline: "bg-white text-ink border-ink/15",
  }[variant];
  const dot = {
    light: "bg-ink text-white",
    dark: "bg-white text-ink",
    glass: "bg-white text-ink",
    outline: "bg-ink text-white",
  }[variant];

  const inner = (
    <>
      <span className="pl-5 pr-3 text-[15px] font-medium tracking-[-0.01em]">{children}</span>
      <span
        className={`grid size-9 place-items-center rounded-full transition-transform duration-500 ease-out-soft group-hover:rotate-45 ${dot}`}
      >
        <ArrowUpRight className="size-4" />
      </span>
    </>
  );
  const cls = `group inline-flex h-12 items-center rounded-full border p-1 transition-colors duration-300 ${styles} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        className={cls}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {inner}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} className={cls}>
      {inner}
    </button>
  );
}

/** Odvojeno dugme + krug sa strelicom (hero „Book Now ↗“) */
export function SplitButton({ children, onClick }: { children: ReactNode; onClick?: () => void }) {
  return (
    <button type="button" onClick={onClick} className="group inline-flex items-center">
      <span className="flex h-12 items-center rounded-full bg-white px-7 text-[15px] font-medium text-ink transition-colors group-hover:bg-white/90">
        {children}
      </span>
      <span className="grid size-12 place-items-center rounded-full border border-white/70 text-white transition-all duration-500 ease-out-soft group-hover:rotate-45 group-hover:bg-white group-hover:text-ink">
        <ArrowUpRight className="size-5" />
      </span>
    </button>
  );
}

export function Chip({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-ink/15 px-3.5 py-1.5 text-[13px] font-medium leading-none text-ink ${className}`}
    >
      {children}
    </span>
  );
}

/** Suptilno pojavljivanje pri skrolanju */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export const formatPrice = (n: number) => n.toLocaleString("bs-BA").replace(/,/g, ".");
