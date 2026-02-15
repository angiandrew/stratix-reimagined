const stats = [
  { value: "391%", label: "More leads captured", description: "Average increase in qualified lead conversions" },
  { value: "24/7", label: "Always active", description: "Your AI agents never sleep, never take a break" },
  { value: "< 24h", label: "Time to launch", description: "From discovery call to live AI agents" },
  { value: "0", label: "Missed calls", description: "Every call answered, every lead captured" },
];

const WhyUsSection = () => (
  <section id="results" className="section-light py-16 md:py-24 border-t" style={{ borderColor: "hsl(var(--light-border))" }}>
    <div className="container mx-auto px-4">
      <div className="text-center mb-10 md:mb-16">
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[hsl(var(--primary))] mb-4">
          Results
        </span>
        <h2 className="text-2xl md:text-5xl font-bold mb-4" style={{ color: "hsl(var(--light-fg))" }}>
          Proven results from day one
        </h2>
        <p className="max-w-xl mx-auto text-sm" style={{ color: "hsl(var(--light-muted))" }}>
          Our clients see dramatic improvements across the board.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 max-w-5xl mx-auto">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border p-4 md:p-6 text-center transition-all duration-300 hover:shadow-md"
            style={{ borderColor: "hsl(var(--light-border))", background: "hsl(var(--light-card))" }}
          >
            <div className="text-2xl md:text-5xl font-black text-[hsl(var(--primary))] mb-1 md:mb-2">{s.value}</div>
            <div className="text-xs md:text-sm font-semibold mb-1" style={{ color: "hsl(var(--light-fg))" }}>{s.label}</div>
            <div className="text-[10px] md:text-xs" style={{ color: "hsl(var(--light-muted))" }}>{s.description}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyUsSection;
