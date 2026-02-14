import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ParticleNetwork from "@/components/ParticleNetwork";
import agentWorkflows from "@/assets/agent-workflows.png";
import agentVoice from "@/assets/agent-voice.png";
import agentAnalytics from "@/assets/agent-analytics.png";

const HeroSection = () => {
  const [email, setEmail] = useState("");

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Interactive particle network background */}
      <ParticleNetwork />

      {/* Subtle gradient overlay for depth */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-[600px] w-[800px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 h-[400px] w-[400px] rounded-full bg-primary/3 blur-[100px]" />
      </div>

      {/* Floating characters */}
      <img
        src={agentWorkflows}
        alt="AI Workflow Agent"
        className="absolute top-[18%] right-[8%] w-28 md:w-36 animate-float-slow opacity-90 pointer-events-none hidden md:block"
      />
      <img
        src={agentVoice}
        alt="AI Voice Agent"
        className="absolute bottom-[22%] left-[6%] w-24 md:w-32 animate-float-medium opacity-85 pointer-events-none hidden md:block"
      />
      <img
        src={agentAnalytics}
        alt="AI Analytics Agent"
        className="absolute bottom-[15%] right-[12%] w-20 md:w-28 animate-float-fast opacity-80 pointer-events-none hidden md:block"
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-xs text-muted-foreground mb-8 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            AI-powered automation for progressive organizations
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-8xl font-extrabold tracking-tight mb-6 leading-[1.05]">
            Growing smarter{" "}
            <br className="hidden sm:block" />
            with <span className="text-gradient">AI</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            We specialize in workflow automation and personalized AI solutions
            for progressive organizations.
          </p>

          {/* Email + CTA */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-lg mx-auto mb-6">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 rounded-lg border border-border bg-secondary/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 backdrop-blur-sm"
            />
            <Button size="lg" className="text-sm font-semibold gap-2 shrink-0">
              Book a Demo <ArrowRight size={16} />
            </Button>
          </div>

          <a
            href="#services"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4 decoration-border hover:decoration-foreground"
          >
            Explore our services →
          </a>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
