import { Users, CheckCircle, Zap, UserPlus, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PageHero from "@/components/PageHero";

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
    <PageHero icon={Users} title="About Neudata" description="We are a team of passionate data scientists, engineers, and consultants dedicated to helping businesses unlock the full potential of their data." />

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
            {/* CTA Button */}
            <Link
              to="/contact"
              className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Get In Touch
            </Link>
          </div>
          <img src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Data Science Team" className="rounded-lg shadow-card w-full" />
        </div>
      </div>
    </section>

    {/* Stats */}
    <section className="gradient-stats py-20 text-primary-foreground">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-6">
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