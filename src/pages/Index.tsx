import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import MissedCallsSection from "@/components/MissedCallsSection";
import AnalyticsDashboardSection from "@/components/AnalyticsDashboardSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import WhyUsSection from "@/components/WhyUsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <HeroSection />
    {/* Transition to light sections — Conduit-style */}
    <ServicesSection />
    <MissedCallsSection />
    <AnalyticsDashboardSection />
    <HowItWorksSection />
    {/* Back to dark for social proof + CTA */}
    <WhyUsSection />
    <ContactSection />
    <Footer />
  </div>
);

export default Index;
