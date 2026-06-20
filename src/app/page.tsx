import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ObjectsScroll from "@/components/ObjectsScroll";
import RevealEngine from "@/components/RevealEngine";
import { Gates, Services, Portfolio, Production, Why } from "@/components/Sections";
import { Contacts, Footer } from "@/components/ContactSections";

export default function Home() {
  return (
    <>
      <RevealEngine />
      <Header />
      <main>
        <Hero />
        <ObjectsScroll />
        <Gates />
        <Services />
        <Portfolio />
        <Production />
        <Why />
        <Contacts />
      </main>
      <Footer />
    </>
  );
}
