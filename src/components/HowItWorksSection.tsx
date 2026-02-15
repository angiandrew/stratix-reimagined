import { Search, Wrench, Rocket } from "lucide-react";
import AnimatedContent from "@/components/AnimatedContent";

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Discovery",
    description: "We map your workflows, understand your pain points, and identify the highest-impact automations.",
  },
  {
    icon: Wrench,
    step: "02",
    title: "Build & Configure",
    description: "Our team builds your custom AI agents, integrates with your tools, and tests everything thoroughly.",
  },
  {
    icon: Rocket,
    step: "03",
    title: "Launch & Optimize",
    description: "Go live in days, not months. We continuously monitor and optimize your automations for peak performance.",
  },
];

const HowItWorksSection = () => (
  <section id="how-it-works" className="section-light py-16 md:py-24 border-t" style={{ borderColor: "hsl(var(--light-border))" }}>
    <div className="container mx-auto px-4">
      <AnimatedContent distance={30}>
        <div className="text-center mb-10 md:mb-16">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[hsl(var(--primary))] mb-4">
            Our Process
          </span>
          <h2 className="text-2xl md:text-5xl font-bold mb-4" style={{ color: "hsl(var(--light-fg))" }}>
            Live in days, not months
          </h2>
          <p className="max-w-xl mx-auto text-sm" style={{ color: "hsl(var(--light-muted))" }}>
            A simple, proven process to get your AI agents up and running fast.
          </p>
        </div>
      </AnimatedContent>

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {steps.map((s, i) => (
          <AnimatedContent key={s.step} delay={i * 0.15} distance={30}>
            <div
              className="relative rounded-2xl border p-8 transition-all duration-300 hover:shadow-md group h-full"
              style={{ borderColor: "hsl(var(--light-border))", background: "hsl(var(--light-card))" }}
            >
              <div className="text-[64px] font-black absolute top-4 right-6 leading-none select-none" style={{ color: "hsl(215 20% 94%)" }}>
                {s.step}
              </div>
              <div
                className="h-12 w-12 rounded-xl flex items-center justify-center mb-6"
                style={{ background: "hsl(187 72% 53% / 0.08)" }}
              >
                <s.icon className="text-[hsl(var(--primary))]" size={22} />
              </div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: "hsl(var(--light-fg))" }}>{s.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "hsl(var(--light-muted))" }}>{s.description}</p>
            </div>
          </AnimatedContent>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorksSection;
