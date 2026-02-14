import { Settings, Zap, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: Settings,
    step: "01",
    title: "Quick Setup",
    description: "We configure your AI agents to match your business, voice, and workflows in under 24 hours.",
  },
  {
    icon: Zap,
    step: "02",
    title: "Go Live",
    description: "Your AI starts handling calls and chats immediately — no downtime, no missed leads.",
  },
  {
    icon: TrendingUp,
    step: "03",
    title: "Watch Growth",
    description: "See leads pour in with real-time analytics and watch your conversion rates skyrocket.",
  },
];

const HowItWorksSection = () => (
  <section id="how-it-works" className="py-24 relative">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          How It <span className="text-gradient">Works</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Get up and running in three simple steps.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        {steps.map((s, i) => (
          <div
            key={s.step}
            className="text-center group"
          >
            <div className="relative mx-auto mb-6">
              <div className="h-16 w-16 rounded-full border-2 border-primary/30 flex items-center justify-center mx-auto group-hover:border-primary transition-colors duration-300">
                <s.icon className="text-primary" size={28} />
              </div>
              <span className="absolute -top-2 -right-2 text-xs font-bold text-primary bg-primary/10 rounded-full h-7 w-7 flex items-center justify-center">
                {s.step}
              </span>
            </div>
            <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
            <p className="text-sm text-muted-foreground">{s.description}</p>
            {i < steps.length - 1 && (
              <div className="hidden md:block absolute top-8 left-[calc(50%+40px)] w-[calc(100%-80px)] border-t border-dashed border-primary/20" />
            )}
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorksSection;
