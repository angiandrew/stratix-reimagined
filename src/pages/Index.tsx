import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import EndToEndIntro from "@/components/EndToEndIntro";
import PeelCardsSection from "@/components/PeelCardsSection";
import IntelligentSystemsIntro from "@/components/IntelligentSystemsIntro";
import IntelligentSystemsSection from "@/components/IntelligentSystemsSection";
import ContactSection from "@/components/ContactSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="bg-white">
    <Navbar />

    {/* Dark hero */}
    <HeroSection />

    {/* Dark → light bridge */}
    <div
      style={{
        height: 64,
        background: "linear-gradient(to bottom, hsl(215,28%,6%) 0%, #ffffff 100%)",
      }}
    />

    {/* Intro header */}
    <EndToEndIntro />

    {/* Framer Motion peel cards */}
    <PeelCardsSection />

    {/* Intelligent Systems intro + card grid */}
    <IntelligentSystemsIntro />
    <IntelligentSystemsSection />

    {/* Footer sits below the stack */}
    <div style={{ position: "relative", zIndex: 50, backgroundColor: "#fff" }}>
      <ContactSection />
      <FAQSection />
      <Footer />
    </div>
  </div>
);

export default Index;
