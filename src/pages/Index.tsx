import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AgentShowcaseSection from "@/components/AgentShowcaseSection";
import AnalyticsDashboardSection from "@/components/AnalyticsDashboardSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import WhyUsSection from "@/components/WhyUsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <HeroSection />
    {/* Seamless light sections */}
    <AgentShowcaseSection />
    <AnalyticsDashboardSection />
    <HowItWorksSection />
    <WhyUsSection />
    <ContactSection />
    <Footer />
  </div>
);

export default Index;
