import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { ArrowRight, BarChart3, TrendingUp, FlaskConical, Shield, PenLine, FileText, Database, Code2, BrainCircuit, Search, GraduationCap, MessageCircle, Calendar, Clock, MapPin, Users } from "lucide-react";
import heroImage from "@/assets/hero-data.jpg";
import posterImage from "@/assets/Poster.png";
import bachmaiLogo from "@/assets/clients/bachmai.png";
import stFrancisLogo from "@/assets/clients/st-francis.png";
import kinshasaLogo from "@/assets/clients/kinshasa.jpg";
import nationalGeriatricLogo from "@/assets/clients/national-geriatric-hospital.png";
import SEO from "@/components/SEO";
const HERO_GRADIENT = "linear-gradient(135deg, hsl(224 76% 22%) 0%, hsl(199 70% 22%) 50%, hsl(178 65% 20%) 100%)";

const serviceIcons = [
  { key: "surveyMethodology", icon: BarChart3, color: "text-teal-500" },
  { key: "statisticalConsultancy", icon: TrendingUp, color: "text-blue-500" },
  { key: "clinicalTrialSupport", icon: FlaskConical, color: "text-red-500" },
  { key: "dsmbSupport", icon: Shield, color: "text-orange-500" },
  { key: "scientificWriting", icon: PenLine, color: "text-yellow-600" },
  { key: "grantsProposals", icon: FileText, color: "text-purple-500" },
  { key: "dataManagement", icon: Database, color: "text-cyan-500" },
  { key: "statisticalProgramming", icon: Code2, color: "text-green-500" },
  { key: "mathematicalModelling", icon: BrainCircuit, color: "text-pink-500" },
  { key: "researchAnalytics", icon: Search, color: "text-rose-500" },
  { key: "trainingCapacity", icon: GraduationCap, color: "text-indigo-500" },
  { key: "pkpdModeling", icon: FlaskConical, color: "text-emerald-500" },
];

const homeIconNames: Record<string, string> = {
  surveyMethodology: "bar_chart",
  statisticalConsultancy: "trending_up",
  clinicalTrialSupport: "stethoscope",
  dsmbSupport: "shield",
  scientificWriting: "edit_note",
  grantsProposals: "description",
  dataManagement: "database",
  statisticalProgramming: "code",
  mathematicalModelling: "hub",
  researchAnalytics: "query_stats",
  trainingCapacity: "school",
  pkpdModeling: "medication",
};

const featuredKeys = [
  "statisticalConsultancy",
  "clinicalTrialSupport",
  "pkpdModeling",
  "surveyMethodology",
  "dsmbSupport",
  "dataManagement",
];
const featuredServices = featuredKeys
  .map((k) => serviceIcons.find((x) => x.key === k))
  .filter((x): x is (typeof serviceIcons)[number] => Boolean(x));

const clients = [
  { name: "Bach Mai Hospital", logo: bachmaiLogo, url: "https://bachmai.gov.vn/" },
  { name: "St. Francis Hospital Nsambya", logo: stFrancisLogo, url: "https://stfrancishospitalnsambya.org/wp/" },
  { name: "University of Kinshasa", logo: kinshasaLogo, url: "https://www.unikin.ac.cd/" },
  { name: "National Geriatric Hospital", logo: nationalGeriatricLogo, url: "https://benhvienlaokhoa.vn/" },
];

const Home = () => {
  const { t } = useTranslation();

  return (
    
    <div className="pt-16">
      <Helmet>
        <title>Neudata | Biostatistics & Data Science Consultancy</title>
        <meta name="description" content="Expert biostatistics, clinical trial support and data science consulting for research institutions and healthcare organisations across Africa and Asia." />
      </Helmet>

      {/* Hero */}
      <SEO
        title="Neudata: Biostatistics & Data Science Consultancy"
        description="Neudata provides biostatistics, clinical trial support, PK/PD modelling, data science consulting and training for research and healthcare organisations."
      />
      <section className="gradient-hero text-primary-foreground relative overflow-hidden min-h-[75vh] flex items-center">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="container relative z-10 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
                {t("home.hero.title1")}{" "}
                <span className="text-teal-300">{t("home.hero.titleHighlight")}</span>
              </h1>
              <p className="text-lg opacity-80 mb-8 leading-relaxed max-w-xl">
                {t("home.hero.subtitle")}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/services" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:-translate-y-0.5 transition-all">
                  {t("home.hero.exploreServices")} <ArrowRight className="w-5 h-5" />
                </Link>
                <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary-foreground/50 text-primary-foreground rounded-lg font-semibold hover:bg-primary-foreground/10 transition-all">
                  {t("home.hero.getStarted")} <MessageCircle className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-xl rotate-3" />
              <img src={heroImage} alt="Data Analytics Dashboard" className="relative rounded-xl shadow-hero-img w-full hover:scale-[1.02] transition-transform duration-300" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Clients Section */}
      <section className="py-14 bg-gray-50 border-y border-gray-100 overflow-hidden">
        <div className="container">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-8">
            {t("home.clients.heading")}
          </p>
        </div>
        <div className="relative w-full overflow-hidden group">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-32 z-10 bg-gradient-to-r from-gray-50 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-32 z-10 bg-gradient-to-l from-gray-50 to-transparent" />
          <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] gap-6 md:gap-8">
            {[...clients, ...clients, ...clients, ...clients, ...clients, ...clients].map((c, i) => (
              <a key={`${c.name}-${i}`} href={c.url} target="_blank" rel="noopener noreferrer" className="bg-white rounded-2xl shadow-sm border border-gray-100 px-8 py-6 flex items-center justify-center hover:shadow-md transition-all duration-300 shrink-0">
                <div className="w-28 h-14 md:w-32 md:h-16 flex items-center justify-center">
                  <img src={c.logo} alt={c.name} className="max-h-full max-w-full object-contain" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Event Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-8">
            <span className="text-primary text-xs font-semibold uppercase tracking-widest">{t("home.event.eyebrow")}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-3">{t("home.event.heading")}</h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm">{t("home.event.subheading")}</p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-2xl max-w-5xl mx-auto"
          >
            {/* Left — Poster */}
            <div className="relative bg-gray-50 flex items-center justify-center p-4 lg:p-6">
              <img
                loading="lazy"
                src={posterImage}
                alt="Clinical Data Analysis in R"
                className="w-full h-auto max-h-[580px] object-contain rounded-xl shadow-md"
              />
            </div>

            {/* Right — Event Details */}
            <div className="p-8 md:p-10 flex flex-col justify-between" style={{ background: HERO_GRADIENT }}>
              <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none rounded-r-3xl" />
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-3 py-1 mb-5">
                  <span className="w-2 h-2 rounded-full bg-teal-300 animate-pulse" />
                  <span className="text-teal-300 text-xs font-semibold uppercase tracking-widest">{t("home.event.badge")}</span>
                </div>

                <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-2 leading-tight">
                  {t("home.event.courseTitle")}
                </h3>
                <p className="text-teal-300 font-semibold text-sm mb-5">{t("home.event.coursePhase")}</p>

                <p className="text-white/70 text-sm leading-relaxed mb-6">
                  {t("home.event.courseDesc")}
                </p>

                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      <Calendar className="w-4 h-4 text-teal-300" />
                    </div>
                    <div>
                      <p className="text-white text-sm font-semibold">{t("home.event.scheduleTitle")}</p>
                      <p className="text-white/50 text-xs">{t("home.event.scheduleDates")}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      <Clock className="w-4 h-4 text-teal-300" />
                    </div>
                    <div>
                      <p className="text-white text-sm font-semibold">{t("home.event.timeTitle")}</p>
                      <p className="text-white/50 text-xs">{t("home.event.timeDesc")}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      <Users className="w-4 h-4 text-teal-300" />
                    </div>
                    <div>
                      <p className="text-white text-sm font-semibold">{t("home.event.audienceTitle")}</p>
                      <p className="text-white/50 text-xs">{t("home.event.audienceDesc")}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4 text-teal-300" />
                    </div>
                    <div>
                      <p className="text-white text-sm font-semibold">{t("home.event.contactTitle")}</p>
                      <p className="text-white/50 text-xs">myluong1710@gmail.com</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <a href="https://docs.google.com/forms/d/e/1FAIpQLSdMV8oprpeixxbDHSQMF4I3Jr94zs-s0v-eZeL7dF4gGQkoRA/viewform?usp=dialog" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-teal-500 text-white rounded-xl font-semibold hover:bg-teal-400 transition-all shadow-lg shadow-teal-500/30 text-sm">
                    {t("home.event.registerNow")} <ArrowRight className="w-4 h-4" />
                  </a>
                  <a href="https://www.neu-data.com" className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/30 text-white rounded-xl font-semibold hover:bg-white/20 transition-all text-sm">
                    {t("home.event.learnMore")}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <span className="text-primary text-xs font-semibold uppercase tracking-widest">{t("home.services.eyebrow")}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-3">
              {t("home.services.heading")}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm">
              {t("home.services.subheading")}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-slate-200 mb-8">
            {featuredServices.map((s, i) => (
              <motion.div
                key={s.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link to="/services" className="group flex gap-5 h-full border-r border-b border-slate-200 bg-white text-slate-900 p-6 md:p-7 transition-colors duration-200 hover:bg-teal-800 hover:text-white">
                  <span
                    className="material-symbols-outlined shrink-0 mt-1 select-none text-teal-700 group-hover:text-white transition-colors duration-200"
                    style={{ fontSize: 40, lineHeight: 1, fontVariationSettings: "'wght' 200" }}
                    aria-hidden="true"
                  >
                    {homeIconNames[s.key] ?? "circle"}
                  </span>
                  <div className="w-px self-stretch bg-current opacity-20" />
                  <div className="flex-1 min-w-0 flex flex-col">
                    <h3 className="text-base font-semibold mb-1.5 leading-snug">{t(`home.services.items.${s.key}.title`)}</h3>
                    <p className="text-sm leading-relaxed opacity-80 mb-4">{t(`home.services.items.${s.key}.desc`)}</p>
                    <span className="mt-auto self-start inline-flex items-center gap-1.5 text-sm font-medium border-b pb-0.5 text-teal-700 border-teal-700 group-hover:text-white group-hover:border-white">
                      {t("servicesPage.exploreService", { defaultValue: "Explore service" })}
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-8 py-4 text-white rounded-xl font-semibold hover:opacity-90 transition-all shadow-lg text-base"
              style={{ background: HERO_GRADIENT }}
            >
              {t("home.services.viewAll")} <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="gradient-cta py-16">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <img src="https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Team Collaboration" className="rounded-lg shadow-card w-full" loading="lazy" />
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-primary-foreground">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">{t("home.cta.heading")}</h2>
              <p className="text-lg opacity-80 mb-8 leading-relaxed">
                {t("home.cta.subheading")}
              </p>
              <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-card text-green-700 rounded-lg font-semibold hover:-translate-y-0.5 transition-all">
                {t("home.cta.button")} <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
