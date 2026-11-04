# ARD Travel — demo redizajna početne stranice

Frontend demo redizajna početne stranice turističke agencije **ARD Travel** (Sarajevo).
Vizuelni jezik prati referencu [Travel Agency – Tour Guide Booking Website](https://dribbble.com/shots/24495182-Travel-Agency-Tour-Guide-Booking-Website), a sadržaj, logotip, ponude, cijene i kontakt podaci preuzeti su sa [ardtravel.ba](https://ardtravel.ba) (provjereno 04.11.2026).

## Pokretanje

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm run start   # produkcijski build
```

## Tehnologije

Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · Motion · `next/image` (AVIF/WebP) · `next/font/local` (Satoshi).

## Struktura

```
src/
  app/            layout, globalni stilovi, stranica
  components/     Header, Hero, FeaturedTrips, SpecialOffers, Destinations,
                  HowToBook (+ PartnersStrip), About, Footer, Modals, ui, icons
  data/
    offers.ts     aranžmani (cijena, termin, trajanje, smještaj, prevoz, link na ardtravel.ba)
    agency.ts     kontakt, radno vrijeme, usluge, mjesta polaska
  fonts/          Satoshi (ITF Free Font License – vidi SATOSHI-LICENSE.txt)
public/
  brand/          originalni ARD Travel logotipi (sa ardtravel.ba)
  images/ard/     fotografije sa ardtravel.ba
  images/dest/    fotografije sa Unsplasha
```

Podaci su odvojeni od UI komponenti, pa se `src/data/offers.ts` može zamijeniti CMS-om ili API-jem bez izmjena u komponentama.

## Funkcionalnosti

- Hero slider s pet izdvojenih aranžmana (autoplay, pauza na hover, progres traka)
- Filtriranje po kategoriji (Dan državnosti, Nova godina, Proljeće 2027, Ljeto 2027), prevozu i pretraga (radi i bez dijakritika, npr. „bec“ → Beč)
- Kartice otvaraju detalje aranžmana s linkom na originalni program na ardtravel.ba
- Upit za putovanje: forma priprema e-mail na info@ardtravel.ba (bez backenda)
- Responsive navigacija, sticky header, animacije pri skrolanju, `prefers-reduced-motion`

## Fotografije

Fotografije agencije (ardtravel.ba): lale u Istanbulu, Prag (2), Amalfi/Atrani, Hotel Bella Vista Drvenik, Hotel Punta Vodice, Valamar Lacroma, Budva, Monako.

Unsplash ([Unsplash License](https://unsplash.com/license)):

| Fotografija | Autor |
| --- | --- |
| Toskana u zlatnoj magli (hero) | [Chris Barbalis](https://unsplash.com/photos/3wXLWkq8brE) |
| Val d'Orcia, Toskana | [Derek Vander Ark](https://unsplash.com/photos/1o31TmuCAwM) |
| Manarola, Cinque Terre | [Jack Ward](https://unsplash.com/photos/rknrvCrfS1k) |
| Venecija | [Damiano Baschiera](https://unsplash.com/photos/KtlBp_YttlY) |
| Milanska katedrala | [Fernando Meloni](https://unsplash.com/photos/x9Qixy7lbzo) |
| Ortaköy i Bosfor, Istanbul | [Meriç Dağlı](https://unsplash.com/photos/xmZ7nuqK7kg) |
| Koloseum, Rim | [Spencer Davis](https://unsplash.com/photos/ckotRXopwRM) |
| Dubrovnik | [Geio Tischler](https://unsplash.com/photos/rjHTWXyhWcE) |
| Baloni, Kapadokija | [Alex Azabache](https://unsplash.com/photos/b5a_p1JWHX8) |

## Napomene

- Ovo je demo prijedlog; rezervacije i plaćanje nisu implementirani.
- Za aranžman „Istanbul — Festival lala“ lista ponuda na ardtravel.ba navodi *Hotel 4\**, dok detaljan program navodi smještaj u hotelu 3\*. Demo prikazuje vrijednost s liste – preporučuje se provjera s agencijom.
- Nazivi hotela i prevoznika u traci partnera su tekstualni (bez tuđih logotipa) i odnose se na objekte/prevoznike iz aktuelne ponude.
