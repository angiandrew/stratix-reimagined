import PublicLayout from "@/components/redesign/PublicLayout";
import HeroSection from "@/components/redesign/HeroSection";
import LogoMarquee from "@/components/redesign/LogoMarquee";
import BentoGrid from "@/components/redesign/BentoGrid";
import HowItWorks from "@/components/redesign/HowItWorks";
import Industries from "@/components/redesign/Industries";
import CTABanner from "@/components/redesign/CTABanner";

const Index = () => (
  <PublicLayout transparentNav>
    <HeroSection />
    <LogoMarquee />
    <BentoGrid />
    <HowItWorks />
    <Industries />
    <CTABanner />
  </PublicLayout>
);

export default Index;
