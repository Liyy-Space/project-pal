import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, BarChart3, Lightbulb, Server, MessageCircle } from "lucide-react";
import heroImage from "@/assets/hero-data.jpg";
import AnimatedCard from "@/components/AnimatedCard";

const services = [
  { icon: BarChart3, title: "Data Analytics", desc: "Transform raw data into actionable insights with advanced statistical analysis and visualization techniques." },
  { icon: Lightbulb, title: "Machine Learning", desc: "Build predictive models and AI solutions that automate decision-making and improve business outcomes." },
  { icon: Server, title: "Data Engineering", desc: "Design and implement robust data pipelines and infrastructure for scalable data processing." },
];

const Home = () => (
  <div className="pt-16">
    {/* Hero */}
    <section className="gradient-hero text-primary-foreground relative overflow-hidden min-h-[90vh] flex items-center">
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="container relative z-10 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              Transform Your Business with{" "}
              <span className="text-teal-300">Data Science</span>
            </h1>
            <p className="text-lg opacity-80 mb-8 leading-relaxed max-w-xl">
              Unlock the power of your data with our expert consulting services. We help businesses make data-driven decisions, optimize operations, and drive growth through advanced analytics and machine learning solutions.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/services"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:-translate-y-0.5 transition-all"
              >
                Explore Services <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary-foreground/50 text-primary-foreground rounded-lg font-semibold hover:bg-primary-foreground/10 transition-all"
              >
                Get Started <MessageCircle className="w-5 h-5" />
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

    {/* Services Overview */}
    <section className="py-20 bg-card">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Core Services</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We provide comprehensive data science solutions tailored to your business needs
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <AnimatedCard key={s.title} delay={i * 0.1} className="p-6">
              <s.icon className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-3">{s.title}</h3>
              <p className="text-muted-foreground">{s.desc}</p>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="gradient-cta py-20">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <img src="https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Team Collaboration" className="rounded-lg shadow-card w-full" />
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-primary-foreground">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Data?</h2>
            <p className="text-lg opacity-80 mb-8 leading-relaxed">
              Join hundreds of companies that have already revolutionized their business with our data science expertise. Let's discuss how we can help you achieve your goals.
            </p>
            <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-card text-green-700 rounded-lg font-semibold hover:-translate-y-0.5 transition-all">
              Start Your Project <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  </div>
);

export default Home;
