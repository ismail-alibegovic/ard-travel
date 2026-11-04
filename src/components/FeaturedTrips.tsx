"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import { categories, offers, type Offer, type Transport } from "@/data/offers";
import { ArrowLeft, ArrowRight, ArrowUpRight, Close, Search, TransportIcon } from "./icons";
import { Reveal, SectionBadge, formatPrice } from "./ui";
import { useUI } from "./ui-state";

const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "dj");

function matches(o: Offer, q: string) {
  if (!q) return true;
  const hay = normalize(
    [o.title, o.country, o.summary, o.hotel, o.dateLabel, ...o.highlights, o.transport ?? ""].join(" "),
  );
  return normalize(q)
    .split(/\s+/)
    .filter(Boolean)
    .every((w) => hay.includes(w));
}

export function FeaturedTrips() {
  const { filter, setFilter, openOffer, query, setQuery } = useUI();
  const [transport, setTransport] = useState<Transport | "sve">("sve");
  const q = useDeferredValue(query);
  const track = useRef<HTMLUListElement>(null);
  const [progress, setProgress] = useState({ pos: 0, size: 1 });

  const list = useMemo(
    () =>
      offers
        .filter((o) => filter === "sve" || o.category === filter)
        .filter((o) => transport === "sve" || o.transport === transport)
        .filter((o) => matches(o, q))
        .sort((a, b) => a.start.localeCompare(b.start)),
    [filter, transport, q],
  );

  const counts = useMemo(() => {
    const c: Record<string, number> = { sve: offers.length };
    categories.forEach((cat) => (c[cat.id] = offers.filter((o) => o.category === cat.id).length));
    return c;
  }, []);

  const updateProgress = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress({ pos: max > 0 ? el.scrollLeft / max : 0, size: Math.min(1, el.clientWidth / el.scrollWidth) });
  }, []);

  useEffect(() => {
    track.current?.scrollTo({ left: 0, behavior: "smooth" });
    const t = setTimeout(updateProgress, 400);
    return () => clearTimeout(t);
  }, [list, updateProgress]);

  useEffect(() => {
    window.addEventListener("resize", updateProgress);
    return () => window.removeEventListener("resize", updateProgress);
  }, [updateProgress]);

  const scrollBy = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("li");
    const step = card ? card.getBoundingClientRect().width + 24 : 320;
    el.scrollBy({ left: dir * step * (el.clientWidth > 900 ? 2 : 1), behavior: "smooth" });
  };

  const tabs = [{ id: "sve" as const, label: "Sva putovanja" }, ...categories];
  const thumb = Math.max(0.12, progress.size);

  return (
    <section id="putovanja" className="relative overflow-hidden bg-white pb-16 pt-16 sm:pb-20 sm:pt-20 lg:pb-28 lg:pt-[104px]">
      <div aria-hidden className="bg-grid-soft pointer-events-none absolute inset-0" />

      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-20">
        <Reveal className="flex flex-col items-center text-center">
          <SectionBadge>Izdvojena putovanja</SectionBadge>
          <h2 className="text-balance mt-5 max-w-[760px] text-[32px] font-medium leading-[1.15] tracking-[-0.035em] sm:text-[40px] lg:text-[48px]">
            Naši aranžmani <span className="text-soft">nude bezbrižno</span> i nezaboravno putovanje.
          </h2>
        </Reveal>

        {/* Filteri */}
        <Reveal delay={0.08} className="mt-9 flex flex-col items-center gap-4">
          <div className="no-scrollbar -mx-5 flex max-w-[calc(100%+40px)] gap-2 overflow-x-auto px-5 [mask-image:linear-gradient(90deg,#000_85%,transparent)] sm:mx-0 sm:[mask-image:none] sm:max-w-full sm:flex-wrap sm:justify-center sm:px-0">
            {tabs.map((t) => {
              const on = filter === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setFilter(t.id)}
                  aria-pressed={on}
                  className={`relative shrink-0 rounded-full px-6 py-3.5 text-[15px] font-medium tracking-[-0.01em] transition-colors duration-300 ${
                    on ? "text-white" : "bg-pill text-graphite hover:bg-line"
                  }`}
                >
                  {on && (
                    <motion.span
                      layoutId="trip-tab"
                      className="absolute inset-0 rounded-full bg-ink"
                      transition={{ type: "spring", stiffness: 380, damping: 34 }}
                    />
                  )}
                  <span className="relative">
                    {t.label}
                    <span className={`ml-2 text-[12px] ${on ? "text-white/60" : "text-soft"}`}>{counts[t.id]}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex w-full max-w-[640px] flex-col gap-2 sm:flex-row">
            <label className="flex h-12 w-full shrink-0 items-center sm:flex-1 gap-3 rounded-full border border-ink/12 bg-white px-5 transition-colors focus-within:border-ink/40">
              <Search className="size-[18px] text-soft" />
              <span className="sr-only">Pretraži putovanja</span>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Pretražite destinaciju…"
                className="h-full w-full min-w-0 bg-transparent text-[16px] outline-none sm:text-[15px] placeholder:text-soft [&::-webkit-search-cancel-button]:hidden"
              />
              {query && (
                <button type="button" onClick={() => setQuery("")} aria-label="Obriši pretragu" className="text-soft hover:text-ink">
                  <Close className="size-4" />
                </button>
              )}
            </label>
            <div className="flex h-12 items-center rounded-full border border-ink/12 bg-white p-1" role="group" aria-label="Prevoz">
              {(["sve", "Bus", "Avion"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTransport(t)}
                  aria-pressed={transport === t}
                  className={`flex h-full flex-1 items-center justify-center gap-1.5 rounded-full px-4 text-[14px] font-medium transition-colors sm:flex-none ${
                    transport === t ? "bg-pill text-ink" : "text-muted hover:text-ink"
                  }`}
                >
                  {t !== "sve" && <TransportIcon transport={t} className="size-4" />}
                  {t === "sve" ? "Sve" : t === "Bus" ? "Autobus" : "Avion"}
                </button>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      {/* Karusel */}
      <div className="relative mt-9 sm:mt-12 lg:mt-14">
        <AnimatePresence mode="popLayout">
          {list.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mx-auto flex h-[420px] max-w-md flex-col items-center justify-center px-5 text-center"
            >
              <p className="text-[22px] font-medium tracking-[-0.02em]">Nema putovanja za ovu pretragu</p>
              <p className="mt-2 text-[15px] text-muted">
                Pokušajte s drugim pojmom ili nas kontaktirajte – rado ćemo pripremiti ponudu po mjeri.
              </p>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setTransport("sve");
                  setFilter("sve");
                }}
                className="mt-6 rounded-full bg-ink px-6 py-3 text-[14px] font-medium text-white"
              >
                Prikaži sva putovanja
              </button>
            </motion.div>
          ) : (
            <motion.ul
              key="list"
              ref={track}
              onScroll={updateProgress}
              className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-5 pb-4 sm:gap-6 sm:px-8 lg:px-[max(80px,calc((100vw-1280px)/2))]"
            >
              {list.map((o, i) => (
                <TripCard key={o.slug} offer={o} index={i} onOpen={() => openOffer(o)} />
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>

      {/* Navigacija karusela */}
      {list.length > 0 && (
        <div className="relative mx-auto mt-6 flex max-w-[684px] items-center gap-5 px-5 sm:mt-10 sm:gap-8">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            aria-label="Prethodna putovanja"
            disabled={progress.pos <= 0.001}
            className="grid size-[60px] shrink-0 place-items-center rounded-full border border-ink/15 bg-white transition-colors hover:bg-ink hover:text-white disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-ink"
          >
            <ArrowLeft className="size-5" />
          </button>
          <div className="relative h-[3px] flex-1 rounded-full bg-line" aria-hidden>
            <span
              className="absolute inset-y-0 rounded-full bg-ink transition-[left] duration-200"
              style={{ width: `${thumb * 100}%`, left: `${progress.pos * (1 - thumb) * 100}%` }}
            />
          </div>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            aria-label="Sljedeća putovanja"
            disabled={progress.pos >= 0.999}
            className="grid size-[60px] shrink-0 place-items-center rounded-full border border-ink/15 bg-white transition-colors hover:bg-ink hover:text-white disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-ink"
          >
            <ArrowRight className="size-5" />
          </button>
        </div>
      )}
    </section>
  );
}

function TripCard({ offer: o, index, onOpen }: { offer: Offer; index: number; onOpen: () => void }) {
  const lowered = index % 2 === 0;
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: Math.min(index, 6) * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className={`w-[78vw] max-w-[311px] shrink-0 snap-start sm:w-[311px] ${lowered ? "sm:pt-[50px]" : ""}`}
    >
      <button type="button" onClick={onOpen} className="group block w-full text-left" aria-label={`Detalji aranžmana: ${o.title}`}>
        <div className="relative h-[380px] overflow-hidden rounded-[20px] bg-pill sm:h-[420px]">
          <Image
            src={o.image}
            alt={o.imageAlt}
            fill
            sizes="(min-width: 640px) 311px, 78vw"
            className="object-cover transition-transform duration-[900ms] ease-out-soft group-hover:scale-[1.05]"
            style={{ objectPosition: o.focus }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10 opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
          <div className="absolute inset-x-4 top-4 flex items-start justify-between gap-2">
            {o.badge ? (
              <span
                className={`rounded-full px-3 py-1.5 text-[12px] font-semibold leading-none ${
                  o.badge === "Garantovan polazak" ? "bg-brand text-white" : "bg-white/90 text-ink backdrop-blur"
                }`}
              >
                {o.badge}
              </span>
            ) : (
              <span />
            )}
            <span className="rounded-full bg-black/35 px-3 py-1.5 text-[12px] font-medium leading-none text-white backdrop-blur">
              {o.country}
            </span>
          </div>
          <div className="absolute inset-x-4 bottom-4 flex items-end justify-between text-white">
            <p className="leading-none">
              <span className="text-[12px] text-white/80">od </span>
              <span className="text-[30px] font-medium tracking-[-0.03em]">{formatPrice(o.price)}</span>
              <span className="text-[14px] font-medium"> KM</span>
            </p>
            {o.regularPrice && (
              <span className="mb-1 text-[12px] text-white/70 line-through">{formatPrice(o.regularPrice)} KM</span>
            )}
          </div>
        </div>
        <div className="flex items-start justify-between gap-3 px-2 pt-4">
          <div className="min-w-0 flex-1">
            <h3 className="line-clamp-2 text-[17px] font-medium leading-[1.3] tracking-[-0.015em] sm:text-[18px]">
              {o.title}
            </h3>
            <p className="mt-1.5 text-[14px] text-muted">{o.dateLabel}</p>
            <ul className="mt-2 flex flex-wrap gap-1.5 text-[12px] font-medium text-graphite">
              {o.days && <li className="rounded-full bg-pill px-2.5 py-1">{o.days} dana</li>}
              <li className="rounded-full bg-pill px-2.5 py-1">{o.hotel}</li>
              {o.transport && (
                <li className="inline-flex items-center gap-1 rounded-full bg-pill px-2.5 py-1">
                  <TransportIcon transport={o.transport} className="size-3.5" />
                  {o.transport === "Avion" ? "Avion" : "Autobus"}
                </li>
              )}
            </ul>
          </div>
          <span className="grid size-11 shrink-0 place-items-center rounded-full border border-ink/15 transition-all duration-500 ease-out-soft group-hover:rotate-45 group-hover:border-ink group-hover:bg-ink group-hover:text-white">
            <ArrowUpRight className="size-[18px]" />
          </span>
        </div>
      </button>
    </motion.li>
  );
}
