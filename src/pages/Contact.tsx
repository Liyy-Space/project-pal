import { useState, useRef } from "react";
import { MessageCircle, MapPin, Mail, Phone, Twitter, Linkedin, Github, Facebook } from "lucide-react";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

const HERO_GRADIENT = "linear-gradient(135deg, hsl(224 76% 28%) 0%, hsl(176 69% 22%) 50%, hsl(142 64% 32%) 100%)";

const Contact = () => {
  const { t } = useTranslation();
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
      toast.success(t("contact.toastSuccess"));
      formRef.current.reset();
    } catch {
      toast.error(t("contact.toastError"));
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
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-4">
            <MessageCircle className="w-3 h-3 text-teal-300" />
            <span className="text-teal-300 text-xs font-semibold uppercase tracking-widest">{t("contact.badge")}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-3">{t("contact.titlePrefix")} <span className="text-teal-300">{t("contact.titleHighlight")}</span></h1>
          <p className="text-white/70 max-w-lg text-sm md:text-base">
            {t("contact.subtitle")}
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
                  <h2 className="text-2xl font-bold mb-2">{t("contact.getInTouch")}</h2>
                  <p className="text-white/60 text-sm mb-8 leading-relaxed">
                    {t("contact.getInTouchDesc")}
                  </p>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                        <MapPin className="w-4 h-4 text-teal-300" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white text-sm">{t("contact.headOffice")}</h3>
                        <p className="text-white/60 text-sm mt-0.5">{t("contact.headOfficeLocation")}</p>
                        <p className="text-white/40 text-xs mt-0.5">{t("contact.headOfficeHours")}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                        <MapPin className="w-4 h-4 text-teal-300" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white text-sm">{t("contact.branches")}</h3>
                        <p className="text-white/60 text-sm mt-0.5">{t("contact.branchesLocation")}</p>
                        <p className="text-white/40 text-xs mt-0.5">{t("contact.branchesNote")}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                        <Mail className="w-4 h-4 text-teal-300" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white text-sm">{t("contact.emailUs")}</h3>
                        <p className="text-white/60 text-sm mt-0.5">info@neu-data.com</p>
                        <p className="text-white/60 text-sm">contact@neu-data.com</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                        <Phone className="w-4 h-4 text-teal-300" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white text-sm">{t("contact.responseTime")}</h3>
                        <p className="text-white/60 text-sm mt-0.5">{t("contact.responseTimeValue")}</p>
                        <p className="text-white/40 text-xs mt-0.5">{t("contact.responseTimeNote")}</p>
                      </div>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="mt-10">
                    <p className="text-white/40 text-xs uppercase tracking-widest mb-4">{t("contact.followUs")}</p>
                    <div className="flex gap-3">
                      {[
                        { icon: Twitter, href: "#" },
                        { icon: Linkedin, href: "https://www.linkedin.com/company/neu-data/" },
                        { icon: Github, href: "#" },
                        { icon: Facebook, href: "#" },
                      ].map(({ icon: Icon, href }, i) => (
                        <a key={i} href={href} target="_blank" rel="noopener noreferrer"
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
                <h2 className="text-2xl font-bold text-foreground mb-2">{t("contact.sendMessage")}</h2>
                <p className="text-muted-foreground text-sm mb-6">{t("contact.sendMessageDesc")}</p>

                <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1.5 uppercase tracking-wide">{t("contact.form.firstName")}</label>
                      <input name="firstName" required placeholder="John"
                        className="w-full px-4 py-3 rounded-xl border border-input bg-muted text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1.5 uppercase tracking-wide">{t("contact.form.lastName")}</label>
                      <input name="lastName" required placeholder="Doe"
                        className="w-full px-4 py-3 rounded-xl border border-input bg-muted text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none text-sm" />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1.5 uppercase tracking-wide">{t("contact.form.email")}</label>
                      <input name="email" type="email" required placeholder="john@company.com"
                        className="w-full px-4 py-3 rounded-xl border border-input bg-muted text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1.5 uppercase tracking-wide">{t("contact.form.company")}</label>
                      <input name="company" placeholder="Your Company"
                        className="w-full px-4 py-3 rounded-xl border border-input bg-muted text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none text-sm" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1.5 uppercase tracking-wide">{t("contact.form.serviceInterest")}</label>
                    <select name="service" required
                      className="w-full px-4 py-3 rounded-xl border border-input bg-muted text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none text-sm">
                      <option value="">{t("contact.form.selectService")}</option>
                      <option value="data-analytics">{t("contact.form.services.dataAnalytics")}</option>
                      <option value="machine-learning">{t("contact.form.services.machineLearning")}</option>
                      <option value="data-engineering">{t("contact.form.services.dataEngineering")}</option>
                      <option value="consulting">{t("contact.form.services.consulting")}</option>
                      <option value="other">{t("contact.form.services.other")}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1.5 uppercase tracking-wide">{t("contact.form.message")}</label>
                    <textarea name="message" rows={5} required placeholder={t("contact.form.messagePlaceholder")}
                      className="w-full px-4 py-3 rounded-xl border border-input bg-muted text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none resize-none text-sm" />
                  </div>

                  <button type="submit" disabled={sending}
                    className="w-full py-3.5 rounded-xl font-semibold text-white transition-all disabled:opacity-50 hover:opacity-90 shadow-lg"
                    style={{ background: HERO_GRADIENT }}>
                    {sending ? t("contact.form.sending") : t("contact.form.send")}
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