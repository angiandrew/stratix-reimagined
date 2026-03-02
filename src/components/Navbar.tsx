import { useState } from "react";
import { Menu, X, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import logo from "@/assets/stratixos-logo.png";

const links = [
  { label: "Services", href: "#popular-agents" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Results", href: "#results" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/70 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <a href="#" className="flex items-center gap-2.5">
          <img src={logo} alt="StratixOS" className="h-8 w-8" />
          <span className="text-lg font-bold tracking-tight text-foreground">
            Stratix<span className="text-gradient">OS</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {l.label}
            </a>
          ))}
          <Button size="sm" variant="ghost" asChild>
            <a href={user ? "/dashboard" : "/auth"}>Log In</a>
          </Button>
          <Button size="sm" asChild>
            <a href={user ? "/dashboard" : "/auth"}>
              {user ? "Dashboard" : "Sign Up"}
            </a>
          </Button>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl px-4 pb-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {l.label}
            </a>
          ))}
          <Button size="sm" variant="ghost" className="mt-2 w-full" asChild>
            <a href={user ? "/dashboard" : "/auth"} onClick={() => setOpen(false)}>Log In</a>
          </Button>
          <Button size="sm" className="mt-1 w-full" asChild>
            <a href={user ? "/dashboard" : "/auth"} onClick={() => setOpen(false)}>
              {user ? "Dashboard" : "Sign Up"}
            </a>
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
