import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CLOSE_RATE_LIFT = 0.35;   // StratixOS typically lifts close rate 35%
const RESPONSE_LIFT = 0.20;     // 20% more leads contacted due to speed

const Slider = ({
  label, value, min, max, step, format, onChange,
}: {
  label: string; value: number; min: number; max: number;
  step: number; format: (v: number) => string; onChange: (v: number) => void;
}) => (
  <div className="space-y-2">
    <div className="flex items-center justify-between">
      <label className="text-sm font-medium" style={{ color: "#374151" }}>{label}</label>
      <span className="text-sm font-bold" style={{ color: "#0f172a" }}>{format(value)}</span>
    </div>
    <input
      type="range" min={min} max={max} step={step} value={value}
      onChange={e => onChange(Number(e.target.value))}
      className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
      style={{ accentColor: "#0f172a", backgroundColor: "#e2e8f0" }}
    />
    <div className="flex justify-between text-xs text-gray-400">
      <span>{format(min)}</span>
      <span>{format(max)}</span>
    </div>
  </div>
);

const RoiCalculator = () => {
  const [leads, setLeads] = useState(150);
  const [closeRate, setCloseRate] = useState(15);
  const [dealValue, setDealValue] = useState(2000);
  const [hoursPerWeek, setHoursPerWeek] = useState(20);

  const hourlyRate = 25; // cost per hour of manual follow-up work

  // Current state
  const contactRate = 0.6; // only 60% of leads get contacted manually
  const currentLeadsContacted = leads * contactRate;
  const currentConversions = currentLeadsContacted * (closeRate / 100);
  const currentRevenue = currentConversions * dealValue;
  const currentLaborCost = hoursPerWeek * 4 * hourlyRate;

  // With StratixOS
  const sxLeadsContacted = leads * (contactRate + RESPONSE_LIFT);
  const sxCloseRate = (closeRate / 100) * (1 + CLOSE_RATE_LIFT);
  const sxConversions = sxLeadsContacted * sxCloseRate;
  const sxRevenue = sxConversions * dealValue;
  const sxLaborSaved = hoursPerWeek * 0.75 * 4 * hourlyRate;

  const additionalRevenue = sxRevenue - currentRevenue;
  const totalImpact = additionalRevenue + sxLaborSaved;
  const roi = totalImpact / 1200; // assume ~$1,200/mo StratixOS cost

  const fmt$ = (v: number) => `$${Math.round(v).toLocaleString()}`;
  const fmtK = (v: number) => v >= 1000 ? `$${(v / 1000).toFixed(1)}k` : fmt$(v);

  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      {/* ── Hero ── */}
      <section className="pt-40 pb-16 text-center px-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-5">ROI Calculator</p>
        <h1 className="text-5xl sm:text-6xl font-bold tracking-tight mb-5" style={{ color: "#0f172a" }}>
          Calculate Your Impact
        </h1>
        <p className="text-lg text-gray-500 max-w-xl mx-auto">
          See exactly how much revenue StratixOS can unlock for your business.
        </p>
      </section>

      {/* ── Calculator ── */}
      <section className="pb-24 px-6">
        <div className="mx-auto max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          {/* Inputs */}
          <div
            className="rounded-2xl border p-8 space-y-8"
            style={{ borderColor: "#e2e8f0" }}
          >
            <h2 className="text-lg font-bold" style={{ color: "#0f172a" }}>Your Business</h2>
            <Slider
              label="Monthly inbound leads"
              value={leads} min={20} max={1000} step={10}
              format={v => `${v} leads`}
              onChange={setLeads}
            />
            <Slider
              label="Current close rate"
              value={closeRate} min={3} max={60} step={1}
              format={v => `${v}%`}
              onChange={setCloseRate}
            />
            <Slider
              label="Average deal value"
              value={dealValue} min={200} max={20000} step={100}
              format={fmtK}
              onChange={setDealValue}
            />
            <Slider
              label="Hours/week spent on lead follow-up"
              value={hoursPerWeek} min={2} max={80} step={1}
              format={v => `${v} hrs/wk`}
              onChange={setHoursPerWeek}
            />
          </div>

          {/* Results */}
          <div className="space-y-4">
            {/* Big ROI number */}
            <div
              className="rounded-2xl p-8 text-center"
              style={{ backgroundColor: "#0f172a" }}
            >
              <TrendingUp size={28} className="mx-auto mb-3" style={{ color: "#818cf8" }} />
              <div className="text-5xl font-bold text-white mb-2">{roi.toFixed(1)}×</div>
              <div className="text-sm" style={{ color: "#94a3b8" }}>Projected ROI in 90 days</div>
            </div>

            {/* Side-by-side comparison */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl border p-5" style={{ borderColor: "#e2e8f0" }}>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Without StratixOS</p>
                <div className="space-y-2">
                  <div>
                    <div className="text-xs text-gray-500">Monthly Revenue</div>
                    <div className="text-xl font-bold" style={{ color: "#0f172a" }}>{fmtK(currentRevenue)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Leads Contacted</div>
                    <div className="text-lg font-semibold text-gray-700">{Math.round(currentLeadsContacted)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Conversions</div>
                    <div className="text-lg font-semibold text-gray-700">{Math.round(currentConversions)}</div>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl border p-5" style={{ backgroundColor: "#f0fdf4", borderColor: "#bbf7d0" }}>
                <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#16a34a" }}>With StratixOS</p>
                <div className="space-y-2">
                  <div>
                    <div className="text-xs" style={{ color: "#15803d" }}>Monthly Revenue</div>
                    <div className="text-xl font-bold" style={{ color: "#14532d" }}>{fmtK(sxRevenue)}</div>
                  </div>
                  <div>
                    <div className="text-xs" style={{ color: "#15803d" }}>Leads Contacted</div>
                    <div className="text-lg font-semibold" style={{ color: "#14532d" }}>{Math.round(sxLeadsContacted)}</div>
                  </div>
                  <div>
                    <div className="text-xs" style={{ color: "#15803d" }}>Conversions</div>
                    <div className="text-lg font-semibold" style={{ color: "#14532d" }}>{Math.round(sxConversions)}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Impact summary */}
            <div className="rounded-2xl border p-5 space-y-3" style={{ borderColor: "#e2e8f0" }}>
              <p className="text-sm font-semibold" style={{ color: "#0f172a" }}>Monthly Impact Breakdown</p>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Additional revenue</span>
                <span className="font-semibold text-gray-900">+{fmtK(additionalRevenue)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Labor cost saved</span>
                <span className="font-semibold text-gray-900">+{fmtK(sxLaborSaved)}</span>
              </div>
              <div className="h-px bg-gray-100" />
              <div className="flex justify-between text-sm font-bold">
                <span style={{ color: "#0f172a" }}>Total monthly impact</span>
                <span style={{ color: "#16a34a" }}>+{fmtK(totalImpact)}</span>
              </div>
            </div>

            <Link
              to="/book-demo"
              className="flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-white w-full transition-colors"
              style={{ backgroundColor: "#0f172a" }}
            >
              Book a Demo to Get Started <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default RoiCalculator;
