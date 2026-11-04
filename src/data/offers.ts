/**
 * Stvarne ponude ARD Travela preuzete sa https://ardtravel.ba (provjereno 04.11.2026).
 * Cijene, termini, trajanje, smještaj i prevoz odgovaraju objavljenim aranžmanima.
 * Podaci su odvojeni od UI komponenti kako bi se lako zamijenili CMS-om ili API-jem.
 */

export type Transport = "Bus" | "Avion";

export type CategoryId = "novembar" | "nova-godina" | "proljece" | "ljeto";

export type Category = {
  id: CategoryId;
  label: string;
  short: string;
};

export type Offer = {
  slug: string;
  title: string;
  /** Kratki naziv za kartice i hero */
  shortTitle: string;
  country: string;
  category: CategoryId;
  /** ISO datum polaska – koristi se za sortiranje */
  start: string;
  /** Termin kako je objavljen na stranici agencije */
  dateLabel: string;
  days?: number;
  hotel: string;
  transport?: Transport;
  /** Cijena "od" u KM */
  price: number;
  /** Redovna cijena, ako je objavljena */
  regularPrice?: number;
  badge?: "First minute" | "Garantovan polazak" | "Rani booking";
  summary: string;
  highlights: string[];
  image: string;
  imageAlt: string;
  /** object-position za kadriranje fotografije */
  focus?: string;
  url: string;
};

export const categories: Category[] = [
  { id: "novembar", label: "Dan državnosti", short: "Novembar 2026" },
  { id: "nova-godina", label: "Nova godina", short: "Doček 2027" },
  { id: "proljece", label: "Proljeće 2027", short: "April – maj" },
  { id: "ljeto", label: "Ljeto 2027", short: "Rani booking" },
];

const ARD = "https://ardtravel.ba";

export const offers: Offer[] = [
  {
    slug: "istanbul-festival-lala",
    title: "Istanbul — Festival lala",
    shortTitle: "Istanbul",
    country: "Turska",
    category: "proljece",
    start: "2027-04-14",
    dateLabel: "14.04. – 18.04.2027.",
    days: 5,
    hotel: "Hotel 4*",
    transport: "Avion",
    price: 799,
    regularPrice: 949,
    badge: "First minute",
    summary:
      "Aprilski Istanbul u punom cvatu. Direktan let Turkish Airlinesa iz Sarajeva, Sultanahmet, krstarenje Bosforom i tursko veče na brodu.",
    highlights: [
      "Taksim, Istiklal ulica i Galata kula",
      "Sultanahmet, Hipodrom i park Gülhane",
      "Krstarenje Bosforom i Kapali čaršija",
      "Sulejmanija, Zlatni rog i Pierre Loti",
      "Azijska strana i tursko veče na brodu",
    ],
    image: "/images/ard/istanbul-lale.jpg",
    imageAlt: "Lale u istanbulskom parku s tablom ARD Travel",
    focus: "50% 55%",
    url: `${ARD}/bs/putovanja-april/istanbul`,
  },
  {
    slug: "amalfi-capri-pompeji-napulj",
    title: "Amalfi, Capri, Pompeji i Napulj",
    shortTitle: "Amalfijska obala",
    country: "Italija",
    category: "proljece",
    start: "2027-05-13",
    dateLabel: "13.05. – 17.05.2027.",
    days: 5,
    hotel: "Hotel 3*",
    transport: "Avion",
    price: 1799,
    regularPrice: 2399,
    badge: "First minute",
    summary:
      "Let iz Dubrovnika za Napulj i cjelodnevni izleti uključeni u cijenu: Pompeji, Sorrento, Amalfi, Positano i ostrvo Capri.",
    highlights: [
      "Razgled Napulja podno Vezuva",
      "Arheološko nalazište Pompeji",
      "Sorrento, Amalfi i Positano",
      "Cjelodnevni izlet na Capri",
      "Izleti uključeni u cijenu",
    ],
    image: "/images/ard/amalfi-atrani.jpg",
    imageAlt: "Atrani na Amalfijskoj obali",
    focus: "30% 60%",
    url: `${ARD}/bs/amalfi-capri-pompeji-napulj`,
  },
  {
    slug: "toskana-cinque-terre",
    title: "Toskana i Cinque Terre",
    shortTitle: "Toskana",
    country: "Italija",
    category: "novembar",
    start: "2026-11-24",
    dateLabel: "24.11. – 29.11.2026.",
    days: 5,
    hotel: "Hotel 3*",
    transport: "Bus",
    price: 449,
    badge: "First minute",
    summary:
      "Bologna, Firenca, Lucca, pet sela Cinque Terre i Pisa. Smještaj u termalnom gradiću Montecatini Terme.",
    highlights: [
      "Bologna – grad najstarijeg univerziteta",
      "Firenca i Lucca uz vodiča",
      "Cinque Terre",
      "Pisa na povratku",
      "Polazak iz Sarajeva, Zenice i Doboja",
    ],
    image: "/images/dest/cinque-terre.jpg",
    imageAlt: "Manarola, Cinque Terre",
    focus: "40% 45%",
    url: `${ARD}/bs/putovanja-u-novembru-dan-drzavnosti/toskana-cinque-terre`,
  },
  {
    slug: "juzna-toskana-i-rim",
    title: "Južna Toskana i Rim",
    shortTitle: "Južna Toskana",
    country: "Italija",
    category: "novembar",
    start: "2026-11-24",
    dateLabel: "24.11. – 29.11.2026.",
    days: 5,
    hotel: "Hotel 3*",
    transport: "Bus",
    price: 449,
    badge: "First minute",
    summary:
      "Arezzo, Chianciano Terme, Montalcino, Pienza i Montepulciano – vinska Toskana – te završni dan u Vječnom gradu.",
    highlights: [
      "Arezzo – kulisa filma „Život je lijep“",
      "Montalcino, Pienza i Montepulciano",
      "Smještaj u Chianciano Terme",
      "Razgled Rima",
    ],
    image: "/images/dest/toskana-val-dorcia.jpg",
    imageAlt: "Čempresi i brežuljci južne Toskane u jutarnjoj magli",
    focus: "50% 60%",
    url: `${ARD}/bs/putovanja-u-novembru-dan-drzavnosti/juzna-toskana-i-rim-novembar`,
  },
  {
    slug: "prag-dresden-bec",
    title: "Prag, Dresden i Beč",
    shortTitle: "Prag",
    country: "Češka",
    category: "novembar",
    start: "2026-11-25",
    dateLabel: "25.11. – 30.11.2026.",
    days: 5,
    hotel: "Hotel 3*",
    transport: "Bus",
    price: 374,
    badge: "Garantovan polazak",
    summary:
      "„Zlatni Prag kroz vrijeme“, krstarenje Vltavom, barokni Dresden na Elbi i Beč na povratku. Garantovan polazak.",
    highlights: [
      "Hradčani, Karlov most i Praški orloj",
      "Večernje krstarenje Vltavom",
      "Dresden – Zwinger i Semperoper",
      "Beč na povratku",
    ],
    image: "/images/ard/prag-jesen.jpg",
    imageAlt: "Mostovi na Vltavi u jesen, Prag",
    focus: "45% 50%",
    url: `${ARD}/bs/putovanja-u-novembru-dan-drzavnosti/prag`,
  },
  {
    slug: "milano-novembar",
    title: "Milano",
    shortTitle: "Milano",
    country: "Italija",
    category: "novembar",
    start: "2026-11-26",
    dateLabel: "26.11. – 30.11.2026.",
    days: 4,
    hotel: "Hotel 3*",
    transport: "Bus",
    price: 389,
    badge: "First minute",
    summary:
      "Gratis panoramski obilazak Milana – Sforza, Duomo, Scala i Galerija Vittorio Emanuele – uz fakultativne izlete u Genovu i Serravalle.",
    highlights: [
      "Duomo, Scala i Galerija Vittorio Emanuele",
      "Dvorac Sforza",
      "Genova i outlet Serravalle (fakultativno)",
      "Polasci iz Sarajeva, Visokog, Zenice, Maglaja i Doboja",
    ],
    image: "/images/dest/milano.jpg",
    imageAlt: "Milanska katedrala odražena u lokvi na trgu",
    focus: "50% 55%",
    url: `${ARD}/bs/putovanja-u-novembru-dan-drzavnosti/prag-2bb/milano`,
  },
  {
    slug: "venecija-novembar",
    title: "Venecija",
    shortTitle: "Venecija",
    country: "Italija",
    category: "novembar",
    start: "2026-11-26",
    dateLabel: "26.11. – 30.11.2026.",
    days: 4,
    hotel: "Hotel 3*",
    transport: "Bus",
    price: 319,
    badge: "First minute",
    summary:
      "Vaporetom do Trga Svetog Marka, Duždeva palata i most Rialto, uz izlet u romantičnu Veronu i Padovu.",
    highlights: [
      "Trg Sv. Marka, Duždeva palata i Rialto",
      "Verona – Arena i Julijina kuća",
      "Padova – Bazilika Sv. Ante",
      "Polasci iz Sarajeva, Visokog, Kaknja, Zenice, Maglaja i Doboja",
    ],
    image: "/images/dest/venecija.jpg",
    imageAlt: "Gondole na kanalu u Veneciji",
    focus: "50% 60%",
    url: `${ARD}/bs/putovanja-u-novembru-dan-drzavnosti/venecija`,
  },
  {
    slug: "kapadokija",
    title: "Kapadokija",
    shortTitle: "Kapadokija",
    country: "Turska",
    category: "novembar",
    start: "2026-11-24",
    dateLabel: "24.11. – 28.11.2026.",
    days: 5,
    hotel: "Hotel 3*",
    transport: "Avion",
    price: 1199,
    summary:
      "Let preko Istanbula do Kayserija/Nevşehira i fakultativni let balonom u svitanje iznad „vilinskih dimnjaka“ Kapadokije.",
    highlights: [
      "Let iz Sarajeva preko Istanbula",
      "Let balonom u svitanje (fakultativno)",
      "Vilinski dimnjaci",
    ],
    image: "/images/dest/kapadokija.jpg",
    imageAlt: "Baloni iznad Kapadokije",
    focus: "50% 40%",
    url: `${ARD}/bs/putovanja-u-novembru-dan-drzavnosti/kapadokija`,
  },
  {
    slug: "budva-nova-godina",
    title: "Budva — Nova godina",
    shortTitle: "Budva",
    country: "Crna Gora",
    category: "nova-godina",
    start: "2026-12-31",
    dateLabel: "31.12.2026. – 02.01.2027.",
    days: 3,
    hotel: "Hotel 4*",
    transport: "Bus",
    price: 299,
    regularPrice: 359,
    badge: "First minute",
    summary:
      "Doček uz Željka Joksimovića u Budvi i koncert Dine Merlina u Baru, uključen u cijenu aranžmana.",
    highlights: [
      "Doček u Budvi uz Željka Joksimovića",
      "Koncert Dine Merlina u Baru",
      "Stari grad i budvanska riva",
    ],
    image: "/images/ard/budva-nova-godina.jpg",
    imageAlt: "Vatromet iznad Budve",
    focus: "50% 50%",
    url: `${ARD}/bs/nova-godina-bus/budva-nova-godina`,
  },
  {
    slug: "dubrovnik-nova-godina",
    title: "Dubrovnik — Nova godina",
    shortTitle: "Dubrovnik",
    country: "Hrvatska",
    category: "nova-godina",
    start: "2026-12-31",
    dateLabel: "31.12.2026. – 02.01.2027.",
    days: 3,
    hotel: "Grand hotel Park 4*",
    transport: "Bus",
    price: 469,
    regularPrice: 519,
    badge: "First minute",
    summary:
      "Doček 2027. na Stradunu uz Crvenu jabuku, Plavi orkestar i Adija Šošea. Dva noćenja s polupansionom u Grand hotelu Park 4*.",
    highlights: [
      "Doček na Stradunu",
      "2 noćenja na bazi polupansiona",
      "Unutrašnji bazen i sauna",
    ],
    image: "/images/dest/dubrovnik.jpg",
    imageAlt: "Stari grad Dubrovnik iz zraka u zlatnom satu",
    focus: "50% 50%",
    url: `${ARD}/bs/nova-godina-bus/dubrovnik`,
  },
  {
    slug: "milano-nova-godina",
    title: "Milano — Nova godina",
    shortTitle: "Milano",
    country: "Italija",
    category: "nova-godina",
    start: "2026-12-30",
    dateLabel: "30.12.2026. – 03.01.2027.",
    days: 5,
    hotel: "Hotel 3*",
    transport: "Bus",
    price: 469,
    badge: "First minute",
    summary:
      "Doček na milanskom trgu, gratis obilazak grada i fakultativni izlet u švicarski Lugano i Como na jezeru.",
    highlights: [
      "Gratis obilazak Milana",
      "Doček Nove godine na trgu",
      "Lugano i Como (fakultativno)",
    ],
    image: "/images/dest/milano.jpg",
    imageAlt: "Milanska katedrala",
    focus: "50% 55%",
    url: `${ARD}/bs/nova-godina-bus/milano`,
  },
  {
    slug: "rim-nova-godina",
    title: "Rim — Nova godina avionom",
    shortTitle: "Rim",
    country: "Italija",
    category: "nova-godina",
    start: "2026-12-29",
    dateLabel: "29.12.2026. – 02.01.2027.",
    days: 5,
    hotel: "Hotel 4*",
    transport: "Avion",
    price: 1449,
    badge: "First minute",
    summary:
      "Direktan let iz Sarajeva za Rim. Koloseum, Rimski forum, Fontana di Trevi, Španski trg i Vatikanski muzeji.",
    highlights: [
      "Direktan let iz Sarajeva",
      "Koloseum i Rimski forum",
      "Vatikanski muzeji (fakultativno)",
      "Doček u Vječnom gradu",
    ],
    image: "/images/dest/rim.jpg",
    imageAlt: "Koloseum u Rimu iz zraka",
    focus: "50% 50%",
    url: `${ARD}/bs/nova-godina-avio/rim`,
  },
  {
    slug: "prag-nova-godina",
    title: "Prag — Nova godina avionom",
    shortTitle: "Prag",
    country: "Češka",
    category: "nova-godina",
    start: "2027-01-01",
    dateLabel: "01.01. – 04.01.2027.",
    days: 4,
    hotel: "Hotel 3*",
    transport: "Avion",
    price: 699,
    badge: "First minute",
    summary:
      "Let iz Sarajeva za Prag, „Zlatni Prag kroz vrijeme“ i fakultativni izlet u Dresden – Firencu na Elbi.",
    highlights: [
      "Let iz Sarajeva",
      "Hradčani, Karlov most i Staromjestski trg",
      "Dresden (fakultativno)",
    ],
    image: "/images/ard/prag-vecer.jpg",
    imageAlt: "Praški dvorac i Karlov most u sumrak",
    focus: "55% 45%",
    url: `${ARD}/bs/nova-godina-avio/prag`,
  },
  {
    slug: "venecija-nova-godina",
    title: "Venecija — Nova godina",
    shortTitle: "Venecija",
    country: "Italija",
    category: "nova-godina",
    start: "2026-12-29",
    dateLabel: "29.12.2026. – 02.01.2027.",
    days: 4,
    hotel: "Hotel 3*",
    transport: "Bus",
    price: 399,
    summary:
      "Trst i outlet Noventa di Piave, Verona, doček 2027. u Veneciji te Padova i Vicenza na povratku.",
    highlights: [
      "Trst i outlet Noventa di Piave",
      "Verona",
      "Doček na Trgu Sv. Marka",
      "Padova i Vicenza",
    ],
    image: "/images/dest/venecija.jpg",
    imageAlt: "Venecijanski kanal s gondolama",
    focus: "50% 60%",
    url: `${ARD}/bs/nova-godina-bus/venecija`,
  },
  {
    slug: "azurna-obala-nova-godina",
    title: "Azurna obala — Nova godina",
    shortTitle: "Azurna obala",
    country: "Francuska",
    category: "nova-godina",
    start: "2026-12-29",
    dateLabel: "29.12.2026. – 03.01.2027.",
    days: 6,
    hotel: "Hotel 3*",
    transport: "Bus",
    price: 619,
    summary:
      "Kan i Nica, Antib i fabrika parfema u Grasu, doček na Engleskom šetalištu i izlet u Monako.",
    highlights: [
      "Doček na Promenade des Anglais",
      "Antib i Gras (fakultativno)",
      "Kan i Monako",
    ],
    image: "/images/ard/monako-nova-godina.jpg",
    imageAlt: "Novogodišnji vatromet u Monaku",
    focus: "50% 40%",
    url: `${ARD}/bs/nova-godina-bus/azurna-obala`,
  },
  {
    slug: "valamar-lacroma-nova-godina",
    title: "Valamar Lacroma 4* — Nova godina",
    shortTitle: "Valamar Lacroma",
    country: "Hrvatska",
    category: "nova-godina",
    start: "2026-12-30",
    dateLabel: "30.12.2026. – 03.01.2027.",
    hotel: "Hotel 4*",
    price: 210,
    summary:
      "Novogodišnji boravak u hotelu Valamar Lacroma 4*, 5 km od starog grada Dubrovnika.",
    highlights: ["Hotel 4* u Dubrovniku", "5 km od starog grada"],
    image: "/images/ard/valamar-lacroma.jpg",
    imageAlt: "Valamar Lacroma hotel u sumrak",
    focus: "50% 50%",
    url: `${ARD}/bs/nova-godina-jadran/valamar-lacroma-hotel-4-dubrovnik`,
  },
  {
    slug: "hotel-bella-vista-drvenik",
    title: "Hotel Bella Vista 4* Drvenik",
    shortTitle: "Drvenik",
    country: "Hrvatska",
    category: "ljeto",
    start: "2027-06-01",
    dateLabel: "Sezona 2027.",
    hotel: "Hotel 4*",
    price: 167,
    badge: "Rani booking",
    summary:
      "Ljetovanje na Makarskoj rivijeri u hotelu Bella Vista 4*, na bazi polupansiona.",
    highlights: ["Makarska rivijera", "Polupansion", "Rani booking 2027"],
    image: "/images/ard/bella-vista-drvenik.jpg",
    imageAlt: "Hotel Bella Vista i obala Drvenika iz zraka",
    focus: "55% 50%",
    url: `${ARD}/hotel/hotel-bella-vista-4-drvenik`,
  },
  {
    slug: "hotel-punta-vodice",
    title: "Hotel Punta 4* Vodice",
    shortTitle: "Vodice",
    country: "Hrvatska",
    category: "ljeto",
    start: "2027-06-01",
    dateLabel: "Sezona 2027.",
    hotel: "Hotel 4*",
    price: 187,
    badge: "Rani booking",
    summary:
      "Hotel uz samu plažu u Vodicama. Dijete do 12 godina gratis, prema uslovima ponude.",
    highlights: ["Hotel uz plažu", "Dijete do 12 godina gratis", "Sjeverna Dalmacija"],
    image: "/images/ard/punta-vodice.jpg",
    imageAlt: "Hotel Punta na poluotoku u Vodicama",
    focus: "45% 50%",
    url: `${ARD}/hotel/hotel-punta-4-vodice`,
  },
  {
    slug: "valamar-lacroma-ljeto",
    title: "Valamar Lacroma 4* Dubrovnik",
    shortTitle: "Dubrovnik",
    country: "Hrvatska",
    category: "ljeto",
    start: "2027-06-01",
    dateLabel: "Sezona 2027.",
    hotel: "Hotel 4*",
    price: 245,
    badge: "Rani booking",
    summary:
      "Ljetovanje 5 km od starog grada Dubrovnika, uz cijene ranog bookinga.",
    highlights: ["Južna Dalmacija", "5 km od starog grada", "Rani booking 2027"],
    image: "/images/ard/valamar-lacroma.jpg",
    imageAlt: "Valamar Lacroma Dubrovnik",
    focus: "50% 50%",
    url: `${ARD}/hotel/valamar-lacroma-4-dubrovnik`,
  },
];

/** Aranžmani istaknuti u hero slideru (redoslijed = redoslijed slajdova) */
export const heroSlugs = [
  "toskana-cinque-terre",
  "istanbul-festival-lala",
  "amalfi-capri-pompeji-napulj",
  "prag-dresden-bec",
  "dubrovnik-nova-godina",
] as const;

/** Pozadinske fotografije hero sekcije (pejzažni kadrovi) */
export const heroBackgrounds: Record<string, { src: string; focus: string }> = {
  "toskana-cinque-terre": { src: "/images/dest/hero-toskana.jpg", focus: "50% 55%" },
  "istanbul-festival-lala": { src: "/images/ard/istanbul-lale.jpg", focus: "50% 60%" },
  "amalfi-capri-pompeji-napulj": { src: "/images/ard/amalfi-atrani.jpg", focus: "50% 55%" },
  "prag-dresden-bec": { src: "/images/ard/prag-jesen.jpg", focus: "50% 50%" },
  "dubrovnik-nova-godina": { src: "/images/dest/dubrovnik.jpg", focus: "50% 50%" },
};

export const getOffer = (slug: string) => offers.find((o) => o.slug === slug);

/** Broj hotela u ponudi "Ljeto 2027 – rani booking" na naslovnoj stranici ardtravel.ba */
export const summerHotelCount = 50;
/** Najniža objavljena cijena hotela u ranom bookingu (Orsan hotel by Aminess 3*, Orebić) */
export const summerFromPrice = 85;
