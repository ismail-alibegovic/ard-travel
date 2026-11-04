"use client";

import Image from "next/image";
import { agency, services } from "@/data/agency";
import { ArrowUpRight, Check } from "./icons";
import { Reveal, SectionBadge } from "./ui";

export function About() {
  return (
    <section id="o-nama" className="bg-white py-20 lg:py-[120px]">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 sm:px-8 lg:grid-cols-[minmax(0,1fr)_500px] lg:gap-20 lg:px-20">
        <div>
          <Reveal>
            <SectionBadge>O agenciji</SectionBadge>
            <p className="mt-7 text-[28px] font-medium leading-[1.3] tracking-[-0.03em] sm:text-[34px] lg:text-[40px]">
              ARD Travel je privatna turistička agencija iz Sarajeva.{" "}
              <span className="text-soft">
                Moto našeg poslovanja je putovanje skrojeno po mjeri putnika – uvažavajući potrebe i želje svakog
                pojedinca.
              </span>
            </p>
          </Reveal>

          <Reveal delay={0.08} className="mt-12 grid gap-4 sm:grid-cols-[1fr_1.15fr]">
            <div className="relative h-[260px] overflow-hidden rounded-[20px] sm:h-full sm:min-h-[300px]">
              <Image
                src="/images/ard/prag-vecer.jpg"
                alt="Prag u sumrak – jedna od destinacija ARD Travela"
                fill
                sizes="(min-width: 1024px) 380px, 100vw"
                className="object-cover"
                style={{ objectPosition: "60% 50%" }}
              />
            </div>
            <div className="flex flex-col justify-between rounded-[20px] bg-pill p-7">
              <p className="text-[16px] leading-[1.75] text-graphite">
                „Naša briga o vama počinje već kod rezervacije, a završava se vašim povratkom. Zahvaljujemo se svima koji
                su odlučili svoje povjerenje pokloniti nama i dopustiti da im snove pretvorimo u stvarnost.“
              </p>
              <a
                href={agency.about}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-8 inline-flex items-center gap-2 text-[15px] font-medium"
              >
                Više o agenciji
                <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:rotate-45" />
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.12} className="lg:pt-[60px]">
          <h3 className="text-[19px] font-medium tracking-[-0.015em]">Šta nudimo</h3>
          <ul className="mt-5 divide-y divide-line border-y border-line">
            {services.map((s) => (
              <li key={s} className="flex items-start gap-4 py-4 text-[16px] text-graphite">
                <Check className="mt-0.5 size-5 shrink-0 text-brand" />
                {s}
              </li>
            ))}
          </ul>

          <dl className="mt-10 grid gap-6 text-[15px] sm:grid-cols-2">
            <div>
              <dt className="text-soft">Poslovnica</dt>
              <dd className="mt-1.5 leading-[1.6] text-ink">
                {agency.address}
                <br />
                <span className="text-muted">{agency.addressNote}</span>
              </dd>
            </div>
            <div>
              <dt className="text-soft">Radno vrijeme</dt>
              <dd className="mt-1.5 leading-[1.6] text-ink">
                {agency.hours.map((h) => (
                  <span key={h.days} className="block">
                    {h.days.replace("Ponedjeljak – petak", "Pon – pet")}: {h.time}
                  </span>
                ))}
              </dd>
            </div>
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
