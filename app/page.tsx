import Gallery from "@/components/Gallery";
import BackToTop from "@/components/BackToTop";
import FloatingButtons from "@/components/FloatingButtons";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import About from "@/components/About";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import WhyChoose from "@/components/WhyChoose";
import Testimonials from "@/components/Testimonials";
import Clients from "@/components/Clients";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <>
      <Navbar />

      <Hero />

      <Stats />

      <About />

      <Services />

      <Projects />
      <Gallery />

      <WhyChoose />

      <Testimonials />

      <Clients />

      <Contact />

      <Footer />
      <FloatingButtons />
      <BackToTop />

      <WhatsAppButton />
    </>
  );
}