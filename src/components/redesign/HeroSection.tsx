import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDemoModal } from "./DemoContext";
import AnimatedContent from "@/components/AnimatedContent";

const HeroSection = () => {
  const { openDemo } = useDemoModal();
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const onScroll = () => setOffsetY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden section-navy">
      {/* Parallax background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ transform: `translateY(${offsetY * 0.25}px)` }}
      >
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full bg-electric/8 blur-[150px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-electric/5 blur-[120px]" />
        <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-electric/4 blur-[100px]" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 container mx-auto px-4 text-center">
        <AnimatedContent duration={0.8} distance={30}>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-white/60 mb-8 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-electric animate-pulse" />
            AI-powered automation for modern business
          </div>
        </AnimatedContent>

        <AnimatedContent duration={0.8} distance={40} delay={0.1}>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-6 leading-[1.05] text-white">
            The operating system
            <br />
            for <span className="text-electric">modern business</span>
          </h1>
        </AnimatedContent>

        <AnimatedContent duration={0.8} distance={30} delay={0.2}>
          <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-12 leading-relaxed">
            Deploy intelligent AI agents that handle calls, automate workflows,
            and drive growth — so your team can focus on what matters.
          </p>
        </AnimatedContent>

        <AnimatedContent duration={0.8} distance={20} delay={0.3}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={openDemo}
              size="lg"
              className="bg-electric hover:bg-electric/90 text-electric-foreground font-semibold rounded-full px-8 h-12 text-base gap-2"
            >
              Book a Demo <ArrowRight size={18} />
            </Button>
            <a
              href="#how-it-works"
              className="text-sm text-white/50 hover:text-white transition-colors underline underline-offset-4 decoration-white/20 hover:decoration-white/60"
            >
              See how it works
            </a>
          </div>
        </AnimatedContent>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-navy to-transparent" />
    </section>
  );
};

export default HeroSection;
