import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";

const ContactSection = () => (
  <section id="contact" className="py-24 relative">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to <span className="text-gradient">Get Started?</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Let's set up your AI agents and start capturing leads today.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            window.location.href = "mailto:info@stratixos.com";
          }}
        >
          <Input placeholder="Your Name" className="bg-card/50 border-border/50" />
          <Input type="email" placeholder="Your Email" className="bg-card/50 border-border/50" />
          <Textarea placeholder="Tell us about your business..." rows={5} className="bg-card/50 border-border/50" />
          <Button type="submit" size="lg" className="w-full text-base">
            Send Message
          </Button>
        </form>
        <div className="flex flex-col justify-center space-y-6">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <Mail className="text-primary" size={20} />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Email</div>
              <a href="mailto:info@stratixos.com" className="text-foreground hover:text-primary transition-colors">
                info@stratixos.com
              </a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <Phone className="text-primary" size={20} />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Phone</div>
              <a href="tel:+1234567890" className="text-foreground hover:text-primary transition-colors">
                (123) 456-7890
              </a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <MapPin className="text-primary" size={20} />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Location</div>
              <span className="text-foreground">Miami, FL</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default ContactSection;
