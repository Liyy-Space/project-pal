import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import logo from "@/assets/logo.png";
import flagEn from "@/assets/flag-en.png";
import flagVn from "@/assets/flag-vn.png";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const navLinks = [
    { to: "/", label: t("nav.home") },
    { to: "/about", label: t("nav.about") },
    { to: "/services", label: t("nav.services") },
    { to: "/events", label: t("nav.events") },
    { to: "/library", label: t("nav.library") },
    { to: "/contact", label: t("nav.contact") },
  ];
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card shadow-card">
      <div className="container flex items-center justify-between h-20">
        <Link to="/" className="flex items-center" onClick={() => setOpen(false)}>
          <img src={logo} alt="Neudata logo" className="h-16 w-auto object-contain drop-shadow-md" />
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === link.to
                  ? "text-accent-foreground bg-accent"
                  : "text-muted-foreground hover:text-accent-foreground hover:bg-accent"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* Language Switcher */}
          <div className="ml-2 flex items-center gap-1 border border-border rounded-md overflow-hidden p-1">
            <button
              onClick={() => i18n.changeLanguage("en")}
              aria-label="Switch to English"
              className={`p-1 rounded transition-colors ${
                i18n.language === "en"
                  ? "bg-accent ring-2 ring-primary"
                  : "hover:bg-accent/50 opacity-60 hover:opacity-100"
              }`}
            >
              <img src={flagEn} alt="English" className="w-6 h-6 rounded-full object-cover" />
            </button>
            <button
              onClick={() => i18n.changeLanguage("vi")}
              aria-label="Chuyển sang Tiếng Việt"
              className={`p-1 rounded transition-colors ${
                i18n.language === "vi"
                  ? "bg-accent ring-2 ring-primary"
                  : "hover:bg-accent/50 opacity-60 hover:opacity-100"
              }`}
            >
              <img src={flagVn} alt="Tiếng Việt" className="w-6 h-6 rounded-full object-cover" />
            </button>
          </div>
        </div>

        {/* Mobile toggle */}
        <div className="md:hidden flex items-center gap-2">
          <div className="flex items-center gap-1 border border-border rounded-md overflow-hidden p-1">
            <button
              onClick={() => i18n.changeLanguage("en")}
              aria-label="Switch to English"
              className={`p-1 rounded transition-colors ${
                i18n.language === "en" ? "bg-accent ring-2 ring-primary" : "opacity-60"
              }`}
            >
              <img src={flagEn} alt="English" className="w-5 h-5 rounded-full object-cover" />
            </button>
            <button
              onClick={() => i18n.changeLanguage("vi")}
              aria-label="Chuyển sang Tiếng Việt"
              className={`p-1 rounded transition-colors ${
                i18n.language === "vi" ? "bg-accent ring-2 ring-primary" : "opacity-60"
              }`}
            >
              <img src={flagVn} alt="Tiếng Việt" className="w-5 h-5 rounded-full object-cover" />
            </button>
          </div>
          <button className="p-2" onClick={() => setOpen(!open)}>
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-card border-t border-border px-4 pb-4 shadow-card">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === link.to
                  ? "text-accent-foreground bg-accent"
                  : "text-muted-foreground hover:text-accent-foreground hover:bg-accent"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;