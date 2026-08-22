 
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, BarChart3, TrendingUp, FlaskConical, Shield, PenLine, FileText, Database, Code2, BrainCircuit, Search, GraduationCap, MessageCircle, BookOpen, Star, Calendar, Clock, MapPin, Users } from "lucide-react";
import heroImage from "@/assets/hero-data.jpg";
import posterImage from "@/assets/Poster.png";

const HERO_GRADIENT = "linear-gradient(135deg, hsl(224 76% 28%) 0%, hsl(176 69% 22%) 50%, hsl(142 64% 32%) 100%)";

const services = [
  { icon: BarChart3, title: "Survey Methodology", desc: "Designing surveys that produce defensible estimates and clean field data.", color: "text-teal-500" },
  { icon: TrendingUp, title: "Statistical Consultancy", desc: "A senior statistician on call for design, analysis and reviewer questions.", color: "text-blue-500" },
  { icon: FlaskConical, title: "Clinical Trial Support", desc: "End-to-end biostatistics aligned to ICH-GCP for interventional studies.", color: "text-red-500" },
  { icon: Shield, title: "DSMB Support", desc: "Independent statistical membership and unblinded analytics for trials.", color: "text-orange-500" },
  { icon: PenLine, title: "Scientific Writing", desc: "Submission-ready scientific text written to report what the data show.", color: "text-yellow-600" },
  { icon: FileText, title: "Grants & Proposals", desc: "Strengthening the quantitative spine of competitive applications.", color: "text-purple-500" },
  { icon: Database, title: "Data Management", desc: "Clean, well-governed data with an audit trail — the foundation of everything.", color: "text-cyan-500" },
  { icon: Code2, title: "Statistical Programming", desc: "Production-quality R, Python, Stata and SAS code, documented and reproducible.", color: "text-green-500" },
  { icon: BrainCircuit, title: "Mathematical Modelling", desc: "Models that explain mechanisms, project forward and quantify uncertainty.", color: "text-pink-500" },
  { icon: Search, title: "Research & Analytics", desc: "Full-cycle research support and applied data science for decisions.", color: "text-rose-500" },
  { icon: GraduationCap, title: "Training & Capacity", desc: "Leaving teams able to do the work themselves — not dependent on us.", color: "text-indigo-500" },
];

const featuredBooks = [
  { title: "R for Data Science (2nd ed.)", author: "Hadley Wickham et al.", rating: 4.9, isbn: "9781492097402", freeLink: "https://r4ds.hadley.nz" },
  { title: "An Introduction to Statistical Learning", author: "Gareth James et al.", rating: 4.9, isbn: "9781461471370", freeLink: "https://www.statlearning.com" },
  { title: "Designing Data-Intensive Applications", author: "Martin Kleppmann", rating: 4.9, isbn: "9781449373320", buyLink: "https://www.amazon.com/dp/1449373321" },
  { title: "Statistical Rethinking (2nd ed.)", author: "Richard McElreath", rating: 4.9, isbn: "9780367139919", freeLink: "https://xcelab.net/rm/statistical-rethinking" },
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
              <Link to="/services" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:-translate-y-0.5 transition-all">
                Explore Services <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary-foreground/50 text-primary-foreground rounded-lg font-semibold hover:bg-primary-foreground/10 transition-all">
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

    {/* Featured Event Section */}
    <section className="py-20 bg-white">
      <div className="container">
        <div className="text-center mb-10">
          <span className="text-primary text-xs font-semibold uppercase tracking-widest">Don't Miss Out</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-3">Featured Event</h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm">Join our upcoming professional short course and level up your data skills.</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-2xl max-w-5xl mx-auto"
        >
          {/* Left — Poster */}
          <div className="relative">
            <img
              src={posterImage}
              alt="Clinical Data Analysis in R"
              className="w-full h-full object-cover object-top"
              style={{ maxHeight: "580px" }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />
          </div>

          {/* Right — Event Details */}
          <div className="p-8 md:p-10 flex flex-col justify-between" style={{ background: HERO_GRADIENT }}>
            <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none rounded-r-3xl" />
            <div className="relative z-10">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-3 py-1 mb-5">
                <span className="w-2 h-2 rounded-full bg-teal-300 animate-pulse" />
                <span className="text-teal-300 text-xs font-semibold uppercase tracking-widest">Professional Short Course</span>
              </div>

              <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-2 leading-tight">
                Clinical Data Analysis in R
              </h3>
              <p className="text-teal-300 font-semibold text-sm mb-5">Phase I — Introductory Training</p>

              <p className="text-white/70 text-sm leading-relaxed mb-6">
                A five-session evening course for Doctors, Nurses, Medical Researchers and Allied Health Professionals. No prior programming experience required.
              </p>

              {/* Event Details */}
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <Calendar className="w-4 h-4 text-teal-300" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">Every Tuesday</p>
                    <p className="text-white/50 text-xs">7 September – 6 October 2026</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4 text-teal-300" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">8:00 PM Start</p>
                    <p className="text-white/50 text-xs">90 minutes per session • 5 sessions total</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <Users className="w-4 h-4 text-teal-300" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">For Healthcare Professionals</p>
                    <p className="text-white/50 text-xs">Doctors, Nurses, Researchers, Allied Health</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-teal-300" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">Contact to Register</p>
                    <p className="text-white/50 text-xs">myluong1710@gmail.com</p>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-3">
                <a
                  href="mailto:myluong1710@gmail.com?subject=Registration%20-%20Clinical%20Data%20Analysis%20in%20R&body=Hello%2C%0A%0AI%20would%20like%20to%20register%20for%20the%20Clinical%20Data%20Analysis%20in%20R%20course%20(Phase%20I%20-%20Introductory%20Training).%0A%0AMy%20details%3A%0AName%3A%20%0AProfession%3A%20%0AEmail%3A%20%0A%0AThank%20you."
                  className="inline-flex items-center gap-2 px-6 py-3 bg-teal-500 text-white rounded-xl font-semibold hover:bg-teal-400 transition-all shadow-lg shadow-teal-500/30 text-sm"
                >
                  Register Now <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="https://www.neu-data.com"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/30 text-white rounded-xl font-semibold hover:bg-white/20 transition-all text-sm"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>

    {/* Services Section */}
    <section className="py-20 bg-gray-50">
      <div className="container">
        <div className="text-center mb-12">
          <span className="text-primary text-xs font-semibold uppercase tracking-widest">What We Offer</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-3">
            A wide range of data science services
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm">
            From survey methodology to clinical trials, statistical modelling to scientific writing — we cover the full spectrum of quantitative research support.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 p-6 group"
            >
              <div className="w-12 h-12 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <s.icon className={`w-5 h-5 ${s.color}`} />
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2">{s.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">{s.desc}</p>
              <Link to="/services" className={`inline-flex items-center gap-1 text-sm font-semibold ${s.color} hover:gap-2 transition-all`}>
                Read More →
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-8 py-4 text-white rounded-xl font-semibold hover:opacity-90 transition-all shadow-lg text-base"
            style={{ background: HERO_GRADIENT }}
          >
            View All Services <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>

    {/* Books Section */}
    <section className="py-20 overflow-hidden relative" style={{ background: HERO_GRADIENT }}>
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-4">
              <BookOpen className="w-3 h-3 text-teal-300" />
              <span className="text-teal-300 text-xs font-semibold uppercase tracking-widest">Curated Reading List</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Some books entertain. <br />
              <span className="text-teal-300">Others change how we see data.</span>
            </h2>
            <p className="text-white/70 mb-8 text-base leading-relaxed max-w-lg">
              Our team has curated 37 essential books across data science, statistics, clinical research, machine learning, and more.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/books" className="inline-flex items-center gap-2 px-6 py-3 bg-teal-500 text-white rounded-xl font-semibold hover:bg-teal-400 transition-all shadow-lg shadow-teal-500/30">
                Browse the Collection <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/30 text-white rounded-xl font-semibold hover:bg-white/20 transition-all">
                Suggest a Book
              </Link>
            </div>
            <div className="flex gap-8 mt-10">
              {[{ num: "37", label: "Curated Books" }, { num: "11", label: "Categories" }, { num: "20+", label: "Free Online" }].map((s) => (
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
                    className="w-full h-full object-cover opacity-50 group-hover:opacity-30 transition-opacity duration-300"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-white font-bold text-xs leading-snug line-clamp-2">{book.title}</p>
                    <p className="text-teal-300 text-xs mt-0.5">{book.author}</p>
                    <div className="flex items-center gap-1 mt-1">
                      {[1,2,3,4,5].map((s) => (
                        <Star key={s} className={`w-2.5 h-2.5 ${s <= Math.round(book.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-500"}`} />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="bg-black/40 backdrop-blur-sm px-3 py-2">
                  {book.freeLink ? (
                    <a href={book.freeLink} target="_blank" rel="noopener noreferrer" className="text-xs text-teal-300 hover:text-teal-200 font-medium">Read Free Online ↗</a>
                  ) : (
                    <a href={(book as any).buyLink} target="_blank" rel="noopener noreferrer" className="text-xs text-white/70 hover:text-white font-medium">Buy Now ↗</a>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
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
 