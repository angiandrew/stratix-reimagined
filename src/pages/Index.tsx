import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import AgentShowcaseSection from "@/components/AgentShowcaseSection";
import AnalyticsDashboardSection from "@/components/AnalyticsDashboardSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import WhyUsSection from "@/components/WhyUsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import AnimatedContent from "@/components/AnimatedContent";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <HeroSection />
    <AnimatedContent>
      <ServicesSection />
    </AnimatedContent>
    <AnimatedContent delay={0.1}>
      <AgentShowcaseSection />
    </AnimatedContent>
    <AnimatedContent>
      <AnalyticsDashboardSection />
    </AnimatedContent>
    <AnimatedContent>
      <HowItWorksSection />
    </AnimatedContent>
    <AnimatedContent>
      <WhyUsSection />
    </AnimatedContent>
    <AnimatedContent>
      <ContactSection />
    </AnimatedContent>
    <AnimatedContent distance={30} duration={0.5}>
      <Footer />
    </AnimatedContent>
  </div>
);

export default Index;
