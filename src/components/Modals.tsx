"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { agency, telHref } from "@/data/agency";
import { categories, offers } from "@/data/offers";
import { ArrowUpRight, Bed, Calendar, Check, Clock, Close, TransportIcon } from "./icons";
import { formatPrice } from "./ui";
import { useUI } from "./ui-state";

function Dialog({
  open,
  onClose,
  label,
  children,
  className = "",
}: {
  open: boolean;
  onClose: () => void;
  label: string;
  children: ReactNode;
  className?: string;
}) {
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => panel.current?.focus(), 50);
    return () => {
      clearTimeout(t);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      prev?.focus?.();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <button
            type="button"
            aria-label="Zatvori"
            className="absolute inset-0 cursor-default bg-black/55 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            ref={panel}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label={label}
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className={`relative max-h-[92svh] w-full overflow-y-auto rounded-t-[28px] bg-white outline-none sm:rounded-[28px] ${className}`}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Zatvori"
              className="absolute right-4 top-4 z-10 grid size-11 place-items-center rounded-full bg-white/90 text-ink shadow-sm backdrop-blur transition-colors hover:bg-ink hover:text-white"
            >
              <Close className="size-5" />
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function OfferModal() {
  const { activeOffer: o, closeOffer, openInquiry } = useUI();
  const category = o && categories.find((c) => c.id === o.category);

  return (
    <Dialog open={!!o} onClose={closeOffer} label={o?.title ?? "Aranžman"} className="max-w-[1040px]">
      {o && (
        <div className="grid md:grid-cols-[1fr_1.05fr]">
          <div className="relative h-[260px] md:h-auto md:min-h-[600px]">
            <Image
              src={o.image}
              alt={o.imageAlt}
              fill
              sizes="(min-width: 768px) 500px, 100vw"
              className="object-cover md:rounded-l-[28px]"
              style={{ objectPosition: o.focus }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent md:rounded-l-[28px]" />
            <div className="absolute bottom-5 left-5 flex flex-wrap gap-2">
              {o.badge && (
                <span className="rounded-full bg-white px-3 py-1.5 text-[12px] font-semibold text-ink">{o.badge}</span>
              )}
              {category && (
                <span className="rounded-full bg-black/40 px-3 py-1.5 text-[12px] font-medium text-white backdrop-blur">
                  {category.label}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col p-6 sm:p-9">
            <p className="text-[14px] text-muted">{o.country}</p>
            <h2 className="mt-1 pr-10 text-[30px] font-medium leading-[1.1] tracking-[-0.035em] sm:text-[36px]">{o.title}</h2>
            <p className="mt-4 text-[16px] leading-[1.7] text-graphite">{o.summary}</p>

            <dl className="mt-6 grid grid-cols-2 gap-3">
              <Fact icon={<Calendar className="size-[18px]" />} label="Termin" value={o.dateLabel} />
              {o.days && <Fact icon={<Clock className="size-[18px]" />} label="Trajanje" value={`${o.days} dana`} />}
              <Fact icon={<Bed className="size-[18px]" />} label="Smještaj" value={o.hotel} />
              {o.transport && (
                <Fact
                  icon={<TransportIcon transport={o.transport} className="size-[18px]" />}
                  label="Prevoz"
                  value={o.transport === "Avion" ? "Avion" : "Autobus"}
                />
              )}
            </dl>

            <h3 className="mt-7 text-[15px] font-medium">Iz programa</h3>
            <ul className="mt-3 space-y-2">
              {o.highlights.map((h) => (
                <li key={h} className="flex gap-3 text-[15px] text-graphite">
                  <Check className="mt-0.5 size-[18px] shrink-0 text-brand" />
                  {h}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-5 border-t border-line pt-6 sm:mt-auto sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[13px] text-muted">{o.badge === "Rani booking" ? "Cijena od" : "Cijena aranžmana od"}</p>
                <p className="mt-1 leading-none">
                  <span className="text-[40px] font-medium tracking-[-0.04em]">{formatPrice(o.price)}</span>
                  <span className="ml-1 text-[18px] font-medium">KM</span>
                  {o.regularPrice && (
                    <span className="ml-3 text-[14px] text-soft line-through">{formatPrice(o.regularPrice)} KM</span>
                  )}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <a
                  href={o.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 items-center gap-1.5 rounded-full border border-ink/15 px-5 text-[14px] font-medium transition-colors hover:border-ink"
                >
                  Program putovanja
                  <ArrowUpRight className="size-4" />
                </a>
                <button
                  type="button"
                  onClick={() => openInquiry({ offerSlug: o.slug })}
                  className="h-12 rounded-full bg-ink px-6 text-[14px] font-medium text-white transition-colors hover:bg-graphite"
                >
                  Pošalji upit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Dialog>
  );
}

function Fact({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl bg-pill p-3.5">
      <span className="mt-0.5 text-muted">{icon}</span>
      <div className="min-w-0">
        <dt className="text-[12px] text-muted">{label}</dt>
        <dd className="mt-0.5 text-[14px] font-medium leading-snug">{value}</dd>
      </div>
    </div>
  );
}

export function InquiryModal() {
  const { inquiry, closeInquiry } = useUI();
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (inquiry.open) setSent(false);
  }, [inquiry.open]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const offer = offers.find((o) => o.slug === f.get("offer"));
    const subject = `Upit: ${offer ? `${offer.title} (${offer.dateLabel})` : "putovanje po mjeri"}`;
    const body = [
      `Ime i prezime: ${f.get("name")}`,
      `E-mail: ${f.get("email")}`,
      `Telefon: ${f.get("phone") || "-"}`,
      `Aranžman: ${offer ? `${offer.title}, ${offer.dateLabel}, od ${offer.price} KM` : "Putovanje po mjeri"}`,
      `Broj putnika: ${f.get("travelers")}`,
      "",
      `${f.get("message") || ""}`,
    ].join("\n");
    window.location.href = `mailto:${agency.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const input =
    "mt-1.5 h-12 w-full rounded-2xl border border-ink/12 bg-white px-4 text-[15px] outline-none transition-colors placeholder:text-soft focus:border-ink/50";

  return (
    <Dialog open={inquiry.open} onClose={closeInquiry} label="Upit za putovanje" className="max-w-[640px]">
      <div className="p-6 sm:p-10">
        {sent ? (
          <div className="flex flex-col items-center py-10 text-center">
            <span className="grid size-16 place-items-center rounded-full bg-ink text-white">
              <Check className="size-7" />
            </span>
            <h2 className="mt-6 text-[28px] font-medium tracking-[-0.03em]">Hvala na upitu!</h2>
            <p className="mt-3 max-w-[420px] text-[15px] leading-[1.7] text-muted">
              Otvorili smo vaš e-mail program s pripremljenom porukom za {agency.email}. Ako se nije otvorio, pozovite nas
              na{" "}
              <a href={telHref(agency.phones[0])} className="font-medium text-ink underline underline-offset-4">
                {agency.phones[0]}
              </a>
              .
            </p>
            <button
              type="button"
              onClick={closeInquiry}
              className="mt-8 h-12 rounded-full bg-ink px-7 text-[15px] font-medium text-white"
            >
              Zatvori
            </button>
          </div>
        ) : (
          <>
            <h2 className="pr-12 text-[30px] font-medium leading-[1.1] tracking-[-0.035em]">Upit za putovanje</h2>
            <p className="mt-2 text-[15px] text-muted">
              Odgovaramo radnim danima od 09 do 17h i subotom od 09 do 15h.
            </p>
            <form
              key={`${inquiry.offerSlug}-${inquiry.email}`}
              onSubmit={onSubmit}
              className="mt-7 grid gap-4 sm:grid-cols-2"
            >
              <label className="text-[13px] font-medium sm:col-span-2">
                Aranžman
                <select name="offer" defaultValue={inquiry.offerSlug ?? ""} className={`${input} appearance-none`}>
                  <option value="">Putovanje po mjeri / opći upit</option>
                  {categories.map((c) => (
                    <optgroup key={c.id} label={c.label}>
                      {offers
                        .filter((o) => o.category === c.id)
                        .map((o) => (
                          <option key={o.slug} value={o.slug}>
                            {o.title} · {o.dateLabel} · od {o.price} KM
                          </option>
                        ))}
                    </optgroup>
                  ))}
                </select>
              </label>
              <label className="text-[13px] font-medium">
                Ime i prezime
                <input name="name" required autoComplete="name" className={input} placeholder="Vaše ime" />
              </label>
              <label className="text-[13px] font-medium">
                Broj putnika
                <input name="travelers" type="number" min={1} max={60} defaultValue={2} className={input} />
              </label>
              <label className="text-[13px] font-medium">
                E-mail
                <input
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  defaultValue={inquiry.email}
                  className={input}
                  placeholder="ime@primjer.ba"
                />
              </label>
              <label className="text-[13px] font-medium">
                Telefon
                <input name="phone" type="tel" autoComplete="tel" className={input} placeholder="+387 …" />
              </label>
              <label className="text-[13px] font-medium sm:col-span-2">
                Poruka
                <textarea
                  name="message"
                  rows={3}
                  className={`${input} h-auto resize-none py-3`}
                  placeholder="Željeni termin, tip sobe, mjesto polaska…"
                />
              </label>
              <div className="flex flex-col-reverse gap-3 pt-2 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-[12px] text-soft">Upit se šalje putem vašeg e-mail programa na {agency.email}.</p>
                <button
                  type="submit"
                  className="h-12 shrink-0 rounded-full bg-ink px-7 text-[15px] font-medium text-white transition-colors hover:bg-graphite"
                >
                  Pošalji upit
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </Dialog>
  );
}
