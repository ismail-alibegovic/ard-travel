"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { getOffer, heroBackgrounds, heroSlugs, type Offer } from "@/data/offers";
import { TransportIcon } from "./icons";
import { SplitButton, formatPrice } from "./ui";
import { useUI } from "./ui-state";

const slides = heroSlugs.map((s) => getOffer(s)).filter(Boolean) as Offer[];
const AUTOPLAY_MS = 7000;
const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const { openOffer } = useUI();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const active = slides[index];

  const go = useCallback((i: number) => setIndex((i + slides.length) % slides.length), []);

  useEffect(() => {
    if (paused || reduce) return;
    const t = setTimeout(() => go(index + 1), AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [index, paused, reduce, go]);

  // Kartice desno: aktivna pa sljedeće
  const strip = slides.map((_, i) => slides[(index + i) % slides.length]);

  return (
    <section
      id="top"
      aria-label="Izdvojena putovanja"
      className="relative isolate flex min-h-[760px] flex-col overflow-hidden bg-night text-white lg:h-[100svh] lg:max-h-[1000px] lg:min-h-[820px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Pozadina s crossfade efektom */}
      <div className="absolute inset-0 -z-10">
        {slides.map((s, i) => {
          const bg = heroBackgrounds[s.slug];
          const on = i === index;
          return (
            <motion.div
              key={s.slug}
              className="absolute inset-0"
              initial={false}
              animate={{ opacity: on ? 1 : 0, scale: on && !reduce ? 1 : 1.06 }}
              transition={{ opacity: { duration: 1.2, ease }, scale: { duration: 8, ease: "linear" } }}
              aria-hidden={!on}
            >
              <Image
                src={bg.src}
                alt=""
                fill
                priority={i === 0}
                sizes="100vw"
                quality={80}
                className="object-cover"
                style={{ objectPosition: bg.focus }}
              />
            </motion.div>
          );
        })}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/70 lg:from-black/45 lg:via-black/5 lg:to-black/55" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_85%,rgba(0,0,0,0.45),transparent_55%)]" />
      </div>

      <div className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col px-5 pb-6 pt-28 sm:px-8 lg:px-20 lg:pb-8 lg:pt-[150px]">
        {/* Naslov */}
        <div className="flex flex-col items-center text-center">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
            className="rounded-full border border-white/30 bg-white/10 px-5 py-2.5 text-[13px] font-medium tracking-[-0.005em] backdrop-blur-md sm:text-[15px]"
          >
            Turistička agencija iz Sarajeva
          </motion.span>
          <h1 className="mt-5 text-[44px] font-light leading-[0.98] tracking-[-0.045em] sm:text-[64px] lg:mt-6 lg:text-[clamp(64px,6.4vw,94px)]">
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.1, ease }}
            >
              Putovanja skrojena
            </motion.span>
            <motion.span
              className="text-fade-white block pb-2 font-normal"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.22, ease }}
            >
              po <em className="font-normal italic">mjeri putnika</em>
            </motion.span>
          </h1>
        </div>

        {/* Donji dio: info lijevo, kartice desno */}
        <div className="mt-auto grid gap-8 pt-10 lg:grid-cols-[minmax(0,460px)_1fr] lg:items-end lg:gap-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.slug}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease }}
              className="max-w-[440px] lg:pb-2"
            >
              <p className="text-[26px] font-medium leading-[1.25] tracking-[-0.02em] lg:text-[28px]">
                {active.title}
                <span className="block font-normal text-white/90">{active.dateLabel}</span>
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <div className="flex items-center rounded-full border border-white/40 bg-white/10 p-1 backdrop-blur-md">
                  <span className="rounded-full bg-white px-3 py-1.5 text-[13px] font-semibold text-ink">
                    od {formatPrice(active.price)} KM
                  </span>
                  {active.days && <span className="px-3 text-[13px] font-medium">{active.days} dana</span>}
                  {active.transport && (
                    <span className="flex items-center gap-1.5 border-l border-white/30 px-3 text-[13px] font-medium">
                      <TransportIcon transport={active.transport} className="size-4" />
                      {active.transport === "Avion" ? "Avionom" : "Autobusom"}
                    </span>
                  )}
                </div>
                {active.badge && <span className="hidden text-[13px] text-white/80 sm:inline">{active.badge}</span>}
              </div>
              <p className="mt-5 hidden max-w-[340px] text-[14px] leading-[1.5] text-white/85 sm:block">{active.summary}</p>
              <div className="mt-6">
                <SplitButton onClick={() => openOffer(active)}>Pogledaj aranžman</SplitButton>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Kartice */}
          <div className="relative -mr-5 overflow-hidden sm:-mr-8 lg:-mr-20">
            <ul className="flex items-end gap-3 pr-5 lg:pr-0">
              {strip.map((s, i) => {
                const isActive = i === 0;
                return (
                  <motion.li
                    key={s.slug}
                    layout
                    transition={{ layout: { duration: 0.8, ease } }}
                    className={`shrink-0 ${isActive ? "w-[230px] sm:w-[280px] lg:w-[315px]" : "w-[120px] sm:w-[150px] lg:w-[180px]"}`}
                  >
                    <button
                      type="button"
                      onClick={() => (isActive ? openOffer(s) : go(slides.indexOf(s)))}
                      className="group block w-full text-left"
                      aria-label={isActive ? `Detalji: ${s.title}` : `Prikaži: ${s.title}`}
                    >
                      <div
                        className={`relative overflow-hidden rounded-[18px] ${
                          isActive ? "h-[170px] sm:h-[210px] lg:h-[258px]" : "h-[230px] sm:h-[290px] lg:h-[312px]"
                        }`}
                      >
                        <Image
                          src={s.image}
                          alt={s.imageAlt}
                          fill
                          sizes="(min-width:1024px) 320px, 240px"
                          className="object-cover transition-transform duration-700 ease-out-soft group-hover:scale-[1.06]"
                          style={{ objectPosition: s.focus }}
                        />
                        {!isActive && (
                          <span className="absolute inset-x-3 bottom-3 truncate text-[13px] font-medium text-white drop-shadow">
                            {s.shortTitle}
                          </span>
                        )}
                      </div>
                      {isActive && (
                        <div className="px-2 pt-3">
                          <div className="flex items-baseline justify-between gap-3">
                            <span className="truncate text-[17px] font-medium tracking-[-0.01em] lg:text-[19px]">
                              {s.shortTitle}
                            </span>
                            <span className="shrink-0 text-[15px] font-light text-white/90 lg:text-[17px]">
                              {s.days ? `${s.days} dana` : s.hotel}
                            </span>
                          </div>
                          <p className="mt-1.5 line-clamp-2 text-[13px] leading-[1.45] text-white/75">
                            {s.highlights.slice(0, 3).join(" · ")}
                          </p>
                        </div>
                      )}
                    </button>
                  </motion.li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Brojač i progres */}
        <div className="mt-7 flex items-center justify-between gap-8 lg:mt-9">
          <p className="font-light tabular-nums tracking-[-0.02em]" aria-live="polite">
            <span className="text-[30px] lg:text-[36px]">{String(index + 1).padStart(2, "0")}</span>
            <span className="text-[17px] text-white/70 lg:text-[20px]">/{String(slides.length).padStart(2, "0")}</span>
          </p>
          <div className="flex w-full max-w-[500px] gap-1.5" role="tablist" aria-label="Slajdovi">
            {slides.map((s, i) => (
              <button
                key={s.slug}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={s.title}
                onClick={() => go(i)}
                className="group relative h-6 flex-1"
              >
                <span className="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 overflow-hidden rounded-full bg-white/25">
                  <span
                    key={`${index}-${paused}`}
                    className="absolute inset-y-0 left-0 rounded-full bg-white"
                    style={{
                      width: i < index ? "100%" : i === index ? (paused || reduce ? "100%" : "0%") : "0%",
                      animation:
                        i === index && !paused && !reduce ? `hero-progress ${AUTOPLAY_MS}ms linear forwards` : undefined,
                    }}
                  />
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <style>{`@keyframes hero-progress { from { width: 0% } to { width: 100% } }`}</style>
    </section>
  );
}
