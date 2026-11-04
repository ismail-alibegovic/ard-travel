"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { departures, tripTypes } from "@/data/agency";
import { getOffer, offers } from "@/data/offers";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "./icons";
import { Chip, Reveal, SectionBadge, formatPrice } from "./ui";
import { useUI } from "./ui-state";

const destinationMeta = [
  { country: "Italija", image: "/images/dest/toskana-val-dorcia.jpg", focus: "50% 60%", alt: "Brežuljci južne Toskane" },
  { country: "Turska", image: "/images/dest/istanbul.jpg", focus: "50% 45%", alt: "Džamija Ortaköy i Bosfor u Istanbulu" },
  { country: "Hrvatska", image: "/images/dest/dubrovnik.jpg", focus: "50% 50%", alt: "Stari grad Dubrovnik" },
  { country: "Češka", image: "/images/ard/prag-vecer.jpg", focus: "55% 45%", alt: "Prag u sumrak" },
  { country: "Crna Gora", image: "/images/ard/budva-nova-godina.jpg", focus: "50% 50%", alt: "Budva u novogodišnjoj noći" },
  { country: "Francuska", image: "/images/ard/monako-nova-godina.jpg", focus: "50% 40%", alt: "Monako u novogodišnjoj noći" },
];

const destinations = destinationMeta.map((d) => {
  const list = offers.filter((o) => o.country === d.country);
  const places = Array.from(new Set(list.map((o) => o.shortTitle)));
  return { ...d, count: list.length, from: Math.min(...list.map((o) => o.price)), places };
});

const spotlight = getOffer("istanbul-festival-lala")!;

export function Destinations() {
  const { showCategory, openOffer } = useUI();
  const [i, setI] = useState(0);
  const d = destinations[i];
  const go = (n: number) => setI((n + destinations.length) % destinations.length);

  return (
    <section id="destinacije" className="bg-white py-20 lg:py-[110px]">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-20">
        <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:items-end">
          <Reveal>
            <SectionBadge>Destinacije</SectionBadge>
            <h2 className="mt-5 max-w-[520px] text-[32px] font-medium leading-[1.15] tracking-[-0.035em] sm:text-[40px] lg:text-[44px]">
              Istražite <span className="text-soft">najljepše destinacije</span> s nama.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-[17px] leading-[1.75] text-graphite">
              Od toskanskih brežuljaka do Bosfora – svaki aranžman ima detaljan plan i program putovanja i polazak iz
              Bosne i Hercegovine.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-8 lg:mt-11 lg:grid-cols-[318px_minmax(0,1fr)_342px] lg:gap-6">
          {/* Lijeva kolona */}
          <Reveal className="flex flex-col justify-between gap-12 lg:pr-4">
            <div>
              <h3 className="text-[19px] font-medium tracking-[-0.015em]">Polasci iz BiH</h3>
              <p className="mt-3 text-[15px] leading-[1.75] text-muted">
                Autobuski aranžmani polaze ispred Zemaljskog muzeja u Sarajevu, uz usputne stanice prema programu
                putovanja.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {departures.map((p) => (
                  <Chip key={p}>{p}</Chip>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-[19px] font-medium tracking-[-0.015em]">Vrste putovanja</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {tripTypes.map((t) => (
                  <Chip key={t}>{t}</Chip>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Glavna kartica destinacije */}
          <Reveal delay={0.05}>
            <div className="relative h-[440px] overflow-hidden rounded-[20px] bg-night sm:h-[500px]">
              <AnimatePresence initial={false}>
                <motion.div
                  key={d.country}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Image
                    src={d.image}
                    alt={d.alt}
                    fill
                    sizes="(min-width: 1024px) 560px, 100vw"
                    className="object-cover"
                    style={{ objectPosition: d.focus }}
                  />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

              <div className="absolute inset-x-6 bottom-6 flex items-end justify-between gap-4 text-white sm:inset-x-8 sm:bottom-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={d.country}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.4 }}
                    className="min-w-0"
                  >
                    <p className="text-[14px] text-white/80">
                      {d.count} {d.count === 1 ? "aranžman" : "aranžmana"} · od{" "}
                      {formatPrice(d.from)} KM
                    </p>
                    <button
                      type="button"
                      onClick={() => showCategory("sve", d.country)}
                      className="group mt-1 flex items-center gap-2 text-left text-[30px] font-medium tracking-[-0.03em] sm:text-[36px]"
                    >
                      {d.country}
                      <ArrowUpRight className="size-6 opacity-70 transition-transform duration-500 group-hover:rotate-45" />
                    </button>
                    <p className="mt-1 line-clamp-1 text-[14px] text-white/75">{d.places.join(" · ")}</p>
                  </motion.div>
                </AnimatePresence>
                <div className="flex shrink-0 gap-2.5">
                  <button
                    type="button"
                    onClick={() => go(i - 1)}
                    aria-label="Prethodna destinacija"
                    className="grid size-11 place-items-center rounded-full border border-white/60 text-white transition-colors hover:bg-white hover:text-ink"
                  >
                    <ArrowLeft className="size-[18px]" />
                  </button>
                  <button
                    type="button"
                    onClick={() => go(i + 1)}
                    aria-label="Sljedeća destinacija"
                    className="grid size-11 place-items-center rounded-full border border-white bg-white/10 text-white transition-colors hover:bg-white hover:text-ink"
                  >
                    <ArrowRight className="size-[18px]" />
                  </button>
                </div>
              </div>

              <div className="absolute left-6 top-6 flex gap-1.5 sm:left-8 sm:top-8" aria-hidden>
                {destinations.map((x, n) => (
                  <span
                    key={x.country}
                    className={`h-1 rounded-full transition-all duration-500 ${n === i ? "w-6 bg-white" : "w-1.5 bg-white/50"}`}
                  />
                ))}
              </div>
            </div>
          </Reveal>

          {/* Desna kolona – istaknuto iz ARD galerije */}
          <Reveal delay={0.1} className="flex flex-col">
            <button
              type="button"
              onClick={() => openOffer(spotlight)}
              className="group relative h-[230px] overflow-hidden rounded-[20px]"
              aria-label={`Detalji: ${spotlight.title}`}
            >
              <Image
                src="/images/ard/istanbul-lale.jpg"
                alt="Lale u Istanbulu i tabla ARD Travel"
                fill
                sizes="342px"
                className="object-cover transition-transform duration-700 ease-out-soft group-hover:scale-105"
                style={{ objectPosition: "50% 55%" }}
              />
              <span className="absolute left-1/2 top-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-ink shadow-lg transition-transform duration-500 group-hover:scale-110">
                <ArrowUpRight className="size-5" />
              </span>
            </button>
            <h3 className="mt-6 px-3 text-[20px] font-medium tracking-[-0.015em]">Festival lala s ARD Travelom</h3>
            <p className="mt-3 px-3 text-[15px] leading-[1.75] text-muted">
              Aprilski Istanbul u punom cvatu – direktan let Turkish Airlinesa iz Sarajeva, 14. – 18. aprila 2027.
            </p>
            <div className="mt-8 flex items-center px-3 lg:mt-auto">
              <button
                type="button"
                onClick={() => openOffer(spotlight)}
                className="flex h-[54px] flex-1 items-center justify-center rounded-full border border-ink text-[15px] font-medium transition-colors hover:bg-ink hover:text-white"
              >
                Pogledaj aranžman
              </button>
              <span className="grid size-[54px] place-items-center rounded-full bg-ink text-white">
                <ArrowUpRight className="size-5" />
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
