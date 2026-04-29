import { useState, useRef } from "react";
import { MessageCircle, MapPin, Phone, Mail } from "lucide-react";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";
import PageHero from "@/components/PageHero";

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setSending(true);
    try {
      await emailjs.sendForm("service_bkjb2ru", "template_en1j91w", formRef.current, {
        publicKey: "EXA1v79zfibZQipgZ",
      });
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
      <PageHero icon={MessageCircle} title="Get In Touch" description="Ready to transform your business with data science? Let's discuss your project and explore how we can help." />

      <section className="py-20 bg-muted">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Form */}
            <div className="bg-card rounded-lg shadow-card p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">Send us a message</h2>
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">First Name</label>
                    <input name="firstName" required className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-ring focus:border-transparent transition-all outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Last Name</label>
                    <input name="lastName" required className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-ring focus:border-transparent transition-all outline-none" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Email</label>
                    <input name="email" type="email" required className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-ring focus:border-transparent transition-all outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Phone</label>
                    <input name="phone" type="tel" className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-ring focus:border-transparent transition-all outline-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Company</label>
                  <input name="company" className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-ring focus:border-transparent transition-all outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Service Interest</label>
                  <select name="service" required className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-ring focus:border-transparent transition-all outline-none">
                    <option value="">Select a service</option>
                    <option value="data-analytics">Data Analytics & Visualization</option>
                    <option value="machine-learning">Machine Learning Solutions</option>
                    <option value="data-engineering">Data Engineering & Infrastructure</option>
                    <option value="consulting">Training & Consulting</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Project Description</label>
                  <textarea name="message" rows={5} required placeholder="Tell us about your project..." className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-ring focus:border-transparent transition-all outline-none resize-none" />
                </div>
                <button type="submit" disabled={sending} className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50">
                  {sending ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>

            {/* Info */}
            <div className="space-y-6">
              <div className="bg-card rounded-lg shadow-card p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <MapPin className="w-5 h-5 text-primary shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground">Office Address</h3>
                      <p className="text-muted-foreground text-sm">Nairobi, Kenya</p>
                      <p className="text-xs text-muted-foreground/60 mt-1">Monday - Friday: 9:00 AM - 6:00 PM</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Phone className="w-5 h-5 text-primary shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground">Phone</h3>
                      <p className="text-muted-foreground text-sm">+254 703467349</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Mail className="w-5 h-5 text-primary shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground">Email</h3>
                      <p className="text-muted-foreground text-sm">info@neudata.com</p>
                      <p className="text-muted-foreground text-sm">sales@neudata.com</p>
                      <p className="text-xs text-muted-foreground/60 mt-1">We respond within 24 hours</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
