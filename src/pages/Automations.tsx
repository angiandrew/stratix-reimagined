import { Link } from "react-router-dom";
import { Phone, Globe, Users, MessageSquare, Database, Brain, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FAQSection from "@/components/FAQSection";

const AUTOMATIONS = [
  {
    icon: Phone,
    slug: "voice",
    title: "AI Voice Automation",
    headline: "Every inbound call answered, qualified, and booked — automatically.",
    description: "StratixOS's Voice Agent handles inbound calls with natural conversational AI. It qualifies leads, answers questions about your services, and books appointments directly to your calendar — 24/7, with zero hold times.",
    benefits: ["Answers calls in under 500ms", "Qualifies leads with custom criteria", "Books to Google Calendar or Calendly", "Escalates complex calls to your team"],
  },
  {
    icon: Globe,
    slug: "web-agent",
    title: "Website AI Agent",
    headline: "Turn your website into a 24/7 sales rep.",
    description: "The Website Agent uses your knowledge base to answer visitor questions in real time, qualify prospects, and route them to booking or your CRM — without any manual intervention.",
    benefits: ["RAG-powered knowledge base retrieval", "Real-time visitor qualification", "Booking link routing", "CRM synchronization"],
  },
  {
    icon: Users,
    slug: "lead-capture",
    title: "Lead Capture Automation",
    headline: "Every form submission becomes a qualified pipeline entry.",
    description: "StratixOS captures inbound leads from web forms, processes them through AI scoring, creates CRM records, and triggers outreach sequences — all within seconds of submission.",
    benefits: ["AI-powered lead scoring", "Instant CRM record creation", "Automated outreach triggers", "Multi-channel nurture sequences"],
  },
  {
    icon: MessageSquare,
    slug: "social-dm",
    title: "Social DM Automation",
    headline: "Qualify and convert every DM and ad response automatically.",
    description: "The Direct Response Operator handles Instagram DMs, Facebook messages, and ad comment responses. It qualifies leads through conversation and routes them to your booking funnel.",
    benefits: ["Instant DM responses", "Intent detection and lead scoring", "Auto-routing to CRM or booking", "Human handoff for hot leads"],
  },
  {
    icon: Database,
    slug: "integrations",
    title: "Integration & CRM Automation",
    headline: "Your entire stack, synchronized in real time.",
    description: "StratixOS connects with 100+ platforms and keeps your CRM, calendar, and communication tools in sync automatically. No manual data entry, ever.",
    benefits: ["HubSpot, Salesforce, Pipedrive support", "Google Calendar & Calendly sync", "Slack and Gmail notifications", "Zapier and API-ready workflows"],
  },
  {
    icon: Brain,
    slug: "intelligence-engine",
    title: "Intelligence Engine",
    headline: "The AI layer that gets smarter every day.",
    description: "Every interaction across all agents feeds into StratixOS's Intelligence Engine — a learning layer that continuously improves qualification accuracy, response quality, and workflow optimization.",
    benefits: ["Cross-agent learning", "Continuous response improvement", "Workflow performance insights", "Custom model fine-tuning"],
  },
];

const Automations = () => (
  <div className="bg-white min-h-screen">
    <Navbar />

    {/* ── Hero ── */}
    <section className="pt-40 pb-20 text-center px-6">
      <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-5">Automations</p>
      <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.05] mb-6" style={{ color: "#0f172a" }}>
        AI Automation Solutions<br />for Service Businesses
      </h1>
      <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-10">
        StratixOS automates every stage of your customer journey — from the first call to the signed contract.
        Six AI systems, working together, 24/7.
      </p>
      <div className="flex items-center justify-center gap-4 flex-wrap">
        <Link
          to="/book-demo"
          className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold text-white"
          style={{ backgroundColor: "#0f172a" }}
        >
          Book a Demo <ArrowRight size={14} />
        </Link>
        <Link
          to="/roi-calculator"
          className="inline-flex items-center gap-2 rounded-lg border px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          style={{ borderColor: "#e2e8f0" }}
        >
          Calculate ROI
        </Link>
      </div>
    </section>

    {/* ── Automation cards ── */}
    <section className="pb-24 px-6">
      <div className="mx-auto max-w-6xl space-y-5">
        {AUTOMATIONS.map(({ icon: Icon, slug, title, headline, description, benefits }) => (
          <div
            key={slug}
            id={slug}
            className="rounded-2xl border p-8 sm:p-10 flex flex-col sm:flex-row gap-8"
            style={{ borderColor: "#e2e8f0" }}
          >
            <div className="shrink-0">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: "#f1f5f9" }}
              >
                <Icon size={20} style={{ color: "#374151" }} />
              </div>
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">{title}</p>
              <h2 className="text-xl sm:text-2xl font-bold mb-3" style={{ color: "#0f172a" }}>
                {headline}
              </h2>
              <p className="text-sm leading-relaxed text-gray-600 mb-6 max-w-2xl">{description}</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {benefits.map(b => (
                  <li key={b} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <div className="shrink-0 flex items-start">
              <Link
                to="/book-demo"
                className="inline-flex items-center gap-1.5 text-sm font-semibold hover:underline whitespace-nowrap"
                style={{ color: "#374151" }}
              >
                See demo <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* ── Stats bar ── */}
    <section style={{ backgroundColor: "#0f172a" }} className="py-16 px-6">
      <div className="mx-auto max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
        {[
          { value: "< 2s", label: "Lead response time" },
          { value: "100+", label: "Platform integrations" },
          { value: "3–5×", label: "Average ROI in 90 days" },
          { value: "24/7", label: "Autonomous operation" },
        ].map(({ value, label }) => (
          <div key={label}>
            <div className="text-3xl font-bold text-white mb-2">{value}</div>
            <div className="text-sm" style={{ color: "#94a3b8" }}>{label}</div>
          </div>
        ))}
      </div>
    </section>

    <FAQSection />
    <Footer />
  </div>
);

export default Automations;
