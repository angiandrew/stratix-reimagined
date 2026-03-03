import PublicLayout from "@/components/redesign/PublicLayout";
import { useDemoModal } from "@/components/redesign/DemoContext";
import { Button } from "@/components/ui/button";
import { Phone, MessageSquare, GitBranch, Shield, Zap, BarChart3, ArrowRight } from "lucide-react";
import AnimatedContent from "@/components/AnimatedContent";

const solutions = [
  { icon: Phone, title: "Voice AI Agents", desc: "Intelligent voice agents that answer calls, qualify leads, and book appointments — indistinguishable from your best team member." },
  { icon: MessageSquare, title: "Omnichannel Outreach", desc: "Coordinate personalized outreach across SMS, WhatsApp, Email, and LinkedIn with intelligent sequencing and timing." },
  { icon: GitBranch, title: "Workflow Automation", desc: "Build complex automation workflows with our visual builder. Triggers, conditions, enrichment, and actions — no code required." },
  { icon: Shield, title: "Compliance & Policy Engine", desc: "Define business rules and compliance policies that your AI agents follow precisely. Full audit trail included." },
  { icon: Zap, title: "Real-Time Intelligence", desc: "Every interaction is analyzed for sentiment, intent, and opportunity. Surface insights that drive better decisions." },
  { icon: BarChart3, title: "Analytics & Reporting", desc: "Comprehensive dashboards that show call volume, conversion rates, agent performance, and revenue impact." },
];

const Solutions = () => {
  const { openDemo } = useDemoModal();
  return (
    <PublicLayout>
      <div className="pt-28 pb-24 bg-white">
        <div className="container mx-auto px-4">
          <AnimatedContent>
            <div className="text-center mb-20">
              <p className="text-xs uppercase tracking-[0.2em] text-electric font-semibold mb-4">Solutions</p>
              <h1 className="text-4xl md:text-5xl font-extrabold text-light-fg tracking-tight">
                AI-powered solutions for
                <br className="hidden sm:block" />
                every business need
              </h1>
              <p className="text-light-muted mt-4 max-w-xl mx-auto">
                From voice agents to workflow automation, StratixOS gives you the tools to operate smarter.
              </p>
            </div>
          </AnimatedContent>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-20">
            {solutions.map((s, i) => (
              <AnimatedContent key={s.title} delay={i * 0.08}>
                <div className="flex gap-5">
                  <div className="w-12 h-12 rounded-xl bg-electric/5 border border-electric/10 flex items-center justify-center shrink-0">
                    <s.icon size={22} className="text-electric" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-light-fg mb-1.5">{s.title}</h3>
                    <p className="text-sm text-light-muted leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              </AnimatedContent>
            ))}
          </div>

          <AnimatedContent>
            <div className="text-center">
              <Button
                onClick={openDemo}
                className="bg-electric hover:bg-electric/90 text-electric-foreground font-semibold rounded-full px-8 h-12 text-base gap-2"
              >
                Book a Demo <ArrowRight size={18} />
              </Button>
            </div>
          </AnimatedContent>
        </div>
      </div>
    </PublicLayout>
  );
};

export default Solutions;
