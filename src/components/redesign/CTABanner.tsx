import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDemoModal } from "./DemoContext";
import AnimatedContent from "@/components/AnimatedContent";

const CTABanner = () => {
  const { openDemo } = useDemoModal();

  return (
    <section className="py-24 md:py-32 section-navy relative overflow-hidden">
      {/* Gradient orbs */}
      <div className="absolute top-0 left-1/3 w-[500px] h-[500px] rounded-full bg-electric/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-electric/3 blur-[120px] pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4 text-center">
        <AnimatedContent>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6">
            Ready to transform your
            <br className="hidden sm:block" />
            <span className="text-electric"> operations?</span>
          </h2>
          <p className="text-white/40 max-w-lg mx-auto mb-10 text-base">
            Join the teams already using StratixOS to automate, engage, and grow smarter.
          </p>
          <Button
            onClick={openDemo}
            size="lg"
            className="bg-electric hover:bg-electric/90 text-electric-foreground font-semibold rounded-full px-8 h-12 text-base gap-2"
          >
            Book a Demo <ArrowRight size={18} />
          </Button>
        </AnimatedContent>
      </div>
    </section>
  );
};

export default CTABanner;
