"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { agency, telHref } from "@/data/agency";
import { ArrowUpRight, Close, Menu } from "./icons";
import { useUI } from "./ui-state";

const links = [
  { href: "#top", id: "top", label: "Početna" },
  { href: "#putovanja", id: "putovanja", label: "Putovanja" },
  { href: "#ponude", id: "ponude", label: "Ponude" },
  { href: "#destinacije", id: "destinacije", label: "Destinacije" },
  { href: "#o-nama", id: "o-nama", label: "O agenciji" },
];

export function Header() {
  const { openInquiry } = useUI();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("top");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const els = links.map((l) => document.getElementById(l.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
        <div
          className={`pointer-events-auto mx-auto flex items-center justify-between transition-all duration-500 ease-out-soft ${
            scrolled
              ? "mt-3 max-w-[1240px] rounded-full bg-night/80 px-3 py-2 shadow-[0_10px_40px_-12px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:mx-4 lg:mx-auto lg:pl-6"
              : "mt-0 max-w-[1440px] px-4 py-4 sm:px-8 lg:px-20 lg:pt-9"
          }`}
        >
          <a href="#top" aria-label="ARD Travel – početna" className="relative shrink-0">
            <Image
              src="/brand/ard-logo-white.png"
              alt="ARD Travel"
              width={351}
              height={177}
              priority
              className={`w-auto transition-all duration-500 ${scrolled ? "h-9" : "h-11 lg:h-[54px]"}`}
            />
          </a>

          <nav
            aria-label="Glavna navigacija"
            className={`hidden items-center gap-1 rounded-full border p-1 transition-colors duration-500 lg:flex ${
              scrolled ? "border-transparent" : "border-white/25 bg-white/10 backdrop-blur-md"
            }`}
          >
            {links.map((l) => (
              <a
                key={l.id}
                href={l.href}
                className={`relative rounded-full px-5 py-2.5 text-[15px] font-medium tracking-[-0.01em] transition-colors duration-300 ${
                  active === l.id ? "text-ink" : "text-white/85 hover:text-white"
                }`}
              >
                {active === l.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-white"
                    transition={{ type: "spring", stiffness: 380, damping: 34 }}
                  />
                )}
                <span className="relative">{l.label}</span>
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => openInquiry()}
              className="group hidden h-[52px] items-center rounded-full border border-white/30 bg-white/10 p-1 pl-5 text-[15px] font-medium text-white backdrop-blur-md transition-colors hover:bg-white/20 sm:inline-flex"
            >
              Pošalji upit
              <span className="ml-3 grid size-[42px] place-items-center rounded-full bg-white text-ink transition-transform duration-500 ease-out-soft group-hover:rotate-45">
                <ArrowUpRight className="size-[18px]" />
              </span>
            </button>
            <button
              type="button"
              aria-label="Otvori meni"
              aria-expanded={open}
              onClick={() => setOpen(true)}
              className="grid size-12 place-items-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-md lg:hidden"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] flex flex-col bg-night px-5 pb-8 pt-4 text-white lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            role="dialog"
            aria-modal="true"
            aria-label="Meni"
          >
            <div className="flex items-center justify-between">
              <Image src="/brand/ard-logo-white.png" alt="ARD Travel" width={351} height={177} className="h-11 w-auto" />
              <button
                type="button"
                aria-label="Zatvori meni"
                onClick={() => setOpen(false)}
                className="grid size-12 place-items-center rounded-full border border-white/25"
              >
                <Close className="size-5" />
              </button>
            </div>
            <nav className="mt-14 flex flex-col">
              {links.map((l, i) => (
                <motion.a
                  key={l.id}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-center justify-between border-b border-white/10 py-5 text-[34px] font-light tracking-[-0.03em]"
                >
                  {l.label}
                  <ArrowUpRight className="size-6 text-white/40" />
                </motion.a>
              ))}
            </nav>
            <div className="mt-auto space-y-4">
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  openInquiry();
                }}
                className="flex h-14 w-full items-center justify-center rounded-full bg-white text-[16px] font-medium text-ink"
              >
                Pošalji upit
              </button>
              <div className="flex justify-between text-[14px] text-white/60">
                <a href={telHref(agency.phones[0])}>{agency.phones[0]}</a>
                <a href={`mailto:${agency.email}`}>{agency.email}</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
