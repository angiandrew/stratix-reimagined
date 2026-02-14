import { useState } from "react";
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const ContactSection = () => {
  const [email, setEmail] = useState("");

  return (
    <section id="contact" className="py-24 relative">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[600px] rounded-full bg-primary/5 blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Ready to automate{" "}
            <span className="text-gradient">your growth?</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-10">
            Tell us about your business. We'll map your workflows and ship your first AI agent fast.
          </p>

          {/* Email CTA */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-lg mx-auto mb-12">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your work email"
              className="flex-1 rounded-lg border border-border bg-secondary/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 backdrop-blur-sm"
            />
            <Button size="lg" className="text-sm font-semibold gap-2 shrink-0">
              Book a Demo <ArrowRight size={16} />
            </Button>
          </div>

          {/* Contact details */}
          <div className="flex flex-col sm:flex-row justify-center gap-8 text-sm text-muted-foreground">
            <a
              href="mailto:info@stratixos.com"
              className="flex items-center gap-2 hover:text-foreground transition-colors"
            >
              <Mail size={16} className="text-primary" />
              info@stratixos.com
            </a>
            <a
              href="tel:+1234567890"
              className="flex items-center gap-2 hover:text-foreground transition-colors"
            >
              <Phone size={16} className="text-primary" />
              (123) 456-7890
            </a>
            <span className="flex items-center gap-2">
              <MapPin size={16} className="text-primary" />
              Miami, FL
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
