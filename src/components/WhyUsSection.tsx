const stats = [
  { value: "391%", label: "More leads captured", description: "Average increase in qualified lead conversions" },
  { value: "24/7", label: "Always active", description: "Your AI agents never sleep, never take a break" },
  { value: "< 24h", label: "Time to launch", description: "From discovery call to live AI agents" },
  { value: "0", label: "Missed calls", description: "Every call answered, every lead captured" },
];

const WhyUsSection = () => (
  <section id="results" className="py-24 relative">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          Proven <span className="text-gradient">results</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Our clients see dramatic improvements from day one.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-border bg-card/30 p-6 text-center hover:border-primary/30 transition-all duration-300"
          >
            <div className="text-4xl md:text-5xl font-black text-gradient mb-2">{s.value}</div>
            <div className="text-sm font-semibold text-foreground mb-1">{s.label}</div>
            <div className="text-xs text-muted-foreground">{s.description}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyUsSection;
