import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  GitBranch, CalendarCheck, MessageSquare, Bot, Phone,
  PhoneIncoming, TrendingUp, RefreshCw, ArrowRight,
  DollarSign, Users, Zap,
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  ResponsiveContainer, Tooltip as RechartsTip,
} from "recharts";

// ── Card content ──────────────────────────────────────────────────────────────

const Card1 = () => (
  <div className="flex flex-col lg:flex-row items-center h-full">
    {/* Copy */}
    <div className="w-full lg:w-5/12 flex flex-col justify-center px-10 sm:px-14 py-16 shrink-0">
      <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
        Automated Workflows
      </p>
      <h2 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.1] mb-5" style={{ color: "#0f172a" }}>
        Define your<br />processes.
      </h2>
      <p className="text-base leading-relaxed mb-8" style={{ color: "#64748b" }}>
        Map how every lead should be handled — from first contact to
        booked appointment — and let StratixOS execute it automatically,
        every time.
      </p>
      <div className="space-y-2">
        {["Trigger-based automation from any channel", "AI qualifies and routes every lead", "No-code workflow builder"].map(b => (
          <div key={b} className="flex items-center gap-2 text-sm text-gray-600">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
            {b}
          </div>
        ))}
      </div>
    </div>
    {/* Visual */}
    <div className="w-full lg:w-7/12 flex items-stretch overflow-hidden h-full">
      <div className="w-full border-l border-gray-200" style={{ backgroundColor: "#fafafa" }}>
        <div className="bg-white border-b border-gray-200 px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span className="text-gray-400">←</span>
            <span className="font-medium text-gray-700">Editor</span>
            <span className="text-gray-300">|</span>
            <span>Runs</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-600 font-medium">Inbound lead → booking</span>
            <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-full px-2 py-0.5">Active</span>
          </div>
        </div>
        <div className="p-8 flex justify-center overflow-auto">
          <MiniWorkflow />
        </div>
      </div>
    </div>
  </div>
);

const MiniWorkflow = () => (
  <div className="flex flex-col items-center w-64 gap-1">
    <Label>⚡ Trigger</Label>
    <Node icon={Phone} title="Inbound call received" sub="Customer reached your line" />
    <Arrow />
    <Label>🤖 AI Agent</Label>
    <Node icon={Bot} title="Qualify the lead" sub="AI asks intent, urgency & fit" />
    <Arrow />
    <Label>⑂ Branch</Label>
    <Node icon={GitBranch} title="Appointment eligible?" sub="Check if prospect qualifies" />
    <div className="flex items-start gap-3 mt-1 w-full justify-center">
      <div className="flex flex-col items-center gap-0.5">
        <div className="w-px h-4 bg-emerald-300" />
        <span className="text-[9px] font-semibold text-emerald-600 bg-emerald-50 rounded px-1.5 py-0.5">✓ True</span>
        <div className="w-px h-3 bg-emerald-300" />
        <Node icon={CalendarCheck} title="Book appointment" sub="Sync to calendar" />
      </div>
      <div className="flex flex-col items-center gap-0.5">
        <div className="w-px h-4 bg-gray-200" />
        <span className="text-[9px] font-semibold text-gray-400 bg-gray-100 rounded px-1.5 py-0.5">✗ False</span>
        <div className="w-px h-3 bg-gray-200" />
        <Node icon={MessageSquare} title="SMS follow-up" sub="Nurture sequence" />
      </div>
    </div>
  </div>
);

const Label = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[10px] font-semibold text-gray-400 mb-0.5 pl-0.5 self-start">{children}</p>
);
const Arrow = () => (
  <div className="flex justify-center my-0.5">
    <div className="flex flex-col items-center">
      <div className="w-px h-4 bg-emerald-300" />
      <div className="w-2 h-2 rotate-45 -mt-1.5 border-b-2 border-r-2 border-emerald-300" />
    </div>
  </div>
);
const Node = ({ icon: Icon, title, sub }: { icon: React.ElementType; title: string; sub: string }) => (
  <div className="bg-white rounded-lg border border-gray-200 px-3 py-2 flex items-center gap-2.5 shadow-sm w-full">
    <div className="w-6 h-6 rounded-md bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
      <Icon size={11} className="text-gray-500" />
    </div>
    <div>
      <p className="text-[11px] font-semibold text-gray-900 leading-tight">{title}</p>
      <p className="text-[9px] text-gray-400 mt-0.5">{sub}</p>
    </div>
  </div>
);

// ── Card 2 ────────────────────────────────────────────────────────────────────

const PROCESS_NODES = [
  { icon: PhoneIncoming, label: "Inbound Leads",  badge: "+23", angle: -90 },
  { icon: TrendingUp,    label: "Lead Nurturing", badge: "18",  angle: -30 },
  { icon: CalendarCheck, label: "Appt Booking",   badge: "9",   angle:  30 },
  { icon: RefreshCw,     label: "Follow-ups",     badge: "14",  angle:  90 },
  { icon: MessageSquare, label: "CRM Updates",    badge: "6",   angle: 150 },
  { icon: Phone,         label: "Outbound",       badge: "11",  angle: 210 },
];
const INTEGRATIONS = [
  { label: "HubSpot",    color: "#FF7A59", angle: -90  },
  { label: "Salesforce", color: "#00A1E0", angle: -30  },
  { label: "Google Cal", color: "#4285F4", angle:  30  },
  { label: "Gmail",      color: "#EA4335", angle:  90  },
  { label: "Pipedrive",  color: "#21A056", angle: 150  },
  { label: "Slack",      color: "#4A154B", angle: 210  },
];
const toXY = (cx: number, cy: number, r: number, deg: number) => {
  const rad = (deg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
};

const Card2 = () => {
  const W = 480, H = 420, CX = 240, CY = 210, R1 = 110, R2 = 190;
  const pPos = PROCESS_NODES.map(n => toXY(CX, CY, R1, n.angle));
  const iPos = INTEGRATIONS.map(n => toXY(CX, CY, R2, n.angle));

  return (
    <div className="flex flex-col lg:flex-row items-center h-full">
      <div className="w-full lg:w-5/12 flex flex-col justify-center px-10 sm:px-14 py-16 shrink-0">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">Orchestration</p>
        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.1] mb-5" style={{ color: "#0f172a" }}>
          Run your business<br />on autopilot.
        </h2>
        <p className="text-base leading-relaxed mb-8" style={{ color: "#64748b" }}>
          StratixOS runs the workflows behind your business automatically —
          capturing leads, nurturing prospects, and keeping your CRM updated.
        </p>
        <div className="space-y-2">
          {["Connects to your existing tools", "Zero manual data entry", "24/7 autonomous execution"].map(b => (
            <div key={b} className="flex items-center gap-2 text-sm text-gray-600">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
              {b}
            </div>
          ))}
        </div>
      </div>
      <div className="w-full lg:w-7/12 flex items-center justify-center px-6 py-10 border-l border-gray-200 bg-[#F5F5F4]">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold text-gray-700">Orchestration Hub</p>
            <span className="flex items-center gap-1.5 text-[10px] text-emerald-600 font-semibold bg-emerald-50 border border-emerald-200 rounded-full px-2.5 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
              Live
            </span>
          </div>
          <div className="relative" style={{ width: W, height: H, maxWidth: "100%" }}>
            <svg width={W} height={H} className="absolute inset-0 pointer-events-none" style={{ overflow: "visible" }}>
              {pPos.map((pos, i) => (
                <g key={`p${i}`}>
                  <line x1={CX} y1={CY} x2={pos.x} y2={pos.y} stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
                  {i % 2 === 0 && (
                    <circle r="2.5" fill="hsl(187,72%,53%)" opacity="0.7">
                      <animateMotion dur={`${2 + i * 0.4}s`} repeatCount="indefinite" begin={`${i * 0.5}s`}>
                        <mpath href={`#pp${i}`} />
                      </animateMotion>
                    </circle>
                  )}
                  <path id={`pp${i}`} d={`M${CX},${CY} L${pos.x},${pos.y}`} fill="none" />
                </g>
              ))}
              {iPos.map((pos, i) => (
                <g key={`i${i}`}>
                  <line x1={CX} y1={CY} x2={pos.x} y2={pos.y} stroke="#e2e8f0" strokeWidth="1" opacity="0.5" />
                  <path id={`pi${i}`} d={`M${CX},${CY} L${pos.x},${pos.y}`} fill="none" />
                </g>
              ))}
            </svg>
            <div
              className="absolute flex flex-col items-center justify-center rounded-2xl bg-white border-2 shadow-md"
              style={{
                left: CX, top: CY, transform: "translate(-50%,-50%)",
                width: 72, height: 72,
                borderColor: "hsl(187,72%,53%)",
                boxShadow: "0 0 0 8px hsl(187 72% 53% / 0.08), 0 4px 16px rgba(0,0,0,0.1)",
              }}
            >
              <p className="text-[10px] font-black tracking-tight leading-tight text-center" style={{ color: "#0f172a" }}>
                Stratix<br /><span style={{ color: "hsl(187,72%,43%)" }}>OS</span>
              </p>
            </div>
            {PROCESS_NODES.map((node, i) => {
              const pos = pPos[i];
              return (
                <div key={node.label} className="absolute flex items-center gap-1.5 bg-white rounded-full border border-gray-200 shadow-sm px-2 py-1.5 whitespace-nowrap"
                  style={{ left: pos.x, top: pos.y, transform: "translate(-50%,-50%)" }}>
                  <node.icon size={10} className="text-gray-500 shrink-0" />
                  <span className="text-[9px] font-semibold text-gray-700">{node.label}</span>
                  <span className="text-[8px] font-bold rounded-full px-1 py-0.5 leading-none" style={{ backgroundColor: "hsl(187,72%,53%)", color: "#fff" }}>{node.badge}</span>
                </div>
              );
            })}
            {INTEGRATIONS.map((integ, i) => {
              const pos = iPos[i];
              return (
                <div key={integ.label} className="absolute flex items-center gap-1.5 bg-white rounded-lg border border-gray-200 shadow-sm px-2.5 py-1.5 whitespace-nowrap"
                  style={{ left: pos.x, top: pos.y, transform: "translate(-50%,-50%)" }}>
                  <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: integ.color }} />
                  <span className="text-[9px] font-semibold" style={{ color: "#374151" }}>{integ.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Card 3 ────────────────────────────────────────────────────────────────────

const REVENUE_DATA = [
  { d: "Mon", v: 820,  p: 640  },
  { d: "Tue", v: 932,  p: 750  },
  { d: "Wed", v: 1100, p: 890  },
  { d: "Thu", v: 980,  p: 920  },
  { d: "Fri", v: 1340, p: 1020 },
  { d: "Sat", v: 1280, p: 1100 },
  { d: "Sun", v: 1332, p: 1240 },
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

const METRICS = [
  { icon: DollarSign, label: "Revenue collected", value: "$8,784", delta: "+18.4%" },
  { icon: Users,      label: "Leads converted",   value: "46",     delta: "+11.2%" },
  { icon: Zap,        label: "Avg response time", value: "1.2s",   delta: "−0.3s"  },
];

const ESCALATIONS = [
  { label: "AI missed information", count: 19, pct: 52.8, color: "#fca5a5", textColor: "#dc2626", bg: "#fef2f2" },
  { label: "AI needed help",        count: 10, pct: 27.8, color: "#fdba74", textColor: "#ea580c", bg: "#fff7ed" },
  { label: "Urgent tagged",         count: 7,  pct: 19.4, color: "#f87171", textColor: "#b91c1c", bg: "#fef2f2" },
];

const Card3 = () => (
  <div className="flex flex-col lg:flex-row items-center h-full">
    <div className="w-full lg:w-5/12 flex flex-col justify-center px-10 sm:px-14 py-16 shrink-0">
      <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">Reporting & Insights</p>
      <h2 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.1] mb-5" style={{ color: "#0f172a" }}>
        Feel the<br />impact.
      </h2>
      <p className="text-base leading-relaxed mb-8" style={{ color: "#64748b" }}>
        Real-time reporting to monitor performance, evaluate outcomes,
        and continuously optimize your workflows.
      </p>
      <div className="flex items-center gap-3">
        <a href="#contact" className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity" style={{ backgroundColor: "#0f172a" }}>
          Book Demo <ArrowRight size={13} />
        </a>
        <a href="#popular-agents" className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors">
          Product Tour
        </a>
      </div>
    </div>
    <div className="w-full lg:w-7/12 flex items-center justify-center px-8 py-10 border-l border-gray-200 bg-[#F5F5F4]">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden w-full" style={{ maxWidth: 400 }}>
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
            {METRICS.map(m => (
              <div key={m.label} className="bg-gray-50 rounded-xl border border-gray-100 p-3">
                <div className="flex items-center justify-between mb-2">
                  <m.icon size={11} className="text-gray-400" />
                  <span className="text-[9px] font-semibold rounded-full px-1.5 py-0.5 text-green-700 bg-green-50">{m.delta}</span>
                </div>
                <p className="text-lg font-bold text-gray-900 leading-none">{m.value}</p>
                <p className="text-[9px] text-gray-400 mt-1">{m.label}</p>
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
            <div style={{ height: 100 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={REVENUE_DATA} margin={{ top: 4, right: 4, left: -28, bottom: 0 }}>
                  <defs>
                    <linearGradient id="peelGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0f172a" stopOpacity={0.1} />
                      <stop offset="100%" stopColor="#0f172a" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="d" tick={{ fontSize: 9, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 9, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <RechartsTip content={<CustomTooltip />} cursor={{ stroke: "#e2e8f0", strokeWidth: 1 }} />
                  <Area type="monotone" dataKey="p" stroke="#e2e8f0" fill="none" strokeWidth={1.5} dot={false} />
                  <Area type="monotone" dataKey="v" stroke="#0f172a" fill="url(#peelGrad)" strokeWidth={2} dot={false}
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
                      <span className="text-[10px] font-semibold" style={{ color: e.textColor }}>{e.count}</span>
                      <span className="text-[9px] text-gray-400 w-10 text-right">{e.pct}%</span>
                    </div>
                  </div>
                  <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: e.bg }}>
                    <div className="h-full rounded-full" style={{ width: `${e.pct}%`, backgroundColor: e.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ── Peel cards section ────────────────────────────────────────────────────────
//
// Vertical carousel: each incoming card slides UP from below (y: 100% → 0%).
// Higher z-index cards sit on top — so Card2 covers Card1, Card3 covers Card2.
// No opacity tricks — solid cards physically sliding in, like a deck being dealt.
//
// Scroll budget: 300vh total, 2 transitions × 150vh each.
//   [0 → 0.5]  Card2 slides in over Card1
//   [0.5 → 1]  Card3 slides in over Card2

const CardShell = ({ children, zIndex, rounded = true }: {
  children: React.ReactNode;
  zIndex: number;
  rounded?: boolean;
}) => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      zIndex,
      borderRadius: rounded ? "16px 16px 0 0" : 0,
      boxShadow: rounded ? "0 -12px 40px rgba(0,0,0,0.12)" : "none",
      overflow: "hidden",
    }}
    className="bg-white h-full"
  >
    <div className="h-full mx-auto max-w-6xl border-l border-r border-gray-200 bg-[#F5F5F4] overflow-hidden">
      {children}
    </div>
  </div>
);

const PeelCardsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Card 2 slides in during the first half of the scroll
  const y2 = useTransform(scrollYProgress, [0, 0.5], ["100%", "0%"]);
  // Card 3 slides in during the second half
  const y3 = useTransform(scrollYProgress, [0.5, 1.0], ["100%", "0%"]);

  return (
    <div ref={sectionRef} style={{ height: "345vh" }}>
      <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-hidden">

        {/* Card 1 — base layer, always visible underneath */}
        <CardShell zIndex={10} rounded={false}>
          <Card1 />
        </CardShell>

        {/* Card 2 — slides up from below to cover Card 1 */}
        <motion.div style={{ y: y2, position: "absolute", inset: 0, zIndex: 20 }}>
          <CardShell zIndex={20}>
            <Card2 />
          </CardShell>
        </motion.div>

        {/* Card 3 — slides up from below to cover Card 2 */}
        <motion.div style={{ y: y3, position: "absolute", inset: 0, zIndex: 30 }}>
          <CardShell zIndex={30}>
            <Card3 />
          </CardShell>
        </motion.div>

      </div>
    </div>
  );
};

export default PeelCardsSection;
