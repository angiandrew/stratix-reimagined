import { useState } from "react";
import { Phone, Globe, FileText, Share2, PhoneOutgoing, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import SavingsCalculator from "@/components/SavingsCalculator";

const agents = [
  {
    id: "inbound",
    label: "AI Receptionist",
    icon: Phone,
    title: "AI Inbound Receptionist",
    description:
      "Your AI receptionist never takes a break. It answers every call professionally, captures lead information, and ensures no opportunity is missed.",
    features: [
      "Answers calls 24/7 including holidays",
      "Captures name, phone, email, and reason for calling",
      "Transfers urgent calls to you immediately",
      "Sends detailed lead summaries via text/email",
    ],
    hasCalculator: true,
    stats: [
      { value: "$126,000+", label: "Average annual revenue lost by small businesses due to missed calls." },
      { value: "Up to 85%", label: "Of callers won't call back or leave a voicemail. They move to a competitor." },
      { value: "~7% Conversion", label: "Leads that hit voicemail convert at roughly 7% and drop sharply the longer you wait to respond." },
    ],
    statsCta: "With StratixOS, your receptionist picks up 100% of calls and books appointments automatically.",
  },
  {
    id: "coldcaller",
    label: "AI Cold Caller",
    icon: PhoneOutgoing,
    title: "AI Cold Caller",
    description:
      "Automate outbound prospecting with an AI that makes hundreds of calls per day, qualifies prospects with natural conversation, and books meetings for your team.",
    features: [
      "Makes 500+ outbound calls per day",
      "Natural, human-like conversation flow",
      "Qualifies prospects against your ICP",
      "Books meetings directly into rep calendars",
      "Provides call transcripts and lead scores",
    ],
    hasCalculator: false,
    stats: [
      { value: "30-50%", label: "Higher conversion rates compared to traditional cold calling." },
      { value: "Up to 40%", label: "Higher response rates by calling leads at the perfect time with instant follow-ups." },
      { value: "70-80%", label: "Cheaper than human callers. Unlimited calls at once. No dialing limits." },
    ],
    statsCta: null,
  },
  {
    id: "website",
    label: "Website Agent",
    icon: Globe,
    title: "AI Website Chat Agent",
    description:
      "Deploy a conversational AI directly on your website that engages visitors, answers questions, and converts traffic into qualified leads around the clock.",
    features: [
      "Engages visitors within seconds of landing",
      "Answers FAQs and product questions instantly",
      "Qualifies leads and collects contact info",
      "Books appointments directly from chat",
      "Reduces bounce rate by up to 40%",
    ],
    hasCalculator: false,
    stats: null,
    statsCta: null,
  },
  {
    id: "inquiry",
    label: "Booking Agent",
    icon: FileText,
    title: "Inquiry & Booking Agent",
    description:
      "Automatically qualifies every inquiry that comes in, whether from a form, email, or call, then books appointments directly into your calendar.",
    features: [
      "Qualifies leads based on your custom criteria",
      "Routes high-value inquiries for immediate follow-up",
      "Books appointments with zero back-and-forth",
      "Syncs with Google Calendar, Outlook, and more",
      "Sends automated confirmations and reminders",
    ],
    hasCalculator: false,
    stats: null,
    statsCta: null,
  },
  {
    id: "social",
    label: "Social Media Agent",
    icon: Share2,
    title: "Complete Social Media Agent",
    description:
      "An AI that manages your social presence end to end. From content creation and scheduling to responding to DMs, comments, and reviews.",
    features: [
      "Generates and schedules posts across platforms",
      "Responds to DMs and comments intelligently",
      "Monitors brand mentions and sentiment",
      "Creates content calendars aligned with your goals",
      "Reports engagement metrics weekly",
    ],
    hasCalculator: false,
    stats: null,
    statsCta: null,
  },
];

const AgentShowcaseSection = () => {
  const [activeId, setActiveId] = useState("inbound");
  const active = agents.find((a) => a.id === activeId)!;

  return (
    <section id="popular-agents" className="section-light py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[hsl(var(--primary))] mb-4">
            Popular Agents
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ color: "hsl(var(--light-fg))" }}>
            Purpose-built AI that drives results
          </h2>
          <p className="text-light-muted max-w-2xl mx-auto">
            Each agent is fully customizable and integrates seamlessly with your existing tools.
          </p>
        </div>

        {/* Toggle pills */}
        <div className="flex justify-center mb-16">
          <div
            className="inline-flex flex-wrap justify-center gap-1 rounded-full p-1.5"
            style={{ background: "hsl(var(--light-border))" }}
          >
            {agents.map((a) => (
              <button
                key={a.id}
                onClick={() => setActiveId(a.id)}
                className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200 ${
                  activeId === a.id
                    ? "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] shadow-md"
                    : "hover:bg-white/60"
                }`}
                style={activeId !== a.id ? { color: "hsl(var(--light-muted))" } : {}}
              >
                <a.icon size={16} />
                <span className="hidden sm:inline">{a.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Agent content */}
        <div className="max-w-6xl mx-auto">
          {/* Stats row (if agent has stats) */}
          {active.stats && (
            <div className="mb-12">
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                {active.stats.map((stat, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border p-6 text-center"
                    style={{ borderColor: "hsl(var(--light-border))", background: "hsl(var(--light-card))" }}
                  >
                    <div className="text-2xl md:text-3xl font-black mb-2" style={{ color: "hsl(var(--destructive))" }}>
                      {stat.value}
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: "hsl(var(--light-muted))" }}>
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
              {active.statsCta && (
                <div
                  className="rounded-2xl border p-6 text-center"
                  style={{ borderColor: "hsl(187 72% 53% / 0.3)", background: "hsl(187 72% 53% / 0.05)" }}
                >
                  <p className="text-sm font-semibold" style={{ color: "hsl(var(--primary))" }}>
                    {active.statsCta}
                  </p>
                </div>
              )}
            </div>
          )}

          <div className="grid lg:grid-cols-5 gap-12 items-start">
            {/* Left: Info */}
            <div className="lg:col-span-3">
              <h3 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: "hsl(var(--light-fg))" }}>
                {active.title}
              </h3>
              <p className="text-sm leading-relaxed mb-8" style={{ color: "hsl(var(--light-muted))" }}>
                {active.description}
              </p>

              <div className="space-y-3 mb-8">
                {active.features.map((f) => (
                  <div key={f} className="flex items-start gap-3">
                    <CheckCircle2
                      size={18}
                      className="shrink-0 mt-0.5"
                      style={{ color: "hsl(var(--primary))" }}
                    />
                    <span className="text-sm" style={{ color: "hsl(var(--light-fg))" }}>
                      {f}
                    </span>
                  </div>
                ))}
              </div>

              <Button size="lg" className="text-sm font-semibold gap-2" asChild>
                <a href="#contact">
                  Get Started <ArrowRight size={16} />
                </a>
              </Button>
            </div>

            {/* Right: Mockup card */}
            <div className="lg:col-span-2">
              <div
                className="rounded-2xl border p-6 shadow-lg"
                style={{
                  borderColor: "hsl(var(--light-border))",
                  background: "hsl(var(--light-card))",
                }}
              >
                <div className="text-sm font-semibold mb-4" style={{ color: "hsl(var(--light-fg))" }}>
                  {active.id === "inbound" ? "Live Call Dashboard" : active.id === "coldcaller" ? "Outbound Campaign" : active.id === "website" ? "Chat Widget" : active.id === "inquiry" ? "Booking Pipeline" : "Social Dashboard"}
                </div>
                <div
                  className="rounded-xl p-5"
                  style={{ background: "hsl(0 0% 97%)" }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-2 w-2 rounded-full bg-[hsl(var(--success))] animate-pulse" />
                    <span className="text-xs font-semibold" style={{ color: "hsl(var(--light-fg))" }}>
                      {active.id === "inbound" ? "Call in Progress" : active.id === "coldcaller" ? "247 Calls Today" : active.id === "website" ? "Visitor Engaged" : active.id === "inquiry" ? "3 New Bookings" : "12 Posts Scheduled"}
                    </span>
                  </div>
                  <p className="text-xs" style={{ color: "hsl(var(--light-muted))" }}>
                    {active.id === "inbound" ? 'AI Agent: "How can I help you today?"' : active.id === "coldcaller" ? "18 meetings booked this week" : active.id === "website" ? '"Tell me about your services..."' : active.id === "inquiry" ? "Today: 12 qualified, 3 booked" : "Engagement up 28% this week"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Calculator for inbound agent */}
          {active.hasCalculator && <SavingsCalculator />}
        </div>
      </div>
    </section>
  );
};

export default AgentShowcaseSection;
