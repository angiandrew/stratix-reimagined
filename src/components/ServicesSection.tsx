import { Workflow, Phone, BarChart3, Cpu, Zap, Bot } from "lucide-react";

const services = [
  {
    icon: Phone,
    tag: "Voice AI",
    title: "AI Voice Agents",
    description: "Intelligent agents that handle inbound calls, qualify leads, and book appointments — 24/7 in a natural, human-like voice.",
  },
  {
    icon: Workflow,
    tag: "Workflow Automation",
    title: "End-to-End Automation",
    description: "From lead intake to follow-up, we automate the repetitive steps that slow your team down with custom-built AI workflows.",
  },
  {
    icon: BarChart3,
    tag: "Analytics",
    title: "Real-Time Insights",
    description: "Dashboards and AI-generated recommendations so you always know what's working and where to optimize.",
  },
  {
    icon: Bot,
    tag: "Chatbots",
    title: "Conversational AI",
    description: "Deploy AI-powered chat on your website and messaging channels to engage, qualify, and convert visitors automatically.",
  },
  {
    icon: Zap,
    tag: "Integrations",
    title: "Custom Integrations",
    description: "Seamlessly connect with your CRM, calendar, and tools. No ripping and replacing — we work with your existing stack.",
  },
  {
    icon: Cpu,
    tag: "AI Strategy",
    title: "AI Consulting",
    description: "Not sure where to start? We map your workflows and identify the highest-impact automations for your business.",
  },
];

const ServicesSection = () => (
  <section id="services" className="section-light py-24">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[hsl(var(--primary))] mb-4">
          What We Do
        </span>
        <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ color: "hsl(var(--light-fg))" }}>
          Complete AI automation
        </h2>
        <p className="text-light-muted max-w-xl mx-auto">
          Not just calls and bookings — full-service AI automation under one roof.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {services.map((s) => (
          <div
            key={s.title}
            className="group rounded-2xl border p-8 transition-all duration-300 hover:shadow-lg"
            style={{ borderColor: "hsl(var(--light-border))", background: "hsl(var(--light-card))" }}
          >
            <div className="h-12 w-12 rounded-xl flex items-center justify-center mb-5 transition-colors" style={{ background: "hsl(187 72% 53% / 0.1)" }}>
              <s.icon className="text-[hsl(var(--primary))]" size={22} />
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[hsl(var(--primary))] mb-2 block">{s.tag}</span>
            <h3 className="text-lg font-bold mb-2" style={{ color: "hsl(var(--light-fg))" }}>{s.title}</h3>
            <p className="text-sm leading-relaxed text-light-muted">{s.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;
