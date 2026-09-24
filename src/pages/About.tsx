import aboutBanner from "@/assets/about-banner.jpg";
import { Users, CheckCircle, Zap, UserPlus, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SEO from "@/components/SEO";

const HERO_GRADIENT = "linear-gradient(135deg, hsl(224 76% 28%) 0%, hsl(176 69% 22%) 50%, hsl(142 64% 32%) 100%)";

const valueIcons = [CheckCircle, Zap, UserPlus, Lightbulb];
const valueKeys = ["excellence", "innovation", "partnership", "learning"];

const statKeys = [
  { number: "40+", key: "projects" },
  { number: "20+", key: "clients" },
  { number: "10", key: "team" },
  { number: "2+", key: "years" },
];

const About = () => {
  const { t } = useTranslation();

  return (
    <div className="pt-16">
      <SEO
        title="About Us"
        description="Learn about Neudata's mission, team, and expertise in biostatistics, data science consulting, and clinical trial support across Africa and Asia."
      />

      {/* Hero Banner */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <img
          src={aboutBanner}
          alt="About Neudata"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: HERO_GRADIENT, opacity: 0.85 }} />
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-4">
            <Users className="w-3 h-3 text-teal-300" />
            <span className="text-teal-300 text-xs font-semibold uppercase tracking-widest">{t("about.badge")}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            {t("about.heroTitlePrefix")} <span className="text-teal-300">Neudata</span>
          </h1>
          <p className="text-white/70 max-w-2xl text-sm md:text-base leading-relaxed">
            {t("about.heroDescription")}
          </p>
        </div>
      </div>

      {/* Mission */}
      <section className="py-20 bg-card">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">{t("about.missionTitle")}</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                {t("about.missionP1")}
              </p>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                {t("about.missionP2")}
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {valueKeys.map((key, i) => {
                  const Icon = valueIcons[i];
                  return (
                    <div key={key} className="flex items-center gap-3">
                      <Icon className="w-5 h-5 text-primary shrink-0" />
                      <span className="font-semibold text-sm text-foreground">{t(`about.values.${key}`)}</span>
                    </div>
                  );
                })}
              </div>
              <Link
                to="/contact"
                className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                {t("about.getInTouch")}
              </Link>
            </div>
            <img
              src={aboutBanner}
              alt="Data Science Team" loading="lazy"
              className="rounded-lg shadow-card w-full object-cover h-80"
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="gradient-stats py-20 text-primary-foreground">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {statKeys.map((s, i) => (
              <motion.div
                key={s.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6"
              >
                <div className="text-4xl md:text-5xl font-bold text-teal-300 mb-2">{s.number}</div>
                <div className="text-sm opacity-70">{t(`about.stats.${s.key}`)}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;