import logo from "@/assets/stratixos-logo.png";

const Footer = () => (
  <footer className="border-t border-border/40 py-10">
    <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <img src={logo} alt="StratixOS" className="h-7 w-7" />
        <span className="font-semibold">
          Stratix<span className="text-primary">OS</span>
        </span>
      </div>
      <div className="flex gap-6 text-sm text-muted-foreground">
        <a href="#services" className="hover:text-foreground transition-colors">Services</a>
        <a href="#how-it-works" className="hover:text-foreground transition-colors">How It Works</a>
        <a href="#why-us" className="hover:text-foreground transition-colors">Why Us</a>
        <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
      </div>
      <p className="text-xs text-muted-foreground">
        © {new Date().getFullYear()} StratixOS. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
