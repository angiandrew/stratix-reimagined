import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import logo from "@/assets/stratixos-logo.png";

const SLIDES = [
  {
    tag: "Voice Agents & Customer Experience",
    stat: "85%",
    insight: "of customer interactions are expected to be handled without human agents.",
    quote: "AI will fundamentally change how businesses interact with customers. Most interactions will be automated.",
    name: "Satya Nadella",
    title: "CEO, Microsoft",
  },
  {
    tag: "Voice AI & Customer Support",
    stat: "30%",
    insight: "cost reduction reported by companies using AI in customer service, while improving response times.",
    quote: "AI is helping companies deliver faster and more personalized customer service at scale.",
    name: "Marc Benioff",
    title: "CEO, Salesforce",
  },
  {
    tag: "AI Productivity",
    stat: "40%",
    insight: "productivity increase from AI in certain business processes.",
    quote: "AI is one of the most profound technologies humanity is working on.",
    name: "Sundar Pichai",
    title: "CEO, Google",
  },
  {
    tag: "AI & Business Growth",
    stat: "$15.7T",
    insight: "AI's projected contribution to the global economy by 2030.",
    quote: "AI will be the most important commercial technology of our generation.",
    name: "PwC Global AI Study",
    title: "",
  },
  {
    tag: "Automation & Efficiency",
    stat: "20–30%",
    insight: "efficiency gains in operations reported by organizations adopting automation.",
    quote: "Automation is not about replacing people, it's about amplifying human potential.",
    name: "Jensen Huang",
    title: "CEO, NVIDIA",
  },
];

const BUSINESS_TYPES = [
  "Home Services (HVAC, Plumbing, Electrical)",
  "Real Estate / Property Management",
  "Healthcare / Med Spa",
  "Financial Services",
  "E-Commerce / Retail",
  "Other",
];

const BookDemo = () => {
  const [slide, setSlide] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Auto-rotate every 6 seconds
  useEffect(() => {
    const id = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setSlide(s => (s + 1) % SLIDES.length);
        setAnimating(false);
      }, 300);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  const goTo = (i: number) => {
    if (i === slide) return;
    setAnimating(true);
    setTimeout(() => {
      setSlide(i);
      setAnimating(false);
    }, 250);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && selected) setSubmitted(true);
  };

  const s = SLIDES[slide];

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "#0a0a0a" }}>

      {/* ── Left panel ── */}
      <div className="hidden lg:flex w-5/12 flex-col justify-between p-12 border-r" style={{ borderColor: "#1a1a1a" }}>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <img src={logo} alt="StratixOS" className="h-8 w-8" />
          <span className="text-lg font-bold text-white">
            Stratix<span style={{ color: "#6366f1" }}>OS</span>
          </span>
        </Link>

        {/* Carousel */}
        <div className="flex flex-col gap-8">
          {/* Section label */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#4b5563" }}>
              Why AI Agents Are Reshaping Business Operations
            </p>
            <div className="h-px w-12" style={{ backgroundColor: "#1f2937" }} />
          </div>

          {/* Slide content */}
          <div
            style={{
              transition: "opacity 0.3s ease, transform 0.3s ease",
              opacity: animating ? 0 : 1,
              transform: animating ? "translateY(6px)" : "translateY(0)",
            }}
          >
            {/* Tag */}
            <p className="text-xs font-medium mb-5 px-2.5 py-1 rounded-full inline-block" style={{ color: "#6366f1", backgroundColor: "#1e1b4b" }}>
              {s.tag}
            </p>

            {/* Big stat */}
            <div className="text-6xl font-bold text-white mb-3 leading-none">{s.stat}</div>
            <p className="text-base leading-relaxed mb-8" style={{ color: "#9ca3af" }}>
              {s.insight}
            </p>

            {/* Quote */}
            <div className="border-l-2 pl-5" style={{ borderColor: "#374151" }}>
              <p className="text-sm leading-relaxed mb-4 italic" style={{ color: "#d1d5db" }}>
                "{s.quote}"
              </p>
              <div>
                <p className="text-sm font-semibold text-white">{s.name}</p>
                {s.title && <p className="text-xs" style={{ color: "#6b7280" }}>{s.title}</p>}
              </div>
            </div>
          </div>

          {/* Dot nav */}
          <div className="flex gap-2">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === slide ? 24 : 8,
                  height: 8,
                  backgroundColor: i === slide ? "#6366f1" : "#1f2937",
                }}
              />
            ))}
          </div>
        </div>

        <p className="text-xs" style={{ color: "#374151" }}>© 2025 StratixOS. All rights reserved.</p>
      </div>

      {/* ── Right panel ── */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-16 py-16">

        {/* Back link (mobile) */}
        <Link to="/" className="lg:hidden flex items-center gap-2 text-sm mb-10" style={{ color: "#6b7280" }}>
          <ArrowLeft size={14} /> Back to home
        </Link>

        {submitted ? (
          <div className="max-w-md">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mb-6"
              style={{ backgroundColor: "#166534" }}
            >
              <span className="text-2xl text-white">✓</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-3">You're booked.</h1>
            <p style={{ color: "#9ca3af" }} className="text-base leading-relaxed mb-8">
              We'll reach out within one business day to confirm your demo. In the meantime, explore how StratixOS works.
            </p>
            <Link
              to="/automations"
              className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition-colors"
              style={{ backgroundColor: "#1f2937" }}
            >
              Explore Automations
            </Link>
          </div>
        ) : (
          <div className="max-w-md w-full">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
              See StratixOS in Action
            </h1>
            <p className="text-base mb-10" style={{ color: "#9ca3af" }}>
              Tell us more about your business.
            </p>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">Work Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full rounded-lg px-4 py-3 text-sm text-white placeholder:text-gray-600 outline-none focus:ring-1 focus:ring-white/20 transition-all"
                  style={{ backgroundColor: "#111111", border: "1px solid #1f1f1f" }}
                />
              </div>

              {/* Business type */}
              <div>
                <label className="block text-sm font-medium text-white mb-4">
                  Which of the following best describes your business?
                </label>
                <div className="space-y-2">
                  {BUSINESS_TYPES.map(type => (
                    <label
                      key={type}
                      className="flex items-center gap-3 cursor-pointer group"
                      onClick={() => setSelected(type)}
                    >
                      <div
                        className="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all"
                        style={{
                          borderColor: selected === type ? "#6366f1" : "#374151",
                          backgroundColor: "transparent",
                        }}
                      >
                        {selected === type && (
                          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#6366f1" }} />
                        )}
                      </div>
                      <span
                        className="text-sm transition-colors"
                        style={{ color: selected === type ? "#ffffff" : "#9ca3af" }}
                      >
                        {type}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={!email || !selected}
                className="flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold text-white transition-all disabled:opacity-40"
                style={{ backgroundColor: "#4f46e5", border: "1px solid #6366f1" }}
              >
                Submit
                <span style={{ color: "#a5b4fc" }}>↵</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookDemo;
