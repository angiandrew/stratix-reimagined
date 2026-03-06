import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Minus, ArrowRight } from "lucide-react";

const FAQS = [
  {
    q: "How quickly can StratixOS be deployed for my business?",
    a: "StratixOS is typically live within 3–5 business days. We handle the entire setup — AI training on your services, CRM integration, and call routing — so your team can focus on results from day one.",
    link: null,
  },
  {
    q: "What integrations does StratixOS support?",
    a: "StratixOS connects with 100+ platforms including HubSpot, Salesforce, Google Calendar, Slack, Gmail, Airtable, Zapier, Twilio, and more. Two-way sync keeps your CRM and calendar always up to date.",
    link: { label: "View all automations", href: "/automations" },
  },
  {
    q: "Is my data secure with StratixOS?",
    a: "Yes. StratixOS uses enterprise-grade encryption (AES-256 at rest, TLS 1.3 in transit). Your data is never used to train other customers' AI models and is fully isolated within your account.",
    link: null,
  },
  {
    q: "Can I customize the AI behavior and responses?",
    a: "Absolutely. Every AI agent is trained on your brand voice, service offerings, pricing, and lead qualification criteria. You control escalation rules, response tone, and exactly what the AI says in every scenario.",
    link: { label: "See how customization works", href: "/automations" },
  },
  {
    q: "How does AI voice automation work?",
    a: "Our Voice Agent answers inbound calls, asks qualifying questions in a natural conversational style, scores the lead, and books appointments directly to your calendar — all without human intervention. Average response latency is under 500ms.",
    link: { label: "Learn about Voice Automation", href: "/automations" },
  },
  {
    q: "What industries does StratixOS serve?",
    a: "StratixOS is purpose-built for service businesses including Home Services (HVAC, plumbing, electrical), Real Estate, Healthcare & Med Spas, Financial Services, E-Commerce, and Professional Services.",
    link: { label: "Browse industries", href: "/industries/home-services" },
  },
  {
    q: "What is the ROI of implementing AI automation?",
    a: "Most StratixOS customers see a 3–5x return within the first 90 days. The biggest gains come from faster lead response times (under 2 seconds vs. industry average of 47 hours), higher conversion rates, and eliminating manual follow-up overhead.",
    link: { label: "Calculate your ROI", href: "/roi-calculator" },
  },
  {
    q: "Do I need technical expertise to use StratixOS?",
    a: "No. StratixOS is a fully managed service. Our team handles AI training, integrations, workflow setup, and ongoing optimization. You approve the setup, and we handle everything else.",
    link: null,
  },
];

const FAQItem = ({ q, a, link, open, onToggle }: {
  q: string; a: string;
  link: { label: string; href: string } | null;
  open: boolean; onToggle: () => void;
}) => (
  <div
    className="border-b cursor-pointer"
    style={{ borderColor: "#e5e7eb" }}
    onClick={onToggle}
  >
    <div className="flex items-center justify-between py-5 gap-4">
      <h3 className="text-base font-semibold text-left" style={{ color: "#0f172a" }}>{q}</h3>
      <div className="shrink-0" style={{ color: "#9ca3af" }}>
        {open ? <Minus size={16} /> : <Plus size={16} />}
      </div>
    </div>
    {open && (
      <div className="pb-6">
        <p className="text-sm leading-relaxed mb-4" style={{ color: "#6b7280" }}>{a}</p>
        {link && (
          <Link
            to={link.href}
            onClick={e => e.stopPropagation()}
            className="inline-flex items-center gap-1.5 text-sm font-semibold hover:underline"
            style={{ color: "#0f172a" }}
          >
            {link.label} <ArrowRight size={13} />
          </Link>
        )}
      </div>
    )}
  </div>
);

const FAQSection = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section id="faq" style={{ backgroundColor: "#f9fafb" }} className="py-24 px-6">
      <div className="mx-auto max-w-3xl">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">FAQ</p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-5" style={{ color: "#0f172a" }}>
            Frequently asked questions.
          </h2>
          <p className="text-gray-500 text-base">
            Everything you need to know about StratixOS.{" "}
            <Link to="/book-demo" className="underline underline-offset-2 hover:text-gray-900 transition-colors" style={{ color: "#374151" }}>
              Book a demo
            </Link>{" "}
            if you have more questions.
          </p>
        </div>

        {/* Accordion */}
        <div className="rounded-2xl bg-white border overflow-hidden px-6" style={{ borderColor: "#e5e7eb" }}>
          {FAQS.map((faq, i) => (
            <FAQItem
              key={i}
              q={faq.q}
              a={faq.a}
              link={faq.link}
              open={openIdx === i}
              onToggle={() => setOpenIdx(openIdx === i ? null : i)}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500 mb-5">Still have questions? We're happy to help.</p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              to="/book-demo"
              className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white"
              style={{ backgroundColor: "#0f172a" }}
            >
              Book a Demo <ArrowRight size={13} />
            </Link>
            <a
              href="mailto:hello@stratixos.com"
              className="inline-flex items-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              style={{ borderColor: "#e2e8f0" }}
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
