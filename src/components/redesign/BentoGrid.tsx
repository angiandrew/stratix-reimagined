import { Phone, MessageSquare, GitBranch, Database, Shield, FlaskConical, UserCheck, Wrench } from "lucide-react";
import AnimatedContent from "@/components/AnimatedContent";

interface FeatureCard {
  title: string;
  desc: string;
  icon: React.ElementType;
  tall?: boolean;
  mockup: React.ReactNode;
}

/* ---- Mockup sub-components (CSS-only UI illustrations) ---- */

const VoiceMockup = () => (
  <div className="space-y-3">
    <div className="bg-white rounded-lg p-3 border border-light-border">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-9 h-9 rounded-full bg-electric/10 flex items-center justify-center">
          <Phone size={14} className="text-electric" />
        </div>
        <div>
          <p className="text-xs font-semibold text-light-fg">Sarah Miller</p>
          <p className="text-[10px] text-light-muted">+1 (555) 234-8910</p>
        </div>
        <span className="ml-auto text-[10px] text-electric font-medium">Live</span>
      </div>
      <div className="flex items-center gap-1 h-6">
        {Array.from({ length: 32 }).map((_, i) => (
          <div
            key={i}
            className="w-1 bg-electric/40 rounded-full"
            style={{ height: `${Math.random() * 100}%`, minHeight: 3 }}
          />
        ))}
      </div>
      <p className="text-[10px] text-light-muted mt-2 text-right">2:34</p>
    </div>
    <div className="bg-white rounded-lg p-3 border border-light-border">
      <p className="text-[10px] font-semibold text-light-fg mb-2">Call Summary</p>
      <div className="space-y-1.5">
        <div className="h-2 bg-card-light rounded w-full" />
        <div className="h-2 bg-card-light rounded w-4/5" />
        <div className="h-2 bg-card-light rounded w-3/5" />
      </div>
      <div className="flex gap-2 mt-3">
        <span className="text-[9px] bg-electric/10 text-electric px-2 py-0.5 rounded-full font-medium">Appointment Set</span>
        <span className="text-[9px] bg-green-50 text-green-600 px-2 py-0.5 rounded-full font-medium">Positive</span>
      </div>
    </div>
  </div>
);

const OmnichannelMockup = () => (
  <div className="bg-white rounded-lg p-3 border border-light-border">
    <div className="flex items-center justify-between mb-3">
      <p className="text-xs font-semibold text-light-fg">New Outreach</p>
      <span className="text-[9px] text-light-muted">Sequence #4</span>
    </div>
    <div className="text-[10px] text-light-muted mb-2">To: John Doe • Acme Corp</div>
    <div className="flex flex-wrap gap-1.5 mb-3">
      {["SMS", "WhatsApp", "Email", "LinkedIn"].map((ch) => (
        <span
          key={ch}
          className={`text-[9px] px-2.5 py-1 rounded-full font-medium border ${
            ch === "Email" ? "bg-electric text-white border-electric" : "bg-card-light text-light-fg border-light-border"
          }`}
        >
          {ch}
        </span>
      ))}
    </div>
    <div className="bg-card-light rounded-md p-2.5">
      <div className="space-y-1.5">
        <div className="h-2 bg-light-border rounded w-full" />
        <div className="h-2 bg-light-border rounded w-3/4" />
      </div>
    </div>
    <div className="flex justify-end mt-3">
      <span className="text-[9px] bg-electric text-white px-3 py-1 rounded-full font-medium">Send Sequence →</span>
    </div>
  </div>
);

const WorkflowMockup = () => {
  const nodes = [
    { label: "Trigger", sub: "Inbound Call", color: "bg-electric/10 text-electric border-electric/20" },
    { label: "Enrich", sub: "CRM Lookup", color: "bg-amber-50 text-amber-600 border-amber-200" },
    { label: "Branch", sub: "If lead score > 50", color: "bg-purple-50 text-purple-600 border-purple-200" },
    { label: "Action", sub: "Book Meeting", color: "bg-green-50 text-green-600 border-green-200" },
  ];
  return (
    <div className="bg-white rounded-lg p-4 border border-light-border">
      <div className="space-y-0">
        {nodes.map((n, i) => (
          <div key={n.label}>
            <div className={`rounded-lg border p-2.5 ${n.color}`}>
              <p className="text-[10px] font-semibold">{n.label}</p>
              <p className="text-[9px] opacity-70">{n.sub}</p>
            </div>
            {i < nodes.length - 1 && (
              <div className="flex justify-center py-1">
                <div className="w-px h-4 bg-light-border" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const KnowledgeMockup = () => (
  <div className="bg-white rounded-lg p-3 border border-light-border">
    <div className="flex items-center justify-between mb-3">
      <p className="text-xs font-semibold text-light-fg">Knowledge Sources</p>
      <span className="text-[9px] bg-green-50 text-green-600 px-2 py-0.5 rounded-full font-medium">Synced</span>
    </div>
    {[
      { name: "Product FAQ", type: "PDF", time: "2m ago" },
      { name: "Pricing Sheet", type: "Google Doc", time: "1h ago" },
      { name: "Help Center", type: "Website", time: "5m ago" },
    ].map((s) => (
      <div key={s.name} className="flex items-center justify-between py-2 border-t border-light-border first:border-0">
        <div>
          <p className="text-[10px] font-medium text-light-fg">{s.name}</p>
          <p className="text-[9px] text-light-muted">Updated {s.time}</p>
        </div>
        <span className="text-[9px] bg-card-light text-light-muted px-2 py-0.5 rounded font-medium">{s.type}</span>
      </div>
    ))}
  </div>
);

const PolicyMockup = () => (
  <div className="bg-white rounded-lg p-3 border border-light-border">
    <p className="text-xs font-semibold text-light-fg mb-3">Early Check-In Rule</p>
    <div className="space-y-2">
      <div className="bg-card-light rounded-md p-2.5 text-[10px]">
        <span className="text-purple-600 font-semibold">IF</span>
        <span className="text-light-fg ml-1.5">check_in_date - today &lt; 24h</span>
      </div>
      <div className="bg-card-light rounded-md p-2.5 text-[10px]">
        <span className="text-electric font-semibold">THEN</span>
        <span className="text-light-fg ml-1.5">allow_early_checkin = true</span>
      </div>
      <div className="bg-card-light rounded-md p-2.5 text-[10px]">
        <span className="text-amber-600 font-semibold">ACTION</span>
        <span className="text-light-fg ml-1.5">Send confirmation SMS</span>
      </div>
    </div>
  </div>
);

const StressTestMockup = () => (
  <div className="bg-white rounded-lg p-3 border border-light-border">
    <div className="flex items-center justify-between mb-3">
      <p className="text-xs font-semibold text-light-fg">Test Run #247</p>
      <span className="text-[9px] text-light-muted">3 scenarios</span>
    </div>
    <div className="grid grid-cols-2 gap-2">
      <div className="rounded-lg border border-green-200 bg-green-50 p-2.5">
        <p className="text-[9px] font-bold text-green-700 mb-1">PASSED</p>
        <p className="text-[9px] text-green-600">Refund policy handled correctly</p>
      </div>
      <div className="rounded-lg border border-red-200 bg-red-50 p-2.5">
        <p className="text-[9px] font-bold text-red-700 mb-1">FAILED</p>
        <p className="text-[9px] text-red-600">Missed edge case on expired plans</p>
      </div>
    </div>
    <div className="mt-2 bg-card-light rounded-md p-2 text-[9px] text-light-muted">
      <span className="font-medium text-light-fg">Evaluation:</span> Agent correctly applied discount but didn't verify eligibility.
    </div>
  </div>
);

const LeadWarmupMockup = () => (
  <div className="bg-white rounded-lg p-3 border border-light-border">
    <p className="text-xs font-semibold text-light-fg mb-3">Re-engagement Sequence</p>
    <div className="flex items-center gap-2">
      {[
        { label: "Detect", sub: "90d inactive", bg: "bg-amber-50 border-amber-200 text-amber-700" },
        { label: "Outreach", sub: "Personalized", bg: "bg-electric/10 border-electric/20 text-electric" },
        { label: "Track", sub: "Response", bg: "bg-green-50 border-green-200 text-green-700" },
      ].map((step, i) => (
        <div key={step.label} className="flex items-center gap-2 flex-1">
          <div className={`rounded-lg border p-2 text-center flex-1 ${step.bg}`}>
            <p className="text-[9px] font-semibold">{step.label}</p>
            <p className="text-[8px] opacity-70">{step.sub}</p>
          </div>
          {i < 2 && <span className="text-light-muted text-xs">→</span>}
        </div>
      ))}
    </div>
  </div>
);

const CustomToolMockup = () => (
  <div className="bg-white rounded-lg p-3 border border-light-border space-y-2">
    <div className="flex items-center gap-2 mb-1">
      <div className="w-5 h-5 rounded bg-electric/10 flex items-center justify-center">
        <Wrench size={10} className="text-electric" />
      </div>
      <p className="text-[10px] font-semibold text-light-fg">Using Tool — CRM Lookup</p>
    </div>
    <div className="bg-card-light rounded-md p-2.5 text-[10px] font-mono text-light-muted">
      <p className="text-light-fg">contact_id: "CTX-4829"</p>
      <p>status: "active"</p>
      <p>ltv: "$12,400"</p>
    </div>
    <div className="bg-white border border-light-border rounded-md p-2.5">
      <p className="text-[9px] font-semibold text-light-fg mb-1">Enriched Profile</p>
      <div className="space-y-1">
        <div className="h-2 bg-card-light rounded w-full" />
        <div className="h-2 bg-card-light rounded w-2/3" />
      </div>
    </div>
  </div>
);

/* ---- Feature data ---- */

const features: FeatureCard[] = [
  { title: "Voice AI", desc: "AI agents that answer calls, capture details, and book appointments 24/7.", icon: Phone, tall: true, mockup: <VoiceMockup /> },
  { title: "Omnichannel Outreach", desc: "Intelligent multi-channel sequencing across SMS, WhatsApp, Email, and LinkedIn.", icon: MessageSquare, mockup: <OmnichannelMockup /> },
  { title: "Conversational Workflows", desc: "Visual workflow builder with triggers, enrichment, branching, and actions.", icon: GitBranch, tall: true, mockup: <WorkflowMockup /> },
  { title: "Knowledge Base Syncing", desc: "Sync product docs, FAQs, and help articles to keep agents always up to date.", icon: Database, mockup: <KnowledgeMockup /> },
  { title: "Policy Compliant", desc: "Define condition logic and action triggers so agents follow your rules exactly.", icon: Shield, mockup: <PolicyMockup /> },
  { title: "Stress Test Scenarios", desc: "Run evaluations with pass/fail verdicts and reasoning before going live.", icon: FlaskConical, mockup: <StressTestMockup /> },
  { title: "Lost Lead Warmup & Retention", desc: "Detect dormant leads and trigger personalized re-engagement automatically.", icon: UserCheck, mockup: <LeadWarmupMockup /> },
  { title: "Custom Tools", desc: "Give agents access to your tools — CRM lookups, enrichment, and more.", icon: Wrench, mockup: <CustomToolMockup /> },
];

const BentoGrid = () => (
  <section className="py-24 md:py-32 section-white">
    <div className="container mx-auto px-4">
      <AnimatedContent>
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.2em] text-electric font-semibold mb-4">Platform</p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-light-fg tracking-tight">
            Everything you need to automate
          </h2>
          <p className="text-light-muted mt-4 max-w-xl mx-auto text-base">
            A complete toolkit for intelligent customer operations — from first touch to close.
          </p>
        </div>
      </AnimatedContent>

      <div className="grid md:grid-cols-2 gap-5 max-w-5xl mx-auto">
        {features.map((f, i) => (
          <AnimatedContent key={f.title} delay={i * 0.06}>
            <div
              className={`group rounded-2xl border border-light-border bg-card-light hover:border-electric/20 hover:shadow-lg transition-all duration-300 overflow-hidden ${
                f.tall ? "md:row-span-2" : ""
              }`}
            >
              <div className="p-5 pb-0">
                {f.mockup}
              </div>
              <div className="p-5 pt-4">
                <div className="flex items-center gap-2 mb-1.5">
                  <f.icon size={16} className="text-electric" />
                  <h3 className="text-sm font-bold text-light-fg">{f.title}</h3>
                </div>
                <p className="text-xs text-light-muted leading-relaxed">{f.desc}</p>
              </div>
            </div>
          </AnimatedContent>
        ))}
      </div>
    </div>
  </section>
);

export default BentoGrid;
