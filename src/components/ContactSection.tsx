import { useState } from "react";
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const ContactSection = () => {
  const [email, setEmail] = useState("");

  return (
    <section id="contact" className="section-light py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[hsl(var(--primary))] mb-4">
            Get Started
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ color: "hsl(var(--light-fg))" }}>
            Ready to automate your growth?
          </h2>
          <p className="max-w-xl mx-auto mb-10 text-sm" style={{ color: "hsl(var(--light-muted))" }}>
            Tell us about your business. We'll map your workflows and ship your first AI agent fast.
          </p>

          {/* Email CTA */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-lg mx-auto mb-12">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your work email"
              className="flex-1 rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
              style={{
                borderColor: "hsl(var(--light-border))",
                color: "hsl(var(--light-fg))",
                background: "hsl(var(--light-card))",
              }}
            />
            <Button size="lg" className="text-sm font-semibold gap-2 shrink-0">
              Book a Demo <ArrowRight size={16} />
            </Button>
          </div>

          {/* Contact details */}
          <div className="flex flex-col sm:flex-row justify-center gap-8 text-sm" style={{ color: "hsl(var(--light-muted))" }}>
            <a
              href="mailto:contact@stratixos.com"
              className="flex items-center gap-2 hover:text-[hsl(var(--light-fg))] transition-colors"
            >
              <Mail size={16} className="text-[hsl(var(--primary))]" />
              contact@stratixos.com
            </a>
            <a
              href="tel:+17725385517"
              className="flex items-center gap-2 hover:text-[hsl(var(--light-fg))] transition-colors"
            >
              <Phone size={16} className="text-[hsl(var(--primary))]" />
              (772) 538-5517
            </a>
            <span className="flex items-center gap-2">
              <MapPin size={16} className="text-[hsl(var(--primary))]" />
              Miami, FL
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
