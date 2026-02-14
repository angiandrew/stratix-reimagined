import { PhoneOff, TrendingUp, Clock } from "lucide-react";

const reasons = [
  {
    icon: PhoneOff,
    title: "Zero Missed Calls",
    description: "Every call answered. Every lead captured. Your AI receptionist never sleeps, never takes a break.",
  },
  {
    icon: TrendingUp,
    title: "391% More Leads",
    description: "Businesses using AI agents see an average 391% increase in qualified lead conversions.",
  },
  {
    icon: Clock,
    title: "24/7 Availability",
    description: "Your business is always open. Nights, weekends, holidays — your AI agents are always on.",
  },
];

const WhyUsSection = () => (
  <section id="why-us" className="py-24 relative">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Why Choose <span className="text-gradient">StratixOS</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          We don't just answer calls — we transform your business.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        {reasons.map((r) => (
          <div
            key={r.title}
            className="p-6 rounded-xl border border-border/50 bg-card/30 hover:border-primary/40 transition-all duration-300 hover:-translate-y-1 text-center"
          >
            <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
              <r.icon className="text-primary" size={26} />
            </div>
            <h3 className="text-lg font-semibold mb-2">{r.title}</h3>
            <p className="text-sm text-muted-foreground">{r.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyUsSection;
