import { Phone, MessageSquare, CheckCircle2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const services = [
  {
    icon: Phone,
    title: "AI Inbound Receptionist",
    description: "Never miss a call again. Our AI answers every inbound call 24/7, captures lead information, and routes urgent calls — all in a natural, human-like voice.",
    features: [
      "Answers calls instantly, day or night",
      "Captures caller info & lead details",
      "Routes urgent calls to your team",
      "Speaks naturally with human-like AI voice",
    ],
  },
  {
    icon: MessageSquare,
    title: "AI Appointment Booker",
    description: "A smart chatbot on your website that engages visitors, qualifies leads, and books meetings directly into your calendar — automatically.",
    features: [
      "Engages website visitors in real-time",
      "Qualifies leads with smart questions",
      "Books directly into your calendar",
      "Reduces no-shows with reminders",
    ],
  },
];

const ServicesSection = () => (
  <section id="services" className="py-24 relative">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Meet Your AI <span className="text-gradient">Agents</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Two powerful AI solutions designed to capture every lead and book every appointment.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {services.map((s) => (
          <Card
            key={s.title}
            className="bg-card/50 border-border/50 backdrop-blur-sm hover:border-primary/40 transition-all duration-300 hover:-translate-y-1"
          >
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <s.icon className="text-primary" size={24} />
              </div>
              <CardTitle className="text-xl">{s.title}</CardTitle>
              <CardDescription className="text-muted-foreground">{s.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {s.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 size={16} className="text-primary mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;
