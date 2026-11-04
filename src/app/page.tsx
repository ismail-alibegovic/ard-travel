import { About } from "@/components/About";
import { Destinations } from "@/components/Destinations";
import { FeaturedTrips } from "@/components/FeaturedTrips";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { HowToBook, PartnersStrip } from "@/components/HowToBook";
import { InquiryModal, OfferModal } from "@/components/Modals";
import { SpecialOffers } from "@/components/SpecialOffers";
import { UIProvider } from "@/components/ui-state";

export default function Home() {
  return (
    <UIProvider>
      <Header />
      <main>
        <Hero />
        <FeaturedTrips />
        <SpecialOffers />
        <Destinations />
        <PartnersStrip />
        <HowToBook />
        <About />
      </main>
      <Footer />
      <OfferModal />
      <InquiryModal />
    </UIProvider>
  );
}
