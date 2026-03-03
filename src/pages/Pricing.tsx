import PublicLayout from "@/components/redesign/PublicLayout";
import { useDemoModal } from "@/components/redesign/DemoContext";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import AnimatedContent from "@/components/AnimatedContent";

const tiers = [
  {
    name: "Starter",
    price: "Custom",
    desc: "For small teams getting started with AI automation.",
    features: ["1 AI Voice Agent", "500 minutes/mo", "Email support", "Basic analytics", "Knowledge base sync"],
    highlighted: false,
  },
  {
    name: "Professional",
    price: "Custom",
    desc: "For growing businesses ready to scale operations.",
    features: ["5 AI Voice Agents", "2,500 minutes/mo", "Omnichannel outreach", "Priority support", "Workflow builder", "CRM integrations", "Stress testing"],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    desc: "For organizations that need full customization and control.",
    features: ["Unlimited agents", "Unlimited minutes", "Custom tools & integrations", "Dedicated success manager", "SLA guarantee", "Advanced compliance", "API access"],
    highlighted: false,
  },
];

const faqs = [
  { q: "What's included in a demo?", a: "A personalized 30-minute walkthrough of the platform, tailored to your industry and use case. We'll show you exactly how StratixOS can fit into your operations." },
  { q: "How long does setup take?", a: "Most teams are up and running in under a week. Our team handles the heavy lifting so you can focus on your business." },
  { q: "Can I change plans later?", a: "Absolutely. You can upgrade or adjust your plan at any time as your needs evolve." },
  { q: "Is there a free trial?", a: "We offer personalized demos to help you find the right fit. Book a demo to get started." },
  { q: "What support is included?", a: "All plans include email support. Professional and Enterprise plans include priority and dedicated support respectively." },
];

const PricingCard = ({ tier }: { tier: typeof tiers[0] }) => {
  const { openDemo } = useDemoModal();
  return (
    <div className={`rounded-2xl border p-8 flex flex-col ${tier.highlighted ? "border-electric bg-white shadow-xl ring-1 ring-electric/20 relative" : "border-light-border bg-white"}`}>
      {tier.highlighted && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-electric text-electric-foreground text-[10px] font-bold uppercase tracking-wider px-4 py-1 rounded-full">
          Recommended
        </span>
      )}
      <h3 className="text-xl font-bold text-light-fg">{tier.name}</h3>
      <p className="text-sm text-light-muted mt-1 mb-6">{tier.desc}</p>
      <p className="text-3xl font-extrabold text-light-fg mb-6">{tier.price}</p>
      <ul className="space-y-3 mb-8 flex-1">
        {tier.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm text-light-fg">
            <Check size={16} className="text-electric mt-0.5 shrink-0" />
            {f}
          </li>
        ))}
      </ul>
      <Button
        onClick={openDemo}
        className={`w-full rounded-full h-11 font-semibold gap-2 ${tier.highlighted ? "bg-electric hover:bg-electric/90 text-electric-foreground" : "bg-light-fg hover:bg-light-fg/90 text-white"}`}
      >
        Book a Demo <ArrowRight size={16} />
      </Button>
    </div>
  );
};

const Pricing = () => (
  <PublicLayout>
    <div className="pt-28 pb-24 bg-white">
      <div className="container mx-auto px-4">
        <AnimatedContent>
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.2em] text-electric font-semibold mb-4">Pricing</p>
            <h1 className="text-4xl md:text-5xl font-extrabold text-light-fg tracking-tight">
              Simple, transparent pricing
            </h1>
            <p className="text-light-muted mt-4 max-w-lg mx-auto">
              Every plan includes a personalized demo. Find the right fit for your team.
            </p>
          </div>
        </AnimatedContent>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-24">
          {tiers.map((t, i) => (
            <AnimatedContent key={t.name} delay={i * 0.1}>
              <PricingCard tier={t} />
            </AnimatedContent>
          ))}
        </div>

        <AnimatedContent>
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-light-fg text-center mb-8">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="border-light-border">
                  <AccordionTrigger className="text-left text-sm font-medium text-light-fg hover:no-underline">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-sm text-light-muted">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </AnimatedContent>
      </div>
    </div>
  </PublicLayout>
);

export default Pricing;
