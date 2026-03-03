import PublicLayout from "@/components/redesign/PublicLayout";
import { Link } from "react-router-dom";
import { BookOpen, FileText, Calculator, Code2, ArrowRight } from "lucide-react";
import AnimatedContent from "@/components/AnimatedContent";

const resources = [
  { icon: BookOpen, title: "Blog", desc: "Industry insights, product updates, and automation best practices.", href: "#" },
  { icon: FileText, title: "Case Studies", desc: "See how real businesses transformed their operations with StratixOS.", href: "#" },
  { icon: Calculator, title: "ROI Calculator", desc: "Estimate how much revenue AI agents can recover for your business.", href: "/calculator" },
  { icon: Code2, title: "Documentation", desc: "Technical guides, API references, and integration walkthroughs.", href: "#" },
];

const Resources = () => (
  <PublicLayout>
    <div className="pt-28 pb-24 bg-white min-h-screen">
      <div className="container mx-auto px-4">
        <AnimatedContent>
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.2em] text-electric font-semibold mb-4">Resources</p>
            <h1 className="text-4xl md:text-5xl font-extrabold text-light-fg tracking-tight">
              Learn, explore, build
            </h1>
            <p className="text-light-muted mt-4 max-w-lg mx-auto">
              Everything you need to get the most out of StratixOS.
            </p>
          </div>
        </AnimatedContent>

        <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {resources.map((r, i) => (
            <AnimatedContent key={r.title} delay={i * 0.08}>
              <Link
                to={r.href}
                className="group block rounded-2xl border border-light-border bg-white p-6 hover:border-electric/20 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-xl bg-electric/5 border border-electric/10 flex items-center justify-center mb-4">
                  <r.icon size={20} className="text-electric" />
                </div>
                <h3 className="text-base font-bold text-light-fg mb-1.5 group-hover:text-electric transition-colors flex items-center gap-2">
                  {r.title}
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-sm text-light-muted leading-relaxed">{r.desc}</p>
              </Link>
            </AnimatedContent>
          ))}
        </div>
      </div>
    </div>
  </PublicLayout>
);

export default Resources;
