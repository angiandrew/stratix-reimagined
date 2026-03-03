import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, BookOpen, FileText, Calculator, Code2, BarChart3, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDemoModal } from "./DemoContext";
import logo from "@/assets/stratixos-logo.png";

interface NavbarProps {
  transparent?: boolean;
}

const resourceItems = [
  { icon: BookOpen, title: "Blog", desc: "Latest insights & updates", href: "/resources" },
  { icon: FileText, title: "Case Studies", desc: "Real customer results", href: "/resources" },
  { icon: Code2, title: "Documentation", desc: "Technical guides & API", href: "/resources" },
  { icon: BarChart3, title: "ROI Calculator", desc: "See your potential savings", href: "/calculator" },
];

const featuredCards = [
  { title: "ROI Calculator", desc: "Estimate how much revenue AI agents can recover for your business.", href: "/calculator" },
  { title: "Getting Started", desc: "A step-by-step guide to deploying your first AI agent.", href: "/resources" },
];

const RedesignNavbar = ({ transparent = false }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { openDemo } = useDemoModal();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setResourcesOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setResourcesOpen(false);
  }, [location.pathname]);

  const isDark = transparent && !scrolled;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isDark
          ? "bg-transparent"
          : "bg-white/95 backdrop-blur-xl border-b border-light-border shadow-sm"
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <img src={logo} alt="StratixOS" className="h-7 w-7" />
          <span className={`text-lg font-bold tracking-tight ${isDark ? "text-white" : "text-light-fg"}`}>
            Stratix<span className="text-electric">OS</span>
          </span>
        </Link>

        {/* Center links */}
        <div className="hidden lg:flex items-center gap-8">
          <Link
            to="/solutions"
            className={`text-sm font-medium transition-colors ${
              isDark ? "text-white/80 hover:text-white" : "text-light-muted hover:text-light-fg"
            }`}
          >
            Solutions
          </Link>
          <a
            href={location.pathname === "/" ? "#how-it-works" : "/#how-it-works"}
            className={`text-sm font-medium transition-colors ${
              isDark ? "text-white/80 hover:text-white" : "text-light-muted hover:text-light-fg"
            }`}
          >
            How It Works
          </a>
          <Link
            to="/pricing"
            className={`text-sm font-medium transition-colors ${
              isDark ? "text-white/80 hover:text-white" : "text-light-muted hover:text-light-fg"
            }`}
          >
            Pricing
          </Link>

          {/* Resources dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setResourcesOpen(!resourcesOpen)}
              className={`text-sm font-medium transition-colors flex items-center gap-1 ${
                isDark ? "text-white/80 hover:text-white" : "text-light-muted hover:text-light-fg"
              }`}
            >
              Resources
              <ChevronDown size={14} className={`transition-transform ${resourcesOpen ? "rotate-180" : ""}`} />
            </button>

            {resourcesOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[560px] bg-white rounded-xl border border-light-border shadow-xl p-0 animate-fade-in">
                <div className="flex">
                  {/* Left column */}
                  <div className="flex-1 p-5 space-y-1">
                    <p className="text-xs font-semibold uppercase tracking-wider text-light-muted mb-3 px-3">Resources</p>
                    {resourceItems.map((item) => (
                      <Link
                        key={item.title}
                        to={item.href}
                        onClick={() => setResourcesOpen(false)}
                        className="flex items-start gap-3 rounded-lg px-3 py-2.5 hover:bg-card-light transition-colors group"
                      >
                        <item.icon size={18} className="text-electric mt-0.5 shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-light-fg group-hover:text-electric transition-colors">{item.title}</p>
                          <p className="text-xs text-light-muted">{item.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </div>

                  {/* Right panel */}
                  <div className="w-52 bg-card-light rounded-r-xl p-5 border-l border-light-border">
                    <p className="text-xs font-semibold uppercase tracking-wider text-light-muted mb-3">Learn More</p>
                    <div className="space-y-3">
                      {featuredCards.map((card) => (
                        <Link
                          key={card.title}
                          to={card.href}
                          onClick={() => setResourcesOpen(false)}
                          className="block rounded-lg bg-white p-3 border border-light-border hover:border-electric/30 hover:shadow-sm transition-all"
                        >
                          <p className="text-sm font-semibold text-light-fg">{card.title}</p>
                          <p className="text-xs text-light-muted mt-1 leading-relaxed">{card.desc}</p>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            to="/auth"
            className={`text-sm font-medium transition-colors ${
              isDark ? "text-white/80 hover:text-white" : "text-light-muted hover:text-light-fg"
            }`}
          >
            Log In
          </Link>
          <Button
            onClick={openDemo}
            className="bg-electric hover:bg-electric/90 text-electric-foreground font-semibold rounded-full px-5 h-9 text-sm"
          >
            Book a Demo
          </Button>
        </div>

        {/* Mobile toggle */}
        <button className="lg:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? (
            <X size={24} className={isDark ? "text-white" : "text-light-fg"} />
          ) : (
            <Menu size={24} className={isDark ? "text-white" : "text-light-fg"} />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-light-border px-4 pb-5 pt-2 animate-fade-in">
          <Link to="/solutions" onClick={() => setMobileOpen(false)} className="block py-3 text-sm font-medium text-light-fg">
            Solutions
          </Link>
          <a
            href={location.pathname === "/" ? "#how-it-works" : "/#how-it-works"}
            onClick={() => setMobileOpen(false)}
            className="block py-3 text-sm font-medium text-light-fg"
          >
            How It Works
          </a>
          <Link to="/pricing" onClick={() => setMobileOpen(false)} className="block py-3 text-sm font-medium text-light-fg">
            Pricing
          </Link>
          <Link to="/resources" onClick={() => setMobileOpen(false)} className="block py-3 text-sm font-medium text-light-fg">
            Resources
          </Link>
          <Link to="/calculator" onClick={() => setMobileOpen(false)} className="block py-3 text-sm font-medium text-electric">
            ROI Calculator
          </Link>
          <hr className="my-3 border-light-border" />
          <Link to="/auth" onClick={() => setMobileOpen(false)} className="block py-3 text-sm font-medium text-light-muted">
            Log In
          </Link>
          <Button
            onClick={() => { setMobileOpen(false); openDemo(); }}
            className="w-full mt-2 bg-electric hover:bg-electric/90 text-electric-foreground font-semibold rounded-full h-10"
          >
            Book a Demo
          </Button>
        </div>
      )}
    </nav>
  );
};

export default RedesignNavbar;
