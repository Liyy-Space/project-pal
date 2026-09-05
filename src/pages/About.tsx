import aboutBanner from "@/assets/about-banner.jpg";
import { Users, CheckCircle, Zap, UserPlus, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const HERO_GRADIENT = "linear-gradient(135deg, hsl(224 76% 28%) 0%, hsl(176 69% 22%) 50%, hsl(142 64% 32%) 100%)";

const values = [
  { icon: CheckCircle, label: "Excellence in Delivery" },
  { icon: Zap, label: "Innovation First" },
  { icon: UserPlus, label: "Client Partnership" },
  { icon: Lightbulb, label: "Continuous Learning" },
];

const stats = [
  { number: "10+", label: "Projects Completed" },
  { number: "10+", label: "Happy Clients" },
  { number: "3", label: "Team Members" },
  { number: "2+", label: "Years Experience" },
];

const About = () => (
  <div className="pt-16">

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
          <span className="text-teal-300 text-xs font-semibold uppercase tracking-widest">Who We Are</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          About <span className="text-teal-300">Neudata</span>
        </h1>
        <p className="text-white/70 max-w-2xl text-sm md:text-base leading-relaxed">
          We are a team of passionate data scientists, engineers, and consultants dedicated to helping businesses unlock the full potential of their data.
        </p>
      </div>
    </div>

    {/* Mission */}
    <section className="py-20 bg-card">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-6">Our Mission</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              At Neudata, we believe that data is the key to unlocking business success in the digital age. Our mission is to democratize data science by making advanced analytics accessible to organizations of all sizes.
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              We combine cutting-edge technology with deep industry expertise to deliver solutions that not only solve today's challenges but also prepare our clients for tomorrow's opportunities.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {values.map((v) => (
                <div key={v.label} className="flex items-center gap-3">
                  <v.icon className="w-5 h-5 text-primary shrink-0" />
                  <span className="font-semibold text-sm text-foreground">{v.label}</span>
                </div>
              ))}
            </div>
            <Link
              to="/contact"
              className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Get In Touch
            </Link>
          </div>
          <img
            src={aboutBanner}
            alt="Data Science Team"
            className="rounded-lg shadow-card w-full object-cover h-80"
          />
        </div>
      </div>
    </section>

    {/* Stats */}
    <section className="gradient-stats py-20 text-primary-foreground">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6"
            >
              <div className="text-4xl md:text-5xl font-bold text-teal-300 mb-2">{s.number}</div>
              <div className="text-sm opacity-70">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

  </div>
);

export default About;