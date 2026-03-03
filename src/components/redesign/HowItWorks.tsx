import { Plug, Settings, Zap } from "lucide-react";
import AnimatedContent from "@/components/AnimatedContent";

const steps = [
  {
    num: "01",
    icon: Plug,
    title: "Connect",
    desc: "Integrate your existing tools, CRM, and data sources in minutes — no engineering required.",
  },
  {
    num: "02",
    icon: Settings,
    title: "Configure",
    desc: "Set up AI agents tailored to your specific business workflows and brand voice.",
  },
  {
    num: "03",
    icon: Zap,
    title: "Scale",
    desc: "Watch your operations transform with intelligent automation that works around the clock.",
  },
];

const HowItWorks = () => (
  <section id="how-it-works" className="py-24 md:py-32 bg-white">
    <div className="container mx-auto px-4">
      <AnimatedContent>
        <div className="text-center mb-20">
          <p className="text-xs uppercase tracking-[0.2em] text-electric font-semibold mb-4">Process</p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-light-fg tracking-tight">
            How it works
          </h2>
        </div>
      </AnimatedContent>

      <div className="grid md:grid-cols-3 gap-12 max-w-4xl mx-auto">
        {steps.map((s, i) => (
          <AnimatedContent key={s.num} delay={i * 0.1}>
            <div className="text-center">
              <div className="w-14 h-14 rounded-2xl bg-electric/5 border border-electric/10 flex items-center justify-center mx-auto mb-5">
                <s.icon size={22} className="text-electric" />
              </div>
              <span className="text-5xl font-extrabold text-electric/[0.08] block mb-2 select-none">{s.num}</span>
              <h3 className="text-xl font-bold text-light-fg mb-2">{s.title}</h3>
              <p className="text-sm text-light-muted leading-relaxed">{s.desc}</p>
            </div>
          </AnimatedContent>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
