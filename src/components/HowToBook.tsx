"use client";

import { agency, partners, telHref } from "@/data/agency";
import { Sparkle } from "./icons";
import { PillArrowButton, Reveal } from "./ui";
import { useUI } from "./ui-state";

const keywords = [
  "Avionom iz Sarajeva",
  "Autobusom",
  "Dan državnosti",
  "Nova godina 2027",
  "Festival lala",
  "Ljeto 2027",
  "Rani booking",
  "Gradska putovanja",
];

export function PartnersStrip() {
  return (
    <section aria-label="Hoteli i prevoznici iz naše ponude" className="border-y border-line bg-white">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-6 px-5 py-10 sm:px-8 xl:flex-row xl:justify-between xl:gap-10 lg:px-10 lg:py-[54px]">
        <p className="shrink-0 text-[13px] font-medium uppercase tracking-[0.14em] text-soft xl:hidden">
          Hoteli i prevoznici iz naše ponude
        </p>
        <ul className="flex flex-wrap items-center justify-center gap-x-9 gap-y-4 xl:w-full xl:flex-nowrap xl:justify-between">
          {partners.map((p, i) => (
            <li
              key={p}
              className={`whitespace-nowrap text-[22px] tracking-[-0.02em] text-[#a3a3a3] transition-colors duration-300 hover:text-ink lg:text-[28px] ${
                i % 3 === 0 ? "font-semibold" : i % 3 === 1 ? "font-medium italic" : "font-bold uppercase tracking-[-0.01em]"
              }`}
            >
              {p}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const steps = [
  {
    n: "01.",
    title: "Odaberite aranžman",
    text: "Pregledajte našu ponudu putovanja i odaberite destinaciju i termin koji najbolje odgovaraju vašim željama.",
  },
  {
    n: "02.",
    title: "Provjerite slobodna mjesta",
    text: `Pozovite nas na ${agency.phones[0]} ili pišite na ${agency.email} – potvrdit ćemo raspoloživost i odgovoriti na sva pitanja.`,
  },
  {
    n: "03.",
    title: "Potvrdite rezervaciju",
    text: "Rezervaciju završavate u našoj poslovnici u Hiseti 1 ili e-mailom, uz podatke o putnicima i željenom smještaju.",
  },
  {
    n: "04.",
    title: "Putujte bezbrižno",
    text: "Prije polaska dobijate sve informacije o mjestu sastanka i programu. Naša briga o vama počinje kod rezervacije, a završava se vašim povratkom.",
  },
];

export function HowToBook() {
  const { openInquiry } = useUI();
  return (
    <section aria-labelledby="kako-rezervisati" className="overflow-hidden bg-white">
      <Reveal>
        <h2
          id="kako-rezervisati"
          className="mx-auto max-w-[1440px] whitespace-nowrap px-4 pt-14 text-center text-[13.2vw] lg:text-[min(14.4vw,212px)] font-bold leading-[0.95] tracking-[-0.055em] lg:pt-[56px]"
        >
          Kako rezervisati
        </h2>
      </Reveal>

      {/* Marquee */}
      <div className="relative mt-4 overflow-hidden border-b border-line pb-7 lg:mt-8 lg:pb-[52px]" aria-hidden>
        <div className="animate-marquee flex w-max">
          {[0, 1].map((k) => (
            <ul key={k} className="flex shrink-0 items-center">
              {keywords.map((w) => (
                <li key={`${k}-${w}`} className="flex items-center">
                  <span className="whitespace-nowrap px-7 text-[24px] font-medium tracking-[-0.02em] lg:px-10 lg:text-[32px]">
                    {w}
                  </span>
                  <Sparkle className="size-6 text-[#b5b5b5] lg:size-7" />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      <div className="mx-auto grid max-w-[1440px] lg:grid-cols-3">
        <div className="flex flex-col items-center justify-center border-b border-line px-6 py-12 text-center lg:row-span-2 lg:border-b-0 lg:border-r lg:py-0">
          <Reveal className="flex flex-col items-center">
            <h3 className="text-[30px] font-medium tracking-[-0.035em] sm:text-[34px] lg:text-[38px]">4 jednostavna koraka</h3>
            <p className="mt-4 max-w-[400px] text-[16px] leading-[1.75] text-graphite">
              Rezervacija putovanja s ARD Travelom je jednostavna. Slijedite ova četiri koraka i osigurajte svoje mjesto
              na vrijeme.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:mt-12">
              <PillArrowButton variant="outline" onClick={() => openInquiry()}>
                Pošalji upit
              </PillArrowButton>
              <a
                href={telHref(agency.phones[0])}
                className="flex h-12 items-center rounded-full px-5 text-[15px] font-medium text-graphite underline-offset-4 hover:underline"
              >
                {agency.phones[0]}
              </a>
            </div>
          </Reveal>
        </div>
        {steps.map((s, i) => (
          <div
            key={s.n}
            className={`border-b border-line px-5 py-7 sm:px-8 sm:py-10 lg:px-8 lg:pb-[50px] lg:pt-[54px] ${
              i % 2 === 0 ? "lg:border-r" : ""
            } ${i >= 2 ? "lg:border-b-0" : ""}`}
          >
            <Reveal delay={i * 0.06}>
              <div className="flex items-baseline gap-4 lg:block">
                <p className="w-12 shrink-0 text-[26px] sm:w-[72px] font-medium tracking-[-0.04em] sm:text-[36px] lg:w-auto lg:text-[40px]">
                  {s.n}
                </p>
                <div className="min-w-0">
                  <h4 className="text-[20px] font-medium tracking-[-0.025em] sm:text-[22px] lg:mt-9">{s.title}</h4>
                  <p className="mt-2 text-[15px] leading-[1.7] text-muted sm:mt-3 sm:text-[16px] sm:leading-[1.75] lg:max-w-[400px]">
                    {s.text}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        ))}
      </div>
      <div className="border-b border-line" />
    </section>
  );
}
