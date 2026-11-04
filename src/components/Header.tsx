"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { agency, telHref } from "@/data/agency";
import { ArrowUpRight, Close, Mail, Menu, Phone } from "./icons";
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
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const isScrolled = y > window.innerHeight * 0.6;
      setScrolled(isScrolled);
      // Na telefonu: sakrij pri skrolu nadolje, prikaži pri skrolu nagore
      if (Math.abs(y - lastY) > 6) {
        setHidden(isScrolled && y > lastY && y > window.innerHeight);
        lastY = y;
      }
    };
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
      <header
        className={`pointer-events-none fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)] transition-transform duration-500 ease-out-soft ${
          hidden && !open ? "max-lg:-translate-y-[130%]" : ""
        }`}
      >
        <div
          className={`pointer-events-auto flex items-center justify-between transition-[margin,padding,background-color,box-shadow,max-width,height] duration-500 ease-out-soft ${
            scrolled
              ? "mx-3 mt-2.5 h-[60px] rounded-full bg-night/90 pl-5 pr-2 shadow-[0_12px_32px_-12px_rgba(0,0,0,0.55)] ring-1 ring-white/10 backdrop-blur-xl sm:mx-5 lg:mx-auto lg:mt-3 lg:h-[68px] lg:max-w-[1240px] lg:pl-6"
              : "mx-auto h-[76px] max-w-[1440px] px-5 sm:px-8 lg:h-auto lg:px-20 lg:pt-9"
          }`}
        >
          <a href="#top" aria-label="ARD Travel – početna" className="relative shrink-0">
            <Image
              src="/brand/ard-logo-white.png"
              alt="ARD Travel"
              width={351}
              height={177}
              priority
              className={`w-auto transition-all duration-500 ${scrolled ? "h-[30px] lg:h-9" : "h-10 lg:h-[54px]"}`}
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
              className={`group hidden items-center rounded-full border p-1 pl-5 text-[15px] font-medium text-white transition-colors sm:inline-flex ${
                scrolled
                  ? "h-11 border-white/15 bg-white/5 hover:bg-white/15 lg:h-[52px]"
                  : "h-[52px] border-white/30 bg-white/10 backdrop-blur-md hover:bg-white/20"
              }`}
            >
              Pošalji upit
              <span className="ml-3 grid aspect-square h-full place-items-center rounded-full bg-white text-ink transition-transform duration-500 ease-out-soft group-hover:rotate-45">
                <ArrowUpRight className="size-[18px]" />
              </span>
            </button>
            {scrolled && (
              <button
                type="button"
                onClick={() => openInquiry()}
                className="h-11 rounded-full bg-white px-5 text-[14px] font-semibold text-ink active:scale-[0.97] sm:hidden"
              >
                Upit
              </button>
            )}
            <button
              type="button"
              aria-label="Otvori meni"
              aria-expanded={open}
              onClick={() => setOpen(true)}
              className={`grid size-11 place-items-center rounded-full text-white transition-colors active:scale-[0.96] lg:hidden ${
                scrolled ? "bg-white/10" : "border border-white/30 bg-white/10 backdrop-blur-md"
              }`}
            >
              <Menu className="size-5" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] flex flex-col overflow-y-auto overscroll-contain bg-night px-5 pb-[max(24px,env(safe-area-inset-bottom))] pt-[env(safe-area-inset-top)] text-white lg:hidden"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Meni"
          >
            <div className="flex h-[76px] shrink-0 items-center justify-between">
              <Image src="/brand/ard-logo-white.png" alt="ARD Travel" width={351} height={177} className="h-10 w-auto" />
              <button
                type="button"
                aria-label="Zatvori meni"
                onClick={() => setOpen(false)}
                className="grid size-11 place-items-center rounded-full bg-white/10 active:scale-[0.96]"
              >
                <Close className="size-5" />
              </button>
            </div>
            <nav aria-label="Mobilna navigacija" className="mt-6 flex flex-col">
              {links.map((l, i) => (
                <motion.a
                  key={l.id}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 + i * 0.045, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  aria-current={active === l.id ? "true" : undefined}
                  className={`flex items-center justify-between border-b border-white/10 py-[18px] text-[30px] font-light leading-none tracking-[-0.03em] transition-colors ${
                    active === l.id ? "text-white" : "text-white/60"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    {active === l.id && <span className="size-2 rounded-full bg-brand" aria-hidden />}
                    {l.label}
                  </span>
                  <ArrowUpRight className="size-5 text-white/35" />
                </motion.a>
              ))}
            </nav>
            <div className="mt-auto space-y-5 pt-10">
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  openInquiry();
                }}
                className="flex h-14 w-full items-center justify-center rounded-full bg-white text-[16px] font-medium text-ink active:scale-[0.98]"
              >
                Pošalji upit
              </button>
              <div className="grid grid-cols-2 gap-2 text-[14px]">
                <a
                  href={telHref(agency.phones[0])}
                  className="flex h-12 items-center justify-center gap-2 rounded-full border border-white/15 text-white/85"
                >
                  <Phone className="size-4" />
                  Pozovi
                </a>
                <a
                  href={`mailto:${agency.email}`}
                  className="flex h-12 items-center justify-center gap-2 rounded-full border border-white/15 text-white/85"
                >
                  <Mail className="size-4" />
                  E-mail
                </a>
              </div>
              <p className="text-center text-[13px] leading-[1.6] text-white/45">
                {agency.address}, Sarajevo · {agency.phones[0]}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
