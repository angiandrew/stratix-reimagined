import { useState, useMemo } from "react";
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const fmt = (n: number) =>
  "$" + Math.round(n).toLocaleString("en-US");

const SavingsCalculator = () => {
  const [callsPerMonth, setCallsPerMonth] = useState(300);
  const [missedCalls, setMissedCalls] = useState(60);
  const [avgRevenue, setAvgRevenue] = useState(1500);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [closeRate, setCloseRate] = useState(25);
  const [aiRecoveryRate, setAiRecoveryRate] = useState(90);
  const [grossMargin, setGrossMargin] = useState(50);

  const results = useMemo(() => {
    const mc = Math.max(0, missedCalls || 0);
    const cr = Math.max(0, Math.min(100, closeRate || 25)) / 100;
    const ar = Math.max(0, Math.min(100, aiRecoveryRate || 90)) / 100;
    const gm = Math.max(0, Math.min(100, grossMargin || 50)) / 100;
    const rev = Math.max(0, avgRevenue || 0);

    const jobsLostMonth = mc * cr;
    const revLostMonth = jobsLostMonth * rev;
    const revLostYear = revLostMonth * 12;

    const recoveredCalls = mc * ar;
    const recoveredJobs = recoveredCalls * cr;
    const revRecoveredMonth = recoveredJobs * rev;
    const revRecoveredYear = revRecoveredMonth * 12;

    const profitRecoveredMonth = revRecoveredMonth * gm;
    const profitRecoveredYear = profitRecoveredMonth * 12;

    return {
      revLostMonth,
      revLostYear,
      revRecoveredMonth,
      revRecoveredYear,
      profitRecoveredMonth,
      profitRecoveredYear,
    };
  }, [missedCalls, closeRate, aiRecoveryRate, grossMargin, avgRevenue]);

  const inputClass =
    "w-full rounded-lg border px-4 py-3 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40";

  return (
    <div className="mt-10 rounded-2xl border overflow-hidden" style={{ borderColor: "hsl(var(--light-border))", background: "hsl(var(--light-card))" }}>
      <div className="px-6 pt-6 pb-2 border-b" style={{ borderColor: "hsl(var(--light-border))" }}>
        <h4 className="text-lg font-bold" style={{ color: "hsl(var(--light-fg))" }}>
          Missed Call Savings Calculator
        </h4>
        <p className="text-xs mt-1" style={{ color: "hsl(var(--light-muted))" }}>
          Enter your numbers to see real-time revenue estimates.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-0">
        {/* Inputs */}
        <div className="p-6 space-y-5 border-r" style={{ borderColor: "hsl(var(--light-border))" }}>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "hsl(var(--light-muted))" }}>
              Calls per month
            </label>
            <input
              type="number"
              min={0}
              value={callsPerMonth}
              onChange={(e) => setCallsPerMonth(Math.max(0, Number(e.target.value) || 0))}
              className={inputClass}
              style={{ borderColor: "hsl(var(--light-border))", color: "hsl(var(--light-fg))", background: "hsl(0 0% 98%)" }}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "hsl(var(--light-muted))" }}>
              Missed calls per month
            </label>
            <input
              type="number"
              min={0}
              value={missedCalls}
              onChange={(e) => setMissedCalls(Math.max(0, Number(e.target.value) || 0))}
              className={inputClass}
              style={{ borderColor: "hsl(var(--light-border))", color: "hsl(var(--light-fg))", background: "hsl(0 0% 98%)" }}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "hsl(var(--light-muted))" }}>
              Average revenue per booked job ($)
            </label>
            <input
              type="number"
              min={0}
              value={avgRevenue}
              onChange={(e) => setAvgRevenue(Math.max(0, Number(e.target.value) || 0))}
              className={inputClass}
              style={{ borderColor: "hsl(var(--light-border))", color: "hsl(var(--light-fg))", background: "hsl(0 0% 98%)" }}
            />
          </div>

          {/* Advanced toggle */}
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center gap-1.5 text-xs font-semibold transition-colors"
            style={{ color: "hsl(var(--primary))" }}
          >
            {showAdvanced ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            {showAdvanced ? "Hide advanced" : "Show advanced"}
          </button>

          {showAdvanced && (
            <div className="space-y-4 pt-2">
              <p className="text-[11px]" style={{ color: "hsl(var(--light-muted))" }}>These defaults are adjustable.</p>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "hsl(var(--light-muted))" }}>
                  Close rate (%)
                </label>
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={closeRate}
                  onChange={(e) => setCloseRate(Math.max(0, Math.min(100, Number(e.target.value) || 0)))}
                  className={inputClass}
                  style={{ borderColor: "hsl(var(--light-border))", color: "hsl(var(--light-fg))", background: "hsl(0 0% 98%)" }}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "hsl(var(--light-muted))" }}>
                  AI recovery rate (%)
                </label>
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={aiRecoveryRate}
                  onChange={(e) => setAiRecoveryRate(Math.max(0, Math.min(100, Number(e.target.value) || 0)))}
                  className={inputClass}
                  style={{ borderColor: "hsl(var(--light-border))", color: "hsl(var(--light-fg))", background: "hsl(0 0% 98%)" }}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "hsl(var(--light-muted))" }}>
                  Gross margin (%)
                </label>
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={grossMargin}
                  onChange={(e) => setGrossMargin(Math.max(0, Math.min(100, Number(e.target.value) || 0)))}
                  className={inputClass}
                  style={{ borderColor: "hsl(var(--light-border))", color: "hsl(var(--light-fg))", background: "hsl(0 0% 98%)" }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="p-6 flex flex-col justify-between">
          <div className="space-y-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "hsl(var(--destructive))" }}>
                Estimated Revenue Missed
              </p>
              <div className="text-3xl font-black" style={{ color: "hsl(var(--light-fg))" }}>
                {fmt(results.revLostMonth)}
                <span className="text-sm font-medium ml-1" style={{ color: "hsl(var(--light-muted))" }}>/mo</span>
              </div>
              <div className="text-sm font-semibold mt-0.5" style={{ color: "hsl(var(--destructive))" }}>
                {fmt(results.revLostYear)} /year
              </div>
            </div>

            <div className="h-px w-full" style={{ background: "hsl(var(--light-border))" }} />

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "hsl(var(--success))" }}>
                Estimated Revenue Recovered with StratixOS
              </p>
              <div className="text-3xl font-black" style={{ color: "hsl(var(--light-fg))" }}>
                {fmt(results.revRecoveredMonth)}
                <span className="text-sm font-medium ml-1" style={{ color: "hsl(var(--light-muted))" }}>/mo</span>
              </div>
              <div className="text-sm font-semibold mt-0.5" style={{ color: "hsl(var(--success))" }}>
                {fmt(results.revRecoveredYear)} /year
              </div>
            </div>

            {showAdvanced && (
              <>
                <div className="h-px w-full" style={{ background: "hsl(var(--light-border))" }} />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "hsl(var(--success))" }}>
                    Profit Recovered
                  </p>
                  <div className="text-2xl font-bold" style={{ color: "hsl(var(--light-fg))" }}>
                    {fmt(results.profitRecoveredMonth)}
                    <span className="text-sm font-medium ml-1" style={{ color: "hsl(var(--light-muted))" }}>/mo</span>
                  </div>
                  <div className="text-sm font-semibold mt-0.5" style={{ color: "hsl(var(--success))" }}>
                    {fmt(results.profitRecoveredYear)} /year
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="mt-8 space-y-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="lg" className="flex-1 text-sm font-semibold gap-2" asChild>
                <a href="#how-it-works">See how it works <ArrowRight size={16} /></a>
              </Button>
              <Button size="lg" variant="outline" className="flex-1 text-sm font-semibold border-[hsl(var(--light-border))]" style={{ color: "hsl(var(--light-fg))" }} asChild>
                <a href="#contact">Book a demo</a>
              </Button>
            </div>
            <p className="text-[10px] text-center" style={{ color: "hsl(var(--light-muted))" }}>
              Estimates only. Real results vary.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavingsCalculator;
