import { Link } from "react-router-dom";
import logo from "@/assets/stratixos-logo.png";

const footerLinks = {
  Product: [
    { label: "Solutions", to: "/solutions" },
    { label: "Pricing", to: "/pricing" },
    { label: "ROI Calculator", to: "/calculator" },
  ],
  Resources: [
    { label: "Blog", to: "/resources" },
    { label: "Documentation", to: "/resources" },
    { label: "Case Studies", to: "/resources" },
  ],
  Company: [
    { label: "About", to: "/resources" },
    { label: "Contact", to: "/solutions" },
    { label: "Privacy", to: "/resources" },
  ],
};

const RedesignFooter = () => (
  <footer className="section-navy border-t border-white/5 py-16">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-4 gap-10 mb-12">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <img src={logo} alt="StratixOS" className="h-7 w-7" />
            <span className="text-lg font-bold text-white">
              Stratix<span className="text-electric">OS</span>
            </span>
          </div>
          <p className="text-sm text-white/40 leading-relaxed">
            The operating system for modern business. AI-powered automation that grows with you.
          </p>
        </div>

        {/* Link columns */}
        {Object.entries(footerLinks).map(([heading, links]) => (
          <div key={heading}>
            <p className="text-xs font-semibold uppercase tracking-wider text-white/30 mb-4">{heading}</p>
            <ul className="space-y-2.5">
              {links.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className="text-sm text-white/50 hover:text-white transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-white/30">
          © {new Date().getFullYear()} StratixOS. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          <a href="#" className="text-xs text-white/30 hover:text-white/60 transition-colors">Terms</a>
          <a href="#" className="text-xs text-white/30 hover:text-white/60 transition-colors">Privacy</a>
        </div>
      </div>
    </div>
  </footer>
);

export default RedesignFooter;
