import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/* ── Slider ── */
const Slider = ({
  label, value, min, max, step, display, onChange,
}: {
  label: string; value: number; min: number; max: number;
  step: number; display: string; onChange: (v: number) => void;
}) => {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium" style={{ color: "#374151" }}>{label}</span>
        <span
          className="text-sm font-semibold tabular-nums px-3 py-1 rounded-lg"
          style={{ backgroundColor: "#f1f5f9", color: "#0f172a", minWidth: 80, textAlign: "center" }}
        >
          {display}
        </span>
      </div>
      <div className="relative h-[18px] flex items-center">
        {/* Track */}
        <div className="absolute w-full h-[4px] rounded-full" style={{ backgroundColor: "#e2e8f0" }} />
        {/* Fill */}
        <div
          className="absolute h-[4px] rounded-full"
          style={{ width: `${pct}%`, backgroundColor: "#0f172a" }}
        />
        <input
          type="range" min={min} max={max} step={step} value={value}
          onChange={e => onChange(Number(e.target.value))}
          className="roi-range absolute w-full"
        />
      </div>
      <div className="flex justify-between text-xs" style={{ color: "#9ca3af" }}>
        <span>{typeof min === "number" && min >= 100 ? `$${min.toLocaleString()}` : min.toLocaleString()}</span>
        <span>{typeof max === "number" && max >= 100 ? `$${max.toLocaleString()}` : max.toLocaleString()}</span>
      </div>
    </div>
  );
};

/* ── Result row ── */
const ResultRow = ({
  label, monthly, annual, color, border = true,
}: {
  label: string; monthly: string; annual: string; color: string; border?: boolean;
}) => (
  <div className={`py-6 ${border ? "border-b" : ""}`} style={{ borderColor: "#f1f5f9" }}>
    <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color }}>
      {label}
    </p>
    <div className="flex items-baseline gap-2">
      <span className="text-4xl font-black tracking-tight" style={{ color: "#0f172a" }}>
        {monthly}
      </span>
      <span className="text-sm font-medium" style={{ color: "#9ca3af" }}>/mo</span>
    </div>
    <p className="text-sm font-semibold mt-1" style={{ color }}>{annual} /year</p>
  </div>
);

/* ── Helpers ── */
const fmtK = (v: number) => {
  if (v >= 1_000_000) return `$${(v / 1_000_000).toFixed(1)}M`;
  if (v >= 10_000)    return `$${Math.round(v / 1000)}k`;
  return `$${Math.round(v).toLocaleString()}`;
};

/* ── Page ── */
const RoiCalculator = () => {
  const [callsPerMonth, setCallsPerMonth] = useState(300);
  const [missedCalls,   setMissedCalls]   = useState(60);
  const [avgRevenue,    setAvgRevenue]     = useState(1500);
  const [showAdv,       setShowAdv]        = useState(false);
  const [closeRate,     setCloseRate]      = useState(35);
  const [aiRecovery,    setAiRecovery]     = useState(90);
  const [grossMargin,   setGrossMargin]    = useState(50);

  const revMissedMo = missedCalls * (closeRate / 100) * avgRevenue;
  const recoveredMo = missedCalls * (aiRecovery / 100) * (closeRate / 100) * avgRevenue;
  const profitMo    = recoveredMo * (grossMargin / 100);

  return (
    <>
      <style>{`
        .roi-range {
          -webkit-appearance: none;
          appearance: none;
          background: transparent;
          cursor: pointer;
          height: 18px;
          margin: 0;
          width: 100%;
        }
        .roi-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 20px; height: 20px;
          border-radius: 50%;
          background: #0f172a;
          border: 3px solid #ffffff;
          box-shadow: 0 1px 4px rgba(0,0,0,0.18);
          cursor: pointer;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .roi-range::-webkit-slider-thumb:hover {
          transform: scale(1.15);
          box-shadow: 0 2px 8px rgba(0,0,0,0.22);
        }
        .roi-range::-moz-range-thumb {
          width: 20px; height: 20px;
          border-radius: 50%;
          background: #0f172a;
          border: 3px solid #ffffff;
          box-shadow: 0 1px 4px rgba(0,0,0,0.18);
          cursor: pointer;
        }
      `}</style>

      <div className="min-h-screen bg-white">
        <Navbar />

        {/* ── Hero ── */}
        <section className="pt-36 pb-16 text-center px-6">
          <p className="text-[10px] font-semibold uppercase tracking-widest mb-4" style={{ color: "#94a3b8" }}>
            ROI Calculator
          </p>
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight mb-4" style={{ color: "#0f172a" }}>
            How much are missed calls<br />costing you?
          </h1>
          <p className="text-base max-w-md mx-auto" style={{ color: "#6b7280" }}>
            Adjust the sliders below and see your revenue recovery estimate in real time.
          </p>
        </section>

        {/* ── Calculator ── */}
        <section className="pb-28 px-6">
          <div className="mx-auto max-w-5xl">
            <div
              className="rounded-3xl overflow-hidden"
              style={{ border: "1px solid #e8edf3", boxShadow: "0 4px 40px rgba(0,0,0,0.06)" }}
            >
              {/* Header bar */}
              <div
                className="px-8 py-5 flex items-center justify-between border-b"
                style={{ borderColor: "#f1f5f9", backgroundColor: "#ffffff" }}
              >
                <div>
                  <h2 className="text-sm font-bold" style={{ color: "#0f172a" }}>
                    Missed Call Savings Calculator
                  </h2>
                  <p className="text-xs mt-0.5" style={{ color: "#9ca3af" }}>
                    Enter your numbers to see real-time revenue estimates.
                  </p>
                </div>
                <span
                  className="text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full"
                  style={{ backgroundColor: "#f0fdf4", color: "#16a34a", border: "1px solid #bbf7d0" }}
                >
                  Live
                </span>
              </div>

              {/* Two-column body */}
              <div className="flex flex-col lg:flex-row" style={{ backgroundColor: "#ffffff" }}>

                {/* Left: sliders */}
                <div
                  className="flex-1 px-8 py-8 flex flex-col gap-7 border-b lg:border-b-0 lg:border-r"
                  style={{ borderColor: "#f1f5f9" }}
                >
                  <Slider
                    label="Calls per month"
                    value={callsPerMonth} min={50} max={2000} step={10}
                    display={`${callsPerMonth.toLocaleString()} calls`}
                    onChange={setCallsPerMonth}
                  />
                  <Slider
                    label="Missed calls per month"
                    value={missedCalls} min={5} max={Math.min(callsPerMonth, 500)} step={5}
                    display={`${missedCalls} calls`}
                    onChange={v => setMissedCalls(Math.min(v, callsPerMonth))}
                  />
                  <Slider
                    label="Average revenue per booked job"
                    value={avgRevenue} min={100} max={15000} step={100}
                    display={`$${avgRevenue.toLocaleString()}`}
                    onChange={setAvgRevenue}
                  />

                  {/* Divider */}
                  <div className="h-px" style={{ backgroundColor: "#f1f5f9" }} />

                  {/* Advanced toggle */}
                  <button
                    onClick={() => setShowAdv(s => !s)}
                    className="flex items-center gap-1.5 text-xs font-semibold -mt-2 w-fit transition-opacity hover:opacity-70"
                    style={{ color: "#0ea5e9" }}
                  >
                    {showAdv ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                    {showAdv ? "Hide advanced" : "Show advanced"}
                  </button>

                  {showAdv && (
                    <div className="flex flex-col gap-7 -mt-2">
                      <p className="text-xs -mb-2" style={{ color: "#9ca3af" }}>
                        These defaults are adjustable.
                      </p>
                      <Slider
                        label="Close rate"
                        value={closeRate} min={5} max={80} step={1}
                        display={`${closeRate}%`}
                        onChange={setCloseRate}
                      />
                      <Slider
                        label="AI recovery rate"
                        value={aiRecovery} min={50} max={100} step={1}
                        display={`${aiRecovery}%`}
                        onChange={setAiRecovery}
                      />
                      <Slider
                        label="Gross margin"
                        value={grossMargin} min={10} max={90} step={1}
                        display={`${grossMargin}%`}
                        onChange={setGrossMargin}
                      />
                    </div>
                  )}
                </div>

                {/* Right: results */}
                <div className="lg:w-80 xl:w-96 px-8 py-8 flex flex-col">
                  <div className="flex-1">
                    <ResultRow
                      label="Estimated Revenue Missed"
                      monthly={fmtK(revMissedMo)}
                      annual={fmtK(revMissedMo * 12)}
                      color="#dc2626"
                    />
                    <ResultRow
                      label="Revenue Recovered with StratixOS"
                      monthly={fmtK(recoveredMo)}
                      annual={fmtK(recoveredMo * 12)}
                      color="#0d9488"
                    />
                    <ResultRow
                      label="Profit Recovered"
                      monthly={fmtK(profitMo)}
                      annual={fmtK(profitMo * 12)}
                      color="#0d9488"
                      border={false}
                    />
                  </div>

                  {/* CTAs */}
                  <div className="flex flex-col gap-3 mt-8 pt-6 border-t" style={{ borderColor: "#f1f5f9" }}>
                    <Link
                      to="/automations"
                      className="flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                      style={{ backgroundColor: "#0ea5e9" }}
                    >
                      See how it works <ArrowRight size={13} />
                    </Link>
                    <Link
                      to="/book-demo"
                      className="flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                      style={{ backgroundColor: "#0f172a" }}
                    >
                      Book a Demo
                    </Link>
                    <p className="text-center text-xs mt-1" style={{ color: "#d1d5db" }}>
                      Estimates only. Real results vary.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            <p className="text-center text-xs mt-5" style={{ color: "#9ca3af" }}>
              *Defaults: 35% close rate · 90% AI recovery · 50% gross margin — adjustable under "Show advanced"
            </p>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default RoiCalculator;
