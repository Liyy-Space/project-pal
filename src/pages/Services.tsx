import { useState } from "react";
import servicesBanner from "@/assets/services-banner.jpg";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  BarChart3, TrendingUp, FlaskConical, Shield, PenLine, FileText,
  Database, Code2, BrainCircuit, Search, GraduationCap, ArrowRight,
  Compass, ShieldCheck, GitBranch, Pill,
} from "lucide-react";
import SEO from "@/components/SEO";

const HERO_GRADIENT = "linear-gradient(135deg, hsl(224 76% 22%) 0%, hsl(199 70% 22%) 50%, hsl(178 65% 20%) 100%)";

const serviceMeta = [
  { number: "01", key: "surveyMethodology", icon: BarChart3, textColor: "text-teal-600", borderColor: "border-teal-600" },
  { number: "02", key: "statisticalConsultancy", icon: TrendingUp, textColor: "text-blue-600", borderColor: "border-blue-600" },
  { number: "03", key: "clinicalTrialSupport", icon: FlaskConical, textColor: "text-red-600", borderColor: "border-red-600" },
  { number: "04", key: "dsmbSupport", icon: Shield, textColor: "text-orange-600", borderColor: "border-orange-600" },
  { number: "05", key: "medicalWriting", icon: PenLine, textColor: "text-amber-700", borderColor: "border-amber-700" },
  { number: "06", key: "grantsProposals", icon: FileText, textColor: "text-purple-600", borderColor: "border-purple-600" },
  { number: "07", key: "dataManagement", icon: Database, textColor: "text-cyan-600", borderColor: "border-cyan-600" },
  { number: "08", key: "statisticalProgramming", icon: Code2, textColor: "text-emerald-700", borderColor: "border-emerald-700" },
  { number: "09", key: "mathematicalModelling", icon: BrainCircuit, textColor: "text-pink-600", borderColor: "border-pink-600" },
  { number: "10", key: "researchAnalytics", icon: Search, textColor: "text-rose-600", borderColor: "border-rose-600" },
  { number: "11", key: "trainingCapacity", icon: GraduationCap, textColor: "text-indigo-600", borderColor: "border-indigo-600" },
  { number: "12", key: "pkpdModeling", icon: Pill, textColor: "text-violet-600", borderColor: "border-violet-600" },
];

const pillarMeta = [
  { key: "methodologicallyLed", icon: Compass },
  { key: "standardsAware", icon: ShieldCheck },
  { key: "reproducible", icon: GitBranch },
];

function ServiceCard({ meta }: { meta: typeof serviceMeta[0] }) {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);
  const details = t(`servicesPage.items.${meta.key}.details`, { returnObjects: true }) as string[];

  return (
    <div className={`rounded-lg border transition-all duration-200 p-6 flex flex-col group ${expanded ? "bg-white border-primary shadow-md" : "bg-teal-50 border-teal-100 hover:bg-white hover:border-primary hover:-translate-y-1 hover:shadow-lg"}`}>
      <SEO
        title="Our Services"
        description="Explore Neudata's full range of data science services: survey methodology, statistical consultancy, clinical trial support, data management, and more."
      />
      {/* Title */}
      <h3 className="text-base font-semibold text-gray-900 group-hover:text-primary transition-colors duration-200 mb-2 leading-snug">{t(`servicesPage.items.${meta.key}.title`)}</h3>

      {/* Desc */}
      <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-4">{t(`servicesPage.items.${meta.key}.desc`)}</p>

      {/* Expanded details */}
      {expanded && (
        <div className="mb-4 space-y-2">
          <ul className="space-y-1.5">
            {details.map((d) => (
              <li key={d} className={`flex items-start gap-2 text-xs text-gray-500`}>
                <span className={`font-bold mt-0.5 text-primary`}>✓</span>
                {d}
              </li>
            ))}
          </ul>
          <div className={`mt-3 p-3 rounded-lg bg-gray-50 border-l-2 border-primary`}>
            <span className={`text-xs font-bold text-primary`}>{t("servicesPage.outputsLabel")} </span>
            <span className="text-xs text-gray-500">{t(`servicesPage.items.${meta.key}.outputs`)}</span>
          </div>
        </div>
      )}

      {/* Read More */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:gap-2 transition-all"
      >
        {expanded ? t("servicesPage.showLess") : t("servicesPage.readMore")}
      </button>
    </div>
  );
}

const Services = () => {
  const { t } = useTranslation();

  return (
    <div className="pt-16">
      {/* Hero Banner */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <img
          src={servicesBanner}
          alt="Our Services"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: HERO_GRADIENT, opacity: 0.85 }} />
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-4">
            <BarChart3 className="w-3 h-3 text-teal-300" />
            <span className="text-teal-300 text-xs font-semibold uppercase tracking-widest">{t("servicesPage.badge")}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            {t("servicesPage.heroTitlePrefix")} <span className="text-teal-300">{t("servicesPage.heroTitleHighlight")}</span>
          </h1>
          <p className="text-white/70 max-w-2xl text-sm md:text-base leading-relaxed">
            {t("servicesPage.heroDescription")}
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <span className="text-primary text-xs font-semibold uppercase tracking-widest">{t("servicesPage.sectionEyebrow")}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-3">
              {t("servicesPage.sectionHeading")}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm">
              {t("servicesPage.sectionSubheading")}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceMeta.map((meta) => (
              <ServiceCard key={meta.key} meta={meta} />
            ))}
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-20 text-white relative overflow-hidden" style={{ background: HERO_GRADIENT }}>
        <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
        <div className="container relative">
          <div className="text-center mb-12">
            <span className="text-teal-300 text-xs font-semibold uppercase tracking-widest">{t("servicesPage.approachEyebrow")}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-3">{t("servicesPage.approachHeading")}</h2>
            <p className="text-white/60 max-w-xl mx-auto text-sm">{t("servicesPage.approachSubheading")}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {pillarMeta.map((p) => (
              <div key={p.key} className="bg-white/10 border border-white/20 rounded-2xl p-6 backdrop-blur-sm hover:bg-white/15 transition-all text-center">
                <div className="w-12 h-12 rounded-full bg-teal-500/30 border border-teal-400/30 flex items-center justify-center mb-4 mx-auto">
                  <p.icon className="w-5 h-5 text-teal-300" />
                </div>
                <h3 className="text-white font-bold mb-2">{t(`servicesPage.pillars.${p.key}.title`)}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{t(`servicesPage.pillars.${p.key}.desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-card">
        <div className="container text-center max-w-2xl mx-auto">
          <span className="text-primary text-xs font-semibold uppercase tracking-widest">{t("servicesPage.ctaEyebrow")}</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            {t("servicesPage.ctaHeading")}
          </h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            {t("servicesPage.ctaDesc")}
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 text-white rounded-xl font-semibold hover:opacity-90 transition-all shadow-lg"
            style={{ background: HERO_GRADIENT }}
          >
            {t("servicesPage.ctaButton")} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Services;