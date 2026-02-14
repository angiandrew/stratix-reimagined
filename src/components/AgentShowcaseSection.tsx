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
      "Increases lead conversion by 391%",
    ],
    hasCalculator: true,
    mockup: {
      title: "Live Call Dashboard",
      status: "Call in Progress",
      message: 'AI Agent: "How can I help you today?"',
    },
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
    mockup: {
      title: "Chat Widget",
      status: "Visitor Engaged",
      message: '"Tell me about your services..."',
    },
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
    mockup: {
      title: "Booking Pipeline",
      status: "3 New Bookings",
      message: "Today: 12 qualified, 3 booked",
    },
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
    mockup: {
      title: "Social Dashboard",
      status: "12 Posts Scheduled",
      message: "Engagement up 28% this week",
    },
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
    mockup: {
      title: "Outbound Campaign",
      status: "247 Calls Today",
      message: "18 meetings booked this week",
    },
  },
];

const AgentShowcaseSection = () => {
  const [activeId, setActiveId] = useState("inbound");
  const active = agents.find((a) => a.id === activeId)!;

  return (
    <section id="services" className="section-light py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[hsl(var(--primary))] mb-4">
            Our AI Agents
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ color: "hsl(var(--light-fg))" }}>
            One platform, every agent you need
          </h2>
          <p className="text-light-muted max-w-2xl mx-auto">
            Each agent is purpose-built, fully customizable, and integrates seamlessly with your existing tools.
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
                  {active.mockup.title}
                </div>
                <div
                  className="rounded-xl p-5"
                  style={{ background: "hsl(0 0% 97%)" }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-2 w-2 rounded-full bg-[hsl(var(--success))] animate-pulse" />
                    <span className="text-xs font-semibold" style={{ color: "hsl(var(--light-fg))" }}>
                      {active.mockup.status}
                    </span>
                  </div>
                  <p className="text-xs" style={{ color: "hsl(var(--light-muted))" }}>
                    {active.mockup.message}
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
