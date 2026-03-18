import { useEffect, useRef, useState } from "react";
import stratixLogo from "@/assets/stratixos-logo.png";
import {
  SiSlack, SiGmail, SiSalesforce, SiHubspot,
  SiNotion, SiGooglecalendar, SiAirtable, SiZapier,
  SiStripe, SiShopify, SiInstagram, SiDropbox, SiZoho,
  SiLinear, SiTwilio, SiFacebook, SiWhatsapp, SiTelegram,
} from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa";

// ── Shared card shell ──────────────────────────────────────────────────────────

const VisualWrap = ({ children }: { children: React.ReactNode }) => (
  <div style={{
    backgroundColor: "#ffffff",
    border: "1px solid #e8eaed",
    borderRadius: 12,
    padding: "16px 14px 0",
  }}>
    {children}
  </div>
);

// ── 1. Voice Agent — waveform + call status ────────────────────────────────────

const VoiceVisual = () => {
  const BARS = [18,28,42,58,74,90,82,68,96,80,60,88,70,52,78,64,44,72,86,62,50,80,68,40,56];
  return (
    <VisualWrap>
      <div style={{ display: "flex", flexDirection: "column", gap: 16, paddingBottom: 20 }}>
        {/* Waveform */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 3, height: 100 }}>
          {BARS.map((h, i) => (
            <div key={i} style={{
              width: 6,
              height: h,
              borderRadius: 3,
              backgroundColor: "#f87171",
              opacity: 0.7 + (h / 96) * 0.3,
              animation: "waveBar 1.6s ease-in-out infinite",
              animationDelay: `${i * 0.07}s`,
            }} />
          ))}
        </div>
        {/* Call status */}
        <div style={{
          display: "flex", alignItems: "center", gap: 8,
          backgroundColor: "#f8fafb", border: "1px solid #e8eaed",
          borderRadius: 8, padding: "8px 14px",
        }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#22c55e", display: "inline-block", flexShrink: 0 }} />
          <span style={{ fontSize: 12, fontWeight: 600, color: "#374151" }}>Call in progress</span>
          <span style={{ marginLeft: "auto", fontSize: 12, color: "#9ca3af", fontVariantNumeric: "tabular-nums" }}>02:34</span>
        </div>
        {/* Transcript snippet */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <div style={{ alignSelf: "flex-end", backgroundColor: "#f3f4f6", borderRadius: "12px 12px 2px 12px", padding: "7px 12px", fontSize: 11, color: "#374151", maxWidth: "75%" }}>
            I'd like to book a consultation.
          </div>
          <div style={{ alignSelf: "flex-start", backgroundColor: "#f8fafb", border: "1px solid #e8eaed", borderRadius: "12px 12px 12px 2px", padding: "7px 12px", fontSize: 11, color: "#374151", maxWidth: "80%" }}>
            Booked for Tuesday 2 PM — confirmation sent.
          </div>
        </div>
      </div>
    </VisualWrap>
  );
};

// ── 2. Website Intelligence — chat with knowledge-base source ──────────────────

const WebVisual = () => (
  <VisualWrap>
    <div style={{ display: "flex", flexDirection: "column", gap: 10, paddingBottom: 20 }}>
      {/* Source pill */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, backgroundColor: "#f8fafb", border: "1px solid #e8eaed", borderRadius: 20, padding: "5px 10px", width: "fit-content" }}>
        <span style={{ fontSize: 11 }}>📄</span>
        <span style={{ fontSize: 11, color: "#6b7280" }}>Source: </span>
        <span style={{ fontSize: 11, fontWeight: 600, color: "#374151" }}>services-overview.md</span>
      </div>
      {/* Messages */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ alignSelf: "flex-end", backgroundColor: "#f3f4f6", borderRadius: "12px 12px 2px 12px", padding: "8px 12px", fontSize: 11, color: "#374151", maxWidth: "80%" }}>
          What's included in the Growth plan?
        </div>
        <div style={{ alignSelf: "flex-start", backgroundColor: "#ffffff", border: "1px solid #e8eaed", borderRadius: "12px 12px 12px 2px", padding: "8px 12px", fontSize: 11, color: "#374151", maxWidth: "88%", lineHeight: 1.5 }}>
          Growth includes AI voice, web chat, lead capture, and up to 5 integrations — no setup fee.
        </div>
        <div style={{ alignSelf: "flex-end", backgroundColor: "#f3f4f6", borderRadius: "12px 12px 2px 12px", padding: "8px 12px", fontSize: 11, color: "#374151", maxWidth: "70%" }}>
          Can I upgrade later?
        </div>
        {/* Typing indicator */}
        <div style={{ alignSelf: "flex-start", display: "flex", alignItems: "center", gap: 4, backgroundColor: "#ffffff", border: "1px solid #e8eaed", borderRadius: 20, padding: "8px 14px" }}>
          {[0, 0.2, 0.4].map((d, i) => (
            <span key={i} style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#d1d5db", display: "inline-block", animation: "typingDot 1.2s ease-in-out infinite", animationDelay: `${d}s` }} />
          ))}
        </div>
      </div>
    </div>
  </VisualWrap>
);

// ── 3. Lead Capture — SaaS pipeline visualization ─────────────────────────────

const PipeTag = ({
  text, color = "#374151", bg = "#f3f4f6", bd = "#e5e7eb",
}: { text: string; color?: string; bg?: string; bd?: string }) => (
  <div style={{
    fontSize: 7.5, fontWeight: 500, color, backgroundColor: bg,
    border: `1px solid ${bd}`, borderRadius: 3, padding: "1.5px 5px",
    display: "inline-flex", fontFamily: "system-ui,-apple-system,sans-serif",
    whiteSpace: "nowrap",
  }}>{text}</div>
);

const PipeArrow = () => (
  <div style={{
    display: "flex", alignItems: "center", justifyContent: "center",
    color: "#d1d5db", fontSize: 12, flexShrink: 0, paddingTop: 16,
    userSelect: "none",
  }}>›</div>
);

const LeadVisual = () => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const DELAYS = [2200, 1800, 1800, 2000, 1800, 2400];
    let t: ReturnType<typeof setTimeout>;
    const schedule = (p: number) => {
      t = setTimeout(() => {
        const next = (p + 1) % DELAYS.length;
        setPhase(next);
        schedule(next);
      }, DELAYS[p]);
    };
    schedule(0);
    return () => clearTimeout(t);
  }, []);

  const cardBase = (step: number): React.CSSProperties => ({
    flex: 1, minWidth: 0, backgroundColor: "#fff",
    border: `1.5px solid ${phase === step ? "#111827" : phase > step ? "#d1d5db" : "#e8eaed"}`,
    borderRadius: 10, padding: "9px 9px 11px",
    opacity: phase > step ? 0.55 : 1,
    transition: "border-color 0.4s ease, opacity 0.4s ease",
    fontFamily: "system-ui,-apple-system,sans-serif",
  });

  const stageLabel = (text: string, step: number) => (
    <div style={{
      fontSize: 7, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em",
      color: phase === step ? "#111827" : "#c0c7d0", marginBottom: 7,
      transition: "color 0.4s ease",
    }}>{text}</div>
  );

  return (
    <VisualWrap>
      <div style={{ paddingBottom: 12 }}>

        {/* ── Row 1: Form → Qualification → CRM ── */}
        <div style={{ display: "flex", gap: 5, alignItems: "stretch", marginBottom: 4 }}>

          {/* Step 0 — Lead Form */}
          <div style={cardBase(0)}>
            {stageLabel("Lead Form", 0)}
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {[["Name", "Marcus Reid"], ["Business", "HVAC Company"], ["Revenue", "$40k – $80k"]].map(([f, v]) => (
                <div key={f}>
                  <div style={{ fontSize: 7, color: "#b0b7c3", marginBottom: 1 }}>{f}</div>
                  <div style={{
                    fontSize: 8.5, color: "#374151", fontWeight: 500,
                    backgroundColor: "#f8fafc", border: "1px solid #e8eaed",
                    borderRadius: 4, padding: "2px 5px",
                  }}>{v}</div>
                </div>
              ))}
              <div style={{
                marginTop: 2,
                backgroundColor: phase === 0 ? "#111827" : "#9ca3af",
                color: "#fff", borderRadius: 5, padding: "3.5px 0",
                textAlign: "center", fontSize: 8, fontWeight: 600,
                transition: "background-color 0.4s ease",
              }}>
                {phase === 0 ? "Submit" : "✓ Submitted"}
              </div>
            </div>
          </div>

          <PipeArrow />

          {/* Step 1 — AI Qualification */}
          <div style={cardBase(1)}>
            {stageLabel("AI Qualification", 1)}
            <div style={{
              backgroundColor: "#f8fafc", border: "1px solid #e8eaed",
              borderRadius: 6, padding: "5px 7px", marginBottom: 6,
            }}>
              <div style={{ fontSize: 8.5, fontWeight: 600, color: "#111827" }}>Marcus Reid</div>
              <div style={{ fontSize: 7.5, color: "#6b7280" }}>HVAC Company</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <PipeTag text="Lead Score: 91" color="#0369a1" bg="#f0f9ff" bd="#bae6fd" />
              <PipeTag text="High Intent" color="#16a34a" bg="#f0fdf4" bd="#bbf7d0" />
            </div>
          </div>

          <PipeArrow />

          {/* Step 2 — CRM Record */}
          <div style={cardBase(2)}>
            {stageLabel("CRM Record", 2)}
            <div style={{ fontSize: 8.5, fontWeight: 600, color: "#111827", marginBottom: 6 }}>Record Created</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <PipeTag text="CRM Synced" />
              <PipeTag text="Owner Assigned" />
            </div>
          </div>

        </div>

        {/* Connecting arrow — row 1 to row 2 */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 4 }}>
          <div style={{
            width: "calc(33.33% - 2px)", display: "flex",
            justifyContent: "center", color: "#d1d5db", fontSize: 10, lineHeight: 1,
          }}>↓</div>
        </div>

        {/* ── Row 2: Outreach → Nurture → Conversion ── */}
        <div style={{ display: "flex", gap: 5, alignItems: "stretch" }}>

          {/* Step 3 — Outreach */}
          <div style={cardBase(3)}>
            {stageLabel("Outreach", 3)}
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {[
                { ch: "SMS",   msg: "Hey Marcus — want to schedule?" },
                { ch: "Email", msg: "Here's your next step..." },
                { ch: "AI",    msg: "I can help you get started." },
              ].map(({ ch, msg }) => (
                <div key={ch} style={{ display: "flex", gap: 4, alignItems: "flex-start" }}>
                  <div style={{
                    fontSize: 7, fontWeight: 700, color: "#374151",
                    backgroundColor: "#f0f0f0", borderRadius: 3, padding: "1px 4px", flexShrink: 0,
                  }}>{ch}</div>
                  <div style={{ fontSize: 7.5, color: "#6b7280", lineHeight: 1.3 }}>{msg}</div>
                </div>
              ))}
            </div>
          </div>

          <PipeArrow />

          {/* Step 4 — Nurture */}
          <div style={cardBase(4)}>
            {stageLabel("Nurture Sequence", 4)}
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              {[{ day: "Day 2", note: "Follow-up" }, { day: "Day 5", note: "Reminder" }, { day: "Day 9", note: "Re-engage" }].map(({ day, note }) => (
                <div key={day} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <div style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: "#d1d5db", flexShrink: 0 }} />
                  <span style={{ fontSize: 8, fontWeight: 600, color: "#374151" }}>{day}</span>
                  <span style={{ fontSize: 7.5, color: "#9ca3af" }}>{note}</span>
                </div>
              ))}
            </div>
          </div>

          <PipeArrow />

          {/* Step 5 — Conversion */}
          <div style={cardBase(5)}>
            {stageLabel("Conversion", 5)}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, paddingTop: 2 }}>
              <div style={{
                width: 28, height: 28, borderRadius: "50%",
                backgroundColor: phase === 5 ? "#16a34a" : "#e5e7eb",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#fff", fontSize: 13, fontWeight: 700,
                transition: "background-color 0.5s ease",
              }}>✓</div>
              <PipeTag text="Booking Triggered" color="#16a34a" bg="#f0fdf4" bd="#bbf7d0" />
              <div style={{ fontSize: 7.5, color: "#6b7280", textAlign: "center" }}>Appt. Scheduled</div>
            </div>
          </div>

        </div>
      </div>
    </VisualWrap>
  );
};

// ── 4. Direct Response Operator — multi-channel orchestration ─────────────────

const CHANNELS = [
  { Icon: SiInstagram, color: "#E1306C", label: "Instagram", msg: "Love your post!" },
  { Icon: SiFacebook,  color: "#1877F2", label: "Facebook",  msg: "What's the price?" },
  { Icon: SiWhatsapp,  color: "#25D366", label: "WhatsApp",  msg: "Is this available?" },
  { Icon: SiTelegram,  color: "#26A5E4", label: "Telegram",  msg: "Can I book now?" },
  { Icon: FaLinkedinIn, color: "#0A66C2", label: "LinkedIn",  msg: "Tell me more." },
];

const OUTCOMES = [
  { label: "Qualified Lead",          color: "#16a34a", bg: "#f0fdf4", bd: "#bbf7d0" },
  { label: "Routed to Sales",         color: "#0369a1", bg: "#f0f9ff", bd: "#bae6fd" },
  { label: "Booking Link Sent",       color: "#7c3aed", bg: "#faf5ff", bd: "#e9d5ff" },
  { label: "Nurture Sequence Started",color: "#b45309", bg: "#fffbeb", bd: "#fde68a" },
];

const SocialVisual = () => {
  const [activeChannel, setActiveChannel] = useState(0);
  const [chipVisible, setChipVisible] = useState(true);
  const [outcomeIdx, setOutcomeIdx] = useState(0);
  const [outcomeVisible, setOutcomeVisible] = useState(true);

  useEffect(() => {
    const cycle = () => {
      // fade chip out, switch channel, fade in
      setChipVisible(false);
      setTimeout(() => {
        setActiveChannel(p => (p + 1) % CHANNELS.length);
        setOutcomeIdx(p => (p + 1) % OUTCOMES.length);
        setChipVisible(true);
        setOutcomeVisible(true);
      }, 350);
    };
    const t = setInterval(cycle, 2400);
    return () => clearInterval(t);
  }, []);

  const ch = CHANNELS[activeChannel];

  return (
    <VisualWrap>
      <div style={{
        display: "flex", alignItems: "center", gap: 0,
        paddingBottom: 20, minHeight: 220, fontFamily: "system-ui,-apple-system,sans-serif",
        overflow: "visible",
      }}>

        {/* ── Left: channel stack ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 7, flex: "0 0 auto" }}>
          {CHANNELS.map(({ Icon, color, label }, i) => (
            <div key={label} style={{
              display: "flex", alignItems: "center", gap: 6,
              backgroundColor: i === activeChannel ? "#f8fafc" : "#fff",
              border: `1px solid ${i === activeChannel ? "#e2e8f0" : "#f0f0f0"}`,
              borderRadius: 8, padding: "5px 8px",
              transition: "all 0.35s ease",
              opacity: i === activeChannel ? 1 : 0.5,
            }}>
              <Icon size={13} color={color} style={{ flexShrink: 0 }} />
              <span style={{ fontSize: 9, fontWeight: 600, color: "#374151" }}>{label}</span>
            </div>
          ))}
        </div>

        {/* ── Center connector + chip ── */}
        <div style={{
          flex: 1, display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: 6, position: "relative",
        }}>
          {/* Dashed line */}
          <div style={{
            position: "absolute", top: "50%", left: 0, right: 0, height: 1,
            borderTop: "1.5px dashed #e2e8f0", zIndex: 0,
          }} />
          {/* Animated message chip */}
          <div style={{
            position: "relative", zIndex: 1,
            backgroundColor: "#fff",
            border: "1px solid #e2e8f0",
            borderRadius: 20, padding: "5px 10px",
            fontSize: 9, color: "#374151", fontWeight: 500,
            boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
            whiteSpace: "nowrap", maxWidth: 100, overflow: "hidden", textOverflow: "ellipsis",
            opacity: chipVisible ? 1 : 0,
            transform: chipVisible ? "translateX(0)" : "translateX(-8px)",
            transition: "opacity 0.35s ease, transform 0.35s ease",
          }}>
            {ch.msg}
          </div>
        </div>

        {/* ── Center hub ── */}
        <div style={{
          flex: "0 0 auto",
          backgroundColor: "#0f172a",
          borderRadius: 12, padding: "10px 12px",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
          boxShadow: "0 2px 16px rgba(15,23,42,0.18)",
          minWidth: 82,
        }}>
          {/* Pulsing dots */}
          <div style={{ display: "flex", gap: 4, marginBottom: 2 }}>
            {[0, 0.3, 0.6].map((d, i) => (
              <div key={i} style={{
                width: 5, height: 5, borderRadius: "50%", backgroundColor: "#818cf8",
                animation: "livePulse 1.4s ease-in-out infinite",
                animationDelay: `${d}s`,
              }} />
            ))}
          </div>
          <div style={{ fontSize: 8, fontWeight: 700, color: "#fff", textAlign: "center", lineHeight: 1.3 }}>
            Direct Response<br />Operator
          </div>
          <div style={{
            fontSize: 7, color: "#94a3b8", textAlign: "center",
            backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 4,
            padding: "2px 6px", marginTop: 2,
          }}>
            AI Response Engine
          </div>
        </div>

        {/* ── Right connector ── */}
        <div style={{
          flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
          position: "relative",
        }}>
          <div style={{
            position: "absolute", top: "50%", left: 0, right: 0, height: 1,
            borderTop: "1.5px dashed #e2e8f0", zIndex: 0,
          }} />
          {/* Arrow */}
          <div style={{ position: "relative", zIndex: 1, color: "#cbd5e1", fontSize: 14, userSelect: "none" }}>›</div>
        </div>

        {/* ── Right: outcome chips ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 7, flex: "0 0 auto" }}>
          {OUTCOMES.map(({ label, color, bg, bd }, i) => (
            <div key={label} style={{
              fontSize: 8, fontWeight: 600, color,
              backgroundColor: bg, border: `1px solid ${bd}`,
              borderRadius: 6, padding: "4px 8px",
              whiteSpace: "nowrap",
              opacity: i === outcomeIdx ? (outcomeVisible ? 1 : 0) : 0.3,
              transform: i === outcomeIdx ? "translateX(0)" : "translateX(4px)",
              transition: "opacity 0.35s ease, transform 0.35s ease",
            }}>
              {label}
            </div>
          ))}
        </div>

      </div>
    </VisualWrap>
  );
};

// ── 5. Integrations — real logo grid ──────────────────────────────────────────

const LOGOS = [
  { Icon: SiSlack,          color: "#4A154B", name: "Slack" },
  { Icon: SiGmail,          color: "#EA4335", name: "Gmail" },
  { Icon: SiSalesforce,     color: "#00A1E0", name: "Salesforce" },
  { Icon: SiHubspot,        color: "#FF7A59", name: "HubSpot" },
  { Icon: SiStripe,         color: "#635BFF", name: "Stripe" },
  { Icon: SiNotion,         color: "#000000", name: "Notion" },
  { Icon: SiGooglecalendar, color: "#4285F4", name: "Google Cal" },
  { Icon: SiAirtable,       color: "#18BFFF", name: "Airtable" },
  { Icon: SiZapier,         color: "#FF4A00", name: "Zapier" },
  { Icon: SiShopify,        color: "#96BF48", name: "Shopify" },
  { Icon: SiZoho,           color: "#E42527", name: "Zoho" },
  { Icon: SiDropbox,        color: "#0061FF", name: "Dropbox" },
  { Icon: SiInstagram,      color: "#E1306C", name: "Instagram" },
  { Icon: SiLinear,         color: "#5E6AD2", name: "Linear" },
  { Icon: SiTwilio,         color: "#F22F46", name: "Twilio" },
];

const IntegrationsVisual = () => (
  <VisualWrap>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 8, paddingBottom: 20 }}>
      {LOGOS.map(({ Icon, color, name }) => (
        <div key={name} style={{
          backgroundColor: "#f8fafb", border: "1px solid #e8eaed",
          borderRadius: 10, padding: "14px 6px 10px",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 7,
        }}>
          <Icon size={26} color={color} />
          <span style={{ fontSize: 8, color: "#6b7280", fontWeight: 500, textAlign: "center", lineHeight: 1.2 }}>{name}</span>
        </div>
      ))}
    </div>
  </VisualWrap>
);

// ── 6. Stratix Intelligence Engine — agents feed into Stratix logo ────────────

// 6 agent nodes arranged in a circle around the centre
const CX = 190, CY = 115, R = 88;
const AGENT_NODES = [
  { id: "calls",    label: "Call Data",    angle: -90 },
  { id: "chat",     label: "Chat Logs",    angle: -30 },
  { id: "leads",    label: "Lead Scores",  angle:  30 },
  { id: "social",   label: "DM History",   angle:  90 },
  { id: "bookings", label: "Booking Data", angle: 150 },
  { id: "crm",      label: "CRM Records",  angle: 210 },
];

function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = (deg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

const NeuralVisual = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    let frame: number;
    const pulses = AGENT_NODES.map((_, i) => ({
      progress: i / AGENT_NODES.length,
      speed: 0.004 + (i % 3) * 0.0015,
    }));

    const tick = (t: number) => {
      const svg = svgRef.current;
      if (!svg) return;

      pulses.forEach((p, i) => {
        p.progress = (p.progress + p.speed) % 1;
        const dot = svg.querySelector(`#pd${i}`) as SVGCircleElement | null;
        if (!dot) return;
        const pos = polar(CX, CY, R, AGENT_NODES[i].angle);
        dot.setAttribute("cx", String(pos.x + (CX - pos.x) * p.progress));
        dot.setAttribute("cy", String(pos.y + (CY - pos.y) * p.progress));
      });

      const g1 = svg.querySelector("#gr1") as SVGCircleElement | null;
      const g2 = svg.querySelector("#gr2") as SVGCircleElement | null;
      if (g1) g1.setAttribute("r", String(34 + 3 * Math.sin(t / 700)));
      if (g2) g2.setAttribute("r", String(44 + 3 * Math.sin(t / 700 + 1)));

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  const F = "system-ui,-apple-system,sans-serif";

  return (
    <VisualWrap>
      <svg ref={svgRef} viewBox="62 4 258 224" style={{ width: "100%", display: "block", paddingBottom: 8 }}>
        <defs>
          <clipPath id="logoClip">
            <circle cx={CX} cy={CY} r={24} />
          </clipPath>
          <filter id="nsf" x="-40%" y="-40%" width="180%" height="180%">
            <feDropShadow dx="0" dy="1" stdDeviation="2.5" floodColor="#0f172a" floodOpacity="0.07" />
          </filter>
        </defs>

        {/* Outer decorative dashed ring */}
        <circle cx={CX} cy={CY} r={R + 20} fill="none" stroke="#e8ecf0" strokeWidth={1} strokeDasharray="2 5" />

        {/* Orbit ring */}
        <circle cx={CX} cy={CY} r={R} fill="none" stroke="#edf1f4" strokeWidth={1} />

        {/* Spoke lines */}
        {AGENT_NODES.map(n => {
          const pos = polar(CX, CY, R, n.angle);
          return (
            <line key={n.id} x1={pos.x} y1={pos.y} x2={CX} y2={CY}
              stroke="#dde3ea" strokeWidth={1.5} />
          );
        })}

        {/* Node cards — rounded rect with shadow */}
        {AGENT_NODES.map(n => {
          const pos = polar(CX, CY, R, n.angle);
          const words = n.label.split(" ");
          return (
            <g key={n.id} filter="url(#nsf)">
              <rect x={pos.x - 26} y={pos.y - 16} width={52} height={32}
                rx={8} fill="#fff" stroke="#e4e9ef" strokeWidth={1} />
              <text x={pos.x} y={pos.y - 2} textAnchor="middle"
                fontSize={8} fontWeight="600" fill="#374151" fontFamily={F}>{words[0]}</text>
              <text x={pos.x} y={pos.y + 9} textAnchor="middle"
                fontSize={8} fontWeight="600" fill="#374151" fontFamily={F}>{words[1] ?? ""}</text>
            </g>
          );
        })}

        {/* Breathing glow halos */}
        <circle id="gr2" cx={CX} cy={CY} r={44} fill="#0f172a" opacity={0.022} />
        <circle id="gr1" cx={CX} cy={CY} r={34} fill="#0f172a" opacity={0.042} />

        {/* Center logo */}
        <image href={stratixLogo}
          x={CX - 22} y={CY - 22} width={44} height={44}
          clipPath="url(#logoClip)" preserveAspectRatio="xMidYMid meet" />

        {/* Animated pulse dots travelling inward */}
        {AGENT_NODES.map((_, i) => (
          <circle key={i} id={`pd${i}`} r={3.5} fill="#818cf8" cx={0} cy={0} opacity={0.8} />
        ))}
      </svg>
    </VisualWrap>
  );
};

// ── Card data ──────────────────────────────────────────────────────────────────

const CARDS = [
  {
    label: "Voice Automation",
    title: "Voice Agent",
    description: "Handle inbound calls and qualify leads automatically.",
    bullets: ["Natural call handling", "Lead qualification", "Appointment scheduling", "Smart call routing"],
    visual: <VoiceVisual />,
    justify: "center", align: "center",
  },
  {
    label: "Web Intelligence",
    title: "Website Agent",
    description: "Answer visitor questions using your knowledge base.",
    bullets: ["Knowledge base retrieval", "Real-time responses", "Service qualification", "Booking link routing"],
    visual: <WebVisual />,
    justify: "flex-end", align: "flex-start",
  },
  {
    label: "Lead Automation",
    title: "Lead Capture",
    description: "Capture and qualify inbound leads automatically.",
    bullets: ["Intelligent form intake", "Lead scoring", "CRM synchronization", "Instant booking triggers"],
    visual: <LeadVisual />,
    justify: "center", align: "center",
    visualWidth: "96%",
  },
  {
    label: "Social Automation",
    title: "Direct Response Operator",
    description: "Automatically qualify and route inbound social conversations.",
    bullets: ["Instant replies to DMs and comments", "Lead intent detection", "Auto routing to booking or CRM", "Human takeover for qualified prospects"],
    visual: <SocialVisual />,
    justify: "center", align: "center",
    visualWidth: "100%",
  },
  {
    label: "Data Management",
    title: "Integrations",
    description: "Connect your existing tools with real-time sync.",
    bullets: ["100+ platform connections", "Real-time two-way sync", "CRM and calendar support", "API-ready workflows"],
    visual: <IntegrationsVisual />,
    justify: "center", align: "center",
    visualWidth: "95%",
  },
  {
    label: "AI Automation",
    title: "Intelligence Engine",
    description: "The learning layer that improves every agent over time.",
    bullets: ["Context-aware decisions", "Continuous learning", "Workflow optimization", "Cross-agent data sharing"],
    visual: <NeuralVisual />,
    justify: "center", align: "center",
    visualWidth: "90%",
  },
];

const ROWS = [
  [CARDS[0], CARDS[1]],
  [CARDS[2], CARDS[3]],
  [CARDS[4], CARDS[5]],
];

// ── Animated card wrapper ───────────────────────────────────────────────────────

const AnimatedCard = ({
  children,
  direction,
  delay,
}: {
  children: React.ReactNode;
  direction: "left" | "right";
  delay: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { setVisible(entry.isIntersecting); },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const x = direction === "left" ? -44 : 44;

  return (
    <div
      ref={ref}
      style={{
        border: "1px solid #e2e8f0",
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translateX(0) translateY(0)"
          : `translateX(${x}px) translateY(10px)`,
        transition: `opacity 1050ms cubic-bezier(0.22,1,0.36,1) ${visible ? delay : 0}ms, transform 1050ms cubic-bezier(0.22,1,0.36,1) ${visible ? delay : 0}ms`,
      }}
    >
      {children}
    </div>
  );
};

// ── Section ────────────────────────────────────────────────────────────────────

const IntelligentSystemsSection = () => (
  <>
    <style>{`
      @keyframes waveBar {
        0%,100% { transform: scaleY(1); opacity: 0.75; }
        50%      { transform: scaleY(1.35); opacity: 1; }
      }
      @keyframes typingDot {
        0%,60%,100% { transform: translateY(0); opacity: 0.4; }
        30%          { transform: translateY(-4px); opacity: 1; }
      }
      @keyframes livePulse {
        0%,100% { opacity: 1; transform: scale(1); }
        50%     { opacity: 0.4; transform: scale(0.7); }
      }
      @keyframes dashMove {
        from { stroke-dashoffset: 0; }
        to   { stroke-dashoffset: -14; }
      }
      @keyframes fadeSlideUp {
        from { opacity: 0; transform: translateY(5px); }
        to   { opacity: 1; transform: translateY(0); }
      }
    `}</style>
    <section className="iss-section" style={{ backgroundColor: "#ffffff", paddingBottom: 96 }}>
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <div>
          {ROWS.map((row, rowIdx) => (
            <div key={rowIdx}>
              {rowIdx > 0 && <div style={{ height: 20 }} />}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", columnGap: 20 }}>
                {row.map((card, colIdx) => (
                  <AnimatedCard
                    key={card.title}
                    direction={colIdx === 0 ? "left" : "right"}
                    delay={colIdx * 120}
                  >
                    {/* Visual area */}
                    <div style={{
                      backgroundColor: "#f5f5f5",
                      height: 380,
                      padding: 32,
                      display: "flex",
                      justifyContent: card.justify,
                      alignItems: card.align,
                    }}>
                      <div style={{ width: (card as any).visualWidth ?? "80%" }}>
                        {card.visual}
                      </div>
                    </div>
                    {/* White text strip */}
                    <div style={{ backgroundColor: "#ffffff", padding: "24px 28px 30px", borderTop: "1px solid #e2e8f0" }}>
                      <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#9ca3af", marginBottom: 8 }}>
                        {card.label}
                      </p>
                      <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#0f172a", lineHeight: 1.3, marginBottom: 6 }}>
                        {card.title}
                      </h3>
                      <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.5, marginBottom: 14 }}>
                        {card.description}
                      </p>
                      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 6 }}>
                        {card.bullets.map(b => (
                          <li key={b} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#4b5563" }}>
                            <span style={{ width: 4, height: 4, borderRadius: "50%", backgroundColor: "#9ca3af", flexShrink: 0 }} />
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </AnimatedCard>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default IntelligentSystemsSection;
