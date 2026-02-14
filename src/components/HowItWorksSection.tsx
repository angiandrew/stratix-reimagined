import { Search, Wrench, Rocket } from "lucide-react";

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Discovery",
    description:
      "We map your workflows, understand your pain points, and identify the highest-impact automations.",
  },
  {
    icon: Wrench,
    step: "02",
    title: "Build & Configure",
    description:
      "Our team builds your custom AI agents, integrates with your tools, and tests everything thoroughly.",
  },
  {
    icon: Rocket,
    step: "03",
    title: "Launch & Optimize",
    description:
      "Go live in days, not months. We continuously monitor and optimize your automations for peak performance.",
  },
];

const HowItWorksSection = () => (
  <section id="how-it-works" className="py-24 relative">
    {/* Background accent */}
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[800px] rounded-full bg-primary/3 blur-[120px]" />
    </div>

    <div className="container mx-auto px-4 relative">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          Live in <span className="text-gradient">days</span>, not months
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          A simple, proven process to get your AI agents up and running fast.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {steps.map((s) => (
          <div
            key={s.step}
            className="relative rounded-2xl border border-border bg-card/40 backdrop-blur-sm p-8 hover:border-primary/30 transition-all duration-300 group"
          >
            <div className="text-[64px] font-black text-foreground/[0.04] absolute top-4 right-6 leading-none select-none">
              {s.step}
            </div>
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
              <s.icon className="text-primary" size={22} />
            </div>
            <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorksSection;
