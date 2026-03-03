import { Building2, Wrench, Code2, ShoppingCart, Landmark, HeartPulse } from "lucide-react";
import AnimatedContent from "@/components/AnimatedContent";

const industries = [
  { icon: Building2, name: "Real Estate", desc: "Never miss a showing request or lead inquiry again." },
  { icon: Wrench, name: "Home Services", desc: "Book service calls and dispatch teams automatically." },
  { icon: Code2, name: "SaaS / Tech", desc: "Scale customer support and onboarding without headcount." },
  { icon: ShoppingCart, name: "E-Commerce", desc: "Handle order inquiries, returns, and upsells 24/7." },
  { icon: Landmark, name: "Financial Services", desc: "Qualify leads and schedule consultations compliantly." },
  { icon: HeartPulse, name: "Healthcare", desc: "Manage appointment scheduling and patient follow-ups." },
];

const Industries = () => (
  <section className="py-24 md:py-32 bg-card-light">
    <div className="container mx-auto px-4">
      <AnimatedContent>
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.2em] text-electric font-semibold mb-4">Industries</p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-light-fg tracking-tight">
            Built for your industry
          </h2>
          <p className="text-light-muted mt-4 max-w-xl mx-auto text-base">
            Tailored solutions for the businesses that need intelligent automation most.
          </p>
        </div>
      </AnimatedContent>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
        {industries.map((ind, i) => (
          <AnimatedContent key={ind.name} delay={i * 0.06}>
            <div className="group rounded-2xl bg-white border border-light-border p-6 hover:border-electric/20 hover:shadow-lg transition-all duration-300">
              <div className="w-11 h-11 rounded-xl bg-electric/5 border border-electric/10 flex items-center justify-center mb-4">
                <ind.icon size={20} className="text-electric" />
              </div>
              <h3 className="text-base font-bold text-light-fg mb-1.5">{ind.name}</h3>
              <p className="text-sm text-light-muted leading-relaxed">{ind.desc}</p>
            </div>
          </AnimatedContent>
        ))}
      </div>
    </div>
  </section>
);

export default Industries;
