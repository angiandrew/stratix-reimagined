import { useState } from "react";
import { ArrowRight, Loader2, TrendingUp, Zap, GitBranch, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import ParticleNetwork from "@/components/ParticleNetwork";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const miniChartPath = "M0,40 Q15,35 30,28 T60,20 T90,15 T120,8 T150,5 T180,2";
const miniChartPath2 = "M0,38 Q20,30 40,25 T80,18 T120,10 T160,6 T180,3";

const HeroSection = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      toast({ title: "Please enter a valid email address", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("send-demo-request", {
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
    <section className="relative overflow-hidden pt-16 pb-0">
      <ParticleNetwork />

      {/* ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-[600px] w-[1000px] rounded-full bg-primary/5 blur-[140px]" />
        <div className="absolute top-[60%] left-1/2 -translate-x-1/2 h-[400px] w-[700px] rounded-full bg-primary/8 blur-[120px]" />
      </div>

      {/* ── Text + CTA ── */}
      <div className="relative z-10 container mx-auto px-4 text-center pt-24 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-xs text-muted-foreground mb-8 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            The operating system for modern revenue teams
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-8xl font-extrabold tracking-tight mb-6 leading-[1.05]">
            Growing smarter{" "}
            <br className="hidden sm:block" />
            with <span className="text-gradient">AI</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            One end-to-end system that captures, qualifies, and converts — from first touch to closed deal, fully automated.
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
            See how it works →
          </a>
        </div>
      </div>

      {/* ── Dashboard Mockup ── */}
      <div className="relative z-10 container mx-auto px-4 pb-0">
        <div className="relative max-w-5xl mx-auto">
          {/* glow halo behind card */}
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-b from-primary/20 via-primary/5 to-transparent blur-2xl pointer-events-none" />

          {/* card */}
          <div className="relative rounded-2xl border border-white/[0.08] overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.05)] bg-[hsl(215,28%,7%)]">

            {/* browser chrome */}
            <div className="flex items-center gap-2 px-5 py-3 border-b border-white/[0.06] bg-[hsl(215,28%,5%)]">
              <div className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
              <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/60" />
              <div className="h-2.5 w-2.5 rounded-full bg-green-400/60" />
              <div className="mx-4 flex-1 max-w-xs h-5 rounded bg-white/[0.04] flex items-center px-3">
                <span className="text-[10px] text-white/25 select-none">app.stratixos.com</span>
              </div>
              <div className="ml-auto flex items-center gap-3">
                <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-[10px] text-primary/60 font-medium">Live</span>
              </div>
            </div>

            {/* app shell */}
            <div className="flex h-[420px] md:h-[500px]">

              {/* sidebar */}
              <div className="hidden md:flex flex-col w-48 border-r border-white/[0.05] bg-[hsl(215,28%,6%)] p-4 gap-1 shrink-0">
                <div className="text-[10px] font-semibold uppercase tracking-widest text-white/20 mb-3 px-2">Navigation</div>
                {[
                  { label: "Overview", active: true },
                  { label: "Pipeline" },
                  { label: "Automations" },
                  { label: "Leads" },
                  { label: "Workflows" },
                  { label: "Integrations" },
                  { label: "Reports" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                      item.active
                        ? "bg-primary/15 text-primary"
                        : "text-white/30 hover:text-white/50 hover:bg-white/[0.03]"
                    }`}
                  >
                    {item.label}
                  </div>
                ))}
              </div>

              {/* main content */}
              <div className="flex-1 overflow-hidden flex flex-col">

                {/* top bar */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.05]">
                  <div>
                    <div className="text-sm font-semibold text-white/80">Overview</div>
                    <div className="text-[10px] text-white/30">Last 30 days</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="px-3 py-1 rounded-md bg-white/[0.05] text-[10px] text-white/40">Jan 2025</div>
                    <div className="px-3 py-1 rounded-md bg-primary/20 text-[10px] text-primary font-medium">Export</div>
                  </div>
                </div>

                {/* stats row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.04] border-b border-white/[0.05]">
                  {[
                    { label: "Active Pipeline", value: "$2.1M", change: "+18%", icon: DollarSign },
                    { label: "Leads Qualified", value: "847", change: "+34%", icon: TrendingUp },
                    { label: "Automations Running", value: "63", change: "↑ 12 this week", icon: Zap },
                    { label: "Deals Closed", value: "29", change: "+41%", icon: GitBranch },
                  ].map((stat) => (
                    <div key={stat.label} className="p-4 bg-[hsl(215,28%,7%)]">
                      <div className="flex items-center gap-1.5 mb-2">
                        <stat.icon size={12} className="text-white/25" />
                        <span className="text-[10px] text-white/30">{stat.label}</span>
                      </div>
                      <div className="text-xl font-bold text-white/85">{stat.value}</div>
                      <div className="text-[10px] font-medium mt-0.5" style={{ color: "hsl(152,60%,50%)" }}>{stat.change}</div>
                    </div>
                  ))}
                </div>

                {/* charts */}
                <div className="flex-1 grid md:grid-cols-3 gap-px bg-white/[0.04] overflow-hidden">
                  {/* pipeline chart */}
                  <div className="md:col-span-2 p-5 bg-[hsl(215,28%,7%)]">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-semibold text-white/60">Revenue Pipeline</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">Trending up</span>
                    </div>
                    <div className="h-24 relative">
                      <svg viewBox="0 0 180 45" className="w-full h-full" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="heroGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="hsl(187,72%,53%)" stopOpacity="0.25" />
                            <stop offset="100%" stopColor="hsl(187,72%,53%)" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        <path d={miniChartPath + " L180,45 L0,45 Z"} fill="url(#heroGrad)" />
                        <path d={miniChartPath} fill="none" stroke="hsl(187,72%,53%)" strokeWidth="1.5" />
                        <circle cx="180" cy="2" r="3" fill="hsl(187,72%,53%)" />
                      </svg>
                    </div>
                    {/* pipeline stages */}
                    <div className="mt-4 flex gap-2">
                      {[
                        { stage: "Captured", pct: "100%", w: "w-full" },
                        { stage: "Qualified", pct: "68%", w: "w-2/3" },
                        { stage: "Proposed", pct: "41%", w: "w-2/5" },
                        { stage: "Closed", pct: "29%", w: "w-1/4" },
                      ].map((s) => (
                        <div key={s.stage} className="flex-1">
                          <div className="h-1 rounded-full bg-white/[0.06] mb-1.5">
                            <div
                              className="h-full rounded-full"
                              style={{ width: s.pct, background: "hsl(187,72%,53%)", opacity: s.stage === "Captured" ? 1 : s.stage === "Qualified" ? 0.75 : s.stage === "Proposed" ? 0.5 : 0.35 }}
                            />
                          </div>
                          <div className="text-[9px] text-white/25">{s.stage}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* automation activity */}
                  <div className="p-5 bg-[hsl(215,28%,7%)]">
                    <div className="text-xs font-semibold text-white/60 mb-4">Active Workflows</div>
                    <div className="flex flex-col gap-2">
                      {[
                        { name: "Lead Intake", status: "Running", runs: "1.2k" },
                        { name: "Qualify & Score", status: "Running", runs: "847" },
                        { name: "Follow-up Seq.", status: "Running", runs: "2.3k" },
                        { name: "Deal Routing", status: "Running", runs: "312" },
                        { name: "CRM Sync", status: "Running", runs: "4.1k" },
                      ].map((w) => (
                        <div key={w.name} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                            <span className="text-[10px] text-white/50">{w.name}</span>
                          </div>
                          <span className="text-[10px] text-white/25">{w.runs}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background to-transparent pointer-events-none" style={{ zIndex: 11 }} />
    </section>
  );
};

export default HeroSection;
