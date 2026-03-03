const companies = [
  "Pinnacle", "Velocity", "Horizon", "Atlas", "Quantum", "Vertex", "Nebula", "Prism",
  "Apex", "Forge", "Summit", "Catalyst",
];

const LogoMarquee = () => (
  <section className="section-navy py-10 border-y border-white/5 overflow-hidden">
    <p className="text-center text-[11px] uppercase tracking-[0.25em] text-white/30 mb-8 font-medium">
      Trusted by forward-thinking teams
    </p>
    <div className="relative">
      <div className="flex animate-marquee gap-20 whitespace-nowrap">
        {[...companies, ...companies].map((c, i) => (
          <span key={i} className="text-lg font-bold text-white/[0.08] select-none">{c}</span>
        ))}
      </div>
      {/* Fade edges */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-navy to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-navy to-transparent pointer-events-none" />
    </div>
  </section>
);

export default LogoMarquee;
