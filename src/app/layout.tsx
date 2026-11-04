import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const satoshi = localFont({
  src: [
    { path: "../fonts/Satoshi-Variable.woff2", weight: "300 900", style: "normal" },
    { path: "../fonts/Satoshi-VariableItalic.woff2", weight: "300 900", style: "italic" },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ARD Travel — Turistička agencija Sarajevo",
  description:
    "Putovanja skrojena po mjeri putnika: Dan državnosti, Nova godina 2027, Istanbul, Amalfi, Toskana i ljetovanje 2027. Turistička agencija ARD Travel, Hiseta 1, Sarajevo.",
  icons: { icon: "/brand/ard-logo-color.png" },
  openGraph: {
    title: "ARD Travel — Turistička agencija Sarajevo",
    description: "Putovanja skrojena po mjeri putnika. Polasci iz Sarajeva.",
    images: ["/images/dest/hero-toskana.jpg"],
    locale: "bs_BA",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#1b1b1b",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="bs" className={satoshi.variable}>
      <body>{children}</body>
    </html>
  );
}
