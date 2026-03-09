import { Link } from "react-router-dom";
import logo from "@/assets/stratixos-logo.png";

const Footer = () => (
  <footer className="section-light border-t py-10" style={{ borderColor: "hsl(var(--light-border))" }}>
    <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <img src={logo} alt="StratixOS" className="h-7 w-7" />
        <span className="font-semibold" style={{ color: "hsl(var(--light-fg))" }}>
          Stratix<span className="text-[hsl(var(--primary))]">OS</span>
        </span>
      </div>
      <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm" style={{ color: "hsl(var(--light-muted))" }}>
        <a href="#popular-agents" className="hover:text-[hsl(var(--light-fg))] transition-colors">Services</a>
        <a href="#how-it-works" className="hover:text-[hsl(var(--light-fg))] transition-colors">How It Works</a>
        <a href="#results" className="hover:text-[hsl(var(--light-fg))] transition-colors">Results</a>
        <a href="#contact" className="hover:text-[hsl(var(--light-fg))] transition-colors">Contact</a>
      </div>
      <p className="text-xs" style={{ color: "hsl(var(--light-muted))" }}>
        &copy; {new Date().getFullYear()} StratixOS. All rights reserved.
      </p>
    </div>
    <div className="container mx-auto px-4 mt-4 flex justify-center gap-6 text-xs" style={{ color: "hsl(var(--light-muted))" }}>
      <Link to="/privacy-policy" className="hover:text-[hsl(var(--light-fg))] transition-colors">Privacy Policy</Link>
      <Link to="/terms" className="hover:text-[hsl(var(--light-fg))] transition-colors">Terms &amp; Conditions</Link>
    </div>
  </footer>
);

export default Footer;
