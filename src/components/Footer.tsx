import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => (
  <footer className="bg-foreground text-muted">
    <div className="container py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">N</div>
            <span className="text-lg font-bold text-background">Neudata</span>
          </div>
          <p className="text-sm opacity-70 leading-relaxed">
            Transforming businesses with data science and AI solutions.
          </p>
        </div>

        <div>
          <h3 className="text-primary font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            {[
              { to: "/", label: "Home" },
              { to: "/about", label: "About Us" },
              { to: "/services", label: "Services" },
              { to: "/projects", label: "Projects" },
              { to: "/books", label: "Books" },
            ].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="opacity-70 hover:opacity-100 transition-opacity">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-primary font-semibold mb-4">Contact Info</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2 opacity-70">
              <Mail className="w-4 h-4 shrink-0" />
              <span>info@neudata.com</span>
            </div>
            <div className="flex items-center gap-2 opacity-70">
              <Phone className="w-4 h-4 shrink-0" />
              <span>+254 703467349</span>
            </div>
            <div className="flex items-center gap-2 opacity-70">
              <MapPin className="w-4 h-4 shrink-0" />
              <span>Nairobi, Kenya</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-muted-foreground/20 pt-6 text-center text-sm opacity-60">
        <p>&copy; {new Date().getFullYear()} Neudata. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
