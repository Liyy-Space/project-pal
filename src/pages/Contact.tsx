import { useState, useRef } from "react";
import { MessageCircle, MapPin, Mail, Phone, Twitter, Linkedin, Github, Facebook } from "lucide-react";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";

const HERO_GRADIENT = "linear-gradient(135deg, hsl(224 76% 28%) 0%, hsl(176 69% 22%) 50%, hsl(142 64% 32%) 100%)";

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    setSending(true);
    try {
      await emailjs.sendForm(
        "service_bkjb2ru",
        "template_en1j91w",
        formRef.current,
        { publicKey: "EXA1v79zfibZQipgZ" }
      );
      toast.success("Message sent successfully!");
      formRef.current.reset();
    } catch {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="pt-16">

      {/* Hero Banner */}
       <div className="relative h-64 md:h-80 overflow-hidden">
  <div className="absolute inset-0" style={{ background: HERO_GRADIENT }} />
  <img
    src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1600"
    alt="Contact Us"
    className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60"
  />
  <div className="absolute inset-0 grid-pattern opacity-20" />n
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-4">
            <MessageCircle className="w-3 h-3 text-teal-300" />
            <span className="text-teal-300 text-xs font-semibold uppercase tracking-widest">We'd love to hear from you</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-3">Contact <span className="text-teal-300">Us</span></h1>
          <p className="text-white/70 max-w-lg text-sm md:text-base">
            Ready to transform your business with data science? Let's discuss your project and explore how we can help.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-20 bg-muted">
        <div className="container">
          <div className="bg-card rounded-2xl shadow-card overflow-hidden">
            <div className="grid lg:grid-cols-5">

              {/* Left — Contact Info */}
              <div className="lg:col-span-2 p-8 md:p-10 text-white relative overflow-hidden" style={{ background: HERO_GRADIENT }}>
                <div className="absolute inset-0 grid-pattern opacity-20" />
                <div className="relative z-10">
                  <h2 className="text-2xl font-bold mb-2">Get in touch</h2>
                  <p className="text-white/60 text-sm mb-8 leading-relaxed">
                    Fill in the form to start a conversation. Our team typically responds within 24 hours on business days.
                  </p>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                        <MapPin className="w-4 h-4 text-teal-300" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white text-sm">Head Office</h3>
                        <p className="text-white/60 text-sm mt-0.5">Nairobi, Kenya</p>
                        <p className="text-white/40 text-xs mt-0.5">Mon - Fri: 9:00 AM - 6:00 PM</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                        <Mail className="w-4 h-4 text-teal-300" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white text-sm">Email Us</h3>
                        <p className="text-white/60 text-sm mt-0.5">info@neudata.com</p>
                        <p className="text-white/60 text-sm">sales@neudata.com</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                        <Phone className="w-4 h-4 text-teal-300" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white text-sm">Response Time</h3>
                        <p className="text-white/60 text-sm mt-0.5">Within 24 hours</p>
                        <p className="text-white/40 text-xs mt-0.5">Business days only</p>
                      </div>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="mt-10">
                    <p className="text-white/40 text-xs uppercase tracking-widest mb-4">Follow us</p>
                    <div className="flex gap-3">
                      {[
                        { icon: Twitter, href: "#" },
                        { icon: Linkedin, href: "#" },
                        { icon: Github, href: "#" },
                        { icon: Facebook, href: "#" },
                      ].map(({ icon: Icon, href }, i) => (
                        <a key={i} href={href}
                          className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-teal-500/40 hover:border-teal-400/40 transition-all">
                          <Icon className="w-4 h-4 text-white" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right — Form */}
              <div className="lg:col-span-3 p-8 md:p-10">
                <h2 className="text-2xl font-bold text-foreground mb-2">Send us a message</h2>
                <p className="text-muted-foreground text-sm mb-6">We'd love to learn more about your project. Fill in the details below.</p>

                <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1.5 uppercase tracking-wide">First Name</label>
                      <input name="firstName" required placeholder="John"
                        className="w-full px-4 py-3 rounded-xl border border-input bg-muted text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1.5 uppercase tracking-wide">Last Name</label>
                      <input name="lastName" required placeholder="Doe"
                        className="w-full px-4 py-3 rounded-xl border border-input bg-muted text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none text-sm" />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1.5 uppercase tracking-wide">Email</label>
                      <input name="email" type="email" required placeholder="john@company.com"
                        className="w-full px-4 py-3 rounded-xl border border-input bg-muted text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1.5 uppercase tracking-wide">Company</label>
                      <input name="company" placeholder="Your Company"
                        className="w-full px-4 py-3 rounded-xl border border-input bg-muted text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none text-sm" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1.5 uppercase tracking-wide">Service Interest</label>
                    <select name="service" required
                      className="w-full px-4 py-3 rounded-xl border border-input bg-muted text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none text-sm">
                      <option value="">Select a service</option>
                      <option value="data-analytics">Data Analytics & Visualization</option>
                      <option value="machine-learning">Machine Learning Solutions</option>
                      <option value="data-engineering">Data Engineering & Infrastructure</option>
                      <option value="consulting">Training & Consulting</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1.5 uppercase tracking-wide">Message</label>
                    <textarea name="message" rows={5} required placeholder="Tell us about your project..."
                      className="w-full px-4 py-3 rounded-xl border border-input bg-muted text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none resize-none text-sm" />
                  </div>

                  <button type="submit" disabled={sending}
                    className="w-full py-3.5 rounded-xl font-semibold text-white transition-all disabled:opacity-50 hover:opacity-90 shadow-lg"
                    style={{ background: HERO_GRADIENT }}>
                    {sending ? "Sending..." : "Send Message →"}
                  </button>
                </form>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;