import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown, Wrench, Home, Heart, TrendingUp, Building2, Flag, Calculator } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import logo from "@/assets/stratixos-logo.png";

const INDUSTRIES = [
  { icon: Wrench,    label: "Home Services",        sub: "AI that answers calls and books services",    slug: "home-services" },
  { icon: TrendingUp,label: "Financial Services",   sub: "Never lose a high-value lead again",          slug: "financial-services" },
  { icon: Building2, label: "Hospitality",          sub: "Automate guest comms and bookings 24/7",      slug: "hospitality" },
  { icon: Flag,      label: "Golf Courses",         sub: "Fill tee sheets and automate member comms",   slug: "golf-courses" },
  { icon: Heart,     label: "Healthcare & Med Spas",sub: "Automate bookings and patient follow-ups",    slug: "healthcare" },
  { icon: Home,      label: "Real Estate",          sub: "From first inquiry to signed lease",          slug: "real-estate" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { user } = useAuth();

  const openDrop = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setDropOpen(true);
  };
  const closeDrop = () => {
    closeTimer.current = setTimeout(() => setDropOpen(false), 120);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="relative flex h-16 items-center px-6 md:px-10">

          {/* Logo — left */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 z-10">
            <img src={logo} alt="StratixOS" className="h-8 w-8" />
            <span className="text-lg font-bold tracking-tight text-foreground">
              Stratix<span className="text-gradient">OS</span>
            </span>
          </Link>

          {/* Center nav links — absolutely centered */}
          <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-8">
            {/* Industries dropdown trigger */}
            <div onMouseEnter={openDrop} onMouseLeave={closeDrop}>
              <button
                className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Industries
                <ChevronDown
                  size={13}
                  className={`transition-transform duration-200 ${dropOpen ? "rotate-180" : ""}`}
                />
              </button>
            </div>

            <Link to="/book-demo" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Book a Demo
            </Link>
          </div>

          {/* Auth — right */}
          <div className="hidden md:flex items-center gap-3 ml-auto z-10">
            {user ? (
              <Link
                to="/dashboard"
                className="inline-flex items-center rounded-lg px-4 py-2 text-sm font-semibold text-white transition-colors"
                style={{ backgroundColor: "#6366f1" }}
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/auth"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-2"
                >
                  Log In
                </Link>
                <Link
                  to="/auth"
                  className="inline-flex items-center rounded-lg px-4 py-2 text-sm font-semibold text-white transition-colors"
                  style={{ backgroundColor: "#0f172a" }}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button className="md:hidden ml-auto text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Full-width dropdown panel */}
      {dropOpen && (
        <div
          className="fixed left-0 right-0 z-40 bg-white border-b border-gray-200 shadow-xl"
          style={{ top: 64 }}
          onMouseEnter={openDrop}
          onMouseLeave={closeDrop}
        >
          <div className="mx-auto max-w-6xl px-10 py-10 flex gap-16">

            {/* Left: Industries */}
            <div className="flex-1">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-6">
                StratixOS by Industry
              </p>
              <div className="grid grid-cols-2 gap-x-10 gap-y-6">
                {INDUSTRIES.map(({ icon: Icon, label, sub, slug }) => (
                  <Link
                    key={slug}
                    to={`/industries/${slug}`}
                    onClick={() => setDropOpen(false)}
                    className="flex items-start gap-3 group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center shrink-0 group-hover:bg-gray-200 transition-colors mt-0.5">
                      <Icon size={15} className="text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 leading-tight group-hover:text-black">{label}</p>
                      <p className="text-xs text-gray-500 mt-0.5 leading-snug">{sub}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="w-px bg-gray-100 shrink-0 self-stretch" />

            {/* Right: Learn More — two cards side by side */}
            <div className="shrink-0">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-6">
                Learn More
              </p>
              <div className="flex gap-4">
                {/* Book a Demo card */}
                <Link to="/book-demo" onClick={() => setDropOpen(false)} className="group w-44">
                  <div className="h-24 rounded-xl border border-gray-100 bg-gray-50 mb-3 flex items-end justify-center px-3 pb-3 gap-1 overflow-hidden">
                    {[30, 50, 38, 62, 80, 55, 72].map((h, i) => (
                      <div
                        key={i}
                        style={{ height: h * 0.55, width: 9, borderRadius: 3, backgroundColor: i === 4 ? "#0f172a" : "#d1d5db" }}
                      />
                    ))}
                  </div>
                  <p className="text-sm font-semibold text-gray-900 group-hover:text-black">Book a Demo</p>
                  <p className="text-xs text-gray-500 mt-0.5">See StratixOS in action</p>
                </Link>

                {/* ROI Calculator card */}
                <Link to="/roi-calculator" onClick={() => setDropOpen(false)} className="group w-44">
                  <div className="h-24 rounded-xl border border-gray-100 bg-gray-50 mb-3 flex items-center justify-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm">
                      <Calculator size={15} className="text-gray-500" />
                    </div>
                    <span className="text-gray-300 text-lg font-light">+</span>
                    <div className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm">
                      <TrendingUp size={15} className="text-gray-500" />
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-gray-900 group-hover:text-black">ROI Calculator</p>
                  <p className="text-xs text-gray-500 mt-0.5">Calculate your impact</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden fixed top-16 left-0 right-0 z-40 border-t border-border bg-background/95 backdrop-blur-xl px-5 pb-6">
          <div className="pt-4 space-y-1">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 px-1 pb-2">Industries</p>
            {INDUSTRIES.map(({ label, slug }) => (
              <Link
                key={slug}
                to={`/industries/${slug}`}
                onClick={() => setMobileOpen(false)}
                className="block px-1 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {label}
              </Link>
            ))}
            <div className="h-px bg-border my-3" />
            <Link to="/pricing" onClick={() => setMobileOpen(false)} className="block px-1 py-2 text-sm text-muted-foreground hover:text-foreground">Pricing</Link>
            <Link to="/roi-calculator" onClick={() => setMobileOpen(false)} className="block px-1 py-2 text-sm text-muted-foreground hover:text-foreground">ROI Calculator</Link>
            <div className="h-px bg-border my-3" />
            {user ? (
              <Link to="/dashboard" onClick={() => setMobileOpen(false)} className="block px-1 py-2 text-sm text-muted-foreground hover:text-foreground">Dashboard</Link>
            ) : (
              <Link to="/auth" onClick={() => setMobileOpen(false)} className="block px-1 py-2 text-sm text-muted-foreground hover:text-foreground">Log In</Link>
            )}
          </div>
          <Link
            to="/book-demo"
            onClick={() => setMobileOpen(false)}
            className="mt-4 block text-center rounded-lg px-4 py-2.5 text-sm font-semibold text-white"
            style={{ backgroundColor: "#0f172a" }}
          >
            Book a Demo
          </Link>
        </div>
      )}
    </>
  );
};

export default Navbar;
