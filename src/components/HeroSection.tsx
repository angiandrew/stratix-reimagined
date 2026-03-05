import { useState, useEffect, useRef } from "react";
import {
  ArrowRight, Loader2, LayoutDashboard, Phone, CalendarCheck,
  Settings, Users, PhoneCall, PhoneOff, PhoneMissed, Bell,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import ParticleNetwork from "@/components/ParticleNetwork";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  AreaChart, Area, XAxis, YAxis, ResponsiveContainer,
  Tooltip as RechartsTooltip, CartesianGrid,
} from "recharts";

// ─── Mock data ────────────────────────────────────────────────────────────────

const CALL_VOLUME = [
  { t: "8am", v: 14 }, { t: "9am", v: 38 }, { t: "10am", v: 67 },
  { t: "11am", v: 91 }, { t: "12pm", v: 73 }, { t: "1pm", v: 58 },
  { t: "2pm", v: 84 }, { t: "3pm", v: 102 }, { t: "4pm", v: 88 },
  { t: "5pm", v: 61 }, { t: "6pm", v: 34 }, { t: "7pm", v: 19 },
];

const ACTIVITY = [
  {
    icon: CalendarCheck,
    name: "Sydney Repair Co.",
    detail: "Appointment booked — Wed 1:00 PM",
    time: "2m ago",
    status: "booked",
  },
  {
    icon: PhoneCall,
    name: "Brian Thompson",
    detail: "Lead qualified — follow-up scheduled",
    time: "9m ago",
    status: "qualified",
  },
  {
    icon: CalendarCheck,
    name: "Greenfield HVAC",
    detail: "Appointment booked — Thu 3:30 PM",
    time: "17m ago",
    status: "booked",
  },
  {
    icon: PhoneOff,
    name: "Maria Gonzalez",
    detail: "Voicemail left — callback pending",
    time: "24m ago",
    status: "pending",
  },
  {
    icon: PhoneMissed,
    name: "Jake Martinez",
    detail: "Call missed — auto-SMS sent",
    time: "31m ago",
    status: "missed",
  },
];

const STATUS_STYLE: Record<string, { bg: string; color: string; dot: string }> = {
  booked:    { bg: "#dcfce7", color: "#16a34a", dot: "#22c55e" },
  qualified: { bg: "#dbeafe", color: "#1d4ed8", dot: "#3b82f6" },
  pending:   { bg: "#fef9c3", color: "#a16207", dot: "#eab308" },
  missed:    { bg: "#fee2e2", color: "#b91c1c", dot: "#ef4444" },
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: "#fff", border: "1px solid #e5e7eb",
      borderRadius: 8, padding: "8px 12px", boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
      fontSize: 11,
    }}>
      <p style={{ color: "#6b7280", marginBottom: 2 }}>{label}</p>
      <p style={{ color: "#111827", fontWeight: 600 }}>{payload[0].value} calls</p>
    </div>
  );
};

// ─── Dashboard mockup ─────────────────────────────────────────────────────────

const DashboardMockup = () => (
  <div className="flex" style={{ fontFamily: "'Inter', system-ui, sans-serif", height: 580 }}>
    {/* Sidebar */}
    <div style={{ width: 52, background: "#fff", borderRight: "1px solid #f3f4f6", display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 16, gap: 8 }}>
      {[
        { Icon: LayoutDashboard, active: true },
        { Icon: Phone, active: false },
        { Icon: Users, active: false },
        { Icon: CalendarCheck, active: false },
        { Icon: Settings, active: false },
      ].map(({ Icon, active }, i) => (
        <div key={i} style={{
          width: 34, height: 34, borderRadius: 8,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: active ? "hsl(187,72%,53%)" : "transparent",
          color: active ? "#fff" : "#d1d5db",
          cursor: "pointer",
        }}>
          <Icon size={15} />
        </div>
      ))}
    </div>

    {/* Main */}
    <div style={{ flex: 1, background: "#f8f9fb", overflow: "hidden", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div style={{ background: "#fff", borderBottom: "1px solid #f3f4f6", padding: "10px 18px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <p style={{ fontSize: 13, fontWeight: 600, color: "#111827", lineHeight: 1.2 }}>Dashboard</p>
          <p style={{ fontSize: 10, color: "#9ca3af", marginTop: 1 }}>Today · Live view</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5, background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 20, padding: "3px 10px" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
            <span style={{ fontSize: 10, color: "#16a34a", fontWeight: 500 }}>6 agents live</span>
          </div>
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Bell size={12} color="#9ca3af" />
          </div>
        </div>
      </div>

      <div style={{ padding: "14px 18px", flex: 1, overflow: "hidden", display: "flex", flexDirection: "column", gap: 12 }}>
        {/* Stat cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
          {[
            { label: "Active Agents", value: "6",     sub: "All systems go",      accent: "hsl(187,72%,53%)" },
            { label: "Calls Today",   value: "1,247", sub: "+14% vs yesterday",   accent: "#3b82f6" },
            { label: "Leads Booked",  value: "89",    sub: "7.1% conversion",     accent: "#22c55e" },
            { label: "Success Rate",  value: "98%",   sub: "Avg handle time 2m4s", accent: "#a78bfa" },
          ].map((s) => (
            <div key={s.label} style={{ background: "#fff", borderRadius: 10, border: "1px solid #f3f4f6", padding: "12px 14px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                <p style={{ fontSize: 10, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 500 }}>{s.label}</p>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: s.accent }} />
              </div>
              <p style={{ fontSize: 22, fontWeight: 700, color: "#111827", letterSpacing: "-0.03em", lineHeight: 1 }}>{s.value}</p>
              <p style={{ fontSize: 10, color: "#9ca3af", marginTop: 4 }}>{s.sub}</p>
            </div>
          ))}
        </div>

        {/* Chart + Activity */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 260px", gap: 10, flex: 1, minHeight: 0 }}>
          {/* Call volume */}
          <div style={{ background: "#fff", borderRadius: 10, border: "1px solid #f3f4f6", padding: "14px 16px", display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <div>
                <p style={{ fontSize: 12, fontWeight: 600, color: "#111827" }}>Call Volume</p>
                <p style={{ fontSize: 10, color: "#9ca3af", marginTop: 1 }}>Inbound calls — today</p>
              </div>
              <div style={{ display: "flex", gap: 4 }}>
                {["Today", "7D", "30D"].map((t, i) => (
                  <button key={t} style={{
                    fontSize: 10, padding: "3px 8px", borderRadius: 5, border: "none", cursor: "pointer",
                    background: i === 0 ? "hsl(187,72%,53%)" : "#f3f4f6",
                    color: i === 0 ? "#fff" : "#6b7280",
                    fontWeight: i === 0 ? 600 : 400,
                  }}>{t}</button>
                ))}
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={CALL_VOLUME} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="cvGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(187,72%,53%)" stopOpacity={0.18} />
                      <stop offset="100%" stopColor="hsl(187,72%,53%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
                  <XAxis dataKey="t" tick={{ fontSize: 9, fill: "#d1d5db" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 9, fill: "#d1d5db" }} axisLine={false} tickLine={false} />
                  <RechartsTooltip content={<CustomTooltip />} cursor={{ stroke: "hsl(187,72%,53%)", strokeWidth: 1, strokeDasharray: "4 2" }} />
                  <Area type="monotone" dataKey="v" stroke="hsl(187,72%,53%)" fill="url(#cvGrad)" strokeWidth={2} dot={false} activeDot={{ r: 4, fill: "hsl(187,72%,53%)", strokeWidth: 2, stroke: "#fff" }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Activity */}
          <div style={{ background: "#fff", borderRadius: 10, border: "1px solid #f3f4f6", padding: "14px 16px", display: "flex", flexDirection: "column", overflow: "hidden" }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: "#111827", marginBottom: 12 }}>Recent Activity</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, overflow: "hidden" }}>
              {ACTIVITY.map((item, i) => {
                const style = STATUS_STYLE[item.status];
                return (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <div style={{ width: 28, height: 28, borderRadius: 8, background: style.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                      <item.icon size={12} color={style.color} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: 11, fontWeight: 600, color: "#111827", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.name}</p>
                      <p style={{ fontSize: 10, color: "#6b7280", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginTop: 1 }}>{item.detail}</p>
                    </div>
                    <span style={{ fontSize: 9, color: "#d1d5db", flexShrink: 0, paddingTop: 2 }}>{item.time}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ─── Hero section ─────────────────────────────────────────────────────────────

const HeroSection = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [blurAmount, setBlurAmount] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrolledPast = -rect.top;
      const startAt = el.offsetHeight * 0.70;
      const range = el.offsetHeight * 0.20;
      const progress = Math.min(Math.max((scrolledPast - startAt) / range, 0), 1);
      setBlurAmount(progress);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = async () => {
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      toast({ title: "Please enter a valid email address", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.functions.invoke("send-demo-request", {
        body: { email: trimmed, source: "hero" },
      });
      if (error) throw error;
      toast({ title: "Thanks! We'll be in touch shortly." });
      setEmail("");
    } catch {
      toast({ title: "Something went wrong. Please try again.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section ref={sectionRef} className="relative overflow-hidden pt-16 bg-background">
      <ParticleNetwork />

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-[600px] w-[900px] rounded-full bg-primary/5 blur-[140px]" />
      </div>

      {/* Hero copy */}
      <div className="relative z-10 container mx-auto px-4 text-center pt-20 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-xs text-muted-foreground mb-8 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            End-to-end AI infrastructure for modern businesses
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-8xl font-extrabold tracking-tight mb-6 leading-[1.05]">
            Growing smarter{" "}
            <br className="hidden sm:block" />
            with <span className="text-gradient">AI</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            A complete full-stack AI system that runs your operations — intelligent automation,
            real-time analytics, and seamless workflows, all managed for you.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-lg mx-auto mb-6">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 rounded-lg border border-border bg-secondary/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 backdrop-blur-sm"
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            />
            <Button size="lg" className="text-sm font-semibold gap-2 shrink-0" onClick={handleSubmit} disabled={loading}>
              {loading ? <Loader2 size={16} className="animate-spin" /> : <>Book a Demo <ArrowRight size={16} /></>}
            </Button>
          </div>

          <a
            href="#popular-agents"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4 decoration-border hover:decoration-foreground"
          >
            Explore our services →
          </a>
        </div>
      </div>

      {/* Dashboard preview */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-10">
        <div className="relative mx-auto max-w-6xl">
          <div
            style={{
              filter: `blur(${blurAmount * 10}px)`,
              opacity: 1 - blurAmount * 0.6,
              transition: "filter 0.05s linear, opacity 0.05s linear",
              willChange: "filter, opacity",
            }}
          >
            <div className="absolute -inset-px rounded-xl bg-gradient-to-b from-primary/25 to-transparent blur-sm pointer-events-none" />

            <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-[0_32px_80px_-12px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.05)]">
              {/* Title bar */}
              <div className="flex items-center gap-3 px-4 py-2.5 bg-[#1a1f2e] border-b border-white/5">
                <div className="flex gap-1.5 shrink-0">
                  <div className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                  <div className="h-3 w-3 rounded-full bg-[#febc2e]" />
                  <div className="h-3 w-3 rounded-full bg-[#28c840]" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="bg-white/5 rounded-md px-4 py-1 w-52">
                    <span className="text-[11px] text-white/30 font-mono">app.stratixos.ai/dashboard</span>
                  </div>
                </div>
                <div className="w-14" />
              </div>

              <DashboardMockup />
            </div>
          </div>

        </div>
      </div>

      <div className="h-12" />
    </section>
  );
};

export default HeroSection;
