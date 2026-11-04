/** Stvarni podaci agencije sa https://ardtravel.ba/bs/ostalo/kontakt i /o-agenciji */
export const agency = {
  name: "ARD Travel",
  legalName: "ARD d.o.o. Sarajevo",
  idNumber: "4200068030009",
  vatNumber: "200068030009",
  address: "Hiseta 1 (prizemlje)",
  addressNote: "preko puta tržnog centra SCC",
  city: "71000 Sarajevo, Bosna i Hercegovina",
  phones: ["+387 33 533 662", "+387 33 533 663"],
  fax: "+387 33 944 220",
  email: "info@ardtravel.ba",
  web: "https://ardtravel.ba",
  hours: [
    { days: "Ponedjeljak – petak", time: "09:00 – 17:00" },
    { days: "Subota", time: "09:00 – 15:00" },
  ],
  facebook: "https://www.facebook.com/ardtravel.ba/",
  terms: "https://ardtravel.ba/upload/file/OP%C5%A0TI%20USLOVI%20PUTOVANJA_ARDtravel.pdf",
  about: "https://ardtravel.ba/bs/ostalo/o-agenciji",
  contact: "https://ardtravel.ba/bs/ostalo/kontakt",
  mapUrl: "https://www.google.com/maps/search/?api=1&query=Hiseta+1+Sarajevo",
} as const;

export const telHref = (phone: string) => `tel:${phone.replace(/\s/g, "")}`;

/** Usluge navedene na stranici "O agenciji" */
export const services = [
  "Paket aranžmani i grupna putovanja",
  "Ljetovanja, zimovanja i wellness",
  "Hotelske i apartmanske rezervacije",
  "Avio karte i autobuski prevoz",
  "Ekskurzije, sajmovi i kongresi",
  "ARD Ground service – doček gostiju, transferi i izleti po BiH",
];

/** Mjesta polaska navedena u programima autobuskih aranžmana */
export const departures = ["Sarajevo", "Visoko", "Kakanj", "Zenica", "Maglaj", "Doboj"];

export const tripTypes = [
  "Gradska putovanja",
  "Doček Nove godine",
  "Ljetovanje na Jadranu",
  "Avionom iz Sarajeva",
  "Autobusom",
  "Grupna putovanja",
];

/** Hoteli i prevoznici koji se pojavljuju u aktuelnoj ponudi agencije */
export const partners = [
  "Turkish Airlines",
  "Wizz Air",
  "Valamar",
  "Aminess",
  "Falkensteiner",
  "Carine",
  "Admiral Grand Hotel",
];
