import { Link } from "react-router-dom";
import { Check, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const TESTIMONIALS = [
  {
    quote: "Each customer services rep is 10x more impactful when using StratixOS. The AI handles everything we used to spend hours on.",
    name: "Jo-Anne Torres",
    title: "Communications Lead, GrowthFirst Agency",
    initials: "JT",
    color: "#f87171",
  },
  {
    quote: "Before StratixOS, we had thousands of uncontacted leads and no way to prioritize. Now we respond within 2 seconds to every inquiry, automatically.",
    name: "Michael Buggy",
    title: "Co-Founder, The Flex Group",
    initials: "MB",
    color: "#818cf8",
  },
  {
    quote: "From day one, StratixOS felt like a superpower. When we compared it to everything else, it was immediately clear — nothing comes close.",
    name: "Rachel Kim",
    title: "Founder, Elite Realty Partners",
    initials: "RK",
    color: "#34d399",
  },
  {
    quote: "We booked 40% more appointments in the first month without hiring a single additional staff member.",
    name: "David Osei",
    title: "Owner, Premier HVAC Services",
    initials: "DO",
    color: "#fbbf24",
  },
  {
    quote: "The voice agent sounds incredibly natural. Our customers can't tell it's AI — and the qualification accuracy is remarkable.",
    name: "Lisa Hernandez",
    title: "CEO, MedSpa Collective",
    initials: "LH",
    color: "#f472b6",
  },
  {
    quote: "Implementation took less than a week. ROI was visible in the first 30 days. I wish we'd done this two years ago.",
    name: "Tom Walsh",
    title: "VP Sales, Pinnacle Financial",
    initials: "TW",
    color: "#60a5fa",
  },
];

const PLANS = [
  {
    name: "Starter",
    price: "Contact us",
    description: "Perfect for solo operators and small teams ready to automate.",
    features: ["1 AI Agent (Voice or Web)", "Up to 500 conversations/mo", "CRM integration (1 platform)", "Email & SMS outreach", "Standard support"],
    cta: "Book a Demo",
    highlight: false,
  },
  {
    name: "Growth",
    price: "Contact us",
    description: "For growing businesses that need full automation across every channel.",
    features: ["3 AI Agents (Voice + Web + Social)", "Up to 2,000 conversations/mo", "CRM integration (up to 5 platforms)", "Full outreach automation", "Intelligence Engine", "Priority support"],
    cta: "Book a Demo",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For multi-location businesses and agencies requiring custom workflows.",
    features: ["Unlimited AI Agents", "Unlimited conversations", "Custom integrations", "Dedicated success manager", "White-label options", "SLA guarantees"],
    cta: "Contact Sales",
    highlight: false,
  },
];

const Pricing = () => (
  <div className="bg-white min-h-screen">
    <Navbar />

    {/* ── Hero ── */}
    <section className="pt-40 pb-20 text-center px-6" style={{ backgroundColor: "#ffffff" }}>
      <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-5">Pricing</p>
      <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.05] mb-6" style={{ color: "#0f172a" }}>
        Simple, transparent<br />pricing.
      </h1>
      <p className="text-lg text-gray-500 max-w-xl mx-auto mb-12">
        No setup fees. No contracts. Pay for what you use as you scale.
      </p>
    </section>

    {/* ── Pricing cards ── */}
    <section className="pb-24 px-6">
      <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6">
        {PLANS.map((plan) => (
          <div
            key={plan.name}
            className="rounded-2xl border p-8 flex flex-col"
            style={{
              backgroundColor: plan.highlight ? "#0f172a" : "#ffffff",
              borderColor: plan.highlight ? "#0f172a" : "#e2e8f0",
            }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: plan.highlight ? "#94a3b8" : "#9ca3af" }}>
              {plan.name}
            </p>
            <div className="text-2xl font-bold mb-2" style={{ color: plan.highlight ? "#ffffff" : "#0f172a" }}>
              {plan.price}
            </div>
            <p className="text-sm mb-8 leading-relaxed" style={{ color: plan.highlight ? "#94a3b8" : "#6b7280" }}>
              {plan.description}
            </p>
            <ul className="space-y-3 mb-10 flex-1">
              {plan.features.map(f => (
                <li key={f} className="flex items-start gap-2.5">
                  <Check size={14} className="mt-0.5 shrink-0" style={{ color: plan.highlight ? "#34d399" : "#0f172a" }} />
                  <span className="text-sm" style={{ color: plan.highlight ? "#d1d5db" : "#374151" }}>{f}</span>
                </li>
              ))}
            </ul>
            <Link
              to="/book-demo"
              className="block text-center rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors"
              style={{
                backgroundColor: plan.highlight ? "#ffffff" : "#0f172a",
                color: plan.highlight ? "#0f172a" : "#ffffff",
              }}
            >
              {plan.cta}
            </Link>
          </div>
        ))}
      </div>
    </section>

    {/* ── Book a Demo CTA (dark) ── */}
    <section style={{ backgroundColor: "#0a0a0a" }} className="py-24 px-6">
      <div className="mx-auto max-w-4xl flex flex-col lg:flex-row items-center gap-16">
        {/* Left: mini dashboard */}
        <div className="w-full lg:w-1/2 shrink-0">
          <div className="rounded-2xl border p-6 max-w-xs mx-auto" style={{ backgroundColor: "#111111", borderColor: "#1f1f1f" }}>
            <div className="text-xs font-medium mb-1" style={{ color: "#9ca3af" }}>Revenue</div>
            <div className="text-3xl font-bold text-white mb-1">$12,320</div>
            <div className="text-xs mb-5" style={{ color: "#6b7280" }}>Made this month · +34%</div>
            <div className="flex items-end gap-2" style={{ height: 72 }}>
              {[28, 44, 36, 58, 72, 52, 68].map((h, i) => (
                <div key={i} className="flex-1 rounded-t" style={{ height: `${h}%`, backgroundColor: i === 4 ? "#f87171" : "#1f2937" }} />
              ))}
            </div>
          </div>
        </div>

        {/* Right: form CTA */}
        <div className="flex-1">
          <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#6b7280" }}>Get Started</p>
          <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
            Ready to automate<br />your business?
          </h2>
          <p className="text-base mb-8" style={{ color: "#9ca3af" }}>
            Book a 30-minute demo and see exactly how StratixOS will work for your business.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/book-demo"
              className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold text-white transition-colors"
              style={{ backgroundColor: "#1f2937", border: "1px solid #374151" }}
            >
              Book a Demo <ArrowRight size={14} />
            </Link>
            <Link
              to="/roi-calculator"
              className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition-colors"
              style={{ border: "1px solid #1f1f1f", color: "#9ca3af" }}
            >
              Calculate ROI
            </Link>
          </div>
        </div>
      </div>
    </section>

    {/* ── Testimonials ── */}
    <section style={{ backgroundColor: "#f5f5f5" }} className="py-24 px-6">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-4xl sm:text-5xl font-bold text-center mb-4 tracking-tight" style={{ color: "#0f172a" }}>
          Don't Just Take<br />Our Word for It
        </h2>
        <p className="text-center text-gray-500 mb-16 max-w-lg mx-auto">
          Straight from the teams who rely on StratixOS to run their customer journey end-to-end.
        </p>
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
          {TESTIMONIALS.map(({ quote, name, title, initials, color }) => (
            <div
              key={name}
              className="break-inside-avoid rounded-2xl border p-6 bg-white"
              style={{ borderColor: "#e2e8f0" }}
            >
              <p className="text-sm leading-relaxed text-gray-700 mb-6">"{quote}"</p>
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                  style={{ backgroundColor: color }}
                >
                  {initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{name}</p>
                  <p className="text-xs text-gray-500">{title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <Footer />
  </div>
);

export default Pricing;
