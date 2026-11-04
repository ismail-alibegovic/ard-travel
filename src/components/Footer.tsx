"use client";

import Image from "next/image";
import { useState } from "react";
import { agency, telHref } from "@/data/agency";
import { ArrowUpRight, Facebook, Mail, Phone } from "./icons";
import { useUI } from "./ui-state";

const nav = [
  { href: "#top", label: "Početna" },
  { href: "#putovanja", label: "Putovanja" },
  { href: "#ponude", label: "Ponude" },
  { href: "#destinacije", label: "Destinacije" },
  { href: "#o-nama", label: "O agenciji" },
];

export function Footer() {
  const { openInquiry } = useUI();
  const [email, setEmail] = useState("");

  return (
    <footer id="kontakt" className="bg-white px-3 pb-3 sm:px-6 sm:pb-6">
      <div className="mx-auto max-w-[1392px] rounded-[28px] bg-night px-5 pb-10 pt-14 text-white sm:px-10 lg:rounded-[32px] lg:px-14 lg:pb-12 lg:pt-16">
        {/* CTA */}
        <div className="flex flex-col gap-8 border-b border-white/15 pb-12 lg:flex-row lg:items-center lg:justify-between lg:pb-11">
          <div>
            <h2 className="text-fade-dark text-[38px] font-normal leading-[1.05] tracking-[-0.04em] sm:text-[48px] lg:text-[56px]">
              Pošaljite upit danas!
            </h2>
            <p className="mt-3 text-[17px] font-light text-white/65 lg:text-[20px]">
              Javite nam se i pripremit ćemo putovanje po vašoj mjeri.
            </p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              openInquiry({ email });
            }}
            className="flex h-[60px] w-full items-center rounded-full border border-white/25 bg-white/[0.08] p-1.5 pl-6 lg:w-[420px]"
          >
            <label htmlFor="footer-email" className="sr-only">
              Vaša e-mail adresa
            </label>
            <input
              id="footer-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Vaša e-mail adresa"
              className="h-full min-w-0 flex-1 bg-transparent text-[16px] outline-none placeholder:text-white/45"
            />
            <button
              type="submit"
              className="h-full shrink-0 rounded-full bg-white px-6 text-[15px] font-medium text-ink transition-colors hover:bg-white/85"
            >
              Pošalji upit
            </button>
          </form>
        </div>

        <div className="grid gap-12 pt-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:pt-14">
          <div className="flex flex-col">
            <Image src="/brand/ard-logo-color.png" alt="ARD Travel" width={501} height={174} className="h-[58px] w-auto self-start" />
            <p className="mt-7 max-w-[400px] text-[15px] leading-[1.7] text-white/65">
              Privatna turistička agencija iz Sarajeva: paket aranžmani, ljetovanja, novogodišnja putovanja, avio karte,
              hotelske rezervacije i ARD Ground service za vaše goste.
            </p>
            <a
              href={agency.about}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-6 inline-flex items-center gap-2 self-start text-[15px] font-medium"
            >
              Više o nama
              <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:rotate-45" />
            </a>
          </div>

          <div>
            <nav aria-label="Navigacija u podnožju" className="flex flex-wrap gap-x-8 gap-y-3 lg:justify-end">
              {nav.map((n) => (
                <a key={n.href} href={n.href} className="text-[16px] text-white/65 transition-colors hover:text-white">
                  {n.label}
                </a>
              ))}
            </nav>

            <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:mt-[72px]">
              <div className="space-y-9">
                <div>
                  <h3 className="text-[15px] font-medium">Kontakt</h3>
                  <ul className="mt-4 space-y-2.5 text-[15px] text-white/65">
                    {agency.phones.map((p) => (
                      <li key={p}>
                        <a href={telHref(p)} className="inline-flex items-center gap-2 hover:text-white">
                          <Phone className="size-4" />
                          {p}
                        </a>
                      </li>
                    ))}
                    <li>
                      <a href={`mailto:${agency.email}`} className="inline-flex items-center gap-2 hover:text-white">
                        <Mail className="size-4" />
                        {agency.email}
                      </a>
                    </li>
                    <li className="text-white/45">Fax: {agency.fax}</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-[15px] font-medium">Lokacija</h3>
                  <address className="mt-4 text-[15px] not-italic leading-[1.7] text-white/65">
                    {agency.legalName}
                    <br />
                    {agency.address}, {agency.addressNote}
                    <br />
                    {agency.city}
                  </address>
                  <a
                    href={agency.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-3 inline-flex items-center gap-1.5 text-[14px] font-medium"
                  >
                    Otvori na mapi
                    <ArrowUpRight className="size-3.5 transition-transform group-hover:rotate-45" />
                  </a>
                </div>
              </div>
              <div className="space-y-9">
                <div>
                  <h3 className="text-[15px] font-medium">Radno vrijeme</h3>
                  <ul className="mt-4 space-y-2.5 text-[15px] text-white/65">
                    {agency.hours.map((h) => (
                      <li key={h.days}>
                        {h.days}: {h.time}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-[15px] font-medium">Agencija i uslovi</h3>
                  <ul className="mt-4 space-y-2.5 text-[15px] text-white/65">
                    <li>
                      <a href={agency.about} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                        O agenciji
                      </a>
                    </li>
                    <li>
                      <a href={agency.terms} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                        Opšti uslovi putovanja (PDF)
                      </a>
                    </li>
                    <li>
                      <a href={agency.contact} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                        Kontakt stranica
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between lg:mt-16">
          <div className="flex items-center gap-6">
            <a
              href={agency.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="ARD Travel na Facebooku"
              className="grid size-11 place-items-center rounded-full bg-white text-ink transition-transform hover:scale-105"
            >
              <Facebook className="size-5" />
            </a>
            <p className="text-[14px] leading-[1.5] text-white/55">
              © 2026 {agency.legalName}
              <br />
              ID {agency.idNumber} · PDV {agency.vatNumber}
            </p>
          </div>
          <p className="max-w-[420px] text-[12px] leading-[1.6] text-white/40 sm:text-right">
            Demo redizajna početne stranice. Podaci o aranžmanima preuzeti s ardtravel.ba; fotografije: ARD Travel i
            Unsplash.
          </p>
        </div>
      </div>
    </footer>
  );
}
