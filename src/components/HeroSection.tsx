import { Button } from "@/components/ui/button";
import ParticleNetwork from "@/components/ParticleNetwork";
import { ArrowRight, Play } from "lucide-react";

const stats = [
  { value: "391%", label: "Lead Conversion" },
  { value: "24/7", label: "Always Active" },
  { value: "0", label: "Missed Calls" },
];

const HeroSection = () => (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
    <ParticleNetwork />
    <div className="relative z-10 container mx-auto px-4 text-center">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
          Never Miss a{" "}
          <span className="text-gradient">Lead Again</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
          AI-powered agents that answer calls, book appointments, and capture leads 24/7 — so you never lose another customer.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button size="lg" className="text-base gap-2" asChild>
            <a href="#contact">
              Start Your AI Journey <ArrowRight size={18} />
            </a>
          </Button>
          <Button size="lg" variant="outline" className="text-base gap-2 border-primary/30 hover:bg-primary/10">
            <Play size={18} /> Watch Demo
          </Button>
        </div>
        <div className="flex justify-center gap-8 md:gap-16">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary">{s.value}</div>
              <div className="text-xs md:text-sm text-muted-foreground mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
  </section>
);

export default HeroSection;
