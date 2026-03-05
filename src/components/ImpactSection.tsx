import { ArrowRight, DollarSign, Users, Zap } from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  ResponsiveContainer, Tooltip as RechartsTip,
} from "recharts";

// ── Mock data ─────────────────────────────────────────────────────────────────

const REVENUE_DATA = [
  { d: "Mon", v: 820, p: 640 },
  { d: "Tue", v: 932, p: 750 },
  { d: "Wed", v: 1100, p: 890 },
  { d: "Thu", v: 980, p: 920 },
  { d: "Fri", v: 1340, p: 1020 },
  { d: "Sat", v: 1280, p: 1100 },
  { d: "Sun", v: 1332, p: 1240 },
];

const ESCALATIONS = [
  { label: "AI missed information", count: 19, pct: 52.8 },
  { label: "AI needed help",        count: 10, pct: 27.8 },
  { label: "Urgent tagged",         count: 7,  pct: 19.4 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md px-3 py-2 text-xs">
      <p className="text-gray-500 mb-1">{label}</p>
      <p className="font-semibold text-gray-900">${payload[0]?.value?.toLocaleString()}</p>
      {payload[1] && <p className="text-gray-400">Prev: ${payload[1]?.value?.toLocaleString()}</p>}
    </div>
  );
};

// ── Dashboard mock ────────────────────────────────────────────────────────────

const DashboardPanel = () => (
  <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden w-full" style={{ minWidth: 380 }}>
    {/* Top bar */}
    <div className="border-b border-gray-100 px-5 py-3 flex items-center justify-between">
      <p className="text-xs font-semibold text-gray-700">Analytics Overview</p>
      <div className="flex items-center gap-2">
        <span className="text-[10px] text-gray-400 bg-gray-50 border border-gray-200 rounded px-2 py-1">Last 7 days ↓</span>
        <span className="text-[10px] text-gray-400 bg-gray-50 border border-gray-200 rounded px-2 py-1">vs previous ↓</span>
      </div>
    </div>

    <div className="p-5 space-y-4">
      {/* Metric cards */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: DollarSign, label: "Revenue collected", value: "$8,784", delta: "+18.4%" },
          { icon: Users,      label: "Leads converted",   value: "46",     delta: "+11.2%" },
          { icon: Zap,        label: "Avg response time", value: "1.2s",   delta: "−0.3s"  },
        ].map(s => (
          <div key={s.label} className="bg-gray-50 rounded-xl border border-gray-100 p-3">
            <div className="flex items-center justify-between mb-2">
              <s.icon size={12} className="text-gray-400" />
              <span
                className="text-[9px] font-semibold rounded-full px-1.5 py-0.5"
                style={{
                  color: s.delta.startsWith("+") || s.delta.startsWith("−") ? "#16a34a" : "#6b7280",
                  backgroundColor: s.delta.startsWith("+") || s.delta.startsWith("−") ? "#f0fdf4" : "#f9fafb",
                }}
              >
                {s.delta}
              </span>
            </div>
            <p className="text-lg font-bold text-gray-900 leading-none">{s.value}</p>
            <p className="text-[9px] text-gray-400 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Revenue chart */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold text-gray-700">Revenue collected</p>
          <div className="flex items-center gap-3 text-[9px] text-gray-400">
            <span className="flex items-center gap-1">
              <span className="w-3 h-0.5 inline-block rounded" style={{ backgroundColor: "#0f172a" }} />
              This week
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-0.5 inline-block rounded bg-gray-300" />
              Last week
            </span>
          </div>
        </div>
        <div style={{ height: 120 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={REVENUE_DATA} margin={{ top: 4, right: 4, left: -28, bottom: 0 }}>
              <defs>
                <linearGradient id="impactGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0f172a" stopOpacity={0.1} />
                  <stop offset="100%" stopColor="#0f172a" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="d" tick={{ fontSize: 9, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 9, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <RechartsTip content={<CustomTooltip />} cursor={{ stroke: "#e2e8f0", strokeWidth: 1 }} />
              <Area type="monotone" dataKey="p" stroke="#e2e8f0" fill="none" strokeWidth={1.5} dot={false} />
              <Area type="monotone" dataKey="v" stroke="#0f172a" fill="url(#impactGrad)" strokeWidth={2} dot={false}
                activeDot={{ r: 3, fill: "#0f172a", strokeWidth: 0 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Escalations */}
      <div>
        <p className="text-xs font-semibold text-gray-700 mb-3">Escalations</p>
        <div className="space-y-2.5">
          {ESCALATIONS.map(e => (
            <div key={e.label}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] text-gray-600">{e.label}</span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-semibold text-gray-900">{e.count}</span>
                  <span className="text-[9px] text-gray-400 w-10 text-right">{e.pct}%</span>
                </div>
              </div>
              <div className="w-full h-1.5 rounded-full bg-gray-100 overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${e.pct}%`, backgroundColor: "#0f172a", opacity: 0.15 + e.pct / 200 }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// ── Section ───────────────────────────────────────────────────────────────────

const ImpactSection = () => (
  <section className="bg-white">
    <div className="mx-auto max-w-6xl border-l border-r border-gray-200 bg-[#F5F5F4] overflow-hidden">
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-0">

        {/* Left — copy */}
        <div className="w-full lg:w-5/12 flex flex-col justify-center px-10 sm:px-14 py-20 shrink-0">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
            Reporting &amp; Insights
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.1] mb-5" style={{ color: "#0f172a" }}>
            Feel the<br />impact.
          </h2>
          <p className="text-base leading-relaxed mb-8" style={{ color: "#64748b" }}>
            Real-time reporting to monitor performance, evaluate outcomes,
            and continuously optimize your workflows.
          </p>
          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
              style={{ backgroundColor: "#0f172a" }}
            >
              Book Demo <ArrowRight size={13} />
            </a>
            <a
              href="#popular-agents"
              className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Product Tour
            </a>
          </div>
        </div>

        {/* Right — dashboard, flush right, slightly cropped */}
        <div className="w-full lg:w-7/12 px-8 lg:pl-12 lg:pr-0 pb-12 lg:py-10 lg:-mr-6">
          <DashboardPanel />
        </div>

      </div>
    </div>
  </section>
);

export default ImpactSection;
