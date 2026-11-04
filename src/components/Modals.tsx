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
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeRef.current();
    document.addEventListener("keydown", onKey);
    const html = document.documentElement;
    html.style.overflow = "hidden";
    const t = setTimeout(() => panel.current?.focus({ preventScroll: true }), 50);
    return () => {
      clearTimeout(t);
      document.removeEventListener("keydown", onKey);
      html.style.overflow = "";
      prev?.focus?.({ preventScroll: true });
    };
  }, [open]);

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
            tabIndex={-1}
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
            className={`relative flex max-h-[92dvh] w-full flex-col overflow-hidden rounded-t-[24px] bg-white outline-none sm:max-h-[90dvh] sm:rounded-[28px] ${className}`}
          >
            <div aria-hidden className="relative h-[60px] shrink-0 border-b border-line sm:hidden">
              <span className="absolute left-1/2 top-2 h-1 w-10 -translate-x-1/2 rounded-full bg-black/15" />
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Zatvori"
              className="absolute right-3 top-2 z-20 grid size-11 place-items-center rounded-full bg-white/95 text-ink shadow-[0_2px_12px_rgba(0,0,0,0.12)] backdrop-blur transition-colors hover:bg-ink hover:text-white sm:right-4 sm:top-4"
            >
              <Close className="size-5" />
            </button>
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain pb-[env(safe-area-inset-bottom)]">
              {children}
            </div>
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
          <div className="relative h-[230px] sm:h-[300px] md:h-auto md:min-h-[600px]">
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

          <div className="flex min-w-0 flex-col p-5 sm:p-9">
            <p className="text-[14px] text-muted">{o.country}</p>
            <h2 className="mt-1 text-[26px] font-medium leading-[1.12] tracking-[-0.035em] sm:pr-10 sm:text-[36px]">{o.title}</h2>
            <p className="mt-4 text-[16px] leading-[1.7] text-graphite">{o.summary}</p>

            <dl className="mt-6 grid grid-cols-2 gap-2 sm:gap-3">
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
              <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
                <a
                  href={o.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-ink/15 px-4 text-[14px] font-medium transition-colors hover:border-ink sm:px-5"
                >
                  Program putovanja
                  <ArrowUpRight className="size-4" />
                </a>
                <button
                  type="button"
                  onClick={() => openInquiry({ offerSlug: o.slug })}
                  className="h-12 whitespace-nowrap rounded-full bg-ink px-4 text-[14px] font-medium text-white transition-colors hover:bg-graphite sm:px-6"
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
    <div className="flex min-w-0 items-start gap-2.5 rounded-2xl bg-pill p-3 sm:gap-3 sm:p-3.5">
      <span className="mt-0.5 text-muted">{icon}</span>
      <div className="min-w-0">
        <dt className="text-[12px] text-muted">{label}</dt>
        <dd className="mt-0.5 text-[14px] font-medium leading-snug">{value}</dd>
      </div>
    </div>
  );
}


type Errors = Partial<Record<"name" | "email" | "phone" | "travelers", string>>;

function validate(f: FormData): Errors {
  const e: Errors = {};
  const name = String(f.get("name") ?? "").trim();
  const email = String(f.get("email") ?? "").trim();
  const phone = String(f.get("phone") ?? "").trim();
  const travelers = Number(f.get("travelers"));
  if (name.length < 2) e.name = "Unesite ime i prezime.";
  if (!email) e.email = "Unesite e-mail adresu.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) e.email = "E-mail adresa nije ispravna.";
  if (phone && !/^[+()\d\s/-]{6,20}$/.test(phone)) e.phone = "Broj telefona nije ispravan.";
  if (!Number.isInteger(travelers) || travelers < 1 || travelers > 60) e.travelers = "Unesite broj od 1 do 60.";
  return e;
}

export function InquiryModal() {
  const { inquiry, closeInquiry } = useUI();
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState<{ subject: string; body: string } | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (inquiry.open) {
      setSent(null);
      setErrors({});
      setCopied(false);
    }
  }, [inquiry.open]);

  const mailto = (m: { subject: string; body: string }) =>
    `mailto:${agency.email}?subject=${encodeURIComponent(m.subject)}&body=${encodeURIComponent(m.body)}`;

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const errs = validate(f);
    setErrors(errs);
    if (Object.keys(errs).length) {
      const first = e.currentTarget.querySelector<HTMLElement>(`[name="${Object.keys(errs)[0]}"]`);
      first?.focus();
      return;
    }
    const offer = offers.find((o) => o.slug === f.get("offer"));
    const subject = `Upit: ${offer ? `${offer.title} (${offer.dateLabel})` : "putovanje po mjeri"}`;
    const body = [
      `Ime i prezime: ${String(f.get("name")).trim()}`,
      `E-mail: ${String(f.get("email")).trim()}`,
      `Telefon: ${String(f.get("phone") ?? "").trim() || "-"}`,
      `Aranžman: ${offer ? `${offer.title}, ${offer.dateLabel}, od ${offer.price} KM` : "Putovanje po mjeri"}`,
      `Broj putnika: ${f.get("travelers")}`,
      "",
      String(f.get("message") ?? "").trim(),
    ].join("\n");
    const msg = { subject, body };
    setSent(msg);
    window.location.href = mailto(msg);
  };

  const copy = async () => {
    if (!sent) return;
    try {
      await navigator.clipboard.writeText(`${sent.subject}\n\n${sent.body}`);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  const field = (err?: string) =>
    `mt-1.5 block h-12 w-full min-w-0 rounded-2xl border bg-white px-4 text-[16px] font-normal outline-none transition-colors placeholder:text-soft focus:border-ink/60 sm:text-[15px] ${
      err ? "border-red-500" : "border-ink/15"
    }`;
  const Err = ({ id, msg }: { id: string; msg?: string }) =>
    msg ? (
      <span id={id} role="alert" className="mt-1.5 block text-[13px] font-normal text-red-600">
        {msg}
      </span>
    ) : null;

  return (
    <Dialog open={inquiry.open} onClose={closeInquiry} label="Upit za putovanje" className="max-w-[640px]">
      <div className="p-5 sm:p-10">
        {sent ? (
          <div className="flex flex-col items-center py-6 text-center sm:py-8">
            <span className="grid size-16 place-items-center rounded-full bg-ink text-white">
              <Check className="size-7" />
            </span>
            <h2 className="mt-6 text-[26px] font-medium tracking-[-0.03em] sm:text-[28px]">Upit je pripremljen</h2>
            <p className="mt-3 max-w-[440px] text-[15px] leading-[1.7] text-muted">
              Otvorili smo vašu e-mail aplikaciju s porukom za {agency.email} – potrebno je još samo pritisnuti
              „Pošalji“. Ako se aplikacija nije otvorila, kopirajte upit ili nas pozovite.
            </p>
            <div className="mt-8 grid w-full max-w-[440px] gap-2 sm:grid-cols-2">
              <a
                href={mailto(sent)}
                className="flex h-12 items-center justify-center rounded-full bg-ink px-5 text-[15px] font-medium text-white"
              >
                Otvori e-mail ponovo
              </a>
              <button
                type="button"
                onClick={copy}
                className="h-12 rounded-full border border-ink/15 px-5 text-[15px] font-medium transition-colors hover:border-ink"
              >
                {copied ? "Kopirano ✓" : "Kopiraj tekst upita"}
              </button>
              <a
                href={telHref(agency.phones[0])}
                className="flex h-12 items-center justify-center rounded-full border border-ink/15 px-5 text-[15px] font-medium sm:col-span-2"
              >
                Pozovi {agency.phones[0]}
              </a>
            </div>
            <button type="button" onClick={closeInquiry} className="mt-6 text-[14px] text-muted underline underline-offset-4">
              Zatvori
            </button>
          </div>
        ) : (
          <>
            <h2 className="pr-12 text-[26px] font-medium leading-[1.1] tracking-[-0.035em] sm:text-[30px]">
              Upit za putovanje
            </h2>
            <p className="mt-2 text-[14px] leading-[1.6] text-muted sm:text-[15px]">
              Odgovaramo radnim danima od 09 do 17h i subotom od 09 do 15h.
            </p>
            <form
              key={`${inquiry.offerSlug}-${inquiry.email}`}
              onSubmit={onSubmit}
              noValidate
              className="mt-6 grid gap-4 sm:mt-7 sm:grid-cols-2"
            >
              <label className="block min-w-0 text-[13px] font-medium sm:col-span-2">
                Aranžman
                <span className="relative block">
                  <select
                    name="offer"
                    defaultValue={inquiry.offerSlug ?? ""}
                    className={`${field()} appearance-none truncate pr-10`}
                  >
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
                  <svg
                    aria-hidden
                    viewBox="0 0 24 24"
                    className="pointer-events-none absolute right-4 top-1/2 mt-[3px] size-4 -translate-y-1/2 text-muted"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </span>
              </label>
              <label className="block min-w-0 text-[13px] font-medium">
                Ime i prezime *
                <input
                  name="name"
                  autoComplete="name"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "err-name" : undefined}
                  className={field(errors.name)}
                  placeholder="Vaše ime"
                />
                <Err id="err-name" msg={errors.name} />
              </label>
              <label className="block min-w-0 text-[13px] font-medium">
                Broj putnika *
                <input
                  name="travelers"
                  type="number"
                  inputMode="numeric"
                  min={1}
                  max={60}
                  defaultValue={2}
                  aria-invalid={!!errors.travelers}
                  aria-describedby={errors.travelers ? "err-travelers" : undefined}
                  className={field(errors.travelers)}
                />
                <Err id="err-travelers" msg={errors.travelers} />
              </label>
              <label className="block min-w-0 text-[13px] font-medium">
                E-mail *
                <input
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  defaultValue={inquiry.email}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "err-email" : undefined}
                  className={field(errors.email)}
                  placeholder="ime@primjer.ba"
                />
                <Err id="err-email" msg={errors.email} />
              </label>
              <label className="block min-w-0 text-[13px] font-medium">
                Telefon
                <input
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? "err-phone" : undefined}
                  className={field(errors.phone)}
                  placeholder="+387 6x xxx xxx"
                />
                <Err id="err-phone" msg={errors.phone} />
              </label>
              <label className="block min-w-0 text-[13px] font-medium sm:col-span-2">
                Poruka
                <textarea
                  name="message"
                  rows={3}
                  maxLength={1000}
                  className={`${field()} h-auto min-h-[96px] resize-y py-3`}
                  placeholder="Željeni termin, tip sobe, mjesto polaska…"
                />
              </label>
              <div className="flex flex-col gap-3 pt-1 sm:col-span-2 sm:flex-row-reverse sm:items-center sm:justify-between">
                <button
                  type="submit"
                  className="h-12 w-full shrink-0 rounded-full bg-ink px-7 text-[15px] font-medium text-white transition-colors hover:bg-graphite sm:w-auto"
                >
                  Pošalji upit
                </button>
                <p className="text-[12px] leading-[1.5] text-soft">
                  * Obavezna polja. Upit se šalje putem vaše e-mail aplikacije na {agency.email}.
                </p>
              </div>
            </form>
          </>
        )}
      </div>
    </Dialog>
  );
}
