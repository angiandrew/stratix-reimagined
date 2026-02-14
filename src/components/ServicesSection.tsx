import { useState } from "react";
import { Workflow, Phone, BarChart3, MessageSquare, Cpu, Shield } from "lucide-react";

const tabs = [
  {
    id: "automate",
    label: "Automate",
    icon: Workflow,
    title: "End-to-end workflow automation",
    description:
      "From lead intake to follow-up, we automate the repetitive steps that slow your team down. Custom-built AI workflows that scale with your business.",
    features: [
      "CRM automation & lead routing",
      "Multi-step workflow orchestration",
      "Custom integrations with your stack",
      "Automated reporting & alerts",
    ],
  },
  {
    id: "communicate",
    label: "Communicate",
    icon: Phone,
    title: "AI-powered voice & chat agents",
    description:
      "Intelligent agents that handle inbound calls, qualify leads, and book appointments — in a natural, human-like voice, 24/7.",
    features: [
      "AI inbound receptionist",
      "Smart appointment booking",
      "Instant lead qualification",
      "Omnichannel support (voice, chat, SMS)",
    ],
  },
  {
    id: "analyze",
    label: "Analyze",
    icon: BarChart3,
    title: "Insights that drive decisions",
    description:
      "Real-time dashboards and AI-generated insights so you always know what's working and where to optimize.",
    features: [
      "Real-time performance dashboards",
      "AI-generated recommendations",
      "Conversion funnel analytics",
      "Custom KPI tracking",
    ],
  },
];

const capabilities = [
  { icon: MessageSquare, label: "Conversational AI" },
  { icon: Cpu, label: "Process Automation" },
  { icon: Shield, label: "Enterprise Security" },
];

const ServicesSection = () => {
  const [activeTab, setActiveTab] = useState("automate");
  const active = tabs.find((t) => t.id === activeTab)!;

  return (
    <section id="services" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Complete AI <span className="text-gradient">automation</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Not just calls and bookings — full-service AI automation under one roof.
          </p>
        </div>

        {/* Tab buttons */}
        <div className="flex justify-center gap-2 mb-12">
          {tabs.map((t) => {
            const isActive = t.id === activeTab;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-all ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                <t.icon size={16} />
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        <div className="max-w-4xl mx-auto rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">{active.title}</h3>
              <p className="text-muted-foreground mb-6">{active.description}</p>
              <ul className="space-y-3">
                {active.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-foreground/80">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative w-full aspect-square max-w-[280px]">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/10 to-transparent" />
                <div className="absolute inset-[15%] rounded-full border border-border" />
                <div className="absolute inset-[30%] rounded-full border border-border" />
                <div className="absolute inset-[45%] rounded-full bg-primary/10 blur-xl" />
                <active.icon
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-primary"
                  size={48}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Capability pills */}
        <div className="flex justify-center gap-4 mt-10 flex-wrap">
          {capabilities.map((c) => (
            <div
              key={c.label}
              className="flex items-center gap-2 rounded-full border border-border bg-secondary/30 px-4 py-2 text-xs text-muted-foreground"
            >
              <c.icon size={14} />
              {c.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
