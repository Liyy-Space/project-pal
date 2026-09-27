import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { GraduationCap, CheckCircle2, ArrowRight, Building2 } from "lucide-react";
import SEO from "@/components/SEO";

const HERO_GRADIENT =
  "linear-gradient(135deg, hsl(224 76% 28%) 0%, hsl(176 69% 22%) 50%, hsl(142 64% 32%) 100%)";

const courseKeys = ["foundations", "dataToPublication", "clinicalDataR"] as const;

const Training = () => {
  const { t } = useTranslation();

  return (
    <div className="pt-16">
      <SEO
        title="Training & Capacity Building"
        description="Structured courses and hands-on workshops in clinical research, biostatistics and data analysis for healthcare professionals and institutions."
        path="/training"
      />

      {/* Hero */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <div className="absolute inset-0" style={{ background: HERO_GRADIENT }} />
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-4">
            <GraduationCap className="w-3 h-3 text-teal-300" />
            <span className="text-teal-300 text-xs font-semibold uppercase tracking-widest">
              {t("training.badge")}
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-3">
            {t("training.title1")} <span className="text-teal-300">{t("training.titleHighlight")}</span>
          </h1>
          <p className="text-white/70 max-w-lg text-sm md:text-base">
            {t("training.subtitle")}
          </p>
        </div>
      </div>

      {/* Courses */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <span className="text-primary text-xs font-semibold uppercase tracking-widest">
              {t("training.coursesEyebrow")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-3">
              {t("training.coursesHeading")}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm">
              {t("training.coursesSubheading")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {courseKeys.map((key, i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 p-6 flex flex-col"
              >
                <span className="inline-block w-fit text-xs font-semibold uppercase tracking-widest text-teal-600 bg-teal-50 px-3 py-1 rounded-full mb-4">
                  {t(`training.courses.${key}.level`)}
                </span>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {t(`training.courses.${key}.title`)}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">
                  {t(`training.courses.${key}.desc`)}
                </p>

                <div className="space-y-2 mb-6 flex-1">
                  {(t(`training.courses.${key}.topics`, { returnObjects: true }) as string[]).map(
                    (topic, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                        <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                        <span>{topic}</span>
                      </div>
                    )
                  )}
                </div>

                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all"
                >
                  {t("training.enquireButton")} <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* In-house training CTA */}
      <section className="py-16" style={{ background: HERO_GRADIENT }}>
        <div className="container">
          <div className="max-w-3xl mx-auto text-center text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-5">
              <Building2 className="w-3 h-3 text-teal-300" />
              <span className="text-teal-300 text-xs font-semibold uppercase tracking-widest">
                {t("training.inHouseBadge")}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("training.inHouseHeading")}
            </h2>
            <p className="text-white/70 mb-8 text-sm md:text-base leading-relaxed">
              {t("training.inHouseDesc")}
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-teal-500 text-white rounded-xl font-semibold hover:bg-teal-400 transition-all shadow-lg shadow-teal-500/30"
            >
              {t("training.inHouseButton")} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Training;
