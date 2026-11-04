import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export const ArrowUpRight = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

export const ArrowRight = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M4 12h16M14 6l6 6-6 6" />
  </svg>
);

export const ArrowLeft = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M20 12H4M10 6l-6 6 6 6" />
  </svg>
);

/** Četverokraka zvjezdica iz reference */
export const Sparkle = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M12 1.5c.6 5.6 4.9 9.9 10.5 10.5-5.6.6-9.9 4.9-10.5 10.5C11.4 16.9 7.1 12.6 1.5 12 7.1 11.4 11.4 7.1 12 1.5Z" />
  </svg>
);

export const Search = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
);

export const Close = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const Menu = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M4 8h16M4 16h16" />
  </svg>
);

export const Calendar = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <rect x="3.5" y="5" width="17" height="15" rx="3" />
    <path d="M3.5 10h17M8 3v4M16 3v4" />
  </svg>
);

export const Plane = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M10.5 13.5 4 11l1.5-1.5 7 1 4-4c.8-.8 2.2-.8 3 0s.8 2.2 0 3l-4 4 1 7L15 22l-2.5-6.5L9 19v2.5L7.5 23 6 18l-5-1.5L2.5 15H5l3.5-3.5" />
  </svg>
);

export const Bus = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <rect x="4" y="3.5" width="16" height="15" rx="3" />
    <path d="M4 11h16M8 18.5V21M16 18.5V21M7.5 15h.01M16.5 15h.01" />
  </svg>
);

export const Bed = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M3 19V6M3 15h18v4M21 15v-3a3 3 0 0 0-3-3h-7v6" />
    <circle cx="7" cy="11" r="2" />
  </svg>
);

export const Clock = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </svg>
);

export const Phone = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
  </svg>
);

export const Mail = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <rect x="3" y="5" width="18" height="14" rx="3" />
    <path d="m4 7 8 6 8-6" />
  </svg>
);

export const Pin = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </svg>
);

export const Check = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);

export const Facebook = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9v2.3H8v3h2.5V21h3Z" />
  </svg>
);

export const TransportIcon = ({ transport, ...p }: P & { transport?: "Bus" | "Avion" }) =>
  transport === "Avion" ? <Plane {...p} /> : <Bus {...p} />;
