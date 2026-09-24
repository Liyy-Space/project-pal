import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight, BarChart3, TrendingUp, FlaskConical, Shield, PenLine, FileText, Database, Code2, BrainCircuit, Search, GraduationCap, MessageCircle, BookOpen, Star, Calendar, Clock, MapPin, Users } from "lucide-react";
import heroImage from "@/assets/hero-data.jpg";
import posterImage from "@/assets/Poster.png";
import bachmaiLogo from "@/assets/clients/bachmai.png";
import stFrancisLogo from "@/assets/clients/st-francis.png";
import SEO from "@/components/SEO";
const HERO_GRADIENT = "linear-gradient(135deg, hsl(224 76% 28%) 0%, hsl(176 69% 22%) 50%, hsl(142 64% 32%) 100%)";

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
];

const featuredBooks = [
  { title: "R for Data Science (2nd ed.)", author: "Hadley Wickham et al.", rating: 4.9, isbn: "9781492097402", freeLink: "https://r4ds.hadley.nz" },
  { title: "An Introduction to Statistical Learning", author: "Gareth James et al.", rating: 4.9, isbn: "9781461471370", freeLink: "https://www.statlearning.com" },
  { title: "Designing Data-Intensive Applications", author: "Martin Kleppmann", rating: 4.9, isbn: "9781449373320", buyLink: "https://www.amazon.com/dp/1449373321" },
  { title: "Statistical Rethinking (2nd ed.)", author: "Richard McElreath", rating: 4.9, isbn: "9780367139919", freeLink: "https://xcelab.net/rm/statistical-rethinking" },
];

const clients = [
  { name: "Bach Mai Hospital", logo: bachmaiLogo, url: "https://bachmai.gov.vn/" },
  { name: "St. Francis Hospital Nsambya", logo: stFrancisLogo, url: "https://stfrancishospitalnsambya.org/wp/" },
];

const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="pt-16">
      <SEO
        title="Biostatistics & Data Science Consultancy in Kenya"
        description="Expert biostatistics, clinical trial support and data science consulting for research institutions and healthcare organisations across Africa and Asia."
      />
      {/* Hero */}
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
      <section className="py-14 bg-gray-50 border-y border-gray-100">
        <div className="container">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-8">
            {t("home.clients.heading")}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
            {clients.map((c) => (
              <a key={c.name} href={c.url} target="_blank" rel="noopener noreferrer" className="bg-white rounded-2xl shadow-sm border border-gray-100 px-8 py-6 flex items-center justify-center hover:shadow-md transition-all duration-300">
                <img src={c.logo} alt={c.name} className="h-14 md:h-16 w-auto object-contain" />
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

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
            {serviceIcons.map((s, i) => (
              <motion.div
                key={s.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 p-6 group"
              >
                <div className="w-12 h-12 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <s.icon className={`w-5 h-5 ${s.color}`} />
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-2">{t(`home.services.items.${s.key}.title`)}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{t(`home.services.items.${s.key}.desc`)}</p>
                <Link to="/services" className={`inline-flex items-center gap-1 text-sm font-semibold ${s.color} hover:gap-2 transition-all`}>
                  {t("home.services.readMore")}
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

      {/* Books Section */}
      <section className="py-16 overflow-hidden relative" style={{ background: HERO_GRADIENT }}>
        <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-4">
                <BookOpen className="w-3 h-3 text-teal-300" />
                <span className="text-teal-300 text-xs font-semibold uppercase tracking-widest">{t("home.books.eyebrow")}</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
                {t("home.books.heading1")} <br />
                <span className="text-teal-300">{t("home.books.heading2")}</span>
              </h2>
              <p className="text-white/70 mb-8 text-base leading-relaxed max-w-lg">
                {t("home.books.subheading")}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/library" className="inline-flex items-center gap-2 px-6 py-3 bg-teal-500 text-white rounded-xl font-semibold hover:bg-teal-400 transition-all shadow-lg shadow-teal-500/30">
                  {t("home.books.browse")} <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/30 text-white rounded-xl font-semibold hover:bg-white/20 transition-all">
                  {t("home.books.suggest")}
                </Link>
              </div>
              <div className="flex gap-8 mt-10">
                {[
                  { num: "37", label: t("home.books.stats.curated") },
                  { num: "11", label: t("home.books.stats.categories") },
                  { num: "20+", label: t("home.books.stats.freeOnline") },
                ].map((s) => (
                  <div key={s.label}>
                    <p className="text-2xl font-bold text-teal-300">{s.num}</p>
                    <p className="text-xs text-white/50 mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }} className="grid grid-cols-2 gap-4">
              {featuredBooks.map((book, i) => (
                <motion.div key={book.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="group relative rounded-2xl overflow-hidden shadow-xl cursor-pointer hover:scale-105 transition-all duration-300">
                  <div className="relative h-48 bg-gradient-to-br from-teal-900 to-teal-700">
                    <img src={`https://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg`} alt={book.title}
                      loading="lazy"
                      className="w-full h-full object-cover opacity-50 group-hover:opacity-30 transition-opacity duration-300"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <p className="text-white font-bold text-xs leading-snug line-clamp-2">{book.title}</p>
                      <p className="text-teal-300 text-xs mt-0.5">{book.author}</p>
                      <div className="flex items-center gap-1 mt-1">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} className={`w-2.5 h-2.5 ${s <= Math.round(book.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-500"}`} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="bg-black/40 backdrop-blur-sm px-3 py-2">
                    {book.freeLink ? (
                      <a href={book.freeLink} target="_blank" rel="noopener noreferrer" className="text-xs text-teal-300 hover:text-teal-200 font-medium">{t("home.books.readFree")}</a>
                    ) : (
                      <a href={(book as any).buyLink} target="_blank" rel="noopener noreferrer" className="text-xs text-white/70 hover:text-white font-medium">{t("home.books.buyNow")}</a>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
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
