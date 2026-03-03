import { createContext, useContext, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface DemoContextType {
  openDemo: () => void;
}

const DemoCtx = createContext<DemoContextType>({ openDemo: () => {} });
export const useDemoModal = () => useContext(DemoCtx);

export const DemoProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      toast({ title: "Please enter a valid email", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      await supabase.functions.invoke("send-demo-request", {
        body: { email: trimmed, name: name.trim(), source: "demo-modal" },
      });
      toast({ title: "Thanks! We'll be in touch shortly." });
      setEmail("");
      setName("");
      setOpen(false);
    } catch {
      toast({ title: "Something went wrong. Please try again.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <DemoCtx.Provider value={{ openDemo: () => setOpen(true) }}>
      {children}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md bg-white border-light-border">
          <DialogHeader>
            <DialogTitle className="text-light-fg text-xl font-bold">Book a Demo</DialogTitle>
            <DialogDescription className="text-light-muted">
              Enter your details and we'll schedule a personalized walkthrough.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3 mt-2">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="rounded-lg border border-light-border bg-light-bg px-4 py-3 text-sm text-light-fg placeholder:text-light-muted focus:outline-none focus:ring-2 focus:ring-electric/40"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="rounded-lg border border-light-border bg-light-bg px-4 py-3 text-sm text-light-fg placeholder:text-light-muted focus:outline-none focus:ring-2 focus:ring-electric/40"
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            />
            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-electric hover:bg-electric/90 text-electric-foreground font-semibold h-11 rounded-lg"
            >
              {loading ? <Loader2 className="animate-spin" size={16} /> : "Request Demo"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </DemoCtx.Provider>
  );
};
