"use client";

import { offers, summerFromPrice, summerHotelCount, type CategoryId } from "@/data/offers";
import { ArrowRight } from "./icons";
import { Reveal, SectionBadge, formatPrice } from "./ui";
import { useUI } from "./ui-state";

/* ---------- Geometrija "chamfer" kartice iz reference ---------- */
type Pt = [number, number];
const W = 410;
const H = 400;
const R = 18; // radijus zaobljenja
const S = 0.85; // nagib dijagonale (dx po dy)

const mainShape: Pt[] = [
  [S * 228, 0],
  [W, 0],
  [W, 180],
  [W - S * 220, H],
  [0, H],
  [0, 228],
];
const tabShape: Pt[] = [
  [W + 22 - S * 80, 260],
  [W, 260],
  [W, H],
  [W + 22 - S * 220, H],
];

/** Pomjera konveksni poligon (u smjeru kazaljke) prema unutra za r */
function inset(points: Pt[], r: number): Pt[] {
  const n = points.length;
  const lines = points.map((p, i) => {
    const q = points[(i + 1) % n];
    const dx = q[0] - p[0];
    const dy = q[1] - p[1];
    const len = Math.hypot(dx, dy);
    // unutrašnja normala za poligon u smjeru kazaljke (y prema dolje)
    const nx = -dy / len;
    const ny = dx / len;
    return { p: [p[0] + nx * r, p[1] + ny * r] as Pt, d: [dx, dy] as Pt };
  });
  return lines.map((l, i) => {
    const m = lines[(i + n - 1) % n];
    const cross = m.d[0] * l.d[1] - m.d[1] * l.d[0];
    const t = ((l.p[0] - m.p[0]) * l.d[1] - (l.p[1] - m.p[1]) * l.d[0]) / cross;
    return [m.p[0] + m.d[0] * t, m.p[1] + m.d[1] * t] as Pt;
  });
}

const toPath = (pts: Pt[]) => `M${pts.map((p) => `${p[0].toFixed(2)} ${p[1].toFixed(2)}`).join("L")}Z`;
const MAIN = toPath(inset(mainShape, R));
const TAB = toPath(inset(tabShape, R));

/* ---------- Sadržaj ---------- */
/** Najniža cijena kompletnog aranžmana (s prevozom) u kategoriji */
const minPrice = (c: CategoryId) =>
  Math.min(...offers.filter((o) => o.category === c && o.transport).map((o) => o.price));

const cards: {
  id: CategoryId;
  title: [string, string];
  price: number;
  unit: string;
  text: string;
}[] = [
  {
    id: "novembar",
    title: ["Dan", "državnosti"],
    price: minPrice("novembar"),
    unit: "/ aranžman",
    text: "Venecija, Milano, Toskana, Prag, Dresden i Beč te Kapadokija. Polasci od 24. do 26. novembra 2026.",
  },
  {
    id: "nova-godina",
    title: ["Nova", "godina 2027"],
    price: minPrice("nova-godina"),
    unit: "/ aranžman",
    text: "Doček u Budvi, Dubrovniku, Milanu, Veneciji, Rimu, Pragu i na Azurnoj obali – autobusom ili avionom.",
  },
  {
    id: "ljeto",
    title: ["Ljeto", "2027"],
    price: summerFromPrice,
    unit: "/ rani booking",
    text: `${summerHotelCount} hotela na Jadranu i u Crnoj Gori po cijenama ranog bookinga – od Istre do Bara.`,
  },
];

export function SpecialOffers() {
  const { showCategory } = useUI();

  return (
    <section id="ponude" className="relative overflow-hidden bg-night pb-[88px] pt-14 text-white lg:pb-[120px] lg:pt-[80px]">
      {/* Linije mreže iz reference */}
      <div aria-hidden className="pointer-events-none absolute inset-0 mx-auto max-w-[1440px]">
        <span className="absolute inset-x-0 top-[60px] h-px bg-white/10" />
        <span className="absolute inset-y-0 left-[120px] hidden w-px bg-white/10 lg:block" />
        <span className="absolute inset-y-0 right-[120px] hidden w-px bg-white/10 lg:block" />
        <span className="absolute inset-x-0 bottom-[60px] h-px bg-white/10" />
      </div>

      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-20">
        <Reveal className="flex flex-col items-center pt-6 text-center">
          <SectionBadge dark>Posebne ponude</SectionBadge>
          <h2 className="text-balance mt-5 max-w-[640px] text-[32px] font-medium leading-[1.15] tracking-[-0.035em] sm:text-[40px] lg:text-[44px]">
            Odaberite savršenu <span className="text-white/45">ponudu</span> za vaše sljedeće putovanje.
          </h2>
        </Reveal>

        <div className="mx-auto mt-12 grid max-w-[440px] gap-5 lg:mt-[68px] lg:max-w-[1280px] lg:grid-cols-3 lg:gap-6">
          {cards.map((c, i) => (
            <Reveal key={c.id} delay={i * 0.1}>
              <OfferShape card={c} highlighted={i === 1} onClick={() => showCategory(c.id)} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function OfferShape({
  card,
  highlighted,
  onClick,
}: {
  card: (typeof cards)[number];
  highlighted: boolean;
  onClick: () => void;
}) {
  const fill = highlighted
    ? "fill-white stroke-white"
    : "fill-[#444444] stroke-[#444444] group-hover:fill-[#505050] group-hover:stroke-[#505050]";
  const ink = highlighted ? "text-ink" : "text-white";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`${card.title.join(" ")} – od ${card.price} KM. Prikaži ponude`}
      className="group @container relative block aspect-[410/400] w-full text-left"
    >
      <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 size-full overflow-visible" aria-hidden>
        <path
          d={MAIN}
          className={`${fill} transition-[fill,stroke] duration-500`}
          strokeWidth={R * 2}
          strokeLinejoin="round"
        />
        <path
          d={TAB}
          className={`${fill} transition-[fill,stroke] duration-500`}
          strokeWidth={R * 2}
          strokeLinejoin="round"
        />
      </svg>

      {/* Cijena u praznom gornjem lijevom uglu (na tamnoj pozadini) */}
      <div className="absolute left-[4%] top-[5%] text-white">
        <p className="whitespace-nowrap text-[clamp(22px,8.3cqw,34px)] font-medium leading-none tracking-[-0.03em]">
          <span className="mr-1 text-[0.5em] font-normal text-white/70">od</span>
          {formatPrice(card.price)}
          <span className="ml-1 text-[0.5em]">KM</span>
        </p>
        <p className="mt-1.5 whitespace-nowrap text-[clamp(12px,3.7cqw,15px)] text-white/90">{card.unit}</p>
      </div>

      <p
        className={`absolute right-[5%] top-[6%] w-[50%] text-[clamp(11.5px,3.4cqw,14px)] leading-[1.6] ${
          highlighted ? "text-graphite" : "text-white/75"
        }`}
      >
        {card.text}
      </p>

      <p
        className={`absolute bottom-[6%] left-[5%] text-[clamp(20px,7.6cqw,32px)] font-normal leading-[1.2] tracking-[-0.025em] ${ink}`}
      >
        {card.title[0]}
        <br />
        {card.title[1]}
      </p>

      <span className={`absolute bottom-[4%] right-[4%] flex flex-col items-end gap-1 ${ink}`}>
        <ArrowRight className="size-[8cqw] stroke-[1.3] transition-transform duration-500 ease-out-soft group-hover:translate-x-1" />
        <span className="text-[clamp(11px,3.3cqw,14px)] font-medium">Pogledaj</span>
      </span>
    </button>
  );
}
