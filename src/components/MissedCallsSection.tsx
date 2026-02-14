import { PhoneOff, PhoneMissed, TrendingDown, CheckCircle2, Phone, Calendar, Plug } from "lucide-react";

const MissedCallsSection = () => (
  <section className="section-light py-24">
    <div className="container mx-auto px-4">
      {/* Section header */}
      <div className="text-center mb-16">
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[hsl(var(--primary))] mb-4">
          Popular Services
        </span>
        <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ color: "hsl(var(--light-fg))" }}>
          Missed Calls = Lost Revenue
        </h2>
        <p className="text-light-muted max-w-xl mx-auto">
          Every unanswered call is a customer choosing your competitor.
        </p>
      </div>

      {/* Pain stats */}
      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-20">
        <div className="rounded-2xl border p-8 text-center" style={{ borderColor: "hsl(var(--light-border))", background: "hsl(var(--light-card))" }}>
          <PhoneOff className="mx-auto mb-4 text-[hsl(var(--destructive))]" size={32} />
          <div className="text-4xl font-black mb-2" style={{ color: "hsl(var(--light-fg))" }}>$126,000+</div>
          <div className="text-sm font-medium mb-1" style={{ color: "hsl(var(--light-fg))" }}>Average annual revenue lost</div>
          <div className="text-xs text-light-muted">by small businesses due to missed calls.</div>
        </div>

        <div className="rounded-2xl border p-8 text-center" style={{ borderColor: "hsl(var(--light-border))", background: "hsl(var(--light-card))" }}>
          <PhoneMissed className="mx-auto mb-4 text-[hsl(var(--destructive))]" size={32} />
          <div className="text-4xl font-black mb-2" style={{ color: "hsl(var(--light-fg))" }}>Up to 85%</div>
          <div className="text-sm font-medium mb-1" style={{ color: "hsl(var(--light-fg))" }}>Of callers won't call back</div>
          <div className="text-xs text-light-muted">or leave a voicemail. They move to a competitor.</div>
        </div>

        <div className="rounded-2xl border p-8 text-center" style={{ borderColor: "hsl(var(--light-border))", background: "hsl(var(--light-card))" }}>
          <TrendingDown className="mx-auto mb-4 text-[hsl(var(--destructive))]" size={32} />
          <div className="text-4xl font-black mb-2" style={{ color: "hsl(var(--light-fg))" }}>~7% Conversion</div>
          <div className="text-sm font-medium mb-1" style={{ color: "hsl(var(--light-fg))" }}>Leads that hit voicemail</div>
          <div className="text-xs text-light-muted">convert at roughly 7% — and drop sharply the longer you wait.</div>
        </div>
      </div>

      {/* Divider */}
      <div className="max-w-3xl mx-auto mb-16">
        <div className="h-px w-full" style={{ background: "hsl(var(--light-border))" }} />
      </div>

      {/* With StratixOS */}
      <div className="max-w-3xl mx-auto text-center">
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[hsl(var(--success))] mb-4">
          With StratixOS
        </span>
        <h3 className="text-2xl md:text-4xl font-bold mb-8" style={{ color: "hsl(var(--light-fg))" }}>
          Never miss a lead again
        </h3>

        <div className="grid sm:grid-cols-2 gap-4 text-left max-w-2xl mx-auto">
          {[
            { icon: CheckCircle2, text: "100% of calls answered" },
            { icon: Phone, text: "Even when you're closed, busy, or unavailable" },
            { icon: Calendar, text: "Leads captured, qualified, and booked automatically" },
            { icon: Plug, text: "Complete integration with current tech stack and systems" },
          ].map((item) => (
            <div key={item.text} className="flex items-start gap-3 p-4 rounded-xl" style={{ background: "hsl(var(--success-light))" }}>
              <item.icon className="shrink-0 mt-0.5 text-[hsl(var(--success))]" size={20} />
              <span className="text-sm font-medium" style={{ color: "hsl(var(--light-fg))" }}>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default MissedCallsSection;
