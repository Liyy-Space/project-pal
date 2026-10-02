import { Link } from "react-router-dom";
import { Mail, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";
import bachmaiLogo from "@/assets/clients/bachmai.png";
import stFrancisLogo from "@/assets/clients/st-francis.png";
import kinshasaLogo from "@/assets/clients/kinshasa.jpg";
import nationalGeriatricLogo from "@/assets/clients/national-geriatric-hospital.png";
import logo from "@/assets/logo.png";

const clients = [
  { name: "Bach Mai Hospital", logo: bachmaiLogo, url: "https://bachmai.gov.vn/" },
  { name: "St. Francis Hospital Nsambya", logo: stFrancisLogo, url: "https://stfrancishospitalnsambya.org/wp/" },
  { name: "University of Kinshasa", logo: kinshasaLogo, url: "https://www.unikin.ac.cd/" },
  { name: "National Geriatric Hospital", logo: nationalGeriatricLogo, url: "https://benhvienlaokhoa.vn/" },
];

const Footer = () => {
  const { t } = useTranslation();

  const quickLinks = [
    { to: "/", label: t("nav.home") },
    { to: "/about", label: t("nav.about") },
    { to: "/services", label: t("nav.services") },
    { to: "/events", label: t("nav.events") },
    { to: "/contact", label: t("nav.contact") },
  ];

  return (
    <footer className="bg-foreground text-muted">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src={logo} alt="neu-data logo" className="w-9 h-9 object-contain" />
              <span className="text-lg font-bold text-background">neu-data</span>
            </div>
            <p className="text-sm opacity-70 leading-relaxed">
              {t("footer.tagline")}
            </p>
          </div>

          <div>
            <h3 className="text-primary font-semibold mb-4">{t("footer.quickLinks")}</h3>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="opacity-70 hover:opacity-100 transition-opacity">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-primary font-semibold mb-4">{t("footer.contactInfo")}</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 opacity-70">
                <Mail className="w-4 h-4 shrink-0" />
                <span>info@neu-data.com</span>
              </div>
              <div className="flex items-center gap-2 opacity-70">
                <MapPin className="w-4 h-4 shrink-0" />
                <span>{t("footer.location")}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-muted-foreground/20 pt-6 pb-6">
          <p className="text-center text-xs uppercase tracking-widest opacity-50 mb-4">{t("home.clients.heading")}</p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            {clients.map((c) => (
              <a key={c.name} href={c.url} target="_blank" rel="noopener noreferrer" className="bg-white rounded-lg px-4 py-2 flex items-center justify-center opacity-90 hover:opacity-100 transition-opacity">
                <img src={c.logo} alt={c.name} className="h-8 w-auto object-contain" />
              </a>
            ))}
          </div>
        </div>

        <div className="border-t border-muted-foreground/20 pt-6 text-center text-sm opacity-60">
          <p>&copy; {new Date().getFullYear()} neu-data. {t("footer.rights")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
