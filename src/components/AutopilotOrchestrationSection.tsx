import { useEffect, useRef } from "react";
import {
  PhoneIncoming, PhoneOutgoing, Users, CalendarCheck,
  MessageSquare, RefreshCw, TrendingUp,
} from "lucide-react";

// ── Data ─────────────────────────────────────────────────────────────────────

const PROCESS_NODES = [
  { icon: PhoneIncoming,  label: "Inbound Leads",       badge: "+23", angle: -90 },
  { icon: TrendingUp,     label: "Lead Nurturing",       badge: "18",  angle: -30 },
  { icon: CalendarCheck,  label: "Appt Booking",         badge: "9",   angle:  30 },
  { icon: RefreshCw,      label: "Follow-ups",           badge: "14",  angle:  90 },
  { icon: MessageSquare,  label: "CRM Updates",          badge: "6",   angle: 150 },
  { icon: PhoneOutgoing,  label: "Outbound Leads",       badge: "11",  angle: 210 },
];

const INTEGRATIONS = [
  { label: "HubSpot",          color: "#FF7A59", angle: -90  },
  { label: "Salesforce",       color: "#00A1E0", angle: -30  },
  { label: "Google Cal",       color: "#4285F4", angle:  30  },
  { label: "Gmail",            color: "#EA4335", angle:  90  },
  { label: "Pipedrive",        color: "#21A056", angle: 150  },
  { label: "Slack",            color: "#4A154B", angle: 210  },
];

// ── Polar → cartesian ─────────────────────────────────────────────────────────

const toXY = (cx: number, cy: number, r: number, angleDeg: number) => {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
};

// ── Animated pulse dot along a line ───────────────────────────────────────────

const PulseDot = ({ x1, y1, x2, y2, delay }: { x1: number; y1: number; x2: number; y2: number; delay: number }) => (
  <circle r="3" fill="hsl(187,72%,53%)" opacity="0.8">
    <animateMotion
      dur="2.4s"
      repeatCount="indefinite"
      begin={`${delay}s`}
      calcMode="linear"
    >
      <mpath xlinkHref={`#pulse-path-${x1}-${y1}`} />
    </animateMotion>
  </circle>
);

// ── Hub diagram ───────────────────────────────────────────────────────────────

const W = 520, H = 480, CX = 260, CY = 240;
const R1 = 130, R2 = 220;

const HubDiagram = () => {
  const processPositions = PROCESS_NODES.map(n => toXY(CX, CY, R1, n.angle));
  const integrationPositions = INTEGRATIONS.map(n => toXY(CX, CY, R2, n.angle));

  return (
    <div className="relative" style={{ width: W, height: H, maxWidth: "100%" }}>
      {/* SVG lines layer */}
      <svg
        width={W}
        height={H}
        className="absolute inset-0 pointer-events-none"
        style={{ overflow: "visible" }}
      >
        {/* Lines: hub → process nodes */}
        {processPositions.map((pos, i) => (
          <g key={`pline-${i}`}>
            <line
              x1={CX} y1={CY} x2={pos.x} y2={pos.y}
              stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4 4" opacity="0.6"
            />
            {i % 2 === 0 && (
              <circle r="2.5" fill="hsl(187,72%,53%)" opacity="0.7">
                <animateMotion dur={`${2 + i * 0.4}s`} repeatCount="indefinite" begin={`${i * 0.5}s`}>
                  <mpath href={`#path-p${i}`} />
                </animateMotion>
              </circle>
            )}
            <path id={`path-p${i}`} d={`M${CX},${CY} L${pos.x},${pos.y}`} fill="none" />
          </g>
        ))}

        {/* Lines: hub → integrations */}
        {integrationPositions.map((pos, i) => (
          <g key={`iline-${i}`}>
            <line
              x1={CX} y1={CY} x2={pos.x} y2={pos.y}
              stroke="#e2e8f0" strokeWidth="1" opacity="0.5"
            />
            {i % 3 === 0 && (
              <circle r="2" fill="#94a3b8" opacity="0.5">
                <animateMotion dur={`${3 + i * 0.3}s`} repeatCount="indefinite" begin={`${i * 0.6 + 1}s`}>
                  <mpath href={`#path-i${i}`} />
                </animateMotion>
              </circle>
            )}
            <path id={`path-i${i}`} d={`M${CX},${CY} L${pos.x},${pos.y}`} fill="none" />
          </g>
        ))}
      </svg>

      {/* Center hub */}
      <div
        className="absolute flex flex-col items-center justify-center rounded-2xl bg-white border-2 shadow-md"
        style={{
          left: CX, top: CY,
          transform: "translate(-50%, -50%)",
          width: 80, height: 80,
          borderColor: "hsl(187,72%,53%)",
          boxShadow: "0 0 0 8px hsl(187 72% 53% / 0.08), 0 4px 16px rgba(0,0,0,0.1)",
        }}
      >
        <p className="text-[10px] font-black tracking-tight leading-tight text-center" style={{ color: "#0f172a" }}>
          Stratix<br /><span style={{ color: "hsl(187,72%,43%)" }}>OS</span>
        </p>
      </div>

      {/* Process node chips */}
      {PROCESS_NODES.map((node, i) => {
        const pos = processPositions[i];
        return (
          <div
            key={node.label}
            className="absolute flex items-center gap-1.5 bg-white rounded-full border border-gray-200 shadow-sm px-2.5 py-1.5 whitespace-nowrap"
            style={{ left: pos.x, top: pos.y, transform: "translate(-50%, -50%)" }}
          >
            <node.icon size={11} className="text-gray-500 shrink-0" />
            <span className="text-[10px] font-semibold text-gray-700">{node.label}</span>
            <span
              className="text-[9px] font-bold rounded-full px-1.5 py-0.5 leading-none"
              style={{ backgroundColor: "hsl(187,72%,53%)", color: "#fff" }}
            >
              {node.badge}
            </span>
          </div>
        );
      })}

      {/* Integration chips */}
      {INTEGRATIONS.map((integ, i) => {
        const pos = integrationPositions[i];
        return (
          <div
            key={integ.label}
            className="absolute flex items-center gap-1.5 bg-white rounded-lg border border-gray-200 shadow-sm px-3 py-1.5 whitespace-nowrap"
            style={{ left: pos.x, top: pos.y, transform: "translate(-50%, -50%)" }}
          >
            <div
              className="w-2 h-2 rounded-full shrink-0"
              style={{ backgroundColor: integ.color }}
            />
            <span className="text-[10px] font-semibold" style={{ color: "#374151" }}>{integ.label}</span>
          </div>
        );
      })}
    </div>
  );
};

// ── Section ───────────────────────────────────────────────────────────────────

const AutopilotOrchestrationSection = () => (
  <section className="bg-white">
    <div className="mx-auto max-w-6xl border-l border-r border-gray-200 bg-[#F5F5F4] overflow-hidden">
      <div className="flex flex-col lg:flex-row items-center" style={{ minHeight: 560 }}>

        {/* Left — copy */}
        <div className="w-full lg:w-5/12 flex flex-col justify-center px-10 sm:px-14 py-20 shrink-0">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
            Orchestration
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.1] mb-5" style={{ color: "#0f172a" }}>
            Run your business<br />on autopilot.
          </h2>
          <p className="text-base leading-relaxed mb-8" style={{ color: "#64748b" }}>
            StratixOS runs the workflows behind your business automatically —
            capturing leads, nurturing prospects, scheduling appointments, and
            keeping your CRM updated.
          </p>
          <div className="flex flex-wrap gap-2">
            {["HubSpot", "Salesforce", "Google Calendar", "Pipedrive", "Gmail", "Slack"].map(t => (
              <span key={t} className="text-xs border border-gray-200 bg-white text-gray-500 rounded-full px-3 py-1">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Right — hub diagram */}
        <div className="w-full lg:w-7/12 flex items-center justify-center px-6 py-16 lg:py-0 overflow-hidden">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs font-semibold text-gray-700">Orchestration Hub</p>
              <span className="flex items-center gap-1.5 text-[10px] text-emerald-600 font-semibold bg-emerald-50 border border-emerald-200 rounded-full px-2.5 py-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
                Live
              </span>
            </div>
            <HubDiagram />
          </div>
        </div>

      </div>
    </div>
  </section>
);

export default AutopilotOrchestrationSection;
